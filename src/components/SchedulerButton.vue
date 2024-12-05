<template>
  <Button
    v-if="statusCode === 'AUCTION_PUBLISHED'"
    label="Schedule Auction"
    @click="display = true"
    :disabled="disabled"
    class="btn-sm"
  ></Button>
  <div v-if="statusCode === 'AUCTION_SCHEDULED'">
    <Button
      label="Re-Schedule Auction"
      class="btn-sm"
      @click="display = true"
      :disabled="visibleReSchedule"
      v-tooltip="{
        value: visibleReSchedule
          ? 'Auction cannot be rescheduled at this stage'
          : '',
      }"
    ></Button>
  </div>
  <Dialog
    v-model:visible="display"
    modal
    :style="{ width: '75rem' }"
    header="Scheduler"
  >
    <div class="form-grid mb-4">
      <div class="col-span-full md:col-span-4">
        <div class="fm-group">
          <label for="Start Date" class="fm-label">Start Date</label>
          <div class="fm-inner">
            <Calendar
              v-model="startDate"
              @update:modelValue="emitModalValue"
              showIcon
              showTime
            ></Calendar>
          </div>
          <div class="fm-error" v-if="submitted && v$.startDate.$errors[0]">
            {{ v$.startDate.$errors[0].$message }}
          </div>
        </div>
      </div>
      <div class="col-span-full md:col-span-4">
        <div class="fm-group">
          <label for="End Date" class="fm-label">End Date</label>
          <div class="fm-inner">
            <Calendar
              v-model="endDate"
              @update:modelValue="emitModalValue"
              showIcon
              showTime
            ></Calendar>
          </div>
          <div class="fm-error" v-if="submitted && v$.endDate.$errors[0]">
            {{ v$.endDate.$errors[0].$message }}
          </div>
        </div>
      </div>
      <div class="col-span-full md:col-span-4">
        <div class="fm-group">
          <label for="Select User" class="fm-label">Select User</label>
          <div class="fm-inner">
            <Multiselect
              class="w-full"
              :options="userSelectOptions"
              optionLabel="text"
              optionValue="value"
              v-model="users"
              @update:modelValue="emitModalValue"
            ></Multiselect>
          </div>
          <div class="fm-error" v-if="submitted && v$.users.$errors[0]">
            {{ v$.users.$errors[0].$message }}
          </div>
        </div>
      </div>

      <template v-if="statusCode === 'AUCTION_SCHEDULED'">
        <!-- Rescheduling reason input field -->
        <div class="col-span-6">
          <div class="fm-group">
            <label for="ReschedulingReason" class="fm-label"
              >Rescheduling Reason</label
            >
            <div class="fm-inner">
              <InputText
                v-model="reschedulingReason"
                id="reschedulingReason"
                placeholder="Enter Rescheduling Reason"
              />
            </div>
            <div
              class="fm-error"
              v-if="submitted && v$.reschedulingReason.$errors[0]"
            >
              {{ v$.reschedulingReason.$errors[0].$message }}
            </div>
          </div>
        </div>

        <!-- Rescheduling Reason File Upload -->
        <div class="col-span-6">
          <div class="fm-group">
            <label for="ReschedulingReasonDocument" class="fm-label"
              >Rescheduling Reason Document</label
            >
            <div class="col-span-full fm-action fm-action-center mb-3">
          <Button
            v-if="uploadedFile"
            severity="secondary"
            @click="viewImage(filePath)"
          >
            <fa-eye></fa-eye>
          </Button>
          <Button v-if="uploadedFile" severity="danger" @click="deleteDoc()">
            <fa-trash-can></fa-trash-can>
          </Button>
        </div>
            <div class="fm-inner">
              <div class="col-span-full md:col-span-4" v-if="!uploadedFile">
                <FileUpload
                  v-model="uploadedFile"
                  :accept="docType"
                  :multiple="false"
                  :fileLimit="1"
                  :max-file-size="docSize * multiplyingFactor"
                  :custom-upload="true"
                  @uploader="onAdvancedUpload"
                >
                  <template #empty>
                    <p>
                      Drag and drop files to here to upload, Max. file size
                      {{ docSize }} KB , Only {{ docType }} are allowed
                    </p>
                  </template></FileUpload
                >
              </div>
            </div>
          </div>
        </div>
        
      </template>
    </div>

    <div class="box-section">
      <div class="bs-header">Items List</div>
      <div
        class="bs-item-holder"
        v-for="(item, index) in props.itemList"
        :key="index"
      >
        <div class="bs-item col-span-6">
          <div class="bs-label">Item Name:</div>
          <div class="bs-value">{{ item.item }}</div>
        </div>
        <div class="bs-item col-span-6">
          <div class="bs-label">Selected/ Unselected:</div>
          <div class="bs-value">Selected</div>
        </div>
      </div>
    </div>
    <div class="col-span-full">
      <div class="fm-action fm-action-center">
        <Button label="Schedule" @click="schedule"></Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import FileUpload from "primevue/fileupload";
