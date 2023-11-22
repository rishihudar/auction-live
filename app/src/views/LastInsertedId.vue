<template>
  <div class="container-fluid" id="lastInsertID">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Last Insert ID
    </h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="field">
              <div class="p-float-label">
                <input
                  type="text"
                  class="p-inputtext p-component w-100"
                  :class="emp.name ? 'p-filled' : ''"
                  v-model="emp.name"
                  id="name"
                  required
                />
                <label for="name">Employee Name</label>
              </div>
            </div>
            <div class="field">
              <div class="p-float-label">
                <input
                  type="text"
                  class="p-inputtext p-component w-100"
                  :class="emp.age ? 'p-filled' : ''"
                  v-model="emp.age"
                  id="age"
                  required
                />
                <label for="age">Employee Age</label>
              </div>
            </div>
            <div class="field">
              <div class="p-float-label">
                <input
                  type="text"
                  class="p-inputtext p-component w-100"
                  :class="emp.address ? 'p-filled' : ''"
                  v-model="emp.address"
                  id="address"
                  required
                />
                <label for="address">Employee Address</label>
              </div>
            </div>
            <div class="btn-wrapper">
              <button
                class="btn btn-submit"
                @click.prevent="saveAndGetLastInsertedId"
              >
                <i class="isax isax-bold-tick-circle"></i>
                Save & Get Last Insert ID
              </button>
            </div>
            <div class="field mt-4">
              <h3>Result</h3>
              <json-viewer
                :value="empResult"
                boxed
                :expanded="true"
              ></json-viewer>
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
import jsonViewer from "vue-json-viewer";
import { createToaster } from "@meforma/vue-toaster";
const toast = createToaster({ position: "top-right", duration: 3000 });

let emp = ref({});
let empResult = ref({});
function saveAndGetLastInsertedId() {
  new MQL()
    .setActivity("o.[FetchLastInsertedId]")
    .setData(emp.value)
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchLastInsertedId", true);
      if (rs.isValid("FetchLastInsertedId")) {
        toast.success("Data Saved Successfully");
        emp.value = {};
        empResult.value = res.result;
      } else {
        rs.showErrorToast("FetchLastInsertedId");
      }
    });
}
</script>
