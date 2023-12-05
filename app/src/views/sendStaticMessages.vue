<template>
  <div class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Static Messages
    </h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="field">
              <div class="p-float-label">
                <input
                  type="text"
                  v-model="msg.number"
                  class="p-inputtext p-component"
                  :class="msg.number ? 'p-filled' : ''"
                  id="number"
                />
                <label for="number">Enter mobile number</label>
              </div>
              <div class="mt-1">
                <small
                  ><b>{{ text }}</b></small
                >
              </div>
              <div class="mt-1">
                <small
                  ><b>{{ alert }}</b></small
                >
              </div>
            </div>
            <div class="btn-wrapper">
              <button class="btn btn-submit" @click.prevent="mysms">
                <i class="isax isax-bold-sms"></i>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MQL from "@/plugins/mql.js";
import { ref } from "vue";
import { createToaster } from "@meforma/vue-toaster";
const toast = createToaster({ position: "top-right", duration: 3000 });
let text = ref(null);
let alert = ref(null);
let msg = ref({});

function mysms() {
  new MQL()
    .setActivity("o.[MySMSTestActivity]")
    .setData(msg.value)
    .fetch()
    .then((rs) => {
      rs.getActivity("MySMSTestActivity", true);
      if (rs.isValid("MySMSTestActivity")) {
        // sms = {}
        toast.success("Message Sent Successfully");
      } else {
        rs.showErrorToast("MySMSTestActivity");
      }
    });
}
</script>
