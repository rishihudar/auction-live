<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Terms And Conditions Report</h2>
            </div>
        </div>  
        <div class="box-grid">
            <div class="card col-span-6">
                <div class="form-grid">
                    <div class="col-span-full">
                        <div class="fm-group required">
                            <label class="fm-label" for="cardname">Upload Terms And Conditions file</label>
                        </div>
            
                        <div class="fm-action">
                            <!-- File Input for Upload -->
                           
                        
                            <!-- Upload Button -->
                            <FileUpload v-model="uploadedFiles" :auto="true" mode="basic" name="uploadedFiles" :custom-upload="true" @uploader="TnCUpload" />
                            <div class="submit">
                                <!-- <div class="fm-action" v-if="!uploadbuttonToggle">
                                    <Button label="Upload" @click="uploadHandler" /> -->
                            
                                    <button type="button" v-tooltip.top="'View File'" class="btn btn-view-file fill-secondary-600" @click=viewImage(path)><fa-eye></fa-eye></button>
                                    <button type="button" v-tooltip.top="'Delete File'" class="btn btn-delete-file fill-rose-600" @click="deleteTnC()"><fa-trash-can></fa-trash-can></button>
                                </div>
                            
                        </div>
                       
                    </div>
                 
                </div>
            </div>
            <div class="card col-span-6">
                <div class="col-span-full">
                    <div class="fm-group required">
                        <label class="fm-label" for="cardname">View Uploaded Terms And Conditions file</label>
                    </div>
        
                    <div class="fm-action">
                        <Button label="View"/>
                    </div>
                        
                    
                </div>
            </div>
        </div>   
    </div>
</template>
<script setup>
import Button from "primevue/button";
import MQLCdn from "@/plugins/mqlCdn.js";
import faEye from '../../../assets/icons/eye.svg';
import faTrashCan from '../../../assets/icons/trash-can.svg';
import FileUpload from 'primevue/fileupload';
import { ref } from 'vue';
function uploadHandler() {
    console.log("uploadHandler");
    if (uploadedFiles.value.length > 0) {
        cdnAadharUpload({ files: uploadedFiles.value });
    } else {
        console.error("No file selected for upload.");
    }
}
let uploadedFiles = ref([]);
// let aadharFileName = ref("");
let aadharFilePath = ref("");
let aadharPath = ref("");
let aadharButtonLabel = ref("Select File");

function TnCUpload(event) {
  let formData = new FormData();
  let timeStamp = Date.now();
  ////console.log(event.files[0]);

  formData.append("file", event.files[0]); // append your file as 'file' in formdata.
  new MQLCdn()
    .enablePageLoader(true)
    // FIXED: change this to directory path
    .setDirectoryPath("/TermsNConditions") // (optional field) if you want to save  file to specific directory path
    .setFormData(formData) // (required) sets file data
    .setFileName(timeStamp + "_" + event.files[0].name) // (optional field) if you want to set name to file that is being uploaded
    // FIXED: pass buckeyKey instead of name
    .setBucketKey("2omyB9HP5KBT3ELyjwqgsfPGrdo") // (required) valid bucket key need to set in which file will be uploaded.
    .setPurposeId("2okPzNEyKU3LiXrD45aKA3nLf7b") // (required) valid purposeId need to set in which file will be uploaded.
    .setClientId("2ZncVDPZRGYZwwteYYbB3aw4fr7") // (required) valid purposeId need to set in which file will be uploaded.

    .uploadFile("uploadtBtn")
    .then((res) => {
      // (required) this will upload file takes element id (optional param) which will be blocked while file upload..
      if (res.isValid()) {
        console.log(res.result);
        toaster.success("file uploaded.");
      } else {
        res.showErrorToast();
      }
    });
}
</script> 