import Tooltip from "primevue/tooltip";
import { onMounted, ref, watch, computed } from "vue";
import Calendar from "primevue/calendar";
import Multiselect from "primevue/multiselect";
import MQL from "@/plugins/mql.js";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, maxLength } from "@vuelidate/validators";
import { fetchAuctionStatus } from "@/plugins/helpers.js";
import moment from "moment";
import { login } from "../store/modules/login";
import { createToaster } from "@meforma/vue-toaster";
import MQLCdn from "@/plugins/mqlCdn.js";
import { useToast } from "primevue/usetoast";
import faEye from '../../assets/icons/eye.svg';
import faTrashCan from '../../assets/icons/trash-can.svg';

const toaster = createToaster({ position: "top-right", duration: 3000 });

const props = defineProps({
  itemList: Array,
  auctionId: Number,
  entityId: Number,
  startDate: String,
  endDate: String,
  users: Array,
  disabled: Boolean,
  statusCode: String,
  auctionCode: String,
  totalEmdPaid: Number,
  propertiesAvailable: Number,
});

let previousstartDate = props.startDate;

const uploadedFile = ref("");

const loginStore = login();
const toast = useToast();

const myFile = ref();
const fileName = ref();
const filePath = ref();
const Vue = window.app;

const onAdvancedUpload = async (event) => {
  let timeStamp = Date.now();
  //console.log(timeStamp, "timeStamp")
  //console.log("event", event.files[0])
  myFile.value = event.files[0].name;
  //console.log("myFile", myFile.value);
  const formData = new FormData();
  formData.append("file", event.files[0]);
  //new mqlCDN add-------------------------------------------------------------------------------
  new MQLCdn()
    // .useManagementServer()
    .enablePageLoader(true) // FIXED: change this to directory path
    //.isPrivateBucket(true) // (optional field) if you want to upload file to private bucket
    .setDirectoryPath(props.auctionId + "/AuctionRescheduling/") // (optional field) if you want to save  file to specific directory path
    .setFormData(formData) // (required) sets file data
    .setFileName(timeStamp + "_" + myFile.value) // (optional field) if you want to set name to file that is being uploaded
    // FIXED: pass buckeyKey instead of name
    .setBucketKey("2ciy8jTCjhcc6Ohu2hGHyY16nHn") // (required) valid bucket key need to set in which file will be uploaded.
    .setPurposeId("2cixqU1nhJHru2m1S0uIxdKSgMb") // (required) valid purposeId need to set in which file will be uploaded.
    .setClientId("2cixqU1nhJHru2m1S0uIxdKSgMb") // (required) valid purposeId need to set in which file will be uploaded.
    .uploadFile("uploadtBtn")
    .then((res) => {
      // (required) this will upload file takes element id (optional param) which will be blocked while file upload..
      if (res.isValid()) {
        fileName.value = timeStamp + "_" + myFile.value;
        filePath.value = res.uploadedFileURL().filePath;

        //console.log("fileName", fileName.value);
        //console.log("filePath", filePath.value);

        uploadedFile.value = true;
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "File Uploaded",
          life: 3000,
        });
      } else {
        res.showErrorToast();
      }
    });
};

const deleteDoc = async () => {
  await deleteFile(fileName.value);
  fileName.value = null;
  filePath.value = "";
  uploadedFile.value = false;
};

