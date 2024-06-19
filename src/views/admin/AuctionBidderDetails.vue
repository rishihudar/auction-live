<template>
    <DataTable v-model:expandedRows="expandedRows" :value="auctionBidderDetails" showGridlines>
        <template #empty>
                    <div class="box-watermark">
                        No Auctions Found
                    </div>
                </template>
                <Column field="auctionId" header="AuctionId"> </Column>
                <Column field="name" header="Bidder Name"> </Column>
                <Column field="email" header="Bidder EmailId"> </Column>
                <Column field="mobileNo" header="Bidder Mobile Number"> </Column>
                <Column field="status" header="Refund Status"> </Column>
                <Column header="Action">   
                    <template #body="slotProps">
                        <Button severity="secondary" @click="visible = true">
                             Details
                        </Button> 
                    </template>                  
                </Column>
    </DataTable>

    <Dialog v-model:visible="visible" modal header="Refund Details (Cancelled Auction)" :style="{ width: '50rem' }">
            <div class="form-grid">
                <Toast />
                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Bidder Name: </label>
                        {{ auctionBidderDetails[0].name }}
                    </div>
                </div>
                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Bidder Email: </label>
                        {{ auctionBidderDetails[0].email }}
                    </div>
                </div>

                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Auction Id: </label>
                        {{ auctionBidderDetails[0].auctionId }}
                    </div>
                </div>

                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Auction EMD: </label>
                        {{ auctionBidderDetails[0].auctionEMD }}
                    </div>
                </div>

                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">EMD Paid For: </label>
                        {{ auctionBidderDetails[0].processingFeesCount }}
                    </div>
                </div>

                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Total EMD Amount Paid: ( {{auctionBidderDetails[0].auctionEMD }} * {{ auctionBidderDetails[0].processingFeesCount }} )</label>
                       <span>  {{ auctionBidderDetails[0].totalEMDPaid }} </span>
                    </div>
                </div>

                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">No. of Properties Allocated: </label>
                        {{ auctionBidderDetails[0].propertyAllocated }}
                    </div>
                </div>

                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Refund Amount:( {{ auctionBidderDetails[0].totalEMDPaid }} - {{ auctionBidderDetails[0].auctionEMD }} * {{ auctionBidderDetails[0].propertyAllocated }}) </label>
                       
                    </div>
                </div>
                
                <div class="fm-action  fm-action-center">
                    <Button severity="danger" @click="visible = false" label="Close"></Button>
                </div>
            </div>
        </Dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import MQL from "@/plugins/mql.js";
// import Dialog from 'primevue/dialog';
// import { fetchAuctionStatus } from "../../plugins/helpers";
// import ScheduleButton from '@/components/SchedulerButton.vue';
// import ExtendButton from '@/components/ExtendParticipationDate.vue'
// import Calendar from "primevue/calendar";
// import { login } from "../../store/modules/login.js";
// import MQLCdn from '@/plugins/mqlCdn.js';
// import moment from "moment";
// import { useToast } from "primevue/usetoast";


const props = defineProps({
  auctionId: Number
});
const auctionBidderDetails = ref([{
    name: 'paresh zanjare',
    email: 'paresh@gmail.com',
    mobileNo: '8484840948',
    status: 'paid',
    auctionId: '123',
    auctionEMD: '40000',
    processingFeesCount: '2',
    propertyAllocated: '1',
    totalEMDPaid: '80000'
}])

const auctionId = ref()
const visible = ref(false);

function fetchAuctionBidderDetails(){
    auctionId.value = props.auctionId
    console.log("printing from AuctionBidderDetails: ", auctionId.value)

    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionBidderDetails]")
        .setData({

        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionBidderDetails", true)
            if (rs.isValid("FetchAuctionBidderDetails")) {
                auctionBidderDetails.value = res.result
            } else {
                rs.showErrorToast("FetchAuctionBidderDetails")
            }
        })
}

onMounted(() => {
    fetchAuctionBidderDetails()
});

</script>