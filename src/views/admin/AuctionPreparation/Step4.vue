<template>
  <div class="main-date">
    <label for="calendar-12h" class="font-bold block mb-2">
      Processing Fee And EMD payment Start Date:</label
    >
    <Calendar
      id="calendar-24h"
      v-model="selectedStartDate"
      showTime
      hourFormat="24"
      :minDate="minDate"
      :showIcon="true"
    />
    <p>Start date: {{ selectedStartDate }}</p>
    <label for="calendar-12h" class="font-bold block mb-2">
      Processing Fee And EMD payment End Date:</label
    >
    <Calendar
      id="calendar"
      v-model="selectedEndDate"
      showTime
      hourFormat="24"
      :minDate="endMinDate"
      :showIcon="true"
    />
    <p>End date: {{ selectedEndDate }}</p>
  </div>
  <div v-if="moment(selectedEndDate).isSameOrBefore(selectedStartDate) || moment(selectedEndDate).isSame(moment(selectedStartDate),'minute')" style="color: red;">
             Start Date should not be equal or after End Date !
            </div>
  <div class="card">
    <p>Auction Document:</p>
    <FileUpload
      v-model="docName"
      :accept="docType"
      :multiple="false"
      :max-file-size="docSize * 1000"
      :custom-upload="true"
      @uploader="onAdvancedUpload($event,NoticeDocTypeId)"
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
      @uploader="onAdvancedUpload($event,AuctionDocTypeId)"
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
  <!-- <Button label="Back" @click="backToStep3" /> -->
  <Button label="Save" @click="onSave" />
  <Button label="Back" @click="prevCallback()" />
  <!-- <Button label="Save" @click="onSave" /> -->
  <!-- <Button label="Next" @click="auctionPreview" /> -->
  <!-- <Button label="Next" @click="nextCallback()" /> -->
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import moment from "moment";
import router from "../../../router";
import Calendar from "primevue/calendar";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import MQLCdn from "@/plugins/MQLCdn.js";
import MQL from "@/plugins/mql.js";
import { useAuctionPreparation } from "@/store/auctionPreparation.js";
import { storeToRefs } from "pinia";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 5000 });

const store = useAuctionPreparation();
const { getLastInsertedAuctionId } = storeToRefs(store);

const startDate = ref(new Date());
const endDate = ref(new Date());
const selectedStartDate =ref();
const selectedEndDate =ref();

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
const dbEndDate=ref();
const dbStartDate=ref();
const docTypeId = ref();
const NoticeDocTypeId = ref();
const AuctionDocTypeId = ref();

const documentsArray = ref([]);
const formattedStartDate = ref();
const formattedEndDate = ref();
const uploadedFiles=ref([]);
const fileName=ref();
const filePath=ref();
const fullPath=ref();

const emit = defineEmits({
    nextTab3: null,
    previousTab3: null
});
function prevCallback() {
    emit('previousTab3')
}

function nextCallback() {
    emit('nextTab3')
}

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

const onAdvancedUpload = async (event, id) => {
  // try {
    console.log(event, "event")
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
    .setDirectoryPath(
      getLastInsertedAuctionId.value + "/AuctionPreparation/Publishing"
    ) // (optional field) if you want to save  file to specific directory path
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

        documentsArray.value.push({
          fileName: timeStamp + "_" + myFile.value,
          filePath: res.uploadedFileURL().filePath,
          fullPath: res.uploadedFileURL().cdnServer,
          documentTypeId: id
        });
        docTypeId.value=id
        console.log("id-",docTypeId.value);
        // emits('childEvent', { fileName: fileName.value, filePath: filePath.value,fullPath: fullPath.value});
        toaster.success("file uploaded.");
       uploadedFiles.value.push(uploadedFile);

        console.log("uploadedFiles", uploadedFiles.value);
        toaster.success("File Uploaded !!!");
        // cropVisible.value=false
      } else {
        res.showErrorToast();
      }
    });
};


