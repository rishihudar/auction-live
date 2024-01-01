<template>
  <div id="sessionManager">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
      Session Manager
    </h2>
    <div class="mt-5 mx-auto">
      <div class="flex gap-2 justify-center">
        <a
          class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white"
          :class="active == 0 ? 'tab-active' : ''"
          @click.prevent="active = 0"
        >
          Store Data</a
        >
        <a
          class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white"
          :class="active == 1 ? 'tab-active' : ''"
          @click.prevent="active = 1"
          >Fetch Data</a
        >
        <a
          class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white"
          :class="active == 2 ? 'tab-active' : ''"
          @click.prevent="active = 2"
          >Delete Data</a
        >
      </div>
    </div>
    <div class="mt-8">
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
