<template>
  <div>
    <div class="page-header">
      <div class="ph-text">
        <h2 class="title">Auction Publishing Details</h2>
      </div>
    </div>
    <div class="table-custom">
      <Paginator class="pagination-up" :rows="perPage" :rowsPerPageOptions="[10, 20, 30]" :totalRecords="totalRows"
        template="RowsPerPageDropdown" @page="handlePageChange">
        <template #start>
          <div class="fm-inner">
            <InputText v-model="filter" placeholder="Search By Auction Code..."
              @input="fetchAuctionWithApprovedStatus" />
            <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
          </div>
        </template>
      </Paginator>
      <DataTable v-model:expandedRows="expandedRows" :value="auctionData" showGridlines>
        <template #empty>
          <div class="box-watermark">
            No Auctions Found
          </div>
        </template>
        <!-- <Column field="srNo" header="SrNo." sortable></Column> -->
         <Column field="auctionCode" header="Auction Code"> </Column> 
        <!-- <Column field="auctionDescription" header="Auction Description"> 
          </Column>
          <Column field="inventoryCategoryName" header="Auction Category">
          </Column>  -->
        <Column header="Auction Category - Auction Description">
          <template #body="slotProps">
            <div>
              {{ slotProps.data.inventoryCategoryName }}
              - {{ slotProps.data.auctionDescription }}<br>

            </div>
          </template>
        </Column>
        <!-- <Column field="eventProcessingFees" header="Auction Fees"> </Column> -->
        <Column field="startDate" header="Processing Fee StartDate/Time">
        </Column>
        <Column field="endDate" header="Processing Fee EndDate/Time">
        </Column>
        <Column expander header="Action" style="width: 5rem">
          <template #rowtogglericon="">
            <fa-webhook></fa-webhook>
            Action
          </template>
        </Column>
        <template #expansion="slot">
          <div class="box-section">
            <div class="bs-header">
              Auction Description
              <div class="bs-action">
                <Button severity="secondary" class="btn-sm" @click="viewPublishDetails(slot.data)">
                  <fa-eye></fa-eye> View Publishing Details
                </Button>

                <Dialog v-model:visible="visible" modal header="Publish Auction" :style="{ width: '60rem' }">
                  <div class="modal-subtitle">
                    Auction Code: <span> {{ auctionCode }}</span>
                  </div>
                  <div class="form-grid">
                    <div class="col-span-full md:col-span-6">
                      <div class="fm-group">
                        <label class="fm-label" for="Processing Fee">Processing Fee And EMD payment Start
                          Date:</label>
                        <div class="fm-inner">
                          <Calendar id="calendar-24h" v-model="selectedStartDate" showTime hourFormat="24"
                            :minDate="minDate" :showIcon="true" />
                        </div>
                        <div class="fm-info">
                          {{ selectedStartDate }}
                        </div>
                      </div>
                    </div>
                    <div class="col-span-full md:col-span-6">
                      <div class="fm-group">
                        <label class="fm-label" for="Processing Fee">Processing Fee And EMD payment End Date:</label>
                        <div class="fm-inner">
                          <Calendar id="calendar" v-model="selectedEndDate" showTime hourFormat="24"
                            :minDate="endMinDate" :showIcon="true" />
                        </div>
                        <div class="fm-info">
                          {{ selectedEndDate }}
                        </div>
                      </div>
                    </div>
                    <div class="col-span-full">
                      <div class="fm-group">
                        <label class="fm-error" for="">
                          <span v-if="$v.selectedStartDate.$error" class="text-red-500">
                  Difference between Start Date and End Date should be greater than {{ minPaymentPeriod }}
              </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-full">
                    <div class="fm-group">
                      <div class="fm-check-holder fm-check-center">
                        <div class="fm-checkbox">
                          <input type="checkbox" id="agreeCheckbox" v-model="agree" />
                          <label for="agreeCheckbox">I agree that to publish.
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-action">
                    <Button type="button" label="Publish" :disabled="!agree" @click="publishAuction()"></Button>
                  </div>
                </Dialog>
              </div>
            </div>
            <div class="bs-item-holder">
              <div class="bs-item col-span-6">
                <div class="bs-label">Auction Code:</div>
                <div class="bs-value">
                  {{ slot.data.auctionCode }}
                </div>
              </div>
              <div class="bs-item col-span-6">
                <div class="bs-label">Auction Category:</div>
                <div class="bs-value">
                  {{ slot.data.inventoryCategoryName }}
                </div>
              </div>
              <div class="bs-item col-span-6">
                <div class="bs-label">Description:</div>
                <div class="bs-value">
                  {{ slot.data.auctionDescription }}
                </div>
              </div>
              <div class="bs-item col-span-6">
                <div class="bs-label">Auction Method:</div>
                <div class="bs-value">
                  {{ slot.data.auctionMethodName }}
                </div>
              </div>
              <div class="bs-item col-span-4">
                <div class="bs-label">Auction Process:</div>
                <div class="bs-value">
                  {{ slot.data.auctionProcessName }}
                </div>
              </div>
              <div class="bs-item col-span-4">
                <div class="bs-label">Department:</div>
                <div class="bs-value">
                  {{ slot.data.departmentName }}
                </div>
              </div>
              <div class="bs-item col-span-4">
                <div class="bs-label">District:</div>
                <div class="bs-value">
                  {{ slot.data.district }}
                </div>
              </div>
              <div class="bs-item col-span-4">
                <div class="bs-label">MC:</div>
                <div class="bs-value">
                  {{ slot.data.mcName }}
                </div>
              </div>
              <div class="bs-item col-span-4">
                <div class="bs-label">Location:</div>
                <div class="bs-value">
                  {{ slot.data.location }}
                </div>
              </div>
              <div class="bs-item col-span-4">
                <div class="bs-label">Area:</div>
                <div class="bs-value">
                  {{ slot.data.AREA }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataTable>
      <Paginator class="pagination-down" :rows="perPage" :rowsPerPageOptions="[5, 10, 20]" :totalRecords="totalRows"
        template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" @page="handlePageChange" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";
import moment from "moment";
import MQL from "@/plugins/mql.js";
import { createToaster } from "@meforma/vue-toaster";
const crumbs = ref([
  { label: "Home", route: "/home" },
  { label: "Auction", route: "/home" },
  { label: "Components", route: "/Auction Publishing Details" },
  { label: "Auction Publishing Details" },
]);

import faEye from "../../../../assets/icons/eye.svg";
import faWebhook from "../../../../assets/icons/webhook.svg";
import Paginator from "primevue/paginator";

import { login } from "../../../store/modules/login";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const loginStore = login();
const toaster = createToaster({ position: "top-right", duration: 5000 });

const auctionData = ref([]);
const visible = ref(false);
const expandedRows = ref([]);
const auctionId = ref();
const auctionCode = ref()

const agree = ref(false);

const selectedStartDate = ref();
const selectedEndDate = ref();
const minPaymentPeriod = ref()
const minDate = ref();
// minDate.value = moment().add(1, "minutes").toDate();
const endMinDate = ref();
// endMinDate.value = moment().add(2, "minutes").toDate();
const dbEndDate = ref();
const dbStartDate = ref();
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);
const filter = ref('');
const serverDate = ref();
const rules = computed(() => ({
  
  selectedStartDate: { 
    required,
    validator: checkDates
  }
}));
const $v = useVuelidate(rules, {selectedStartDate});

