<template>
  <div>
    <div class="page-header">
      <div class="ph-text">
        <h2 class="title">Auction Publishing Details</h2>
        <!-- <Breadcrumb :model="crumbs">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <span :class="[item.icon, 'text-color']" />
                                <span class="bi-label">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <span v-else v-bind="props.action">
                            <span class="bi-label">{{ item.label }}</span>
                        </span>
                    </template>
                </Breadcrumb> -->
      </div>
    </div>
    <div class="card">
      <div class="table-custom">
        <DataTable
          v-model:expandedRows="expandedRows"
          :value="auctionData"
          showGridlines
          tableStyle="min-width: 50rem"
        >
          <template #empty>No Auctions Found</template>
          <Column field="srNo" header="SrNo." sortable></Column>
          <Column field="auctionCode" header="Auction Code"> </Column>
          <Column field="auctionDescription" header="Auction Description">
          </Column>
          <Column field="inventoryCategoryName" header="Auction Category">
          </Column>
          <Column field="eventProcessingFees" header="Auction Fees"> </Column>
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
                  <Button
                    severity="secondary"
                    class="btn-sm"
                    @click="
                      viewPublishDetails(slot.data.auctionCode),
                        fetchAllStepsAuctionPreview(),
                        (visible = true)
                    "
                  >
                    <fa-eye></fa-eye> View Publishing Details
                  </Button>

                  <Dialog
                    v-model:visible="visible"
                    modal
                    header="Publish Auction"
                    :style="{ width: '60rem' }"
                  >
                    <div class="modal-subtitle">
                      Auction Code: <span> {{ auctionId }}</span>
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
                              hourFormat="24"
                              :minDate="minDate"
                              :showIcon="true"
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
                              hourFormat="24"
                              :minDate="endMinDate"
                              :showIcon="true"
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
                            selectedStartDate
                          ) ||
                          moment(selectedEndDate).isSame(
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
                    <!-- <label for="calendar-12h" class="font-bold block mb-2">
                                    Processing Fee And EMD payment Start Date:</label
                                    >
                                    <Calendar
                                    id="calendar-24h"
                                    v-model="selectedStartDate"
                                    showTime
                                    hourFormat="24"
                                    :minDate="minDate"
                                    :showIcon="true"
                                    />
                                    {{selectedStartDate}}
                                    <label for="calendar-12h" class="font-bold block mb-2">
                                    Processing Fee And EMD payment End Date:</label
                                    >
                                    <Calendar
                                    id="calendar"
                                    v-model="selectedEndDate"
                                    showTime
                                    hourFormat="24"
                                    :minDate="endMinDate"
                                    :showIcon="true"
                                    />
                                    {{selectedEndDate}}
                                    <div v-if="moment(selectedEndDate).isSameOrBefore(selectedStartDate) || moment(selectedEndDate).isSame(moment(selectedStartDate),'minute')" style="color: red;">
                                    Start Date should not be equal or after End Date !
                                    </div>
                                    <div>
                                            <input type="checkbox" id="agreeCheckbox" v-model="agree" />
                                    <label for="agreeCheckbox">  </label></div>-->
                    <div class="col-span-full">
                      <div class="fm-group">
                        <div class="fm-check-holder fm-check-center">
                          <div class="fm-checkbox">
                            <input
                              type="checkbox"
                              id="agreeCheckbox"
                              v-model="agree"
                            />
                            <label for="agreeCheckbox"
                              >I agree that to publish.
                            </label>
                            <!-- <Checkbox
                                                    v-model="agree"
                                                    :binary="true"
                                                    inputId="agreeCheckbox"
                                                    required
                                                    />
                                                    <label for="agreeCheckbox">I agree that to publish.</label> -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-action">
                      <Button
                        type="button"
                        label="Publish"
                        :disabled="!agree"
                        @click="publishAuction(), (visible = false)"
                      ></Button>
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
              <!-- <h2>
                        Auction Code: {{ slot.data.auctionCode }} Auction Category:
                        {{ slot.data.inventoryCategoryName }} Description:{{
                        slot.data.auctionDescription
                        }}
                        Auction Type:{{ slot.data.auctionType }}
                    </h2>
                    <h2>
                        Auction Method: {{ slot.data.auctionMethodName }} Auction Process:
                        {{ slot.data.auctionProcessName }} Department:
                        {{ slot.data.departmentName }} District: {{ slot.data.district }} MC:
                        {{ slot.data.mcName }}
                    </h2>
                    <h2>
                        Location: {{ slot.data.location }} Area: {{ slot.data.AREA }}
                    </h2> 
                    <Button label="View Publishing Details" @click="viewPublishDetails(slot.data.auctionCode),fetchAllStepsAuctionPreview(),visible = true" />
                    <Dialog
                        v-model:visible="visible"
                        modal
                        header="Publish Auction"
                        :style="{ width: '60rem' }"
                    >
                        <h2>Auction Code: {{ auctionId }}</h2>
                        <label for="calendar-12h" class="font-bold block mb-2">
                        Processing Fee And EMD payment Start Date:</label
                        >
                        <Calendar
                        id="calendar-24h"
                        v-model="selectedStartDate"
                        showTime
                        hourFormat="24"
                        :minDate="minDate"
                        :showIcon="true"
                        />
                        {{selectedStartDate}}
                        <label for="calendar-12h" class="font-bold block mb-2">
                        Processing Fee And EMD payment End Date:</label
                        >
                        <Calendar
                        id="calendar"
                        v-model="selectedEndDate"
                        showTime
                        hourFormat="24"
                        :minDate="endMinDate"
                        :showIcon="true"
                        />
                        {{selectedEndDate}}
                        <div v-if="moment(selectedEndDate).isSameOrBefore(selectedStartDate) || moment(selectedEndDate).isSame(moment(selectedStartDate),'minute')" style="color: red;">
                        Start Date should not be equal or after End Date !
                        </div>
                        <div> <input type="checkbox" id="agreeCheckbox" v-model="agree" required/>
                        <label for="agreeCheckbox">  I agree that to publish.</label></div>
                        <div class="flex justify-content-end gap-2">             
                        <Button
                            type="button"
                            label="Publish"
                            :disabled="!agree"
                            @click="publishAuction(),visible=false"
                        ></Button>
                        </div>
                    </Dialog>-->
            </div>
          </template>
        </DataTable>
        <Paginator
          :rows="perPage"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          :rowsPerPageOptions="[5, 10, 15]"
          :totalRecords="totalRows"
          v-if="totalRows > perPage"
          @page="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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

const toaster = createToaster({ position: "top-right", duration: 5000 });

const auctionData = ref([]);
const visible = ref(false);
const expandedRows = ref([]);
const auctionId = ref();

const agree = ref(false);

const selectedStartDate = ref();
const selectedEndDate = ref();

const minDate = ref();
minDate.value = moment().add(1, "minutes").toDate();
const endMinDate = ref();
endMinDate.value = moment().add(2, "minutes").toDate();
const dbEndDate = ref();
const dbStartDate = ref();
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);

