<template>
  <div class="bs-buttons">
    <Button @click="(visible = true), viewPublishDetails()" class="btn-sm">
      Extend Participation Date
    </Button>

    <Toast />
    <Dialog
      v-model:visible="visible"
      modal
      header="Publish Auction"
      :position="position"
      :style="{ width: '50rem' }"
      :draggable="false"
      class="modal-calendar"
    >
      <div class="modal-subtitle">
        Auction Code: <span> {{ auctionCode }}</span>
      </div>
      <div class="form-grid">
        <div class="col-span-full md:col-span-6">
          <div class="fm-group">
            <label class="fm-label" for="Processing Fee"
              >Processing Fee And EMD payment Start Date:</label
            >
            <div class="fm-inner">
              <Calendar
                id="calendar-24h"
                v-model="selectedStartDate"
                showTime
                dateFormat="yy/mm/dd"
                hourFormat="24"
                :minDate="minDate"
                :showIcon="true"
                :readonly="true"
              />
            </div>
            <div class="fm-info">
              {{ selectedStartDate }}
            </div>
          </div>
        </div>
        <div class="col-span-full md:col-span-6">
          <div class="fm-group">
            <label class="fm-label" for="Processing Fee"
              >Processing Fee And EMD payment End Date:</label
            >
            <div class="fm-inner">
              <Calendar
                id="calendar"
                v-model="selectedEndDate"
                showTime
                dateFormat="yy/mm/dd"
                hourFormat="24"
                :minDate="endMinDate"
                :showIcon="true"
                appendTo="self"
              />
            </div>
            <div class="fm-info">
              {{ selectedEndDate }}
            </div>
          </div>
        </div>
        <div
          class="col-span-full"
          v-if="
            moment(selectedEndDate).isSameOrBefore(
              moment(selectedStartDate),
              'minute'
            )
          "
        >
          <div class="fm-group">
            <label class="fm-error" for="">
              Start Date should not be equal or after End Date !
            </label>
          </div>
        </div>
      </div>
      <div class="col-span-full">
        <div class="fm-group">
          <div class="fm-check-holder fm-check-center">
            <div class="fm-checkbox">
              <input type="checkbox" id="agreeCheckbox" v-model="agree" />
              <label for="agreeCheckbox"
                >I agree that to Extend Participation Date.
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-action">
        <Button
          type="button"
          label="Extend EndDate"
          :disabled="!agree"
          @click="UpdateExtendParticipationEndDate()"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MQL from "@/plugins/mql.js";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";
import { login } from "../store/modules/login";
import moment from "moment";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const agree = ref(false);
const loginStore = login();
const visible = ref(false);

const props = defineProps({
  itemList: Array,
  auctionId: Number,
  auctionCode: String,
});
const selectedStartDate = ref();
const selectedEndDate = ref();

const minDate = ref();
minDate.value = moment().add(1, "minutes").toDate();
const endMinDate = ref();
endMinDate.value = moment().add(2, "minutes").toDate();
const dbEndDate = ref();
const dbStartDate = ref();

function viewPublishDetails() {
  //console.log("rowAuctionId", row);
  //   auctionId.value = auctionId;
  //   auctionCode.value = auctionCode
  fetchAllStepsAuctionPreview(), (visible.value = true);
  //console.log("auctionId", props.auctionId, "auctionCode", auctionCode);
}
function fetchAllStepsAuctionPreview() {
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchAllStepsAuctionPreview]")
    .setData({ auctionId: props.auctionId })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAllStepsAuctionPreview", true);
      dbStartDate.value = res.result.fetchStep4AuctionPreview[0].startDate;
      dbEndDate.value = res.result.fetchStep4AuctionPreview[0].endDate;
      // console.log(
      //   "dbStartDate.value",
      //   dbStartDate.value,
      //   "dbEndDate.value",
      //   dbEndDate.value
      // );
      selectedStartDate.value = dbStartDate.value;
      selectedEndDate.value = dbEndDate.value;
      if (rs.isValid("FetchAllStepsAuctionPreview")) {
      } else {
        rs.showErrorToast("FetchAllStepsAuctionPreview");
      }
    });
}
function UpdateExtendParticipationEndDate() {
  // if (
  //   moment(selectedEndDate.value).isSameOrBefore( // this if condition ensure the end date is after the start date
  //     moment(selectedStartDate.value),
  //     "minute"
  //   )
  // )
  if (
    moment(selectedEndDate.value).isSameOrBefore( // this if condition ensure the end date is after the current date and time
       moment(),
       "minute"
     )
  ) {
    // console.log(
    //   "log-",
    //   moment(selectedEndDate.value).isSameOrBefore(
    //     moment(selectedStartDate.value),
    //     "minute"
    //   )
    // );
    //alert(`Start Date should not be equal or after End Date !`);
    alert("End Date should be after the current date and time!");

  } else {
    extendParticipationEndDate();
    //iAgreeStatusUpdate();
    visible.value = false;
    //fetchAuctionWithApprovedStatus()
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Extended Participation Date.",
      life: 3000,
    });
  }
}
function extendParticipationEndDate() {
  // console.log(
  //   "endDate-",
  //   moment(selectedEndDate.value).format("YYYY/MM/DD HH:mm:ss")
  // );
  // console.log("auctionId-", props.auctionId);

  new MQL()
    .useManagementServer()
    .setActivity("o.[UpdateExtendParticipationEndDate]")
    .setData({
      registrationEndDate: moment(selectedEndDate.value).format(
        "YYYY/MM/DD HH:mm:ss"
      ),
      auctionId: props.auctionId,
      registrationEndDateAudits: dbEndDate.value,
      moduleName: "AUCTION_SCHEDULING",
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("UpdateExtendParticipationEndDate", true);
      if (rs.isValid("UpdateExtendParticipationEndDate")) {
        NotifyBiddersParticipationEndDateExtension();
        NotifyAuctionExtensionBidders();
      } else {
        rs.showErrorToast("UpdateExtendParticipationEndDate");
      }
    });
}

function NotifyBiddersParticipationEndDateExtension() {
//   console.log(
//     "endDate",
//     moment(selectedEndDate.value).format("YYYY/MM/DD HH:mm:ss")
//   );
  new MQL()
    .useNotificationServer()
    .setActivity("r.[FetchAllBiddersContactDetails]")
    .setData({
      auctionId: props.auctionCode,
      enableStatus: 1,
      endDate: moment(selectedEndDate.value).format("YYYY/MM/DD HH:mm:ss"),
      roleId: 1,
      statusId: 1,
      //orgName:login().loginDetails.organizationName
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAllBiddersContactDetails", true);
      if (rs.isValid("FetchAllBiddersContactDetails")) {
      } else {
        rs.showErrorToast("FetchAllBiddersContactDetails");
      }
    });
}

function NotifyAuctionExtensionBidders() {
//   console.log(
//     "endDate",
//     moment(selectedEndDate.value).format("YYYY/MM/DD HH:mm:ss")
//   );
  new MQL()
    .useNotificationServer()
    .setActivity("r.[NotifyAuctionExtensionBidders]")
    .setData({
      auctionId: props.auctionCode,
      roleId: 1,
      statusId: 1,
      //orgName:login().loginDetails.organizationName
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("NotifyAuctionExtensionBidders", true);
      if (rs.isValid("NotifyAuctionExtensionBidders")) {
      } else {
        rs.showErrorToast("FetchAllBiddersContactDetails");
      }
    });
}

onMounted(() => {
  //console.log("storeDEt", login().loginDetails.organizationName);
  fetchAllStepsAuctionPreview();
});
</script>
