<template>
  <div id="cdnUpload" class="container-fluid">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      MarketPlace Applications
    </h2>
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="box-login">
          <div class="p-card p-component">
            <h3>Upload File</h3>
            <div class="field mt-5">
              <FormKit
                type="form"
                id="cdn-upload-example"
                :form-class="submitted ? 'hide' : 'show'"
                submit-label="cdn Upload"
                @submit="cdnProfileUpload"
                :actions="false"
              >
                <FormKit
                  type="text"
                  name="inputFileName"
                  label="Input File Name"
                  v-model="inputFileName"
                  placeholder="File name"
                  help="Enter file name"
                  validation="required"
                />
                <FormKit
                  type="file"
                  label="Your files"
                  help="This input starts with files already “attached”."
                  multiple="true"
                  :value="file_2"
                  v-model="file"
                  validation="required"
                /><FormKit type="submit" label="Upload" />
              </FormKit>
            </div>
            <div v-if="uploadedFilePath">
              <h3>cdnServer</h3>
              <div class="field">
                <p>{{ uploadedFilePath.cdnServer }}</p>
              </div>
              <h3>File Path</h3>
              <p>{{ uploadedFilePath.filePath }}</p>
            </div>
            <h3>Download File</h3>
            <div class="field mt-5">
              <FormKit
                type="text"
                name="inputFileName"
                label="Uploaded File Name"
                v-model="fileURL"
                placeholder="File path"
                help="Enter File URI for Download"
              /><FormKit @click="downloadFile" type="submit" label="Download" />
            </div>
            <h3>Delete File</h3>
            <FormKit
              type="form"
              id="cdn-delete-example"
              :form-class="submitted ? 'hide' : 'show'"
              submit-label="Delete"
              @submit="cdnFileDelete"
              :actions="false"
            >
              <FormKit
                type="text"
                name="deleteFilePath"
                label="Delete File Path"
                v-model="deleteFilePath"
                placeholder="File path"
                help="Enter file path"
                validation="required"
              />
              <FormKit type="submit" label="Delete" />
            </FormKit>
            <div class="field" v-if="uploadedFilePath.filePath">
              <h3>Show Image</h3>
              <img
                :src="'https://testcdncs.mkcl.org/' + uploadedFilePath.filePath"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MQLCdn from "@/plugins/mqlCdn.js";
import { ref } from "vue";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 3000 });
let inputFileName = ref("");
let fileURL = ref("");
let file = ref("");
let uploadedFilePath = ref("");
let file_2 = ref("");
let submitted = ref(false);
let deleteFilePath = ref("");
function cdnProfileUpload() {
  let formData = new FormData();
  formData.append("file", file._rawValue[0].file); // append your file as 'file' in formdata.
  new MQLCdn()
    .enablePageLoader(true)
    // FIXED: change this to directory path
    .setDirectoryPath("/demoFolder") // (optional field) if you want to save  file to specific directory path
    .setFormData(formData) // (required) sets file data
    .setFileName(inputFileName.value) // (optional field) if you want to set name to file that is being uploaded
    // FIXED: pass buckeyKey instead of name
    .setBucketKey("22Jbn9juCuMfJ4fNA1Sp8AAVERE") // (required) valid bucket key need to set in which file will be uploaded.
    .setPurposeId("1TxY9TS4uzp8Ivyo0eKPpo1g2Og") // (required) valid purposeId need to set in which file will be uploaded.
    .setClientId("1TxY9TS4uzp8Ivyo0eKPpo1g2Og") // (required) valid purposeId need to set in which file will be uploaded.
    .uploadFile("uploadtBtn")
    .then((res) => {
      // (required) this will upload file takes element id (optional param) which will be blocked while file upload..
      if (res.isValid()) {
        uploadedFilePath.value = res.uploadedFileURL(); // returns uploaded file url..
        toaster.success("file uploaded.");
      } else {
        res.showErrorToast();
      }
    });
}
function downloadFile() {
  if (fileURL !== "") {
    new MQLCdn()
      .setCDNPath(fileURL.value) // (required) set a filepath whihch needs to be download.
      .setBucketKey("22Jbn9juCuMfJ4fNA1Sp8AAVERE")
      .setPurposeId("1TxY9TS4uzp8Ivyo0eKPpo1g2Og") // (required) valid purposeId need to set in which file will be uploaded.
      .setClientId("1TxY9TS4uzp8Ivyo0eKPpo1g2Og") // (required) if you are providing relative path
      .enablePageLoader(true)
      .downloadFile("downloadBtn")
      .then((res) => {
        // (required) this will take elemnt id (optional) which will be blocked while file being downloaded.
        if (!res.isValid()) {
          res.showErrorToast();
        }
      });
  }
}
function cdnFileDelete() {
  if (deleteFilePath.value !== "") {
    new MQLCdn()
      .setBucketKey("22Jbn9juCuMfJ4fNA1Sp8AAVERE") // (required) valid bucket key need to set in which file will be uploaded.
      .setPurposeId("1TxY9TS4uzp8Ivyo0eKPpo1g2Og") // (required) valid purposeId need to set in which file will be uploaded.
      .setClientId("1TxY9TS4uzp8Ivyo0eKPpo1g2Og") //
      // .setDirectoryPath("/demoFolder")
      .setFileName(deleteFilePath.value)
      .enablePageLoader(true)
      .deleteFile("deleteButton")
      .then((res) => {
        if (res.isValid()) {
          toaster.success("file deleted.");
        } else {
          res.showErrorToast();
        }
      });
  }
}
</script>
