<template>
    <div>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
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
            <DataTable @rowExpand="onRowExpand" v-model:expandedRows="expandedRows" :value="auctionData" showGridlines :loading=loading>
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
                <Column header="Auction Cancellation Reason">
                    <template #body="slotProps">
                        <div>
                            <!-- {{ slotProps.data.auctionCategoryName }} -->
                            {{ slotProps.data.auctionCancellationReason }}<br>
                        </div>
                    </template>
                </Column>
                <Column header="Auction Category">
                    <template #body="slotProps">
                        <div>
                            {{ slotProps.data.auctionCategoryName }}
                            
                        </div>
                    </template>
                </Column>
               
                <Column header="Action">   
                    <!-- <template #body="slotProps">
                        <Button severity="secondary" @click="startRefund(slotProps.data.auctionId)">
                            Start Refund
                        </Button> 
                    </template>                   -->

                    <template #body="row">
                        <Button
                            @click="startRefund(row.data.auctionCode)"
                            class="btn-sm"
                            label="Start Refund"
                            :disabled="row.data.refundStarted"
                        />
                    </template>
                </Column>
                
                <Column expander header="Details" style="width: 5rem">
                    <!-- <template #rowtogglericon="">
                        <fa-webhook></fa-webhook> Details
                    </template>         -->
                </Column>
                <template #expansion="slot">
                    <AuctionBidderDetails :auctionId="slot.data.auctionId"  :auctionCode="slot.data.auctionCode"
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
import ConfirmDialog from 'primevue/confirmdialog';
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import { login } from "../../../store/modules/login.js";
import Column from "primevue/column";
import AuctionBidderDetails from "../../admin/AuctionBidderDetails.vue";
import MQL from "@/plugins/mql.js";
import Paginator from "primevue/paginator";
// import Button from 'primevue/button';
import axios from "axios";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Dialog from 'primevue/dialog';
import faWebhook from "../../../../assets/icons/webhook.svg";
import faTrashCan from '../../../../assets/icons/trash-can.svg';
import { createToaster } from "@meforma/vue-toaster";
const loginStore = login();

const toaster = createToaster({ position: "top-right", duration: 5000 });
const auctionData = ref([]);
const expandedRows = ref([]);

const auction = ref([])
let loading=ref(false)
const upcomingAuctionFlag = ref(false)
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);
const filter = ref('');
let refundBidderList=ref([])
function handlePageChange(event) {
    currentPage.value = event.page;
    perPage.value = event.rows;
    //console.log("event.page", event.page);
    fetchCancelledAuctions();
}
const confirm = useConfirm();
function UpdateRefundStatus(val) {
    
    // Automatically generated
new MQL()
.useManagementServer()
.setActivity("r.[UpdateCancelledAuctionRefundStatus]")
.setData({"auctionCode":val})
.fetch()
.then(rs => {
let res = rs.getActivity("UpdateCancelledAuctionRefundStatus",true)
if (rs.isValid("UpdateCancelledAuctionRefundStatus")) {
toaster.success("Refund Initiated");
window.location.reload();
} else
{ 
// rs.showErrorToast("UpdateCancelledAuctionRefundStatus")
toaster.error("Refund could not be Initiated Please try again after some time");
}
})

}

async function startRefund(val) {
   // console.log("Start Refund called with:", val);
confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Proceed',
    accept: () => {
       // console.log("User accepted refund confirmation"); // Add this log
loading.value=true

        new MQL()
        .useManagementServer()
        .setActivity("r.[FetchCancelledAuctionStartRefund]")
        .setData({"auctionCode":val,"userId":parseInt(loginStore.loginId)})
    .fetch()
    .then(async rs => {
        let res = rs.getActivity("FetchCancelledAuctionStartRefund", true)
        if (rs.isValid("FetchCancelledAuctionStartRefund")) {
            refundBidderList.value = res.result;
            console.log("refundBidderList is ",refundBidderList.value)

                try {
                    const result = await axios.post("/refundsettlement-server/refund", refundBidderList.value);
                    console.log("response.valueis "+result.data) //Refund processed successfully
                    // toaster.success("Refund Initiated");

                    if(result.data == "Refund processed successfully") {
                      UpdateRefundStatus(val)
                      
                    } else {
                      toaster.error("Refund could not be Initiated Please try again after some time");
                    }

                } catch (err) {

                    console.error('API Error: ', err);
                    toaster.success("Refund Error");
                    loading.value = false;
                    return
                }

                loading.value = false;


        } else {
            rs.showErrorToast("FetchCancelledAuctionStartRefund")
        }
    })

  },
    reject: () => {
        toaster.error('Refund Process Cancelled');
        console.log("User cancelled refund confirmation"); // Add this log
    }
});



}

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
                //console.log("auctionDetails.value.length", auctionData.value.length);
                for (var i = 0; i < auctionData.value.length; i++) {
                    auctionData.value[i].srNo = currentPage.value * perPage.value + i + 1;
                    //console.log("SrNo-", currentPage.value * perPage.value + i + 1);
                }
            } else {
                rs.showErrorToast("FetchCancelledAuctionDetails")
            }
        })

};

onMounted(() => {
    //upcomingAuctionFlag.value=true
    ////console.log("upcomingAuctionFlag",upcomingAuctionFlag.value)
    fetchCancelledAuctions();
});
</script>