function handlePageChange(event) {
  currentPage.value = event.page;
  console.log("event.page", event.page);
  fetchAuctionWithApprovedStatus(currentPage.value);
}

function fetchAuctionWithApprovedStatus(page) {
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchAuctionsWithApprovedStatus]")
    .setData({
      statusId: 28,
      skip: String(page * perPage.value),
      limit: String(perPage.value),
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAuctionsWithApprovedStatus", true);

      if (rs.isValid("FetchAuctionsWithApprovedStatus")) {
        auctionData.value = res.result.auctionData;
        totalRows.value = res.result.rowCount.totalRows;
        console.log("auctionDetails.value.length", auctionData.value.length);
        for (var i = 0; i < auctionData.value.length; i++) {
          auctionData.value[i].srNo = page * perPage.value + i + 1;
          console.log("SrNo-", page * perPage.value + i + 1);
        }
      } else {
        rs.showErrorToast("FetchAuctionsWithApprovedStatus");
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
      console.log(
        "dbStartDate.value",
        dbStartDate.value,
        "dbEndDate.value",
        dbEndDate.value
      );
      selectedStartDate.value = dbStartDate.value;
      selectedEndDate.value = dbEndDate.value;
      if (rs.isValid("FetchAllStepsAuctionPreview")) {
      } else {
        rs.showErrorToast("FetchAllStepsAuctionPreview");
      }
    });
}
function processingFeeEmdPaymentStartEndDate() {
  // store.setLastInsertedAuctionId(31);
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[step4UpdateDatesAndUploadDocuments]")
    .setData({
      registrationStartDate: moment(selectedStartDate.value).format(
        "YYYY/MM/DD HH:mm:ss"
      ),
      registrationEndDate: moment(selectedEndDate.value).format(
        "YYYY/MM/DD HH:mm:ss"
      ),
      statusId: 17,
      auctionId: auctionId.value,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("step4UpdateDatesAndUploadDocuments", true);
      if (rs.isValid("step4UpdateDatesAndUploadDocuments")) {
        console.log("res.result", res.result);
      } else {
        rs.showErrorToast("step4UpdateDatesAndUploadDocuments");
      }
    });
}

function viewPublishDetails(rowAuctionId) {
  console.log("rowAuctionId", rowAuctionId);
  auctionId.value = rowAuctionId;
}

function publishAuction() {
  if (
    moment(selectedEndDate.value).isSameOrBefore(selectedStartDate.value) ||
    moment(selectedEndDate.value).isSame(
      moment(selectedStartDate.value),
      "minute"
    )
  ) {
    console.log(
      "log-",
      moment(selectedEndDate.value).isSameOrBefore(selectedStartDate.value) ||
        moment(selectedEndDate.value).isSame(
          moment(selectedStartDate.value),
          "minute"
        )
    );
    alert(`Start Date should not be equal or after End Date !`);
  } else {
    processingFeeEmdPaymentStartEndDate();
    iAgreeStatusUpdate();
    toaster.success("Auction Published !!!");
  }
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

onMounted(() => {
  fetchAuctionWithApprovedStatus(currentPage.value);
  //fetchAuctionDetailsForPublishing();
});
</script>