const deleteFile = (url) => {
  console.log("url is", url);
  return new Promise((resolve) => {
    new MQLCdn()

      .setBucketKey("2ciy8jTCjhcc6Ohu2hGHyY16nHn") // (required) valid bucket key need to set in which file will be uploaded.
      .setPurposeId("2cixqU1nhJHru2m1S0uIxdKSgMb") // (required) valid purposeId need to set in which file will be uploaded.
      .setClientId("2cixqU1nhJHru2m1S0uIxdKSgMb")
      .setDirectoryPath(props.auctionId + "/AuctionRescheduling/")

      .setFileName(url)
      .enablePageLoader(true)
      .deleteFile()
      .then((res) => {
        //console.log(res);
        if (res.isValid()) {
          toaster.error("file deleted");

          resolve();
        } else {
          res.showErrorToast();
        }
      });
  });
};

function viewImage(path) {
  imagePath.value = path;

  if (!path.startsWith("http")) {
    console.log("Inside " + path);
    imagePath.value = Vue.getCDNBaseURL() + "/" + imagePath.value;
  }

  console.log("path is " + imagePath.value);
  // if (path.endsWith('.pdf')) {
  //   console.log("inside pdfs")
  fetchImage(imagePath.value);
  //         viewImageModalPDF.value = true;
  // } else {
  // fetchImage(path)
  // viewImageModalImage.value=true;
  // }
}

const imagePath = ref();
function fetchImage(url) {
  const myHeaders = new Headers();

  myHeaders.append(
    "Authorization",
    "Bearer " + sessionStorage.getItem("user-token")
  );
  myHeaders.append("Accept", "application/json, text/plain, */*");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(url, requestOptions)
    .then((response) => response.blob())
    .then((blob) => {
      // Create a URL for the image
      const imageUrl = URL.createObjectURL(blob);

      imagePath.value = imageUrl;
      console.log("imagePath.value is", imagePath.value);
      // viewImageModalImage.value=true
      window.open(imageUrl);
    })
    .catch((error) => console.error(error));
}

const emit = defineEmits(["update:modelValue"]);
function emitModalValue() {
  emit("update:startDate", startDate.value);
  emit("update:endDate", endDate.value);
  emit("update:users", users.value);
}

let display = ref(false);
let startDate = ref(
  moment(props.startDate).isValid()
    ? moment(props.startDate).toDate()
    : moment().toDate()
);
let endDate = ref(
  moment(props.endDate).isValid()
    ? moment(props.endDate).toDate()
    : moment().add(1, "minute").toDate()
);

let userSelectOptions = ref([]);
let users = ref(props.users);
let statusCode = ref(props.statusCode);
let submitted = ref(false);

// Validation rules
const rules = {
  startDate: {
    required,
    validator: helpers.withMessage(
      "Start date should be less than end date and greater than today",
      isValidStartDate
    ),
  },
  endDate: {
    required,
    minValue: helpers.withMessage(
      "End date should be greater than start date",
      isValidEndDate
    ),
  },
  users: {
    required,
    minLength: helpers.withMessage(
      "Please select at least three users",
      minLength(3)
    ),
  },
  reschedulingReason:
    statusCode.value === "AUCTION_SCHEDULED"
      ? {
          required,
          minLength: minLength(10),
          maxLength: maxLength(100),
        }
      : {},
};
const reschedulingReason = ref(null);
// Custom validation functions for start date
function isValidStartDate(date) {
  const today = moment();
  const inputDate = moment(date);
  return inputDate.isAfter(today) && inputDate.isBefore(endDate.value);
}

// Custom validation functions for end date
function isValidEndDate(date) {
  const today = moment(); // replace with your end date
  const inputDate = moment(date);
  // check if the input date is after today and after the start date
  return inputDate.isAfter(today) && inputDate.isAfter(startDate.value);
}

const v$ = useVuelidate(rules, {
  startDate,
  endDate,
  users,
  reschedulingReason,
});

import axios from "axios";

function InsertReschedulingDocuments() {
  new MQL()
    .useManagementServer()
    .setActivity("r.[InsertReschedulingDocuments]")
    .setData({
      auctionId: props.auctionId,
      createdBy: loginStore.loginId,
      documentFileName: fileName.value,
      documentFilePath: filePath.value,
      documentTypeId: docTypeId.value,
      modifiedBy: loginStore.loginId,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("InsertReschedulingDocuments", true);
      if (rs.isValid("InsertReschedulingDocuments")) {
      } else {
        rs.showErrorToast("InsertReschedulingDocuments");
      }
    });
}

