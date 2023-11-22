<template>
  <div class="container-fluid">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Email
    </h2>
    <div class="row justify-content-center">
      <div class="tabs">
        <a
          class="tab tab-bordered"
          @click="sendStatic"
          :class="active == 0 ? 'tab-active' : ''"
          @click.prevent="active = 0"
        >
          Send Static Email Example</a
        >
        <a
          class="tab tab-bordered"
          @click="sendDynamic"
          :class="active == 1 ? 'tab-active' : ''"
          @click.prevent="active = 1"
          >Send Dynamic Email Example</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const route = useRouter();
let active = 0;
function sendDynamic() {
  route.push("/sendDynamicEmails");
}
function sendStatic() {
  route.push("/sendStaticEmails");
}
</script>
