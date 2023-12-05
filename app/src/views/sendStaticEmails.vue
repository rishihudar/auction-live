<template>
  <div class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Static Email
    </h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="field">
              <div class="p-float-label">
                <input
                  type="email"
                  v-model="email.to"
                  class="p-inputtext p-component"
                  :class="email.to ? 'p-filled' : ''"
                  id="email"
                  required
                />
                <label for="email">Enter Email ID</label>
              </div>
            </div>
            <div class="btn-wrapper">
              <button class="btn btn-submit" @click.prevent="sendemail">
                <i class="isax isax-bold-sms"></i>
                Send Email
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
let email = ref({});

function sendemail() {
  new MQL()
    .setActivity("o.[SendEmails]")
    .setData(email.value)
    .fetch()
    .then((rs) => {
      rs.getActivity("SendEmails", true);
      if (rs.isValid("SendEmails")) {
        email.value = {};
        toast.success("Email Sent Successfully");
      } else {
        rs.showErrorToast("SendEmails");
      }
    });
}
</script>
