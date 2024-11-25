<template>
  <div>
    <div class="page-header">
      <div class="ph-text">
        <h2 class="title">Terms And Conditions Report</h2>
      </div>
    </div>
    <div class="box-grid">
      <div class="card col-span-12">
        <div class="form-grid">
          <div class="col-span-full">
            <div class="fm-group required">
              <label class="fm-label" for="cardname">Upload Terms And Conditions file</label>
            </div>

            <div class="fm-upload-holder" :class="{ 'fm-upload-uploaded': !TnCButtonToggle }">
              <!-- File Input for Upload -->


              <!-- Upload Button -->
              <FileUpload v-model="uploadedFiles" :auto="true" mode="basic" name="uploadedFiles" :custom-upload="true"
                @uploader="TnCUpload" :maxFileSize="TnCFileSize" :accept="TnCdocumentFileType"
                :choose-label="TnCUploadButtonLabel" :disabled="!TnCButtonToggle" />
              <div class="fm-upload-actions" v-if="!TnCButtonToggle">
               Click here to view the uploaded file
                <button type="button" v-tooltip.top="'View File'" class="btn btn-view-file fill-secondary-600"
                  @click=viewImage(TnCFilePath)><pi-arrow-right></pi-arrow-right><fa-eye></fa-eye></button>
                  <br>
                  Click here to delete the uploaded file
                <button type="button" v-tooltip.top="'Delete File'" class="btn btn-delete-file fill-rose-600"
                  @click="deleteTnC()"><pi-arrow-right></pi-arrow-right><fa-trash-can></fa-trash-can></button> 
                  
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { login } from "@/store/modules/login.js";
import MQLCdn from "@/plugins/mqlCdn.js";
import faEye from '../../../assets/icons/eye.svg';
import piArrowRight from '../../../assets/icons/arrow-right.svg'
import faTrashCan from '../../../assets/icons/trash-can.svg';
import FileUpload from 'primevue/fileupload';
import { onBeforeMount, ref } from 'vue';
import { createToaster } from "@meforma/vue-toaster";
import MQL from "@/plugins/mql.js";
const toaster = createToaster({ position: "top-right", duration: 3000 });
let uploadedFiles = ref([]);
let TnCFilePath = ref("");
let TnCPath = ref("");
let TnCUploadButtonLabel = ref("Select File");
let TnCFileName = ref("");
let TnCFileSize = ref();
let TnCButtonToggle = ref(true);
let documentDetails = ref();
let multiplicativeFactor = ref();
let TnCdocumentFileType = ref();
let createdBy = ref();
let modifiedBy = ref();
let updatedBy = ref();
let entityId = ref();
const loginStore = login();
const documentTypeId = ref(0);
let bVersion = ref(0);
const Vue = window.app

function fetchDocumentDetails() {
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchDocumentDetails]")
    .setData({ roleCode: "ROLE_APPROVER" })
    .fetch()
    .then(rs => {
      let res = rs.getActivity("FetchDocumentDetails", true)
      if (rs.isValid("FetchDocumentDetails")) {
        documentDetails.value = res.result;
        console.log("documentDetails.value is", documentDetails.value);
        TnCFileSize.value = res.result.documentFileSize * 1 * multiplicativeFactor.value;
        TnCdocumentFileType.value = res.result.documentFileType;
        documentTypeId.value = res.result.documentTypeId;
        console.log("TnCFileSize is", TnCFileSize.value);
      } else {
        rs.showErrorToast("FetchDocumentDetails")
      }
    })

};
function fetchMultiplicativeFactor() {
  // Automatically generated
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchCustomValueByKey]")
    .setData({ key: "MULTIPLYING_FACTOR" })
    // .setHeaders({})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchCustomValueByKey", true);
      if (rs.isValid("FetchCustomValueByKey")) {
        multiplicativeFactor.value = res.result.vsCustomParamValue;
        console.log("multiplicativeFactor is ", multiplicativeFactor.value);
      } else {
        rs.showErrorToast("FetchCustomValueByKey");
      }
    });
};