async function schedule() { 
  // Schedule the auction
  v$.value.$touch();
  submitted.value = true;
  if (v$.value.$error) {
    // show error message
    alert("Please fill all the fields");
    return;
  }
  if (statusCode.value === "AUCTION_SCHEDULED") {
    await removeHub();
  }
  if (filePath) {
    InsertReschedulingDocuments();
  }
  var bidderStatusId = await fetchAuctionStatus("AUCTION_EMD_FEES_PAID");
  var userStatusId = await fetchAuctionStatus("AUCTION_USER_SCHEDULED");
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[ScheduleAuction]")
    .setData({
      auctionId: props.auctionId,
      reschedulingReason: reschedulingReason.value,
      endDate: formatDate(endDate.value),
      startDate: formatDate(startDate.value),
      users: users.value,
      userId: loginStore.loginId,
      bidderStatusId: bidderStatusId.result.statusId,
      userStatusId: userStatusId.result.statusId,
      totalEmdPaid: props.totalEmdPaid,
      propertiesAvailable: props.propertiesAvailable,
      entityId: props.entityId,
    })
    .fetch()
    .then(async (rs) => {
      let res = rs.getActivity("ScheduleAuction", true);
      if (rs.isValid("ScheduleAuction")) {
        if (res && res.result == "SUCCESS") {
          display.value = false;
          if (statusCode.value === "AUCTION_PUBLISHED") {
            NotifyScheduledAuctionBidders();
          }
          // NotifyScheduledAuctionBidders()
          NotifyAuctionScheduledAndPasscodes();
          if (statusCode.value === "AUCTION_SCHEDULED") {
            NotifyAuctionReScheduledAndPasscodes(); // Rescheduling Passcodes email
          }

          // NotifyAuctionReScheduledAndPasscodes()
          //alert("Auction Scheduled Successfully");
          // toaster.success("Auction Scheduled Successfully");
          // reloadPage();
        } else {
          alert("Auction Scheduling Failed");
        }
      } else {
        rs.showErrorToast("ScheduleAuction");
      }
    });
}
const data = ref(null);
const error = ref(null);

const removeHub = async () => {
  try {
    const response = await axios.get(
      `/bidding-server-http/o/removeHubRoute/${props.auctionId}`
    );
    return response.data; // Return a resolved Promise with the response data
  } catch (err) {
    toaster.error("Error removing hub");
    console.error("Error removing hub:", err.message);
    throw err; // Rethrow the error to handle it in the calling function
  }
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //return moment(date).format('MM/DD/YYYY HH:mm');
}
function NotifyAuctionReScheduledAndPasscodes() {
  new MQL()
    .useNotificationServer()
    .setActivity("r.[SendEmailAuctionRescheduled]")
    .setData({
      auctionId: props.auctionCode,
      previousstartDate: previousstartDate,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("SendEmailAuctionRescheduled", true);
      if (rs.isValid("SendEmailAuctionRescheduled")) {
      } else {
        rs.showErrorToast("SendEmailAuctionRescheduled");
      }
    });
}
function NotifyAuctionScheduledAndPasscodes() {
  new MQL()
    .useNotificationServer()
    .setActivity("r.[FetchAuctionParticipatedBidders]")
    .setData({ auctionId: props.auctionCode, roleId: 1, statusId: 31 })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAuctionParticipatedBidders", true);
      if (rs.isValid("FetchAuctionParticipatedBidders")) {
        toaster.success("Auction Scheduled Successfully");
        reloadPage();
      } else {
        rs.showErrorToast("FetchAuctionParticipatedBidders");
      }
    });
}

