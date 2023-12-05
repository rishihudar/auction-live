<template>
  <div id="deleteData" class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">Delete Data from Session</h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <FormKit
            type="form"
            id="registration-example"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Register"
            @submit="deleteSessionData"
            :actions="false"
          >
            <FormKit
              type="text"
              name="sessionName"
              label="Session Key"
              v-model="deleteKey"
              placeholder="Session Key"
              help="Enter Session Key"
              validation="required"
            />
            <button class="btn btn-error" type="submit" label="Delete">
              Delete
            </button>
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

let deleteKey = ref("");
let sessionResult = ref({});
let submitted = ref(false);
function deleteSessionData() {
  new MQL()
    .setActivity("o.[DeleteDataFromSession]")
    .setData({ name: deleteKey.value })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("DeleteDataFromSession", true);
      if (rs.isValid("DeleteDataFromSession")) {
        if (res && res.result) {
          sessionResult.value = res.result;
          deleteKey.value = "";
          toaster.success("Data Deleted Successfully");
        } else {
          toaster.error("Data Deletion Failed");
        }
      } else {
        rs.showErrorToast("DeleteDataFromSession");
      }
    });
}
</script>
