<template>
  <div class="main-date">
    <label for="calendar-12h" class="font-bold block mb-2">
      Processing Fee And EMD payment Start Date:</label
    >
    <Calendar
      id="calendar-24h"
      v-model="formattedStartDate"
      showTime
      hourFormat="24"
      :minDate="minDate"
      :showIcon="true"
      @click="checkDates"
    />
    <p>Start date: {{ formattedStartDate }}</p>
    <label for="calendar-12h" class="font-bold block mb-2">
      Processing Fee And EMD payment End Date:</label
    >
    <Calendar
      id="calendar"
      v-model="formattedEndDate"
      showTime
      hourFormat="24"
      :minDate="endMinDate"
      :showIcon="true"
      @click="checkDates"
    />
    <p>End date: {{ formattedEndDate }}</p>
  </div>
  <div class="card">
    <p>Auction Document:</p>
    <FileUpload
      v-model="docName"
      :accept="docType"
      :multiple="false"
      :max-file-size="docSize * 1000"
      :custom-upload="true"
      @uploader="onAdvancedUpload"
    >
      <template #empty>
        <p>
          Drag and drop files here to upload, Max. file size is 500 KB, Only
          {{ docType }}
          are allowed !
        </p>
      </template>
    </FileUpload>
    <p>Notice Document:</p>
    <FileUpload
      v-model="NoticeDocName"
      :accept="NoticeDocType"
      :multiple="false"
      :max-file-size="NoticeDocSize * 1000"
      :custom-upload="true"
      @uploader="onAdvancedUpload"
    >
      <template #empty>
        <p>
          Drag and drop files here to upload, Max. file size is 500 KB, Only
          {{ docType }}
          are allowed !
        </p>
      </template>
    </FileUpload>
  </div>
  <Button label="Back" @click="backToStep3" />
  <Button label="Save" @click="onSave" />
  <Button label="Next" @click="auctionPreview" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import moment from "moment";
import router from "../../../router";
import Calendar from "primevue/calendar";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import MQLCdn from "@/plugins/MQLCdn.js";
import MQL from "@/plugins/mql.js";
import { useAuctionPreparation } from "@/store/auctionPreparation.js";
import { storeToRefs } from "pinia";

const store = useAuctionPreparation();
const { getLastInsertedAuctionId } = storeToRefs(store);

const startDate = ref(new Date());
const endDate = ref(new Date());

const minDate = ref();
minDate.value = moment().add(1, 'minutes').toDate();
const endMinDate = ref();
endMinDate.value = moment().add(2, 'minutes').toDate();


const myFile = ref();
const docValidation = ref([]);
const docName = ref();
const docType = ref();
const docSize = ref();
const NoticeDocName = ref();
const NoticeDocType = ref();
const NoticeDocSize = ref();

const docTypeId = ref();
//const NoticeDocTypeId = ref();
const documentsArray = ref([]);
const formattedStartDate = ref();
const formattedEndDate = ref();

function formattedStartDateCalc() {
  formattedStartDate.value = moment(startDate.value)
    .add(60, "seconds")
    .format("YYYY/MM/DD HH:mm:ss");
}
function formattedEndDateCalc() {
  formattedEndDate.value = moment(endDate.value)
    .add(120, "seconds")
    .format("YYYY/MM/DD HH:mm:ss");
}

