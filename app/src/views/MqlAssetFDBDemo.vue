<template>
  <div id="assetFDB" class="container-fluid">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      MQL Request For Asset FDB
    </h2>
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="box-login">
          <div class="p-card p-component">
            <h3>Upload File</h3>
            <div class="field mt-5">
              <FormKit
                type="file"
                label="Your files"
                help="This input starts with files already attached."
                multiple="true"
                :value="file_2"
                v-model="file"
              />
              <FormKit type="submit" label="Upload File" @click="uploadFile" />
            </div>
            <div class="field mt-5">
              <h3 class="mb-5">Asset File</h3>
              <FormKit
                type="text"
                name="assetPath"
                label="assetPath"
                v-model="assetPath"
                placeholder="Enter Asset File Path"
                help="Asset File Path"
                validation="required"
              />
            </div>
            <div class="field mt-5">
              <h3 class="mb-5">Update File</h3>
              <FormKit
                type="text"
                name="recordId"
                label="recordId"
                v-model="recordId"
                placeholder="Enter recordId"
                help="Record Id"
                validation="required"
              />
            </div>
            <div class="field mt-5">
              <FormKit
                type="file"
                label="Your files"
                help="This input starts with files already attached."
                multiple="true"
                :value="file_2"
                v-model="file"
              />
            </div>
            <div class="field mt-5">
              <h3 class="mb-3">Updated Asset Path</h3>
              <p v-if="!updatedAssetPath">Asset path not updated</p>
              <p v-else>
                {{ updatedAssetPath }}
              </p>
            </div>
            <!-- <div class="btn-wrapper text-center"> -->
            <FormKit
              type="submit"
              @click.stop.prevent="downloadFile"
              label="Download Asset"
            />
            <FormKit
              type="submit"
              @click.stop.prevent="renderFile"
              label="Render Asset"
            />
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MQLAssetFDB from "@/plugins/mqlAssetFDB.js";
import { ref } from "vue";

let assetPath = ref("");
let files = ref("");
let content = ref("");
let recordId = ref("");
let updatedAssetPath = ref("");
let chooseIcon = ref("isax isax-bold-cloud-plus");
let uploadIcon = ref("isax isax-bold-add");
let cancelIcon = ref("isax isax-bold-close-circle");
let file_2 = ref("");
let file = ref("");
function uploadFile() {
  let formData = new FormData();
  formData.append("file", files.value);
  new MQLAssetFDB()
    .enablePageLoader(true)
    .setIndex("o.9929b6e44da568f390d20e51032b")
    .setHostName("TestMixedBucketFDB2")
    .setFormData(formData)
    .setAssetData({ TestAssetBucket: "bucket1" })
    .uploadAssetFile()
    .then((res) => {
      if (res.isValid()) {
        assetPath.value = res.getAssetPath();
      } else {
        res.showErrorToast();
      }
    });
}
function updateFile(recordId) {
  let formData = new FormData();
  formData.append("file", files.value);
  new MQLAssetFDB()
    .setIndex("o.9929b6e44da568f390d20e51032b")
    .setHostName("TestMixedBucketFDB2")
    .setFormData(formData)
    .setUpdateWithRecordId(recordId)
    .setAssetData({ TestAssetBucket: "bucket1" })
    .uploadAssetFile()
    .then((res) => {
      if (res.isValid()) {
        updatedAssetPath.value = res.getAssetPath();
      } else {
        res.showErrorToast();
      }
    });
}
function downloadFile() {
  new MQLAssetFDB().download(updatedAssetPath.value || assetPath.value);
}
function renderFile() {
  new MQLAssetFDB().render(updatedAssetPath.value || assetPath.value);
}
</script>

<style></style>
