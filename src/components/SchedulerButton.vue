<template>
  <Button
    v-if="statusCode === 'AUCTION_PUBLISHED'"
    label="Schedule Auction"
    @click="display = true"
    :disabled="disabled"
    class="btn-sm"
  ></Button>
  <div v-if="statusCode === 'AUCTION_SCHEDULED'">
    <Button
      label="Re-Schedule Auction"
      class="btn-sm"
      @click="display = true"
      :disabled="visibleReSchedule"
      v-tooltip="{ value: visibleReSchedule ? 'Auction cannot be rescheduled at this stage' : '' }"
    ></Button>
  </div>
  <Dialog
    v-model:visible="display"
    modal
    :style="{ width: '75rem' }"
    header="Scheduler"
  >
    <div class="form-grid mb-4">
      <div class="col-span-full md:col-span-4">
        <div class="fm-group">
          <label for="Start Date" class="fm-label">Start Date</label>
          <div class="fm-inner">
            <Calendar
              v-model="startDate"
              @update:modelValue="emitModalValue"
              showIcon
              showTime
            ></Calendar>
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
            <Calendar
              v-model="endDate"
              @update:modelValue="emitModalValue"
              showIcon
              showTime
            ></Calendar>
          </div>
          <div class="fm-error" v-if="submitted && v$.endDate.$errors[0]">
            {{ v$.endDate.$errors[0].$message }}
          </div>
        </div>
      </div>
      <div class="col-span-full md:col-span-4">
        <div class="fm-group">
          <label for="Select User" class="fm-label">Select User</label>
          <div class="fm-inner">
            <Multiselect
              class="w-full"
              :options="userSelectOptions"
              optionLabel="text"
              optionValue="value"
              v-model="users"
              @update:modelValue="emitModalValue"
            ></Multiselect>
          </div>
          <div class="fm-error" v-if="submitted && v$.users.$errors[0]">
            {{ v$.users.$errors[0].$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="box-section">
      <div class="bs-header">Items List</div>
      <div
        class="bs-item-holder"
        v-for="(item, index) in props.itemList"
        :key="index"
      >
        <div class="bs-item col-span-6">
          <div class="bs-label">Item Name:</div>
          <div class="bs-value">{{ item.item }}</div>
        </div>
        <div class="bs-item col-span-6">
          <div class="bs-label">Selected/ Unselected:</div>
          <div class="bs-value">Selected</div>
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
 import Tooltip from 'primevue/tooltip';
import { onMounted, ref, watch,computed } from "vue";
import Calendar from "primevue/calendar";
import Multiselect from "primevue/multiselect";
import MQL from "@/plugins/mql.js";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength } from "@vuelidate/validators";
import { fetchAuctionStatus } from "@/plugins/helpers.js";
import moment from "moment";
import { login } from "../store/modules/login";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 3000 });

const props = defineProps({
  itemList: Array,
  auctionId: Number,
  entityId: Number,
  startDate: String,
  endDate: String,
  users: Array,
  disabled: Boolean,
  statusCode: String,
  auctionCode: String,
  totalEmdPaid: Number,
  propertiesAvailable: Number,
});

let previousstartDate = props.startDate;

const loginStore = login();

const emit = defineEmits(["update:modelValue"]);
function emitModalValue() {
  emit("update:startDate", startDate.value);
  emit("update:endDate", endDate.value);
  emit("update:users", users.value);
}

let display = ref(false);
let startDate = ref(
  moment(props.startDate).isValid()
    ? moment(props.startDate).toDate()
    : moment().toDate()
);
let endDate = ref(
  moment(props.endDate).isValid()
    ? moment(props.endDate).toDate()
    : moment().add(1, "minute").toDate()
);

let userSelectOptions = ref([]);
let users = ref(props.users);
let statusCode = ref(props.statusCode);
let submitted = ref(false);

// Validation rules
const rules = {
  startDate: {
    required,
    validator: helpers.withMessage(
      "Start date should be less than end date and greater than today",
      isValidStartDate
    ),
  },
  endDate: {
    required,
    minValue: helpers.withMessage(
      "End date should be greater than start date",
      isValidEndDate
    ),
  },
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
  const today = moment();
  const inputDate = moment(date);
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

import axios from 'axios';

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
  var bidderStatusId = await fetchAuctionStatus("AUCTION_EMD_FEES_PAID");
  var userStatusId = await fetchAuctionStatus("AUCTION_USER_SCHEDULED");
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[ScheduleAuction]")
    .setData({
      auctionId: props.auctionId,
      endDate: formatDate(endDate.value),
      startDate: formatDate(startDate.value),
      users: users.value,
      userId: loginStore.loginId,
      bidderStatusId: bidderStatusId.result.statusId,
      userStatusId: userStatusId.result.statusId,
      totalEmdPaid: props.totalEmdPaid,
      propertiesAvailable: props.propertiesAvailable,
      entityId: props.entityId,
    })
    .fetch()
    .then(async (rs) => {
      let res = rs.getActivity("ScheduleAuction", true);
      if (rs.isValid("ScheduleAuction")) {
        if (res && res.result == "SUCCESS") {
          display.value = false;
          if (statusCode.value === "AUCTION_PUBLISHED") {
            NotifyScheduledAuctionBidders();
          }
          // NotifyScheduledAuctionBidders()
          NotifyAuctionScheduledAndPasscodes();
          if (statusCode.value === "AUCTION_SCHEDULED") {
            // remove hub logic here
             try {
    await removeHub(); // Wait for removeHub to complete
    NotifyAuctionReScheduledAndPasscodes(); // Runs only if removeHub is successful
  } catch (error) {
    console.error("Failed to remove hub:", error.message);
    alert("Failed to remove hub. Please try again."); // Handle errors
  }
          }

          // NotifyAuctionReScheduledAndPasscodes()
          //alert("Auction Scheduled Successfully");
          // toaster.success("Auction Scheduled Successfully");
          // reloadPage();
        } else {
          alert("Auction Scheduling Failed");
        }
      } else {
        rs.showErrorToast("ScheduleAuction");
      }
    });
}
const data = ref(null);
const error = ref(null);

