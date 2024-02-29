<template>
  <Button label="Schedule Auction" @click="display = true"></Button>
  <Dialog v-model:visible="display" header="Scheduler">
    <div class="grid grid-cols-2 place-items-center p-2">
      <div>
        <Calendar v-model="startDate" showIcon showTime></Calendar>
        <div class="text-danger" v-if="submitted && v$.startDate.$errors[0]">
          {{ v$.startDate.$errors[0].$message }}
        </div>
      </div>
      <div>
        <Calendar v-model="endDate" showIcon showTime></Calendar>
        <div class="text-danger" v-if="submitted && v$.endDate.$errors[0]">
          {{ v$.endDate.$errors[0].$message }}
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center p-2">
      <div>
        <Multiselect
          class="w-full"
          :options="userSelectOptions"
          optionLabel="text"
          optionValue="value"
          v-model="users"
        ></Multiselect>
        <div class="text-danger" v-if="submitted && v$.users.$errors[0]">
          {{ v$.users.$errors[0].$message }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 place-items-center p-2">
      <div class="font-bold">Item Name</div>
      <div class="font-bold">Selected</div>
    </div>

    <div
      class="grid grid-cols-2 place-items-center p-2"
      v-for="(item, index) in props.itemList"
      :key="index"
    >
      <div class="font-bold">{{ item }}</div>
      <div class="">Selected</div>
    </div>

    <div class="flex justify-center items-center p-2">
      <Button label="Schedule" @click="schedule"></Button>
    </div>
  </Dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Calendar from "primevue/calendar";
import Multiselect from "primevue/multiselect";
import MQL from "@/plugins/mql_management.js";
import { defineProps } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, minValue } from "@vuelidate/validators";

const props = defineProps({
  itemList: Array,
  auctionId: String,
  entityId: String,
});

let display = ref(false);
let startDate = ref(null);
let endDate = ref(null);
let userSelectOptions = ref([]);
let users = ref([]);
let submitted = ref(false);

const rules = {
startDate: { required, validator: helpers.withMessage("Start date should be less than end date and greater than today", isValidStartDate) },
  endDate: { required, minValue: helpers.withMessage("End date should be greater than start date", isValidEndDate)},
  users: {
    required,
    minLength: helpers.withMessage(
      "Please select at least three users",
      minLength(3)
    ),
  },
};

const v$ = useVuelidate(rules, { startDate, endDate, users });


import moment from 'moment';

function isValidStartDate(date) {
  const today = moment(); // replace with your end date
  const inputDate = moment(date);

  return inputDate.isAfter(today) && inputDate.isBefore(endDate.value);
}

function isValidEndDate(date) {
  const today = moment(); // replace with your end date
  const inputDate = moment(date);

  return inputDate.isAfter(today) && inputDate.isAfter(startDate.value);
}

function FetchUsers() {
  // Fetch users from the server
  // Automatically generated
  new MQL()
    .setActivity("o.[query_2d1z3bTMBaYu0by4aWLiiPZdLK7]")
    .setData({ entityId: props.entityId })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("query_2d1z3bTMBaYu0by4aWLiiPZdLK7", true);
      if (rs.isValid("query_2d1z3bTMBaYu0by4aWLiiPZdLK7")) {
        userSelectOptions.value = res;
      } else {
        rs.showErrorToast("query_2d1z3bTMBaYu0by4aWLiiPZdLK7");
      }
    });
}

function schedule() {
  // Schedule the auction
  // Automatically generated }
  v$.value.$touch();
  submitted.value = true;
  if (v$.value.$error) {
    // show error message
    alert("Please fill all the fields");
    return;
  }
  // Automatically generated
  new MQL()
    .setActivity("o.[ScheduleAuction]")
    .setData({
      auctionId: props.auctionId,
      endDate: formatDate(endDate.value),
      startDate: formatDate(startDate.value),
      users: users.value,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("ScheduleAuction", true);
      if (rs.isValid("ScheduleAuction")) {
        if (res && res.result=="SUCCESS") {
          display.value = false;
          alert("Auction Scheduled Successfully");
        } else {
          alert("Auction Scheduling Failed");
        }
      } else {
        rs.showErrorToast("ScheduleAuction");
      }
    });
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
onMounted(() => {
  FetchUsers();
});
</script>
