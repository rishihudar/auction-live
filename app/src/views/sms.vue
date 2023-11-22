<template>
  <div class="container-fluid">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      SMS
    </h2>
    <div class="row justify-content-center">
      <div class="tabs">
        <a
          class="tab tab-bordered"
          @click="staticPage"
          :class="active == 0 ? 'tab-active' : ''"
          @click.prevent="active = 0"
        >
          Send Static Message Example</a
        >
        <a
          class="tab tab-bordered"
          @click="dynamicPage"
          :class="active == 1 ? 'tab-active' : ''"
          @click.prevent="active = 1"
          >Send Dynamic Message Example</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
let active = 0;
const router = useRouter();

function staticPage() {
  router.push("/sendStaticMessages");
}
function dynamicPage() {
  router.push("/sendDynamicMessages");
}
</script>
