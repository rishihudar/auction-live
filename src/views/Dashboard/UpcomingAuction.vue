<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Upcoming Auction Details</h2>
            </div>
        </div>
        <div class="table-custom table-stacked">
            <Paginator class="pagination-up" :rows="perPage" :rowsPerPageOptions="[10, 20, 30]"
                :totalRecords="totalRows" template="RowsPerPageDropdown" @page="handlePageChange">
                <template #start>
                    <div class="fm-inner">
                        <InputText v-model="filter" placeholder="Search By Auction Code..."
                            @input="fetchUpcomingAuctions" />
                        <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
                    </div>
                </template>
            </Paginator>
            <DataTable v-model:expandedRows="expandedRows" :value="auctionData" showGridlines responsiveLayout="stack" breakpoint="768px">
                <template #empty>
                    <div class="box-watermark">
                        No Auctions Found
                    </div>
                </template>
                <Column field="entityName" header="Entity Name"> </Column>
                <Column field="auctionCode" header="Auction Code"> </Column>
                <Column header="Auction Category - Auction Description">
                    <template #body="slotProps">
                        <div>
                            {{ slotProps.data.auctionCategoryName }}-
                            {{ slotProps.data.auctionDescription }}<br>

                        </div>
                    </template>
                </Column>
                <Column field="auctionRegStartDate" header="Processing and EMD Fee Pay Start Date/Time">
                </Column>
                <Column field="auctionRegEndDate" header="Processing and EMD Fee Pay End Date/Time">
                </Column>
                <Column expander header="Action" style="width: 5rem" class="td-hide-title td-action">
                    <template #rowtogglericon="">
                        <fa-webhook></fa-webhook>
                        Details
                    </template>
                </Column>
                <template #expansion="slot">
                    <AuctionDetailsForAdmin :auctionId="slot.data.auctionId" :auctionCode="slot.data.auctionCode"
                        :upcomingAuctionFlag="upcomingAuctionFlag" @call="fetchUpcomingAuctions()"/>
                </template>
            </DataTable>
            <Paginator class="pagination-down" :rows="perPage" :rowsPerPageOptions="[5, 10, 20]"
                :totalRecords="totalRows"
                template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" @page="handlePageChange" />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import { login } from "../../store/modules/login";
import Column from "primevue/column";
import AuctionDetailsForAdmin from "../admin/AuctionDetailsForAdmin.vue";
import MQL from "@/plugins/mql.js";
import Paginator from "primevue/paginator";

import faWebhook from "../../../assets/icons/webhook.svg";

const loginStore = login();


const auctionData = ref([]);
const expandedRows = ref([]);



const upcomingAuctionFlag = ref(false)
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);
const filter = ref('');

function handlePageChange(event) {
    currentPage.value = event.page;
    perPage.value = event.rows;
    //console.log("event.page", event.page);
    fetchUpcomingAuctions();
}

// function fetchAuctionWithApprovedStatus() {
//     // Automatically generated
//     new MQL()
//         .useManagementServer()
//         .setActivity("o.[FetchAuctionsWithApprovedStatus]")
//         .setData({
//             statusId: 28,
//             filter: "%" + filter.value.trim() + "%",
//             skip: String(currentPage.value * perPage.value),
//             limit: String(perPage.value),
//         })
//         .fetch()
//         .then((rs) => {
//             let res = rs.getActivity("FetchAuctionsWithApprovedStatus", true);

//             if (rs.isValid("FetchAuctionsWithApprovedStatus")) {
//                 auctionData.value = res.result.auctionData;
//                 totalRows.value = res.result.rowCount.totalRows;
//                 //console.log("auctionDetails.value.length", auctionData.value.length);
//                 for (var i = 0; i < auctionData.value.length; i++) {
//                     auctionData.value[i].srNo = currentPage.value * perPage.value + i + 1;
//                     //console.log("SrNo-", currentPage.value * perPage.value + i + 1);
//                 }
//             } else {
//                 rs.showErrorToast("FetchAuctionsWithApprovedStatus");
//             }
//         });
// }
function fetchUpcomingAuctions() {

    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionsForUpcomingAuctionsCard]")
        .setData({
            organizationId: login().loginDetails.organizationId,
            entityId: login().loginDetails.entityId,
            userId: login().loginDetails.loginId,
            statusCode: "AUCTION_PUBLISHED",
            filter: "%" + filter.value.trim() + "%",
            skip: String(currentPage.value * perPage.value),
            limit: String(perPage.value),
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionsForUpcomingAuctionsCard", true)
            if (rs.isValid("FetchAuctionsForUpcomingAuctionsCard")) {
                auctionData.value = res.result.auctionDetails;
                totalRows.value = res.result.rowCount.totalRows;
                //console.log("auctionDetails.value.length", auctionData.value.length);
                for (var i = 0; i < auctionData.value.length; i++) {
                    auctionData.value[i].srNo = currentPage.value * perPage.value + i + 1;
                    //console.log("SrNo-", currentPage.value * perPage.value + i + 1);
                }
            } else {
                rs.showErrorToast("FetchAuctionsForUpcomingAuctionsCard")
            }
        })

};

onMounted(() => {
    //upcomingAuctionFlag.value=true
    ////console.log("upcomingAuctionFlag",upcomingAuctionFlag.value)
    fetchUpcomingAuctions();
});
</script>
