
<template>
    <div>
        <div class="p-grid">
            <div class="p-col-12">
                <div class="card">
                    <DataTable :value="concludedAuctionsBidder" :paginator="true" :rows="5" :rowsPerPageOptions="[5,10,20]" 
                    :currentPage="currentPage" :totalRecords="concludedAuctionsBidder.length" :paginatorPosition="'bottom'" 
                    :paginatorTemplate="paginatorTemplate" :globalFilter="filter" :filters="filters" 
                    :expandedRows="expandedRows"  :sortMode="'multiple'">
                        <Column field="serial_number" header="SR. NO." :sortable="true" :filter="true"></Column>
                        <Column field="emailId" header="BIDDER Email ID" :sortable="true" :filter="true"></Column>
                        <Column field="userId" header="BIDDER LOGIN ID" :sortable="true" :filter="true"></Column>
                        <Column field="uniqueIpCount" header="IP COUNT" :sortable="true" :filter="true">
                            <template #body="slot">
                                <span @click="showModal(slot.data.auctionId, slot.data.userId)">{{slot.data.uniqueIpCount}}</span>
                            </template>
                        </Column>
                    </DataTable>
                </div>
                <div>
                    <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }" header="Bidder IP Details">
                        <DataTable :value="biddersIPAddresses" :paginator="true" :rows="5" :rowsPerPageOptions="[5,10,20]" 
                    :currentPage="currentPage" :totalRecords="biddersIPAddresses.length" :paginatorPosition="'bottom'" 
                    :paginatorTemplate="paginatorTemplate" :globalFilter="filter" :filters="filters" 
                    :expandedRows="expandedRows"  :sortMode="'multiple'">
                        <Column field="serial_number" header="SR. NO." :sortable="true" :filter="true"></Column>
                        <Column field="ipAddress" header="BIDDER'S IP ADDRESSES" :sortable="true" :filter="true"></Column>
                    </DataTable>
                    </Dialog>   
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import MQL from "@/plugins/mql.js";
import Dialog from 'primevue/dialog';


const props = defineProps({
    auctionId: Number
});
const visible = ref(false);
let auctionId = ref(props.auctionId)
const aucId = ref('');
const bidderUserId = ref('');
const currentPage = ref(1);
const filter = ref('');
const filters = ref({
    global: { value: null }
});
const expandedRows = ref([]);
const paginatorTemplate = 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown';

const concludedAuctionsBidder = ref([]);
const biddersIPAddresses = ref([]);


function showModal(auctionId, userId) {
    visible.value = true;
    console.log(visible.value, "visible");
    aucId.value = auctionId;
    console.log(aucId.value, "auctionId");
    bidderUserId.value = userId;
    console.log(bidderUserId.value, "bidderUserId");


    fetchBiddersIPAddress();
}

function ArrayCreation(arr){// Loop through the array with the index and object
    arr.forEach((item, index) => {
    // Add dummy data and the serial number
    item.serial_number = index + 1;
});

}
function fetchConcludedAuctionsBidderDetails() {
    //console.log("Selected Entity Id", login().loginDetails);
    new MQL()
    .useManagementServer()
      .setActivity("r.[FetchConcludedAuctionsBidderDetails]")
      .setData({
        auctionId: auctionId.value,
      })
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("FetchConcludedAuctionsBidderDetails", true);
        if (rs.isValid("FetchConcludedAuctionsBidderDetails")) {
            concludedAuctionsBidder.value = res.result;
            ArrayCreation(concludedAuctionsBidder.value);
            console.log(concludedAuctionsBidder.value, "concludedAuctionsBidder");
        } else {
          rs.showErrorToast("FetchConcludedAuctionsBidderDetails");
        }
      });
  }

  function fetchBiddersIPAddress() {
    //console.log("Selected Entity Id", login().loginDetails);
    new MQL()
    .useManagementServer()
      .setActivity("r.[FetchBiddersIPAddress]")
      .setData({
        auctionId: aucId.value,
        userId: bidderUserId.value,
      })
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("FetchBiddersIPAddress", true);
        if (rs.isValid("FetchBiddersIPAddress")) {
            biddersIPAddresses.value = res.result;
            ArrayCreation(biddersIPAddresses.value);
            console.log(biddersIPAddresses.value, "biddersIPAddresses");
        } else {
          rs.showErrorToast("FetchBiddersIPAddress");
        }
      });
  }
onMounted(() => {
    // FetchAuctionDetailsByAuctionId()
    fetchConcludedAuctionsBidderDetails();
});
</script>
