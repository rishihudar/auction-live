<template>
  <div id="fetchData">
    <h2 class="text-xl font-bold flex gap-2 items-center justify-center">Fetch Data in Session</h2>
    <div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
        <FormKit
            type="form"
            id="registration-example"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Register"
            @submit="fetchSessionData"
            :actions="false"
        >
            <FormKit
                type="text"
                name="sessionName"
                label="Session Key"
                v-model="fetchKey"
                placeholder="Session Key"
                help="Enter Session Key"
                validation="required"
            />
            <FormKit type="submit" label="Save" />
        </FormKit>
        <div class="field">
            <h3>Result</h3>
            <json-viewer
                :value="sessionResult"
                boxed
                :expanded="true"
            ></json-viewer>
        </div>
    </div>
  </div>
</template>

<script setup>
import MQL from "@/plugins/mql.js";
import jsonViewer from "vue-json-viewer";
import { ref } from "vue";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 3000 });

let sessionResult = ref({});
let fetchKey = ref("");
let submitted = ref(false);
function fetchSessionData() {
  new MQL()
    .setActivity("o.[FetchDataFromSession]")
    .setData({ name: fetchKey.value })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchDataFromSession", true);
      if (rs.isValid("FetchDataFromSession")) {
        if (res && res.result) {
          sessionResult.value = res.result;
          fetchKey.value = "";
          toaster.success("Data fetched successfully");
        } else {
          toaster.error("Data fetched failed");
        }
      } else {
        rs.showErrorToast("FetchDataFromSession");
      }
    });
}
</script>
