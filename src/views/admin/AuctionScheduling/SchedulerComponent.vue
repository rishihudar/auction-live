<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Schedule Auction</h2>
            </div>
        </div>
        <div class="table-custom">
            <Paginator
                class="pagination-up"
                :rows="perPage"
                :rowsPerPageOptions="[5, 10, 20]"
                :totalRecords="totalRows"
                template="RowsPerPageDropdown"
                @page="handlePageChange"
            >
                <template #start>
                    <div class="fm-inner">
                        <InputText
                            v-model="filter"
                            placeholder="Search By Auction Code..."
                            @input="fetchPublishedAuctionsAdmin"
                        />
                        <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
                    </div>
                </template>
            </Paginator>
            <DataTable
                v-model:expandedRows="expandedRows"
                :value="products"
                showGridlines
            >
                <!-- <Column field="srNo" header="SrNo."></Column> -->
                <Column field="auctionCode" header="Auction Code"></Column>
                <!-- <Column field="auctionDescription" header="Auction Description"></Column>
                <Column field="auctionCategoryName" header="Auction Category"></Column> -->
                <!-- <Column field="districtName" header="District Name"></Column> -->
                <Column header="Auction Category - Auction Description">
                    <template #body="slotProps">
                        <div>
                            {{ slotProps.data.auctionCategoryName }}-
                            {{ slotProps.data.auctionDescription }}<br>

                        </div>
                    </template>
                </Column>
                <Column field="entityName" header="Entity Name"></Column>
                <Column
                    field="auctionRegStartDate"
                    header="Processing and EMD Fee Pay Start Date/Time"
                ></Column>
                <Column
                    field="auctionRegEndDate"
                    header="Processing and EMD Fee Pay End Date/Time"
                ></Column>
                <Column expander style="width: 5rem" field="" header="Action"></Column>
                <template #expansion="slot">
                    <AuctionDetailsForAdmin :auctionId="slot.data.auctionId" :auctionCode="slot.data.auctionCode" :upcomingAuctionFlag="upcomingAuctionFlag"
                    @call="fetchPublishedAuctionsAdmin()"
                    >
                    </AuctionDetailsForAdmin>
                </template>
            </DataTable>
            <Paginator
                class="pagination-down"
                :rows="perPage"
                :rowsPerPageOptions="[5, 10, 20]"
                :totalRecords="totalRows"
                template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                @page="handlePageChange"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { login } from "../../../store/modules/login.js";
import MQL from "@/plugins/mql.js";
import { useRoute } from "vue-router";
import AuctionDetailsForAdmin from "../AuctionDetailsForAdmin.vue";
import Paginator from "primevue/paginator";

const expandedRows = ref([]);
const upcomingAuctionFlag=ref(true)
const route = useRoute();
const loginStore = login();
const products = ref();
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);
const filter = ref("");

const entityId = ref("");
onMounted(() => {
  entityId.value = route.params.id;
  fetchPublishedAuctionsAdmin(currentPage.value);
  
});

let auctionId = ref();
function handlePageChange(event) {
  currentPage.value = event.page;
  perPage.value = event.rows;
  //console.log("event.page", event.page);
  fetchPublishedAuctionsAdmin();
}
function fetchPublishedAuctionsAdmin() {
  //console.log("Selected Entity Id", login().loginDetails);
  new MQL()
    .useManagementServer()
    .setActivity("r.[FetchPublishedAuctionsAdmin]")
    .setData({
      organizationId: login().loginDetails.organizationId,
      entityId: login().loginDetails.entityId,
      userId: login().loginDetails.loginId,
      statusCode: "AUCTION_PUBLISHED",
      statusCode2: "AUCTION_SCHEDULED",
      filter: "%" + filter.value.trim() + "%",
      skip: String(currentPage.value * perPage.value),
      limit: String(perPage.value),
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchPublishedAuctionsAdmin", true);
      if (rs.isValid("FetchPublishedAuctionsAdmin")) {
        products.value = res.result.publishedAuctions;
        //console.log("Published Auctions Scheduler", res.result);
        auctionId.value = res.result.auctionId;
        totalRows.value = res.result.rowCount.totalRows;
        //console.log("auctionDetails.value.length", products.value.length);
        for (var i = 0; i < products.value.length; i++) {
          products.value[i].srNo = currentPage.value * perPage.value + i + 1;
          //console.log("SrNo-", currentPage.value * perPage.value + i + 1);
        }
      } else {
        rs.showErrorToast("FetchPublishedAuctionsAdmin");
      }
    });
}
function reloadPage() {
        window.location.reload();
        }

      

</script>
