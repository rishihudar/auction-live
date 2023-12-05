<template>
  <div id="storeData" class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">Store Data in Session</h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <FormKit
            type="form"
            id="registration-example"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Register"
            @submit="saveSessionData"
            :actions="false"
          >
            <FormKit
              type="text"
              name="sessionName"
              label="Session Key"
              v-model="session.name"
              placeholder="Session Key"
              help="Enter Session Key"
              validation="required"
            />
            <FormKit
              type="text"
              name="sessionName"
              label="Session Name Value"
              v-model="session.nameValue"
              placeholder="Session Name Value"
              help="Session value is automatically deleted after 5 minutes because session expiration time is set to 5 minute in `StoreDataInSession` activity."
              validation="required"
            />
            <FormKit type="submit" label="Save" />
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MQL from "@/plugins/mql.js";
import { ref } from "vue";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 3000 });

let session = ref({});
let submitted = ref(false);
function saveSessionData() {
  new MQL()
    .setActivity("o.[StoreDataInSession]")
    .setData(session.value)
    .fetch()
    .then((rs) => {
      rs.getActivity("StoreDataInSession", true);
      if (rs.isValid("StoreDataInSession")) {
        session.value = {};
        toaster.success("Data Saved Successfully");
      } else {
        rs.showErrorToast("StoreDataInSession");
      }
    });
}
</script>
