<template>
  <div>
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Dynamic Messages
    </h2>
    <div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
        <div class="field">
            <div class="p-float-label">
                <InputText
                    v-model="sms.number"
                    id="number"
                    :class="sms.number ? 'p-filled' : ''"
                />
                <label for="number">Enter mobile number</label>
            </div>
        </div>
        <div class="field">
            <div class="p-float-label">
                <InputText
                    v-model="sms.message"
                    id="message"
                    :class="sms.message ? 'p-filled' : ''"
                />
                <label for="number">Enter message</label>
            </div>
        </div>
        <div class="field">
            <div class="p-float-label">
                <InputText
                    v-model="sms.templateId"
                    id="templateId"
                    :class="sms.templateId ? 'p-filled' : ''"
                />
                <label for="templateId">Enter template Id</label>
            </div>
        </div>
        <div class="btn-wrapper">
            <button
            class="btn btn-submit"
            @click.prevent="sendDynamicMessages"
            >
            <i class="isax isax-bold-sms"></i>
            Send
            </button>
        </div>
    </div>
  </div>
</template>

<script setup>
import MQL from "@/plugins/mql.js";
import { ref } from "vue";
import { createToaster } from "@meforma/vue-toaster";
const toast = createToaster({ position: "top-right", duration: 3000 });
let sms = ref({});
function sendDynamicMessages() {
  new MQL()
    .setActivity("o.[SendDynamicMessages]")
    .setData(sms.value)
    .fetch()
    .then((rs) => {
      rs.getActivity("SendDynamicMessages", true);
      if (rs.isValid("SendDynamicMessages")) {
        sms.value = {};
        toast.success("Message Sent Successfully");
      } else {
        rs.showErrorToast("SendDynamicMessages");
      }
    });
}
</script>
