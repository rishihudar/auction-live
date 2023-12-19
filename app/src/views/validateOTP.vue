<template>
  <div>
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Verify OTP
    </h2>
    <div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
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
        <div class="field">
            <div class="p-float-label">
            <input
                type="text"
                class="p-inputtext p-component"
                :class="otp.result ? 'p-filled' : ''"
                id="result"
                v-model="otp.result"
            />
            <label for="result">Enter generated otp</label>
            </div>
        </div>
        <div class="btn-wrapper">
            <button class="btn btn-submit" @click.prevent="validateOTP">
            <i class="isax isax-bold-message-edit"></i>
            Verify
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
let otp = ref({});
let result = ref({});
function validateOTP() {
  new MQL()
    .setActivity("o.[smsOTP]")
    .setData(otp.value)
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("smsOTP", true);
      if (rs.isValid("smsOTP")) {
        otp.value = {};
        result.value = res.result;
        toast.success("OTP Verified Successfully");
      } else {
        rs.showErrorToast("smsOTP");
      }
    });
}
</script>
