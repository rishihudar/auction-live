<template>
  <div>
    <div class="page-header">
      <div class="ph-text">
        <h2 class="title">Rejected H1 Refund</h2>
      </div>
    </div>
    <!-- Sample Master tables-->
    <div class="table-custom">
      <Paginator class="pagination-up" :rows="perPage" :rowsPerPageOptions="[10, 20, 30]" :totalRecords="totalRows"
        template="RowsPerPageDropdown" @page="handlePageChange">
        <template #start>
          <div class="fm-inner">
            <InputText v-model="filter" placeholder="Search By Auction Code..." @input="fetchConcludedAuctionsUser" />
            <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
          </div>
        </template>
      </Paginator>
      <DataTable  @rowExpand="onRowExpand" v-model:expandedRows="expandedRows" showGridlines :value="products" :filters="filters" :loading=loading>
        <!-- <Column field="srNo" header="Sr No"></Column> -->
        <Column field="auctionCode" header=" Auction Code"></Column>
        <!-- <Column
                field="auctionDescription"
                header="Auction Description"
            ></Column>
            <Column field="auctionCategoryName" header="Auction Category"></Column> -->
        <Column header="Auction Category - Auction Description">
          <template #body="slotProps">
            <div>
              {{ slotProps.data.auctionCategoryName }}-
              {{ slotProps.data.auctionDescription }}<br>

            </div>
          </template>
        </Column>
        <Column field="auctionStartDate" header="Auction StartDate/Time"></Column>
        <Column field="auctionEndDate" header="Auction EndDate/Time"></Column>
          <Column header="Refund" style="width: 5rem">
                  <template #body="row">
                      <Button
                          @click="startRefund(row.data.auctionCode)"
                          class="btn-sm"
                          label="Start"
                          :disabled="row.data.rejectionRefundStarted"
                      />
                  </template>
          </Column>
          <Column expander header="Details" style="width: 5rem">
                  <!-- <template #rowtogglericon="row">
                      <Button
                          @click="viewDetails(row.data.auctionCode)"
                          class="btn-sm"
                          label="Details"
                      />
                  </template> -->
          </Column>
          <template #expansion="row">

            <div class="table-custom">
              <DataTable v-model:expandedRows="expandedRows" showGridlines :value="bidderDetails">
              
              <Column field="roundNumber" header="Round Number"></Column>
              <Column field="bidderName" header="Bidder Name"></Column>
              <Column field="bidderEmail" header="Bidder Email"></Column>
              <Column field="bidderMobileNumber" header="Bidder Mobile number"></Column>
              <Column field="rejectedAmount" header="Refund EMD Amount in Rs"></Column>
              <Column field="refundStatus" header="Refund Status"></Column>
              <Column expander header="Details" style="width: 5rem"></Column>
              <template #expansion="slot">
                  <p><b>Auction Code:</b> {{slot.data.auctionId}}</p>
                  <p><b>Auction EMD:</b> {{slot.data.auctionEmd}}</p>
                  <p><b>EMD Paid For:</b> {{slot.data.emdPaidFor}}</p>
                  <p><b>Total EMD Amount Paid:</b> {{slot.data.amount}}</p>
                  <p><b>No of Properties rejected:</b> {{slot.data.noOfPropertiesRejected}}</p>
                  <p><b>Refund Amount ( {{slot.data.auctionEmd}} * {{slot.data.noOfPropertiesRejected}} ) : </b> {{slot.data.rejectedAmount}}</p>
              </template>

              </DataTable>
          </div>
                  
              </template>
      </DataTable>

      <Dialog v-model:visible="visible" modal header="Bidder Details"> 

          <div class="table-custom">
              <DataTable v-model:expandedRows="expandedRows" showGridlines :value="bidderDetails">
              
              <Column field="bidderName" header="Bidder Name"></Column>
              <Column field="bidderEmail" header="Bidder Email"></Column>
              <Column field="bidderMobileNumber" header="Bidder Mobile number"></Column>
              <Column field="amount" header="Amount in Rs"></Column>
              <Column field="refundStatus" header="Refund Status"></Column>
              <Column expander header="Details" style="width: 5rem"></Column>
              <template #expansion="slot">
                  <p><b>Auction Code:</b> {{slot.data.auctionId}}</p>
                  <p><b>Auction EMD:</b> {{slot.data.auctionEmd}}</p>
                  <p><b>EMD Paid For:</b> {{slot.data.emdPaidFor}}</p>
                  <p><b>Total EMD Amount Paid:</b> {{slot.data.amount}}</p>
                  <p><b>No of Properties allocated:</b> {{slot.data.noOfPropertiesAllocated}}</p>
                  <p><b>Refund Amount:</b> {{slot.data.amount}}</p>
              </template>

              </DataTable>
          </div>
      </Dialog>

      <Paginator class="pagination-down" :rows="perPage" :rowsPerPageOptions="[10, 20, 30]" :totalRecords="totalRows"
        template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" @page="handlePageChange" />
    </div>

  </div>