const removeHub = async () => {
  try {
    const response = await axios.get(`/bidding-server-http/o/removeHubRoute/${props.auctionId}`);
    return Promise.resolve(response.data); // Return a resolved Promise with the response data
  } catch (err) {
    console.error("Error removing hub:", err.message);
    return Promise.reject(err); // Return a rejected Promise in case of an error
  }
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //return moment(date).format('MM/DD/YYYY HH:mm');
}
function NotifyAuctionReScheduledAndPasscodes() {
  new MQL()
    .useNotificationServer()
    .setActivity("r.[SendEmailAuctionRescheduled]")
    .setData({
      auctionId: props.auctionCode,
      previousstartDate: previousstartDate,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("SendEmailAuctionRescheduled", true);
      if (rs.isValid("SendEmailAuctionRescheduled")) {
      } else {
        rs.showErrorToast("SendEmailAuctionRescheduled");
      }
    });
}
function NotifyAuctionScheduledAndPasscodes() {
  new MQL()
    .useNotificationServer()
    .setActivity("r.[FetchAuctionParticipatedBidders]")
    .setData({ auctionId: props.auctionCode, roleId: 1, statusId: 31 })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAuctionParticipatedBidders", true);
      if (rs.isValid("FetchAuctionParticipatedBidders")) {
        toaster.success("Auction Scheduled Successfully");
        reloadPage();
      } else {
        rs.showErrorToast("FetchAuctionParticipatedBidders");
      }
    });
}

function NotifyScheduledAuctionBidders() {
  new MQL()
    .useNotificationServer()
    .setActivity("r.[NotifyScheduledAuctionBidders]")
    .setData({ auctionId: props.auctionCode, roleId: 1, statusId: 31 })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("NotifyScheduledAuctionBidders", true);
      if (rs.isValid("NotifyScheduledAuctionBidders")) {
        // NotifyAuctionScheduledAndPasscodes()
      } else {
        rs.showErrorToast("NotifyScheduledAuctionBidders");
      }
    });
}
const reScheduleTime = ref(0);
const rescheduleCompareTime = ref(0);
const visibleReSchedule = ref(false);
console.log("AUctionId*****", props.auctionCode);
console.log("AUctionId*****", props.auctionId);
function AuctionReScheduleTime() {
  console.log("AuctionId", props.auctionId);
  new MQL()
    .useManagementServer()
    .setActivity("o.[AuctionReScheduleTime]")
    .setData({auctionId: props.auctionId})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("AuctionReScheduleTime", true);
      if (rs.isValid("AuctionReScheduleTime")) {
        rescheduleCompareTime.value = res.result.auctionReScheduleTime.customParamValue;
        console.log("#########", rescheduleCompareTime.value);
        reScheduleTime.value = res.result.fetchAuctionRescheduleTime.timeDifference;
        console.log("reScheduleTime", reScheduleTime.value);
        console.log("Time",rescheduleCompareTime<reScheduleTime);
        if (rescheduleCompareTime.value < reScheduleTime.value) {
          console.log("Time",rescheduleCompareTime<reScheduleTime);
          visibleReSchedule.value = false;
        }
        else{
          visibleReSchedule.value = true;
        }
      } else {
        rs.showErrorToast("AuctionReScheduleTime");
      }
    });
}
// const isReScheduleDisabled = computed(() => {
//   return rescheduleCompareTime.value < reScheduleTime.value;
// });

onMounted(() => {
  // Fetch the users  to be shown in dropdown
  FetchUsers();
  //console.log("Auc Code",props.auctionCode);
  //console.log(props.itemList);
  //console.log(props.auctionId);
  //console.log("EntityID", props.entityId);
  //console.log(props.startDate);
  //console.log("@@@@@@@@@@@@@@@", props.endDate);
  //console.log("#############", props.users);
  AuctionReScheduleTime();
});

function reloadPage() {
  window.location.reload();
}

function FetchUsers() {
  // Fetch users from the server
  // Automatically generated
  new MQL()
    .useManagementServer()
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

watch(display, (newVal) => {
  if (newVal) {
    startDate.value = moment().toDate();
    endDate.value = moment().add(1, "minute").toDate();
  }
});
watch(statusCode, (newVal) => {
  if (newVal === "AUCTION_SCHEDULED") {
    display.value = false;
  }
});
</script>
