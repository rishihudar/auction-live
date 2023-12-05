<template>
  <div class="container-fluid" id="dynamicEmail">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Dynamic Emails
    </h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="field">
              <div class="p-float-label">
                <input
                  type="email"
                  id="email"
                  v-model="email.to"
                  :class="email.to ? 'p-filled' : ''"
                  class="p-inputtext p-component"
                />
                <label for="email">Enter email ID</label>
              </div>
            </div>
            <div class="field">
              <div class="p-float-label">
                <input
                  type="email"
                  id="email"
                  v-model="email.text"
                  :class="email.text ? 'p-filled' : ''"
                  class="p-inputtext p-component"
                />
                <label for="email">Enter message </label>
              </div>
            </div>
            <div class="btn-wrapper">
              <button class="btn btn-submit" @click.prevent="submitDynamic">
                <i class="isax isax-bold-sms-tracking"></i>
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
let email = ref({});

function submitDynamic() {
  new MQL()
    .setActivity("o.[SendDynamicEmails]")
    .setData(email.value)
    .fetch()
    .then((rs) => {
      rs.getActivity("SendDynamicEmails", true);
      if (rs.isValid("SendDynamicEmails")) {
        email.value = {};
        toast.success("Email Sent Successfully");
      } else {
        rs.showErrorToast("SendDynamicEmails");
      }
    });
}
</script>
