<template>
  <div class="wizard-content">
    <div class="wc-item">
      <div class="wc-header">
        <div class="wc-title">Auction Code: {{ auctionCodeToShow }}</div>
      </div>
      <div class="form-grid">
        <div class="col-span-full md:col-span-6">
          <div class="fm-group">
            <label class="fm-label" for="calendar-12h">
              Processing Fee And EMD payment Start Date
            </label>
            <div class="fm-inner">
              <Calendar :disabled="config?.selectedStartDateReadonly" id="calendar-24h" v-model="selectedStartDate"
                showTime dateFormat="yy/mm/dd" hourFormat="24" :minDate="minPaymentPeriodDate" :showIcon="true" />
            </div>
            <!-- <div
              v-if="
                moment(selectedEndDate).isSameOrBefore(
                  selectedStartDate,
                  'minute'
                )
              "
              class="col-span-full fm-error"
            >
              Start Date should not be equal or after End Date !
            </div> -->
            <span v-if="$v.selectedStartDate.$error" class="text-red-500">
              Difference between Start Date and End Date should be greater than {{ minPaymentPeriod }}
            </span>
          </div>
        </div>
        <div class="col-span-full md:col-span-6">
          <div class="fm-group">
            <Toast />
            <label class="fm-label" for="calendar-12h">
              Processing Fee And EMD payment End Date
            </label>
            <div class="fm-inner">
              <Calendar :disabled="config?.selectedEndDateReadonly" id="calendar" v-model="selectedEndDate" showTime
                dateFormat="yy/mm/dd" hourFormat="24" :minDate="minPaymentPeriodDate" :showIcon="true" />
            </div>
          </div>
        </div>
        <div class="col-span-full 2xl:col-span-6">
          <div class="fm-group required">
            <label class="fm-label"> Auction Document  </label>
            <div class="fm-inner">
              <div class="col-span-full" v-if="!auctionCheck">
                <FileUpload :disabled="config?.docNameReadonly" v-model="docName" :accept="docType" :multiple="false"
                  :fileLimit="1" :max-file-size="docSize * multiplyingFactor" :custom-upload="true"
                  @uploader="onAdvancedUpload($event, AuctionDocTypeId)">
                  <Toast />
                  <template #empty>
                    <p>
                      Drag and drop files here to upload, Max. file size is {{ docSize }}
                      KB, Only {{ docType }} are allowed !
                    </p>
                  </template>
                </FileUpload>
              </div>

              <div v-if="$v.AucUrl.$error" class="fm-error">{{
                $v.AucUrl.$errors[0].$message
              }}</div>

              <div class="fm-buttons" v-if="auctionCheck">
                <Button @click="DownloadDocument(AucUrl)">
                  <fa-download></fa-download> Download Auction Document
                </Button>
                <Button v-if="auctionCheck" severity="danger"
                  @click="(auctionCheck = false), (AucUrl = null), documentsArray.pop()">
                  <fa-trash-can></fa-trash-can> Remove Document
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-full 2xl:col-span-6">
          <div class="fm-group required">
            <label class="fm-label"> Notice Document  </label>
            <!-- multiplying Factor :- {{ multiplyingFactor }} -->
            <div class="fm-inner">
              <div class="col-span-full" v-if="!noticeCheck">
                <FileUpload :disabled="config?.NoticeDocNameReadonly" v-model="noticeCheck" :accept="NoticeDocType"
                  :multiple="false" :fileLimit="1" :max-file-size="NoticeDocSize * multiplyingFactor"
                  :custom-upload="true" @uploader="onAdvancedUpload($event, NoticeDocTypeId)">
                  <Toast />
                  <template #empty>
                    <p>
                      Drag and drop files here to upload, Max. file size is {{ NoticeDocSize }}
                      KB, Only {{ docType }} are allowed !
                    </p>
                  </template>
                </FileUpload>
              </div>

              <div v-if="$v.NoticeUrl.$error" class="fm-error">{{
                $v.NoticeUrl.$errors[0].$message
              }}</div>

              <div class="fm-buttons" v-if="noticeCheck">
                <Button @click="DownloadDocument(NoticeUrl)">
                  <fa-download></fa-download> Download Notice Document
                </Button>
                <Button v-if="noticeCheck" severity="danger"
                  @click="(noticeCheck = false), (NoticeUrl = null), documentsArray.pop()">
                  <fa-trash-can></fa-trash-can> Remove Document
                </Button>
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
    <Dialog :visible="auctionPrompt" modal header="Edit Profile" :style="{ width: '25rem' }">
      <p>Auction <strong>{{ auctionCodeToShow }}</strong> Prepared Successfully.</p>
      <p>Do you want to start Workflow?</p>
      <Button label="Cancel" severity="info" @click="cancelPrompt" />
      <Button label="Ok" @click="startWorkflow" />
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
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
// import { createToaster } from "@meforma/vue-toaster";
// const toaster = createToaster({ position: "top-right", duration: 5000 });
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, minValue } from "@vuelidate/validators";
import { useToast } from "primevue/usetoast";

