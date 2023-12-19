<template>
  <div>
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      SMS
    </h2>
    <div class="mt-5 mx-auto">
      <div class="flex gap-2 justify-center">
        <a
          class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white"
          @click="staticPage"
          :class="active == 0 ? 'tab-active' : ''"
          @click.prevent="active = 0"
        >
          Send Static Message Example</a
        >
        <a
          class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white"
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
