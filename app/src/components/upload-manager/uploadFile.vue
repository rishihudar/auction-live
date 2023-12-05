<template>
  <div id="uploadFile" class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">Upload File</h2>
    <div class="row">
      <div class="col-6">
        <div class="box-login">
          <FormKit
            type="form"
            id="registration-example"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Upload"
            @submit="uploadFile"
            :actions="false"
          >
            <FormKit
              type="text"
              name="sessionName"
              label="CDN Base Url"
              v-model="upload.cdnBaseUrl"
              placeholder="CDN Base Url"
              help="Enter CDN Base Url"
              validation="required"
            />
            <FormKit
              type="text"
              name="sessionName"
              label="File Upload Url"
              v-model="upload.uploadFileUrl"
              placeholder="File Upload Url"
              help="Enter File Upload Url"
              validation="required"
            />
            <FormKit
              type="text"
              name="sessionName"
              label="Destination File Url"
              v-model="upload.destinationFileUrl"
              placeholder="Destination File Url"
              help="Enter Destination File Url"
              validation="required"
            />
            <FormKit type="submit" label="Upload File" />
          </FormKit>
          <div class="field mt-4">
            <h3>Result</h3>
            <json-viewer
              :value="uploadResult"
              boxed
              :expanded="true"
            ></json-viewer>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="box-login">
          <h4>
            Please start the multipart server before uploading files testing
          </h4>
          <ul class="list">
            <li>
              cdnBaseUrl:
              <div>"https://cstest.mkcl.org/uploadFile/uploadsinglefile"</div>
            </li>
            <li>
              uploadFileUrl:
              <div>
                "/app/CoreSLS/ProjectConfigBackup/1JFfwe3g8vHuNOtxk2BsH09pBA5/05_06_2021/1JFfwe3g8vHuNOtxk2BsH09pBA5_1622894824.json"
              </div>
            </li>
            <li>destinationFileUrl: ""</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MQL from "@/plugins/mql.js";
import { reactive, ref } from "vue";
import jsonViewer from "vue-json-viewer";
import { createToaster } from "@meforma/vue-toaster";
const toast = createToaster({ position: "top-right", duration: 3000 });
let upload = reactive({});
let uploadResult = ref("");
let submitted = ref(false);
function uploadFile() {
  var a = {
    cdnBaseUrl: [upload.cdnBaseUrl],
    uploadFileUrl: [upload.uploadFileUrl],
    destinationFileUrl: [upload.destinationFileUrl],
  };
  new MQL()
    .setActivity("o.[UploadFileUsingUM]")
    .setData(a)
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("UploadFileUsingUM", true);
      if (rs.isValid("UploadFileUsingUM")) {
        upload.value = {};
        uploadResult.value = res.result;
        toast.success("File uploaded successfully");
      } else {
        rs.showErrorToast("UploadFileUsingUM");
      }
    });
}
</script>

<style scoped lang="scss">
h4 {
  margin-bottom: 1rem;
}
.list {
  padding: 0 1rem;
  li {
    font-weight: 600;
    div {
      font-weight: 400;
      word-break: break-word;
    }
    & + li {
      margin-top: 0.75rem;
    }
  }
}
</style>
