<template>
  <div class="wizard-content">
    <div class="wc-item">
      <div class="wc-header">
        <div class="wc-title">Auction ID: {{ auctionId }}</div>
      </div>

      <div class="form-grid">
        <div class="col-span-full md:col-span-6">
          <div class="fm-group">
            <label class="fm-label" for="calendar-12h">
              Processing Fee And EMD payment Start Date
            </label>
            <div class="fm-inner">
              <Calendar
                :disabled="config?.selectedStartDateReadonly"
                id="calendar-24h"
                v-model="selectedStartDate"
                showTime
                hourFormat="24"
                :minDate="minDate"
                :showIcon="true"
              />
            </div>
            <div
              v-if="
                moment(selectedEndDate).isSameOrBefore(
                  selectedStartDate,
                  'minute'
                )
              "
              class="col-span-full fm-error"
            >
              Start Date should not be equal or after End Date !
            </div>
          </div>
        </div>
        <div class="col-span-full md:col-span-6">
          <div class="fm-group">
            <label class="fm-label" for="calendar-12h">
              Processing Fee And EMD payment End Date
            </label>
            <div class="fm-inner">
              <Calendar
                :disabled="config?.selectedEndDateReadonly"
                id="calendar"
                v-model="selectedEndDate"
                showTime
                hourFormat="24"
                :minDate="endMinDate"
                :showIcon="true"
              />
            </div>
          </div>
        </div>
        <div class="col-span-full 2xl:col-span-6">
          <div class="fm-group">
            <label class="fm-label"> Auction Document </label>
            <div class="fm-inner">
              <FileUpload
                :disabled="config?.docNameReadonly"
                v-model="docName"
                :accept="docType"
                :multiple="false"
                :max-file-size="docSize * 1000"
                :custom-upload="true"
                @uploader="onAdvancedUpload($event, AuctionDocTypeId)"
              >
                <template #empty>
                  <p>
                    Drag and drop files here to upload, Max. file size is 500
                    KB, Only {{ docType }} are allowed !
                  </p>
                </template>
              </FileUpload>
              <span v-if="$v.AucUrl.$error" class="text-red-500">{{
                $v.AucUrl.$errors[0].$message
              }}</span>

              <div v-if="AucUrl">
                <Button
                  label="Download Auction Document"
                  @click="DownloadDocument(AucUrl)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-full 2xl:col-span-6">
          <div class="fm-group">
            <label class="fm-label"> Notice Document </label>
            <div class="fm-inner">
              <FileUpload
                :disabled="config?.NoticeDocNameReadonly"
                v-model="NoticeDocName"
                :accept="NoticeDocType"
                :multiple="false"
                :max-file-size="NoticeDocSize * 1000"
                :custom-upload="true"
                @uploader="onAdvancedUpload($event, NoticeDocTypeId)"
              >
                <template #empty>
                  <p>
                    Drag and drop files here to upload, Max. file size is 500
                    KB, Only {{ docType }} are allowed !
                  </p>
                </template>
              </FileUpload>
              <span v-if="$v.NoticeUrl.$error" class="text-red-500">{{
                $v.NoticeUrl.$errors[0].$message
              }}</span>

              <div v-if="NoticeUrl">
                <Button
                  label="Download Notice Document"
                  @click="DownloadDocument(NoticeUrl)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="main-date">
                <label for="calendar-12h" class="font-bold block mb-2">
                Processing Fee And EMD payment Start Date:</label>
                <Calendar :disabled="config?.selectedStartDateReadonly" id="calendar-24h" v-model="selectedStartDate" showTime hourFormat="24" :minDate="minDate"
                :showIcon="true" />
                <label for="calendar-12h" class="font-bold block mb-2">
                Processing Fee And EMD payment End Date:</label>
                <Calendar :disabled="config?.selectedEndDateReadonly" id="calendar" v-model="selectedEndDate" showTime hourFormat="24" :minDate="endMinDate" :showIcon="true" />
            </div>
            <div v-if="moment(selectedEndDate).isSameOrBefore(selectedStartDate, 'minute')" style="color: red;">
                Start Date should not be equal or after End Date !
            </div>-->

      <!-- <p>Auction Document:</p>
                <FileUpload :disabled="config?.docNameReadonly" v-model="docName" :accept="docType" :multiple="false" :max-file-size="docSize * 1000"
                :custom-upload="true" @uploader="onAdvancedUpload($event, NoticeDocTypeId)">
                <template #empty>
                    <p>
                    Drag and drop files here to upload, Max. file size is 500 KB, Only
                    {{ docType }}
                    are allowed !
                    </p>
                </template>
                </FileUpload>
                <p>Notice Document:</p>
                <FileUpload :disabled="config?.NoticeDocNameReadonly" v-model="NoticeDocName" :accept="NoticeDocType" :multiple="false" :max-file-size="NoticeDocSize * 1000"
                :custom-upload="true" @uploader="onAdvancedUpload($event, AuctionDocTypeId)">
                <template #empty>
                    <p>
                    Drag and drop files here to upload, Max. file size is 500 KB, Only {{ docType }}  are allowed !
                    </p>
                </template>
                </FileUpload> -->
    </div>

    <div class="wc-action">
      <!-- <Button label="Back" @click="backToStep3" /> -->
      <Button label="Back" @click="prevCallback()" severity="secondary" />
      <Button label="Save" @click="onSave" class="btn-submit" />
      <!-- <Button label="Next" @click="auctionPreview" /> -->
      <!-- <Button label="Next" @click="nextCallback()" /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, defineProps, computed } from "vue";
