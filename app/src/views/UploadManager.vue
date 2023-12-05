<template>
  <div id="uploadManager" class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Upload Manager
    </h2>
    <div class="row justify-content-center">
      <div class="tabs">
        <a
          class="tab tab-bordered"
          :class="active == 0 ? 'tab-active' : ''"
          @click.prevent="active = 0"
          >Upload File</a
        >
        <a
          class="tab tab-bordered"
          :class="active == 1 ? 'tab-active' : ''"
          @click.prevent="active = 1"
          >Upload Progress Check</a
        >
      </div>
    </div>
    <div class="mt-3">
      <upload-file v-if="active == 0"></upload-file>
      <upload-progess-file v-if="active == 1"></upload-progess-file>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import uploadFile from "../components/upload-manager/uploadFile.vue";
import uploadProgessFile from "../components/upload-manager/uploadProgessFile.vue";

const active = ref(0);
const items = ref([
  {
    label: "Upload File",
  },
  {
    label: "Check Upload Progress",
  },
]);
</script>
