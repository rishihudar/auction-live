<template>
  <div id="sessionManager" class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Session Manager
    </h2>
    <div class="row justify-content-center">
      <div class="tabs">
        <a
          class="tab tab-bordered"
          :class="active == 0 ? 'tab-active' : ''"
          @click.prevent="active = 0"
        >
          Store Data</a
        >
        <a
          class="tab tab-bordered"
          :class="active == 1 ? 'tab-active' : ''"
          @click.prevent="active = 1"
          >Fetch Data</a
        >
        <a
          class="tab tab-bordered"
          :class="active == 2 ? 'tab-active' : ''"
          @click.prevent="active = 2"
          >Delete Data</a
        >
      </div>
    </div>
    <div class="mt-3">
      <store-data v-if="active == 0"></store-data>
      <fetch-data v-if="active == 1"></fetch-data>
      <delete-data v-if="active == 2"></delete-data>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import storeData from "../components/sessionmanager/storeData.vue";
import fetchData from "../components/sessionmanager/fetchData.vue";
import deleteData from "../components/sessionmanager/deleteData.vue";

const active = ref(0);
</script>