import moment from "moment";
import Calendar from "primevue/calendar";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import MQLCdn from "@/plugins/MQLCdn.js";
import MQL from "@/plugins/mql.js";
import { fetchAuctionStatus } from "../../../plugins/helpers";
import { useRouter } from "vue-router";
import { useAuctionPreparation } from "../../../store/auctionPreparation";
import { login } from "../../../store/modules/login";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 5000 });
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const router = useRouter();
const loginStore = login();
const AuctionStore = useAuctionPreparation();

const { auctionId, config } = defineProps({
  auctionId: {
    type: Number,
    default: null,
  },
  config: {
    type: Object,
    default: null,
  },
});

const serverDate = ref();
//const startDate = ref(new Date());
//const endDate = ref(new Date());
const selectedStartDate = ref();
const selectedEndDate = ref();

const minDate = ref();
minDate.value = moment().add(1, "minutes").toDate();
const endMinDate = ref();
endMinDate.value = moment().add(2, "minutes").toDate();
const AucUrl = ref();
const NoticeUrl = ref();
const myFile = ref();
const docValidation = ref([]);
const docName = ref();
const docType = ref();
const docSize = ref();
const NoticeDocName = ref();
const NoticeDocType = ref();
const NoticeDocSize = ref();
const dbEndDate = ref();
const dbStartDate = ref();
const docTypeId = ref();
const NoticeDocTypeId = ref();
const AuctionDocTypeId = ref();
const documentsArray = ref([]);
const formattedStartDate = ref();
const formattedEndDate = ref();
const fileName = ref();
const filePath = ref();
const fullPath = ref();

const rules = computed(() => ({
  AucUrl: { required: helpers.withMessage("Document is required", required) },
  NoticeUrl: {
    required: helpers.withMessage("Document is required", required),
  },
}));
const $v = useVuelidate(rules, { AucUrl, NoticeUrl });
const emit = defineEmits({
  nextTab: null,
  previousTab: null,
});
function prevCallback() {
  emit("previousTab");
}

function nextCallback() {
  emit("nextTab");
}

function formattedStartDateCalc() {
  formattedStartDate.value = moment(serverDate.value)
    .add(60, "seconds")
    .format("YYYY/MM/DD HH:mm:ss");
  console.log("formattedStartDate.value", formattedStartDate.value);
}
function formattedEndDateCalc() {
  formattedEndDate.value = moment(serverDate.value)
    .add(120, "seconds")
    .format("YYYY/MM/DD HH:mm:ss");
  console.log("formattedEndDate.value", formattedEndDate.value);
}