function NotifyScheduledAuctionBidders() {
  new MQL()
    .useNotificationServer()
    .setActivity("r.[NotifyScheduledAuctionBidders]")
    .setData({ auctionId: props.auctionCode, roleId: 1, statusId: 31 })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("NotifyScheduledAuctionBidders", true);
      if (rs.isValid("NotifyScheduledAuctionBidders")) {
        // NotifyAuctionScheduledAndPasscodes()
      } else {
        rs.showErrorToast("NotifyScheduledAuctionBidders");
      }
    });
}
const reScheduleTime = ref(0);
const rescheduleCompareTime = ref(0);
const visibleReSchedule = ref(false);
console.log("AUctionId*****", props.auctionCode);
console.log("AUctionId*****", props.auctionId);
function AuctionReScheduleTime() {
  console.log("AuctionId", props.auctionId);
  new MQL()
    .useManagementServer()
    .setActivity("o.[AuctionReScheduleTime]")
    .setData({ auctionId: props.auctionId })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("AuctionReScheduleTime", true);
      if (rs.isValid("AuctionReScheduleTime")) {
        rescheduleCompareTime.value =
          res.result.auctionReScheduleTime.customParamValue;
        console.log("#########", rescheduleCompareTime.value);
        reScheduleTime.value =
          res.result.fetchAuctionRescheduleTime.timeDifference;
        console.log("reScheduleTime", reScheduleTime.value);
        console.log("Time", rescheduleCompareTime < reScheduleTime);
        if (rescheduleCompareTime.value < reScheduleTime.value) {
          console.log("Time", rescheduleCompareTime < reScheduleTime);
          visibleReSchedule.value = false;
        } else {
          visibleReSchedule.value = true;
        }
      } else {
        rs.showErrorToast("AuctionReScheduleTime");
      }
    });
}
// const isReScheduleDisabled = computed(() => {
//   return rescheduleCompareTime.value < reScheduleTime.value;
// });
const docTypeId = ref(0);
const docSize = ref();
const docName = ref();
const docType = ref();
const docValidation = ref([]);

function fetchReschedulingDocumentDetails() {
  // Automatically generated
  new MQL()
    .useCoreServer()
    .setActivity("o.[fetchDocumentsValidationDetails]")

    .fetch()
    .then((rs) => {
      let res = rs.getActivity("fetchDocumentsValidationDetails", true);
      docValidation.value = res.result.validation;
      docValidation.value.forEach((item) => {
        if (item.typeName == "RESCHEDULING_REASON_DOCUMENT") {
          docName.value = item.typeName;
          docSize.value = item.fileSize;
          docType.value = item.fileType;
          docTypeId.value = item.typeId;
          //console.log("docName.value", docName.value);
        }
      });
    });
}
const multiplyingFactor = ref();
function fetchMultiplyingFactor() {
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchCustomValueByKey]")
    .setData({ key: "MULTIPLYING_FACTOR" })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchCustomValueByKey", true);
      if (rs.isValid("FetchCustomValueByKey")) {
        multiplyingFactor.value = res.result.vsCustomParamValue;
      } else {
        rs.showErrorToast("FetchCustomValueByKey");
      }
    });
}

onMounted(() => {
  // Fetch the users  to be shown in dropdown
  FetchUsers();
  fetchReschedulingDocumentDetails();
  fetchMultiplyingFactor();
  //console.log("Auc Code",props.auctionCode);
  //console.log(props.itemList);
  //console.log(props.auctionId);
  //console.log("EntityID", props.entityId);
  //console.log(props.startDate);
  //console.log("@@@@@@@@@@@@@@@", props.endDate);
  //console.log("#############", props.users);
  AuctionReScheduleTime();
});

function reloadPage() {
  window.location.reload();
}

function FetchUsers() {
  // Fetch users from the server
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[query_2d1z3bTMBaYu0by4aWLiiPZdLK7]")
    .setData({ entityId: props.entityId })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("query_2d1z3bTMBaYu0by4aWLiiPZdLK7", true);
      if (rs.isValid("query_2d1z3bTMBaYu0by4aWLiiPZdLK7")) {
        userSelectOptions.value = res;
      } else {
        rs.showErrorToast("query_2d1z3bTMBaYu0by4aWLiiPZdLK7");
      }
    });
}

watch(display, (newVal) => {
  if (newVal) {
    startDate.value = moment().toDate();
    endDate.value = moment().add(1, "minute").toDate();
  }
});
watch(statusCode, (newVal) => {
  if (newVal === "AUCTION_SCHEDULED") {
    display.value = false;
  }
});
</script>