</template>

<script setup>
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import Dialog from 'primevue/dialog';
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { FilterMatchMode } from "primevue/api";
import { login } from "../../store/modules/login.js";
import MQL from "@/plugins/mql.js";
import { useRoute } from "vue-router";
import { createToaster } from "@meforma/vue-toaster";

const confirm = useConfirm();
const toast = useToast();

const toaster = createToaster({ position: "top-right", duration: 5000 });
let loading=ref(false)
const loginStore = login();
let bidderDetails=ref([])
let auctionCode=ref()
let visible=ref()
const expandedRows = ref([]);
const route = useRoute();
const products = ref();
const entityId = ref("");
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);
const filter = ref("");
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
onMounted(() => {
  entityId.value = route.params.id;
  fetchConcludedAuctionsUser();
});
function handlePageChange(event) {
  currentPage.value = event.page;
  perPage.value = event.rows;
  fetchConcludedAuctionsUser();
}

function fetchConcludedAuctionsUser() {
  //console.log("Selected Entity Id", login().loginDetails);
  new MQL()
  .useManagementServer()
    .setActivity("r.[FetchConcludedAuctionsRejectedRefund]")
    .setData({
      entityId: login().loginDetails.entityId,
      organizationId: login().loginDetails.organizationId,
      statusCode: "AUCTION_CONCLUDED",
      filter: "%" + filter.value.trim() + "%",
      skip: String(currentPage.value * perPage.value),
      limit: String(perPage.value),
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchConcludedAuctionsRejectedRefund", true);
      if (rs.isValid("FetchConcludedAuctionsRejectedRefund")) {
        products.value = res.result.concludedAuctions;
        //console.log(res.result, "concluded result**********");
        //console.log(res.result.concludedAuctions,"concluded auction@@@@@@@")
        totalRows.value = res.result.rowCount.totalRows;
        //console.log("totalRows@@@@",totalRows)
        //console.log("auctionDetails.value.length", products.value.length);
        for (var i = 0; i < products.value.length; i++) {
          products.value[i].srNo = currentPage.value * perPage.value + i + 1;
          //console.log("SrNo-", currentPage.value * perPage.value + i + 1);
        }
      } else {
        rs.showErrorToast("FetchConcludedAuctionsRejectedRefund");
      }
    });
}

function FetchRejectedH1BidderAuctionDetails(val) {
  
    new MQL()
    .useManagementServer()
    .setActivity("r.[FetchRejectedH1BidderAuctionDetails]")
    .setData({"auctionCode":val})
    .fetch()
    .then(rs => {
    let res = rs.getActivity("FetchRejectedH1BidderAuctionDetails",true)
    if (rs.isValid("FetchRejectedH1BidderAuctionDetails")) {
              bidderDetails.value = res.result
    } else
     { 
    rs.showErrorToast("FetchRejectedH1BidderAuctionDetails")
    }
    })
    
}

function viewDetails(value) {
  console.log("received value ",value)
  FetchRejectedH1BidderAuctionDetails(value)
  // visible.value=true
}

let refundBidderList=ref([])
let response = ref()

function UpdateRejectedRefundStatus(val) {
  
        // Automatically generated
    new MQL()
    .useManagementServer()
    .setActivity("r.[UpdateRejectedStatus]")
    .setData({"auctionCode":val})
    .fetch()
     .then(rs => {
    let res = rs.getActivity("UpdateRejectedStatus",true)
    if (rs.isValid("UpdateRejectedStatus")) {
      toaster.success("Refund Initiated");
      window.location.reload();
    } else
     { 
    // rs.showErrorToast("UpdateNonH1AuctionRefundStatus")
    toaster.error("Refund could not be Initiated Please try again after some time");
    }
    })
    
}

async function startRefund(val) {

  confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Proceed',
        accept: () => {

  loading.value=true
  
          new MQL()
          .useManagementServer()
    .setActivity("r.[FetchRejectedDetailsStartRefund]")
    .setData({"auctionCode":val,"userId":parseInt(loginStore.loginId)})
      .fetch()
      .then(async rs => {
          let res = rs.getActivity("FetchRejectedDetailsStartRefund", true)
          if (rs.isValid("FetchRejectedDetailsStartRefund")) {
              refundBidderList.value = res.result;
              console.log("refundBidderList is ",refundBidderList.value)

                  try {
                      const result = await axios.post("/refundsettlement-server/refund", refundBidderList.value);
                      console.log("response.valueis "+result.data) //Refund processed successfully
                      // toaster.success("Refund Initiated");

                      if(result.data == "Refund processed successfully") {
                        UpdateRejectedRefundStatus(val)
                        
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
              rs.showErrorToast("FetchRejectedDetailsStartRefund")
          }
      })

    },
        reject: () => {
            toaster.error('Refund Process Cancelled');
        }
    });


}

const onRowExpand = (event) => {
console.log("Print here "+event.data.auctionCode)
expandedRows.value = [event.data];
viewDetails(event.data.auctionCode)
};

</script>