import faDownload from '../../../../assets/icons/download.svg'
import faTrashCan from '../../../../assets/icons/trash-can.svg'

const toast = useToast();
const router = useRouter();
const loginStore = login();
const AuctionStore = useAuctionPreparation();

const { auctionId, config, multiplyingFactor } = defineProps({
  auctionId: {
    type: Number,
    default: null,
  },
  config: {
    type: Object,
    default: null,
  },
  multiplyingFactor: {
    type: Number,
    default: null
  }
});

const minPaymentPeriod = ref()
let minPaymentPeriodDate = ref()
const auctionCodeToShow = ref();
const serverDate = ref();
//const startDate = ref(new Date());
//const endDate = ref(new Date());
const selectedStartDate = ref();
const selectedEndDate = ref();
const Vue = window.app;
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
const noticeCheck = ref(false);
const auctionCheck = ref(false);
const auctionPrompt = ref(false)
const rules = computed(() => ({
  AucUrl: { required: helpers.withMessage("Document is required", required) },
  NoticeUrl: {
    required: helpers.withMessage("Document is required", required),
  },
  selectedStartDate: {
    required,
    validator: checkDates
  },
}));
const $v = useVuelidate(rules, { AucUrl, NoticeUrl, selectedStartDate });
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
  return new Promise((resolve, reject) => {
    formattedStartDate.value = moment(serverDate.value)
      .add(60, "seconds")
      .format("YYYY/MM/DD HH:mm:ss");
    console.log("formattedStartDate.value", formattedStartDate.value);
    resolve();
  })
}
function formattedEndDateCalc() {
  return new Promise((resolve, reject) => {
    formattedEndDate.value = moment(serverDate.value)
      .add(minPaymentPeriod.value, "days")
      .add(60, "seconds")
      .format("YYYY/MM/DD HH:mm:ss");
    console.log("formattedEndDate.value", formattedEndDate.value);
    resolve();
  })
}
function checkDates() {
  let startDate = moment(selectedStartDate.value);
  let endDate = moment(selectedEndDate.value);
  let daysDifference = endDate.diff(startDate, 'days');
  // console.log("daysDifference is ",daysDifference,daysDifference,minPaymentPeriod.value)
  if (daysDifference < minPaymentPeriod.value) {
    // console.log("Inside rules vali date check");
    return false; // Dates are not valid
  }
  return true; // Dates are valid
};
const onAdvancedUpload = async (event, id) => {
  // try {
  //console.log(event, "event");
  let timeStamp = Date.now();
  //console.log(timeStamp, "timeStamp");
  //console.log("event", event.files[0]);
  myFile.value = event.files[0].name;
  //console.log("myFile", myFile.value);
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
        fullPath.value = Vue.getCDNBaseURL();
        //console.log("fileName", fileName.value);
        //console.log("filePath", filePath.value);
        //console.log("fullPath", fullPath.value);
        if (id == 8) {
          AucUrl.value = filePath.value;
          //console.log("AucUrl", AucUrl.value);
          auctionCheck.value = true;
        } else {
          NoticeUrl.value = filePath.value;
          //console.log("NoticeUrl", NoticeUrl.value);
          noticeCheck.value = true;
        }

        documentsArray.value.push({
          fileName: timeStamp + "_" + myFile.value,
          filePath: res.uploadedFileURL().filePath,
          fullPath:
            res.uploadedFileURL().cdnServer +
            "/" +
            res.uploadedFileURL().filePath,
          documentTypeId: id,
        });
        //console.log("documentsArray@@",documentsArray.value)
        docTypeId.value = id;
        //console.log("id-", docTypeId.value);
        if (id == 8) {
          docName.value = true;
        } else {
          NoticeDocName.value = true;
        }
        // emits('childEvent', { fileName: fileName.value, filePath: filePath.value,fullPath: fullPath.value});
        //toaster.success("file uploaded.");
        // uploadedFiles.value.push(uploadedFile);

        ////console.log("uploadedFiles", uploadedFiles.value);
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "File Uploaded",
          life: 3000,
        });
        //toaster.success("File Uploaded !!!");
        // cropVisible.value=false
      } else {
        res.showErrorToast();
      }
    });
};