function TnCUpload(event) {
  let formData = new FormData();
  let timeStamp = Date.now();

  formData.append("file", event.files[0]); // append your file as 'file' in formdata.
  new MQLCdn()
    .enablePageLoader(true)
    // FIXED: change this to directory path
    .setDirectoryPath("/TermsNConditions") // (optional field) if you want to save  file to specific directory path
    .setFormData(formData) // (required) sets file data
    .setFileName(timeStamp + "_" + event.files[0].name) // (optional field) if you want to set name to file that is being uploaded
    // FIXED: pass buckeyKey instead of name
    .setBucketKey("2on4J5OMa9tBUFCrkPOxo7vciVx") // (required) valid bucket key need to set in which file will be uploaded.
    .setPurposeId("2on4GNT39IxEV85HKdAu2osTcLv") // (required) valid purposeId need to set in which file will be uploaded.
    .setClientId("2ZncVDPZRGYZwwteYYbB3aw4fr7") // (required) valid purposeId need to set in which file will be uploaded.

    .uploadFile("uploadtBtn")
    .then((res) => {
      // (required) this will upload file takes element id (optional param) which will be blocked while file upload..
      if (res.isValid()) {
        TnCButtonToggle.value = false
        TnCUploadButtonLabel.value = event.files[0].name;
        TnCFileName.value = timeStamp + "_" + event.files[0].name;
        TnCFilePath.value = res.uploadedFileURL().filePath;
        TnCPath.value = res.uploadedFileURL().cdnServer + "/" + TnCFilePath.value;
        InsertDocumentsWithEntityId();
        toaster.success("File Uploaded");
      } else {
        res.showErrorToast();
      }
    });
}
const deleteFile = (fileName) => {
  console.log("fileName is", fileName)
  return new Promise((resolve) => {
    new MQLCdn()

      .setBucketKey("2on4J5OMa9tBUFCrkPOxo7vciVx")
      .setPurposeId("2on4GNT39IxEV85HKdAu2osTcLv")
      .setClientId("2ZncVDPZRGYZwwteYYbB3aw4fr7")
      .setDirectoryPath("/TermsNConditions")
      .setFileName(fileName)
      .enablePageLoader(true)
      .deleteFile()
      .then((res) => {
        //console.log(res);
        if (res.isValid()) {
          // toaster.add({ severity: 'success', detail: "file deleted.", life: 3000 });
          toaster.error("File Deleted");
          // disableCancel.value=true
          resolve()
        } else {
          res.showErrorToast();
        }
      });
  })
};

function InsertDocumentsWithEntityId() {
  new MQL()
    .useManagementServer()
    .setActivity("r.[InsertDocumentsWithEntityId]")
    .setData({ "createdBy": loginStore.loginId, "documentFileName": TnCFileName.value, "documentFilePath": TnCFilePath.value, "documentTypeId": documentTypeId.value, "entityId": loginStore.entityId, "bVersion": bVersion.value })
    .fetch()
    .then(rs => {
      let res = rs.getActivity("InsertDocumentsWithEntityId", true)
      if (rs.isValid("InsertDocumentsWithEntityId")) {
      } else {
        rs.showErrorToast("InsertDocumentsWithEntityId")
      }
    })
};
let imagePath = ref()
function viewImage(path) {
  imagePath.value = path;

  if (!path.startsWith('http')) {
    console.log("Inside " + path)
    imagePath.value = Vue.getCDNBaseURL() + '/' + imagePath.value
  }

  console.log("path is " + imagePath.value)
  fetchImage(imagePath.value)
}
function fetchImage(url) {

  const myHeaders = new Headers();

  myHeaders.append("Authorization", 'Bearer ' + sessionStorage.getItem('user-token'));
  myHeaders.append("Accept", "application/json, text/plain, */*");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(url, requestOptions)
    .then((response) =>
      response.blob())
    .then((blob) => {
      // Create a URL for the image
      const imageUrl = URL.createObjectURL(blob);

      imagePath.value = imageUrl;
      console.log("imagePath.value is", imagePath.value)
      window.open(imageUrl);
    })
    .catch((error) => console.error(error));

}
const deleteTnC = async () => {
  await deleteFile(TnCFileName.value);
  TnCFileName.value = null;
  TnCUploadButtonLabel.value = null;
  TnCButtonToggle.value = true;
  uploadedFiles.value = "";
  TnCFilePath.value = null;
  TnCPath.value = null;
  bVersion.value += 1;
}
onBeforeMount(() => {
  fetchMultiplicativeFactor();
  fetchDocumentDetails();
})
</script>