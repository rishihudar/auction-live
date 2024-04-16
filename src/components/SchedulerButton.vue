<template>
  <Button v-if="statusCode === 'AUCTION_PUBLISHED'" label="Schedule Auction" @click="display = true" :disabled="disabled"></Button>
    <div v-if="statusCode === 'AUCTION_SCHEDULED'">
      <Button label="Re-Schedule Auction" @click="display = true" :disabled="disabled"></Button>
    </div>
  <Dialog v-model:visible="display" modal :style="{ width: '75rem' }" header="Scheduler">
    <div class="form-grid mb-4">
      <div class="col-span-full md:col-span-4">
        <div class="fm-group">
          <label for="Start Date" class="fm-label">Start Date</label>
          <div class="fm-inner">
            <Calendar v-model="startDate" @update:modelValue="emitModalValue" showIcon showTime></Calendar>
            {{startDate}}
          </div>
          <div class="fm-error" v-if="submitted && v$.startDate.$errors[0]">
            {{ v$.startDate.$errors[0].$message }}
          </div>

        </div>
      </div>
      <div class="col-span-full md:col-span-4">
        <div class="fm-group">
          <label for="End Date" class="fm-label">End Date</label>
          <div class="fm-inner">
            <Calendar v-model="endDate" @update:modelValue="emitModalValue" showIcon showTime></Calendar>
          </div>
          <div class="fm-error" v-if="submitted && v$.endDate.$errors[0]">
            {{ v$.endDate.$errors[0].$message }}
          </div>

        </div>
      </div>
      <div class="col-span-full md:col-span-4">
        <div class="fm-group">
          <label for="Start Date" class="fm-label">Select User</label>
          <div class="fm-inner">
            <Multiselect class="w-full" :options="userSelectOptions" optionLabel="text" optionValue="value"
              v-model="users" @update:modelValue="emitModalValue"></Multiselect>
          </div>
          <div class="fm-error" v-if="submitted && v$.users.$errors[0]">
            {{ v$.users.$errors[0].$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="box-section">
      <div class="bs-header">
        Items List
      </div>
      <div class="bs-item-holder" v-for="(item, index) in props.itemList" :key="index">
        <div class="bs-item col-span-6">
          <div class="bs-label">Item Name:</div>
          <div class="bs-value">
            {{ item.item }}
          </div>
        </div>
        <div class="bs-item col-span-6">
          <div class="bs-label">Selected/ Unselected:</div>
          <div class="bs-value">
            Selected
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-full">
      <div class="fm-action fm-action-center">
        <Button label="Schedule" @click="schedule"></Button> 
   
      </div>
  
    </div>
  </Dialog>
</template>

<script setup>
import { onMounted, ref,watch } from "vue";
import Calendar from "primevue/calendar";
import Multiselect from "primevue/multiselect";
import MQL from "@/plugins/mql_management.js";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength } from "@vuelidate/validators";
import { fetchAuctionStatus } from "@/plugins/helpers.js";
import moment from 'moment';
import { login } from "../store/modules/login";

const props = defineProps({
  itemList: Array,
  auctionId: Number,
  entityId: Number,
  startDate: String,
  endDate: String,
  users: Array,
  disabled: Boolean,
  statusCode: String
});

const loginStore = login()


const emit = defineEmits(["update:modelValue"]);
function emitModalValue() {
  emit('update:startDate', startDate.value);
  emit('update:endDate', endDate.value);
  emit('update:users', users.value);
}

let display = ref(false);
let startDate = ref(new Date(props.startDate));
let endDate = ref(new Date(props.endDate));
console.log("NewendDate", endDate)
let userSelectOptions = ref([]);
let users = ref(props.users);
let statusCode=ref(props.statusCode);
console.log("statusCode",statusCode)
let submitted = ref(false);
const vsStatusCode=ref();
// validation rules
const rules = {
  startDate: { required, validator: helpers.withMessage("Start date should be less than end date and greater than today", isValidStartDate) },
  endDate: { required, minValue: helpers.withMessage("End date should be greater than start date", isValidEndDate) },
  users: {
    required,
    minLength: helpers.withMessage(
      "Please select at least three users",
      minLength(3)
    ),
  },
};


// Custom validation functions for start date 
function isValidStartDate(date) {
  const today = moment(); // replace with your end date
  const inputDate = moment(date);
  // check if the input date is after today and before the end date
  return inputDate.isAfter(today) && inputDate.isBefore(endDate.value);
}
// Custom validation functions for end date
function isValidEndDate(date) {
  const today = moment(); // replace with your end date
  const inputDate = moment(date);
  // check if the input date is after today and after the start date
  return inputDate.isAfter(today) && inputDate.isAfter(startDate.value);
}

const v$ = useVuelidate(rules, { startDate, endDate, users });



async function schedule() {
  // Schedule the auction
  // Automatically generated }
  v$.value.$touch();
  submitted.value = true;
  if (v$.value.$error) {
    // show error message
    alert("Please fill all the fields");
    return;
  }
  var statusId = await fetchAuctionStatus("AUCTION_EMD_FEES_PAID");
  // Automatically generated
  new MQL()
    .setActivity("o.[ScheduleAuction]")
    .setData({
      auctionId: props.auctionId,
      endDate: formatDate(endDate.value),
      startDate: formatDate(startDate.value),
      users: users.value,
      userId: loginStore.loginId,
      statusId: statusId.result.statusId,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("ScheduleAuction", true);
      if (rs.isValid("ScheduleAuction")) {
        if (res && res.result == "SUCCESS") {
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
  // Fetch the users  to be shown in dropdown
  FetchUsers();
  console.log(props.itemList);
  console.log(props.auctionId);
  console.log("EntityID", props.entityId);
  console.log(props.startDate);
  console.log("@@@@@@@@@@@@@@@", props.endDate);
  console.log("#############", props.users);

});


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
watch(vsStatusCode, (newVal, oldVal) => {
  if (newVal === 'AUCTION_SCHEDULED') {
    console.log(vsStatusCode, "vsStatusCode")
    console.log(newVal, "newVal")
    console.log(oldVal, "oldVal")
    display.value = false; 
  }
});
</script>