const onAdvancedUpload = async (event, id) => {
  // try {
  console.log(event, "event");
  let timeStamp = Date.now();
  console.log(timeStamp, "timeStamp");
  console.log("event", event.files[0]);
  myFile.value = event.files[0].name;
  console.log("myFile", myFile.value);
  const formData = new FormData();
  formData.append("file", event.files[0]);
  //new mqlCDN add-------------------------------------------------------------------------------
  new MQLCdn()
    // .useManagementServer()
    .enablePageLoader(true) // FIXED: change this to directory path
    // .isPrivateBucket(true) // (optional field) if you want to upload file to private bucket
    .setDirectoryPath(auctionId + "/AuctionPreparation/Publishing") // (optional field) if you want to save  file to specific directory path
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
        fullPath.value = res.uploadedFileURL().cdnServer;
        console.log("fileName", fileName.value);
        console.log("filePath", filePath.value);
        console.log("fullPath", fullPath.value);
        if (id == 8) {
          AucUrl.value = fullPath.value + "/" + filePath.value;
          console.log("AucUrl", AucUrl.value);
        } else {
          NoticeUrl.value = fullPath.value + "/" + filePath.value;
          console.log("NoticeUrl", NoticeUrl.value);
        }

        documentsArray.value.push({
          fileName: timeStamp + "_" + myFile.value,
          filePath: res.uploadedFileURL().filePath,
          fullPath:
            res.uploadedFileURL().cdnServer + res.uploadedFileURL().filePath,
          documentTypeId: id,
        });
        docTypeId.value = id;
        console.log("id-", docTypeId.value);
        if (id == 8) {
          docName.value = true;
        } else {
          NoticeDocName.value = true;
        }
        // emits('childEvent', { fileName: fileName.value, filePath: filePath.value,fullPath: fullPath.value});
        //toaster.success("file uploaded.");
        // uploadedFiles.value.push(uploadedFile);

        //console.log("uploadedFiles", uploadedFiles.value);
        toaster.success("File Uploaded !!!");
        // cropVisible.value=false
      } else {
        res.showErrorToast();
      }
    });
};

function fetchDocumentsValidationDetails() {
  // Automatically generated
  new MQL()
    .useCoreServer()
    .setActivity("o.[fetchDocumentsValidationDetails]")

    .fetch()
    .then((rs) => {
      let res = rs.getActivity("fetchDocumentsValidationDetails", true);
      docValidation.value = res.result.validation;
      docValidation.value.forEach((item) => {
        if (item.typeName == "AUCTION_DOCUMENT") {
          docName.value = item.typeName;
          docSize.value = item.fileSize;
          docType.value = item.fileType;
          AuctionDocTypeId.value = item.typeId;
          console.log("docName.value", docName.value);
          console.log("AuctionDocTypeId.value", AuctionDocTypeId.value);
        } else if (item.typeName == "NOTICE_DOCUMENT") {
          NoticeDocName.value = item.typeName;
          NoticeDocSize.value = item.fileSize;
          NoticeDocType.value = item.fileType;
          NoticeDocTypeId.value = item.typeId;
          console.log("docName.value", NoticeDocName.value);
          console.log("NoticeDocTypeId.value", NoticeDocTypeId.value);
        }
      });
      if (rs.isValid("fetchDocumentsValidationDetails")) {
      } else {
        rs.showErrorToast("fetchDocumentsValidationDetails");
      }
    });
}

function fetchAllStepsAuctionPreview() {
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchAllStepsAuctionPreview]")
    .setData({ auctionId: auctionId })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAllStepsAuctionPreview", true);
      //console.log("dbStartDate.value", dbStartDate.value, "dbEndDate.value", dbEndDate.value);
      if (
        res.result.fetchStep4AuctionPreview.length == 0 ||
        res.result.fetchStep4AuctionPreview[0].startDate == null ||
        res.result.fetchStep4AuctionPreview[0].endDate == null
      ) {
        selectedStartDate.value = formattedStartDate.value;
        selectedEndDate.value = formattedEndDate.value;
        console.log("formattedStartDate.value", formattedStartDate.value);
      } else {
        dbStartDate.value = res.result.fetchStep4AuctionPreview[0].startDate;
        dbEndDate.value = res.result.fetchStep4AuctionPreview[0].endDate;
        selectedStartDate.value = dbStartDate.value;
        selectedEndDate.value = dbEndDate.value;
      }
      if (rs.isValid("FetchAllStepsAuctionPreview")) {
      } else {
        rs.showErrorToast("FetchAllStepsAuctionPreview");
      }
    });
}

async function processingFeeEmdPaymentStartEndDate() {
  let statusId;
  const resultStatus = await fetchAuctionStatus("AUCTION_COMPLETED");
  if (resultStatus.error == null) {
    statusId = resultStatus.result.statusId;
  } else {
    toaster.error("Oops! Please Contact Support");
  }

  return new Promise((resolve) => {
    new MQL()
      .useManagementServer()
      .setActivity("o.[step4UpdateDatesAndUploadDocuments]")
      .setData({
        registrationStartDate: moment(selectedStartDate.value).format(
          "YYYY/MM/DD HH:mm:ss"
        ),
        registrationEndDate: moment(selectedEndDate.value).format(
          "YYYY/MM/DD HH:mm:ss"
        ),
        auctionId: auctionId,
        statusId: statusId,
      })
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("step4UpdateDatesAndUploadDocuments", true);
        if (rs.isValid("step4UpdateDatesAndUploadDocuments")) {
          console.log("res.result", res.result);
          resolve();
        } else {
          rs.showErrorToast("step4UpdateDatesAndUploadDocuments");
        }
      });
  });
  // Automatically generated
}

