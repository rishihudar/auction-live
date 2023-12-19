<template>
  <div id="progessFile" class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">Check Progress</h2>
    <div class="box-login mx-auto p-8 rounded-xl bg-white shadow">
        <FormKit
        type="form"
        id="registration-example"
        :form-class="submitted ? 'hide' : 'show'"
        submit-label="Upload"
        @submit="checkUploadProgress"
        :actions="false"
        >
        <FormKit
            type="text"
            name="sessionName"
            label="Upload Id"
            v-model="uploadId"
            placeholder="Upload Id"
            help="Enter Upload Id"
            validation="required"
        />
        <FormKit type="submit" label="Check Progress" />
        </FormKit>
        <div class="field mt-4">
        <h3>Result</h3>
        <json-viewer
            :value="progressResult"
            boxed
            :expanded="true"
        ></json-viewer>
        </div>
    </div>
  </div>
</template>

<script setup>
import MQL from "@/plugins/mql.js";
import { ref } from "vue";
import jsonViewer from "vue-json-viewer";
import { createToaster } from "@meforma/vue-toaster";
const toast = createToaster({ position: "top-right", duration: 3000 });
let uploadId = ref("");
let progressResult = ref({});
let submitted = ref(false);
function checkUploadProgress() {
  new MQL()
    .setActivity("o.[CheckUploadedFileProgress]")
    .setData({ uploadFileId: uploadId.value })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("CheckUploadedFileProgress", true);
      if (rs.isValid("CheckUploadedFileProgress")) {
        if (res && res.result) {
          progressResult.value = res.result;
          uploadId.value = "";
          toast.success("Progress Checked Successfully");
        } else {
          toast.error("Progress Check Failed");
        }
      } else {
        rs.showErrorToast("CheckUploadedFileProgress");
      }
    });
}
</script>

<style></style>
