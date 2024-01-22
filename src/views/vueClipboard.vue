<template>
  <div>
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
      Clipboard Demo
    </h2>
    <div class="box-login mx-auto p-8 max-w-4xl rounded-xl bg-white shadow">
        <div class="field">
            <div class="p-label">
            <textarea
                class="p-inputtext p-component w-full"
                v-model="content"
                rows="5"
            />
            </div>
        </div>
        <div class="btn-wrapper">
            <button
            ref="container"
            class="btn btn-submit"
            @click="copyContent()"
            >
            <i class="isax isax-bold-copy"></i>
            Copy
            </button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createToaster } from "@meforma/vue-toaster";
import { copyText } from "vue3-clipboard";

const toast = createToaster({ position: "top-right", duration: 3000 });
let content = ref(
  "Computer programming is the process of telling a computer to do certain things by giving it instructions. These instructions are called programs. A person who writes instructions is a computer programmer. The instructions come in different languages; they are called programming languages."
);

function copyContent() {
  copyText(content.value, undefined, (error, event) => {
    if (error) {
      toast.error("Error copying content");
    } else {
      toast.success("Content copied to clipboard");
    }
  });
}
</script>