async function insertDocumentPathToDb() {
  // Validate the form
  return new Promise((resolve, reject) => {
    new MQL()
      .useManagementServer()
      .setActivity("o.[InsertDocumentPathStep4]")
      .setData({
        auctionId: auctionId,
        documentsArray: documentsArray.value,
      })
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("InsertDocumentPathStep4", true);
        if (rs.isValid("InsertDocumentPathStep4")) {
          resolve();
        } else {
          rs.showErrorToast("InsertDocumentPathStep4");
        }
      })
      .catch((error) => {
        // Handle API call errors
        reject(error);
      });
  });
}

async function insertInWorkflow() {
  var AUCTION_COMPLETED_ID;

  const resultStatus = await fetchAuctionStatus("AUCTION_COMPLETED");
  if (resultStatus.error == null) {
    AUCTION_COMPLETED_ID = resultStatus.result.statusId;
  } else {
    toaster.error("Oops! Please contact Support");
  }
  return new Promise((resolve, reject) => {
    console.log(AUCTION_COMPLETED_ID);

    var data = {
      assignedLoginId: null,
      assignedRoleId: loginStore.role.roleId,
      auctionId: auctionId,
      comment: "Auction Completed",
      entityId: loginStore.entityId,
      loginId: loginStore.loginId,
      organisationId: loginStore.organizationId,
      roleId: loginStore.role.roleId,
      statusId: AUCTION_COMPLETED_ID,
    };
    // Automatically generated
    new MQL()
      .setActivity("o.[InsertWorkflowStepDetails]")
      .useManagementServer()
      .setData(data)
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("InsertWorkflowStepDetails", true);
        if (rs.isValid("InsertWorkflowStepDetails")) {
          resolve();
        } else {
          rs.showErrorToast("InsertWorkflowStepDetails");
          reject(res.error);
        }
      });
  });
}

async function onSave() {
  let result = await $v.value.$validate();
  console.log("here", result);
  if (!result) {
    return;
  }
  console.log("Inside checkDates");
  if (
    moment(selectedEndDate.value).isSameOrBefore(
      selectedStartDate.value,
      "minute"
    )
  ) {
    alert(`Start Date should not be equal or after End Date !`);
  } else {
    await processingFeeEmdPaymentStartEndDate();
    await insertDocumentPathToDb();
    toaster.success(" Data Saved !!!");
    if (config == null) {
      await insertInWorkflow();
    }
  }
  AuctionStore.$reset();
  if (config != null) {
    nextCallback();
  } else {
    router.push({ name: loginStore.role.roleCode });
  }
}

function getServerDate() {
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[getServerDate]")
    .setData({})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("getServerDate", true);
      serverDate.value = res.result.serverDate.currentDate;
      console.log("serverDate-", serverDate.value);
      if (rs.isValid("getServerDate")) {
      } else {
        rs.showErrorToast("getServerDate");
      }
    });
}
function DownloadDocument(url) {
  if (url !== "") {
    new MQLCdn()
      .setCDNPath(url)
      .enablePageLoader(true)
      .downloadFile("downloadBtn")
      .then((res) => {
        if (!res.isValid()) {
          res.showErrorToast();
        }
      });
  } else {
    toaster.error("File can'nt be downloaded!");
  }
}

onMounted(() => {
  fetchDocumentsValidationDetails();
  formattedEndDateCalc();
  formattedStartDateCalc();
  getServerDate();
});
onBeforeMount(() => {
  fetchAllStepsAuctionPreview();
});
</script>

<style scoped>
.main-date {
  font-size: large;
  font: 700;
}

.custom-calendar .p-calendar {
  width: 250px;
  /* Adjust width as needed */
}

.custom-calendar .p-inputtext {
  font-size: 16px;
  /* Adjust font size as needed */
  color: #333;
  /* Adjust text color as needed */
  padding: 0.5rem;
  /* Adjust padding as needed */
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>
