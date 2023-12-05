<template>
  <div class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Generate OTP
    </h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="field">
              <div class="p-float-label">
                <input
                  type="text"
                  class="p-inputtext p-component"
                  :class="otp.number ? 'p-filled' : ''"
                  id="number"
                  v-model="otp.number"
                />
                <label for="number">Enter mobile number</label>
              </div>
            </div>
            <div class="btn-wrapper">
              <button class="btn btn-submit" @click.prevent="generateOTP">
                <i class="isax isax-bold-message"></i>
                Generate
              </button>
            </div>
            <div class="field mt-4">
              <h3>Result</h3>
              <json-viewer :value="result" boxed :expanded="true"></json-viewer>
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
import jsonViewer from "vue-json-viewer";
let otp = ref({});
let result = ref({});
function onCopy() {
  toast.success("OTP Copied Successfully");
}
function onError() {
  toast.error("OTP Copy Failed");
}
function generateOTP() {
  new MQL()
    .setActivity("o.[smsOTP]")
    .setData(otp.value)
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("smsOTP", true);
      if (rs.isValid("smsOTP")) {
        otp.value = {};
        result.value = res.result;
        toast.success("OTP Generated Successfully");
      } else {
        rs.showErrorToast("smsOTP");
      }
    });
}
</script>