// function backToStep3() {
//   router.push({ path: "/Step3" });
// }
// function auctionPreview() {
//   router.push({ path: "/AuctionPreview" });
// }

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
          AuctionDocTypeId.value=item.typeId
          console.log("docName.value", docName.value);
          console.log("AuctionDocTypeId.value",AuctionDocTypeId.value);
        } else if (item.typeName == "NOTICE_DOCUMENT") {
          NoticeDocName.value = item.typeName;
          NoticeDocSize.value = item.fileSize;
          NoticeDocType.value = item.fileType;
          NoticeDocTypeId.value=item.typeId;
          console.log("docName.value", NoticeDocName.value);
          console.log("NoticeDocTypeId.value",NoticeDocTypeId.value);
        }
      });
      if (rs.isValid("fetchDocumentsValidationDetails")) {
      } else {
        rs.showErrorToast("fetchDocumentsValidationDetails");
      }
    });
}

function fetchAllStepsAuctionPreview(){
  
					// Automatically generated
          new MQL()
          .useManagementServer()
			.setActivity("o.[FetchAllStepsAuctionPreview]")
			.setData({auctionId:getLastInsertedAuctionId.value})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchAllStepsAuctionPreview",true)
      console.log("inside fetchAllStepsAuctionPreview");
      console.log("result",res.result.fetchStep4AuctionPreview);
      
      console.log("dbStartDate.value",dbStartDate.value,"dbEndDate.value",dbEndDate.value);
      if (res.result.fetchStep4AuctionPreview.length==0) {
      selectedStartDate.value = formattedStartDate.value;
      selectedEndDate.value = formattedEndDate.value;
      console.log(" formattedStartDate.value", formattedStartDate.value);
      
    } else {
    dbStartDate.value=res.result.fetchStep4AuctionPreview[0].startDate;
      dbEndDate.value=res.result.fetchStep4AuctionPreview[0].endDate;
      selectedStartDate.value = dbStartDate.value;
      selectedEndDate.value = dbEndDate.value;
      
    }
			if (rs.isValid("FetchAllStepsAuctionPreview")) {
			} else
			 { 
			rs.showErrorToast("FetchAllStepsAuctionPreview")
			}
			})
			
};

function fetchAllStepsAuctionPreview() {

// Automatically generated
new MQL()
  .useManagementServer()
  .setActivity("o.[FetchAllStepsAuctionPreview]")
  .setData({ "auctionId": auctionId })
  .fetch()
  .then(rs => {
    let res = rs.getActivity("FetchAllStepsAuctionPreview", true)
    dbStartDate.value = res.result.fetchStep4AuctionPreview[0].startDate;
    dbEndDate.value = res.result.fetchStep4AuctionPreview[0].endDate;
    console.log("dbStartDate.value", dbStartDate.value, "dbEndDate.value", dbEndDate.value);
    if (dbStartDate.value === null && dbEndDate.value === null) {
      selectedStartDate.value = formattedStartDate.value;
      selectedEndDate.value = formattedEndDate.value;
      console.log(" formattedStartDate.value", formattedStartDate.value);

    } else {
      selectedStartDate.value = dbStartDate.value;
      selectedEndDate.value = dbEndDate.value;

    }
    if (rs.isValid("FetchAllStepsAuctionPreview")) {
    } else {
      rs.showErrorToast("FetchAllStepsAuctionPreview")
    }
  })

};

function insertDocumentPathToDb(){
  
					// Automatically generated
          new MQL()
      .useManagementServer()
			.setActivity("o.[InsertDocumentPathStep4]")
			.setData({auctionId:getLastInsertedAuctionId.value,
              documentsArray:documentsArray.value,
              documentTypeId:docTypeId.value
      })
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("InsertDocumentPathStep4",true)
			if (rs.isValid("InsertDocumentPathStep4")) {
			} else
			 { 
			rs.showErrorToast("InsertDocumentPathStep4")
			}
			})
			
};

function onSave(){
  console.log("Inside checkDates");
  if(moment(selectedEndDate.value).isSameOrBefore(selectedStartDate.value) || moment(selectedEndDate.value).isSame(moment(selectedStartDate.value),'minute')){
    console.log("log-",moment(selectedEndDate.value).isSameOrBefore(selectedStartDate.value) || moment(selectedEndDate.value).isSame(moment(selectedStartDate.value),'minute'));
    alert(`Start Date should not be equal or after End Date !`);
  }else{  
  processingFeeEmdPaymentStartEndDate();
  insertDocumentPathToDb();
  toaster.success(" Data Saved !!!");
  }

};

onMounted(() => {
  fetchDocumentsValidationDetails();
  formattedEndDateCalc();
  formattedStartDateCalc();


});
onBeforeMount(()=>{
  fetchAllStepsAuctionPreview();
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
