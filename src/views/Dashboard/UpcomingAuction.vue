<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Upcoming Auction Details</h2>
            </div>
        </div>
        <div class="table-custom">
            <Paginator
                class="pagination-up"
                :rows="perPage"
                :rowsPerPageOptions="[10, 20, 30]"
                :totalRecords="totalRows"
                template="RowsPerPageDropdown"
                @page="handlePageChange"
            >
                <template #start>
                    <div class="fm-inner">
                        <InputText v-model="filter" placeholder="Search By Auction Code..." @input="fetchUpcomingAuctions" />
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
                <Column field="srNo" header="SrNo." sortable></Column>
                <Column field="districtName" header="District Name"> </Column>
                <Column field="entityName" header="Entity Name"> </Column>
                <Column field="auctionCode" header="Auction Code"> </Column>
                <Column field="auctionDescription" header="Auction Description">
                </Column>
                <Column field="auctionCategoryName" header="Auction Category">
                </Column>
                <Column field="processingFees" header="Event Processing Fees"> </Column>
                <Column field="auctionRegStartDate" header="Processing and EMD Fee Pay Start Date/Time">
                </Column>
                <Column field="auctionRegEndDate" header="Processing and EMD Fee Pay End Date/Time">
                </Column>
                <Column expander header="Action" style="width: 5rem">
                    <template #rowtogglericon="">
                        <fa-webhook></fa-webhook>
                        Details 
                    </template>
                </Column>
                <template #expansion="slot">
                    <!-- <div class="box-section">
                        <div class="bs-header">
                            Auction Description
                        </div>
                        <div class="bs-item-holder">
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Auction Code:</div>
                                <div class="bs-value">
                                    {{ slot.data.auctionCode }}
                                </div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Auction Type:</div>
                                <div class="bs-value">
                                    {{ slot.data.auctionType }}
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
                                    {{ slot.data.auctionMethod }}
                                </div>
                            </div>
                            <div class="bs-item col-span-4">
                                <div class="bs-label">Auction Process:</div>
                                <div class="bs-value">
                                    {{ slot.data.auctionProcess }}
                                </div>
                            </div>
                            <div class="bs-item col-span-4">
                                <div class="bs-label">Department:</div>
                                <div class="bs-value">
                                    {{ slot.data.department }}
                                </div>
                            </div>
                            <div class="bs-item col-span-4">
                                <div class="bs-label">District:</div>
                                <div class="bs-value">
                                    {{ slot.data.districtName }}
                                </div>
                            </div>
                            <div class="bs-item col-span-4">
                                <div class="bs-label">MC:</div>
                                <div class="bs-value">
                                    {{ slot.data.entityName }}
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
                    </div> -->
                    <AuctionDetailsForAdmin :auctionId="slot.data.auctionId" :upcomingAuctionFlag="upcomingAuctionFlag"/>
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



const upcomingAuctionFlag=ref(false)
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);
const filter = ref('');

function handlePageChange(event) {
    currentPage.value = event.page;
    perPage.value = event.rows;
    console.log("event.page", event.page);
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
//                 console.log("auctionDetails.value.length", auctionData.value.length);
//                 for (var i = 0; i < auctionData.value.length; i++) {
//                     auctionData.value[i].srNo = currentPage.value * perPage.value + i + 1;
//                     console.log("SrNo-", currentPage.value * perPage.value + i + 1);
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
                console.log("auctionDetails.value.length", auctionData.value.length);
                for (var i = 0; i < auctionData.value.length; i++) {
                    auctionData.value[i].srNo = currentPage.value * perPage.value + i + 1;
                    console.log("SrNo-", currentPage.value * perPage.value + i + 1);
                }
            } else {
                rs.showErrorToast("FetchAuctionsForUpcomingAuctionsCard")
            }
        })

};

onMounted(() => {
    //upcomingAuctionFlag.value=true
    //console.log("upcomingAuctionFlag",upcomingAuctionFlag.value)
    fetchUpcomingAuctions();
});
</script>