function fetchDocumentsValidationDetails() {

  return new Promise((resolve, reject) => {
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
            //console.log("docName.value", docName.value);
            //console.log("AuctionDocTypeId.value", AuctionDocTypeId.value);
          } else if (item.typeName == "NOTICE_DOCUMENT") {
            NoticeDocName.value = item.typeName;
            NoticeDocSize.value = item.fileSize;
            NoticeDocType.value = item.fileType;
            NoticeDocTypeId.value = item.typeId;
            //console.log("docName.value", NoticeDocName.value);
            //console.log("NoticeDocTypeId.value", NoticeDocTypeId.value);
          }
        });
        if (rs.isValid("fetchDocumentsValidationDetails")) {
        } else {
          rs.showErrorToast("fetchDocumentsValidationDetails");
        }
        resolve()
      });
  })
}

function fetchAllStepsAuctionPreview() {
  // Automatically generated
  return new Promise((resolve, reject) => {
    new MQL()
      .useManagementServer()
      .setActivity("o.[FetchAllStepsAuctionPreview]")
      .setData({ auctionId: auctionId })
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("FetchAllStepsAuctionPreview", true);
        ////console.log("dbStartDate.value", dbStartDate.value, "dbEndDate.value", dbEndDate.value);
        if (
          res.result.fetchStep4AuctionPreview.length == 0 ||
          res.result.fetchStep4AuctionPreview[0].startDate == null ||
          res.result.fetchStep4AuctionPreview[0].endDate == null
        ) {
          selectedStartDate.value = formattedStartDate.value;
          selectedEndDate.value = formattedEndDate.value;
          //console.log("formattedStartDate.value", formattedStartDate.value);
        } else {
          dbStartDate.value = res.result.fetchStep4AuctionPreview[0].startDate;
          dbEndDate.value = res.result.fetchStep4AuctionPreview[0].endDate;
          selectedStartDate.value = dbStartDate.value;
          selectedEndDate.value = dbEndDate.value;
        }
        auctionCodeToShow.value = res.result.fetchStep1AuctionPreview.auctionCode;
        if (rs.isValid("FetchAllStepsAuctionPreview")) {
          resolve();
        } else {
          rs.showErrorToast("FetchAllStepsAuctionPreview");
        }
      });
  })
}