function checkDates(){
let startDate = moment(selectedStartDate.value);
let endDate = moment(selectedEndDate.value);
let daysDifference = endDate.diff(startDate, 'days');
  console.log("daysDifference is ",daysDifference)
  if (daysDifference < minPaymentPeriod.value) {
    console.log("Inside rules vali date check");
    return false; // Dates are not valid
  }
  return true; // Dates are valid
};

function handlePageChange(event) {
  currentPage.value = event.page;
  perPage.value = event.rows;
  // console.log("event.page", event.page);
  fetchAuctionWithApprovedStatus();
}

function fetchAuctionWithApprovedStatus() {
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchAuctionsWithApprovedStatus]")
    .setData({
      entityId:loginStore.entityId,
      statusId: 28,
      filter: "%" + filter.value.trim() + "%",
      skip: String(currentPage.value * perPage.value),
      limit: String(perPage.value),
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAuctionsWithApprovedStatus", true);

      if (rs.isValid("FetchAuctionsWithApprovedStatus")) {
        auctionData.value = res.result.auctionData;
        totalRows.value = res.result.rowCount.totalRows;
        // console.log("auctionDetails.value.length", auctionData.value.length);
        for (var i = 0; i < auctionData.value.length; i++) {
          auctionData.value[i].srNo = currentPage.value * perPage.value + i + 1;
          // console.log("SrNo-", currentPage.value * perPage.value + i + 1);
        }
      } else {
        rs.showErrorToast("FetchAuctionsWithApprovedStatus");
      }
    });
}
function serverDateAndTime() {
  new MQL()
    .useCoreServer()
    .setActivity("o.[GetCurrentDateAndTimeFromServer]")
    .setData({})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("GetCurrentDateAndTimeFromServer", true);
      if (rs.isValid("GetCurrentDateAndTimeFromServer")) {
        selectedStartDate.value = res.result.currentDateTime;
        ////console.log("currentDate", currentDate.value);
      } else {
        rs.showErrorToast("GetCurrentDateAndTimeFromServer");
      }
    });
}

