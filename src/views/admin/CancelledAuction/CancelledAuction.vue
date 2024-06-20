<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Cancelled Auctions Refund</h2>
            </div>
        </div>
        <div class="table-custom">
            <Paginator class="pagination-up" :rows="perPage" :rowsPerPageOptions="[10, 20, 30]"
                :totalRecords="totalRows" template="RowsPerPageDropdown" @page="handlePageChange">
                <template #start>
                    <div class="fm-inner">
                        <InputText v-model="filter" placeholder="Search By Auction Code..."
                            @input="fetchCancelledAuctions" />
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
                <Column field="entityName" header="Entity Name"> </Column>
                <Column field="auctionCode" header="Auction Code"> </Column>
                <!-- <Column header="Auction Category - Auction Description"> -->
                <Column header="Auction Description">
                    <template #body="slotProps">
                        <div>
                            <!-- {{ slotProps.data.auctionCategoryName }} -->
                            {{ slotProps.data.auctionDescription }}<br>
                        </div>
                    </template>
                </Column>
                <Column header="Auction Category">
                    <template #body="slotProps">
                        <div>
                            {{ slotProps.data.auctionCategoryName }}
                            
                            <!-- -{{ slotProps.data.auctionDescription }}<br> -->
                        </div>
                    </template>
                </Column>
                <!-- <Column field="auctionRegStartDate" header="Processing and EMD Fee Pay Start Date/Time">
                </Column>
                <Column field="auctionRegEndDate" header="Processing and EMD Fee Pay End Date/Time">
                </Column> -->
                <Column header="Action">   
                    <template #body="slotProps">
                        <Button severity="secondary" @click="startRefund(slotProps.data.auctionId)">
                            Start Refund
                        </Button> 
                    </template>                  
                </Column>
                
                <Column expander header="Details" style="width: 5rem">
                    <!-- <template #rowtogglericon="">
                        <fa-webhook></fa-webhook> Details
                    </template>         -->
                </Column>
                <template #expansion="slot">
                    <AuctionBidderDetails :auctionId="slot.data.auctionId"
                        :upcomingAuctionFlag="upcomingAuctionFlag" />
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
import { login } from "../../../store/modules/login.js";
import Column from "primevue/column";
import AuctionBidderDetails from "../../admin/AuctionBidderDetails.vue";
import MQL from "@/plugins/mql.js";
import Paginator from "primevue/paginator";
import Button from 'primevue/button';

import faWebhook from "../../../../assets/icons/webhook.svg";
import faTrashCan from '../../../../assets/icons/trash-can.svg';
const loginStore = login();


const auctionData = ref([]);
const expandedRows = ref([]);

const auction = ref([])

const upcomingAuctionFlag = ref(false)
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);
const filter = ref('');

function handlePageChange(event) {
    currentPage.value = event.page;
    perPage.value = event.rows;
    console.log("event.page", event.page);
    fetchCancelledAuctions();
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
function fetchCancelledAuctions() {

    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchCancelledAuctionDetails]")
        .setData({
            organizationId: login().loginDetails.organizationId,
            entityId: login().loginDetails.entityId,
            userId: login().loginDetails.loginId,
            statusCode: "AUCTION_CANCELLED",
            filter: "%" + filter.value.trim() + "%",
            skip: String(currentPage.value * perPage.value),
            limit: String(perPage.value),
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchCancelledAuctionDetails", true)
            if (rs.isValid("FetchCancelledAuctionDetails")) {
                auctionData.value = res.result.auctionDetails;
                totalRows.value = res.result.rowCount.totalRows;
                console.log("auctionDetails.value.length", auctionData.value.length);
                for (var i = 0; i < auctionData.value.length; i++) {
                    auctionData.value[i].srNo = currentPage.value * perPage.value + i + 1;
                    console.log("SrNo-", currentPage.value * perPage.value + i + 1);
                }
            } else {
                rs.showErrorToast("FetchCancelledAuctionDetails")
            }
        })

};

onMounted(() => {
    //upcomingAuctionFlag.value=true
    //console.log("upcomingAuctionFlag",upcomingAuctionFlag.value)
    fetchCancelledAuctions();
});
</script>