const onAdvancedUpload = async (event) => {
  // try {
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
    //.isPrivateBucket(true) // (optional field) if you want to upload file to private bucket
    .setDirectoryPath(
      getLastInsertedAuctionId + "/AuctionPreparation/Publishing"
    ) // (optional field) if you want to save  file to specific directory path
    .setFormData(formData) // (required) sets file data
    .setFileName(timeStamp + "_" + myFile.value.name) // (optional field) if you want to set name to file that is being uploaded
    // FIXED: pass buckeyKey instead of name
    .setBucketKey("2ciy8jTCjhcc6Ohu2hGHyY16nHn") // (required) valid bucket key need to set in which file will be uploaded.
    .setPurposeId("2cixqU1nhJHru2m1S0uIxdKSgMb") // (required) valid purposeId need to set in which file will be uploaded.
    .setClientId("2ZncVDPZRGYZwwteYYbB3aw4fr7") // (required) valid purposeId need to set in which file will be uploaded.

    .uploadFile("uploadtBtn")
    .then((res) => {
      // (required) this will upload file takes element id (optional param) which will be blocked while file upload..
      if (res.isValid()) {
        fileName.value = timeStamp + "_" + myFile.value.name;
        filePath.value = res.uploadedFileURL().filePath;
        fullPath.value = res.uploadedFileURL().cdnServer;
        console.log("fileName", fileName.value);
        console.log("filePath", filePath.value);
        console.log("fullPath", fullPath.value);
        documentsArray.value.push({
          fileName: timeStamp + "_" + myFile.value.name,
          filePath: res.uploadedFileURL().filePath,
          fullPath: res.uploadedFileURL().cdnServer,
          documentTypeId:docTypeId.value
        });
        // emits('childEvent', { fileName: fileName.value, filePath: filePath.value,fullPath: fullPath.value});
        //toaster.success("file uploaded.");
        uploadedFiles.value.push(uploadedFile);

        console.log("uploadedFiles", uploadedFiles.value);
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "File Uploaded",
          life: 3000,
        });
        // cropVisible.value=false
      } else {
        res.showErrorToast();
      }
    });
};


function backToStep3() {
  router.push({ path: "/Step3" });
}
function auctionPreview() {
  router.push({ path: "/AuctionPreview" });
}

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
          docTypeId.value=item.typeId
          console.log("docName.value", docName.value);
          console.log("AuctionDocTypeId.value",docTypeId.value);
        } else if (item.typeName == "NOTICE_DOCUMENT") {
          NoticeDocName.value = item.typeName;
          NoticeDocSize.value = item.fileSize;
          NoticeDocType.value = item.fileType;
          docTypeId.value=item.typeId;
          console.log("docName.value", NoticeDocName.value);
          console.log("NoticeDocTypeId.value",docTypeId.value);
        }
      });
      if (rs.isValid("fetchDocumentsValidationDetails")) {
        console.log("myFile", myFile.values);
      } else {
        rs.showErrorToast("fetchDocumentsValidationDetails");
      }
    });
}
function processingFeeEmdPaymentStartEndDate() {
  //store.setLastInsertedAuctionId(31);
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[step4UpdateDatesAndUploadDocuments]")
    .setData({
      registrationStartDate: moment(formattedStartDate.value).format(
        "YYYY/MM/DD HH:mm:ss"
      ),
      registrationEndDate: moment(formattedEndDate.value).format(
        "YYYY/MM/DD HH:mm:ss"
      ),
      auctionId: getLastInsertedAuctionId.value,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("step4UpdateDatesAndUploadDocuments", true);
      if (rs.isValid("step4UpdateDatesAndUploadDocuments")) {
        console.log("res.result",res.result);
      } else {
        rs.showErrorToast("step4UpdateDatesAndUploadDocuments");
      }
    });
}
function checkDates(){
  console.log("Inside checkDates");
  if(formattedEndDate.value<=formattedStartDate.value){
    alert(`Start Date Can not be after End Date`);
  }
  // else{
  //   processingFeeEmdPaymentStartEndDate();
  // }
};
onMounted(() => {
  fetchDocumentsValidationDetails();
  formattedEndDateCalc();
  formattedStartDateCalc();
});



</script>

<style scoped>
.main-date {
  font-size: large;
  font: 700;
}

.custom-calendar .p-calendar {
  width: 250px; /* Adjust width as needed */
}

.custom-calendar .p-inputtext {
  font-size: 16px; /* Adjust font size as needed */
  color: #333; /* Adjust text color as needed */
  padding: 0.5rem; /* Adjust padding as needed */
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>