function fetchAllStepsAuctionPreview() {
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchAllStepsAuctionPreview]")
    .setData({ auctionId: auctionId.value })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAllStepsAuctionPreview", true);
      dbStartDate.value = res.result.fetchStep4AuctionPreview[0].startDate;
      dbEndDate.value = res.result.fetchStep4AuctionPreview[0].endDate;
      // console.log("dbStartDate.value", dbStartDate.value, "dbEndDate.value", dbEndDate.value);
      //selectedStartDate.value = dbStartDate.value;
      selectedEndDate.value = dbEndDate.value;
      if (rs.isValid("FetchAllStepsAuctionPreview")) {
      } else {
        rs.showErrorToast("FetchAllStepsAuctionPreview");
      }
    });
}
function processingFeeEmdPaymentStartEndDate() {
  let data = {
    registrationStartDate: moment(selectedStartDate.value).format("YYYY/MM/DD HH:mm:ss"),
    registrationEndDate: moment(selectedEndDate.value).format("YYYY/MM/DD HH:mm:ss"),
    statusId: 17,
    auctionId: auctionId.value,
    moduleName: "AUCTION_PUBLISHING",
    registrationStartDate1: dbStartDate.value,
    registrationEndDate1: dbEndDate.value
  }
  // store.setLastInsertedAuctionId(31);
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[step4UpdateDatesAndUploadDocuments]")
    .setData(data)
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("step4UpdateDatesAndUploadDocuments", true);
      if (rs.isValid("step4UpdateDatesAndUploadDocuments")) {
        // console.log("res.result", res.result);
      } else {
        rs.showErrorToast("step4UpdateDatesAndUploadDocuments");
      }
    });
}

function viewPublishDetails(row) {
  // console.log("rowAuctionId", row);
  auctionId.value = row.auctionId;
  auctionCode.value = row.auctionCode
  fetchAllStepsAuctionPreview(),
    visible.value = true
}

async function publishAuction() {

  let result = await $v.value.$validate(); 
  //console.log("here", result);
  if (!result) {
    return;
  }

  // if (moment(selectedEndDate.value).isSameOrBefore(moment(selectedStartDate.value), "minute")) {
    
  //   alert(`Start Date should not be equal or after End Date !`);
  // } else {
    processingFeeEmdPaymentStartEndDate();
    iAgreeStatusUpdate();
    visible.value = false
    fetchAuctionWithApprovedStatus()
    toaster.success("Auction Published !!!");
  // }
}

function iAgreeStatusUpdate() {
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[IAgreeFlagUpdate]")
    .setData({ auctionId: auctionId.value })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("IAgreeFlagUpdate", true);
      if (rs.isValid("IAgreeFlagUpdate")) {
      } else {
        rs.showErrorToast("IAgreeFlagUpdate");
      }
    });
}

function fetchPaymentPeriod() {
  return new Promise((resolve, reject) => {
          new MQL()
          .useCoreServer()
			.setActivity("o.[FetchEntityDetailsById]")
			.setData({"entityId":loginStore.entityId})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchEntityDetailsById",true)
			if (rs.isValid("FetchEntityDetailsById")) {
        minPaymentPeriod.value = res.result.columnValue
			} else
			 { 
			rs.showErrorToast("FetchEntityDetailsById")
			}
      resolve()
			})
    })
			

}

function getServerDate() {
  return new Promise((resolve, reject) => {
  new MQL()
    .useManagementServer()
    .setActivity("o.[getServerDate]")
    .setData({})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("getServerDate", true);
      serverDate.value = res.result.serverDate.currentDate;
      minDate.value = moment(serverDate.value).add(1, "minutes").toDate()
      endMinDate.value = moment(serverDate.value).add(1, "minutes").toDate()
      //console.log("serverDate-", serverDate.value);
      if (rs.isValid("getServerDate")) {
      } else {
        rs.showErrorToast("getServerDate");
      }
      resolve()
    });
  })
}

onMounted(async() => {
  fetchAuctionWithApprovedStatus();
  await getServerDate();
    
    await fetchPaymentPeriod();
    serverDateAndTime();
});
</script>