async function processingFeeEmdPaymentStartEndDate() {
  let statusId;
  const resultStatus = await fetchAuctionStatus("AUCTION_COMPLETED");
  if (resultStatus.error == null) {
    statusId = resultStatus.result.statusId;
  } else {
    toast.add({
      severity: "error",
      summary: "Drafted",
      detail: "Oops! Please Contact Support",
      life: 3000,
    });
    //toaster.error("Oops! Please Contact Support");
  }

  return new Promise((resolve) => {

    new MQL()
      .useManagementServer()
      .setActivity("o.[step4UpdateDatesAndUploadDocuments]")
      .setData({
        registrationStartDate: moment(selectedStartDate.value).format("YYYY-MM-DD HH:mm:ss"),
        registrationEndDate: moment(selectedEndDate.value).format("YYYY-MM-DD HH:mm:ss"),
        registrationStartDate1: moment(selectedStartDate.value).format("YYYY-MM-DD HH:mm:ss"),
        registrationEndDate1: moment(selectedEndDate.value).format("YYYY-MM-DD HH:mm:ss"),
        auctionId: auctionId,
        statusId: statusId,
        moduleName: "AP-STEP4"
      })
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("step4UpdateDatesAndUploadDocuments", true);
        if (rs.isValid("step4UpdateDatesAndUploadDocuments")) {
          //console.log("res.result", res.result);
          resolve();
        } else {
          rs.showErrorToast("step4UpdateDatesAndUploadDocuments");
        }
      });
  });
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
    toast.add({
      severity: "error",
      summary: "Drafted",
      detail: "Oops! Please Contact Support",
      life: 3000,
    });
    //toaster.error("Oops! Please contact Support");
  }
  return new Promise((resolve, reject) => {
    //console.log(AUCTION_COMPLETED_ID);

    var data = {
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
  //console.log("here", result);
  if (!result) {
    return;
  }

  if (
    moment(selectedEndDate.value).isSameOrBefore(
      selectedStartDate.value,
      "minute"
    )
  ) {
    //console.log("Inside checkDates");
    //console.log("inside onsave --------------------------->");
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Start Date should not be equal or after End Date !",
      life: 5000,
    });
    //alert(`Start Date should not be equal or after End Date !`);
  } else {
    await processingFeeEmdPaymentStartEndDate();
    await insertDocumentPathToDb();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Data Saved!",
      life: 3000,
    });
    // toaster.success(" Data Saved !!!");
    if (config == null) {
      await insertInWorkflow();
      auctionPrompt.value = true
    } else {
      nextCallback()
    }
  }
}


function cancelPrompt() {
  AuctionStore.$reset();
  if (config != null) {
    nextCallback();
  } else {
    router.push({ name: "AuctionList" });
  }
}


function startWorkflow() {
  AuctionStore.$reset();
  if (config != null) {
    nextCallback();
  } else {
    router.push({ name: "MyTask" });
  }
}

function getServerDate() {
  return new Promise((resolve, reject) => {
    new MQL()
      .useManagementServer()
      .setActivity("o.[getServerDate]")
      .setData({})
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("getServerDate", true);
        serverDate.value = res.result.serverDate.currentDate;
        //console.log("serverDate-", serverDate.value);
        if (rs.isValid("getServerDate")) {
        } else {
          rs.showErrorToast("getServerDate");
        }
        resolve()
      });
  })
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
    toast.add({
      severity: "error",
      summary: "Drafted",
      detail: "Oops!File can'nt be downloaded!",
      life: 3000,
    });
    //toaster.error("File can'nt be downloaded!");
  }
}


function fetchPaymentPeriod() {
  return new Promise((resolve, reject) => {
    new MQL()
      .useCoreServer()
      .setActivity("o.[FetchEntityDetailsById]")
      .setData({ "entityId": loginStore.entityId })
      .fetch()
      .then(rs => {
        let res = rs.getActivity("FetchEntityDetailsById", true)
        if (rs.isValid("FetchEntityDetailsById")) {
          minPaymentPeriod.value = res.result.columnValue
          console.log("minPaymentPeriod is ", minPaymentPeriod.value)

          minPaymentPeriodDate.value = moment(serverDate.value).toDate()

          console.log("minPaymentPeriodDate is ", minPaymentPeriodDate.value)


        } else {
          rs.showErrorToast("FetchEntityDetailsById")
        }
        resolve()
      })
  })


}

// watch(bidderTypeId, (newValue) => {
//   if (newValue === "1") {
//     rules.value = rulesIndividual;
//   } }
// )

onBeforeMount(async () => {

  await fetchDocumentsValidationDetails()
  await getServerDate();

  await fetchPaymentPeriod();
  await formattedEndDateCalc();
  await formattedStartDateCalc();
  await fetchAllStepsAuctionPreview();

  // fetchDocumentsValidationDetails();
  // formattedEndDateCalc();
  // formattedStartDateCalc();
  // getServerDate();
  // fetchPaymentPeriod();
});

// onMounted(() => {
//   fetchAllStepsAuctionPreview();
// });
</script>

<!-- <style scoped>
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
</style> -->
