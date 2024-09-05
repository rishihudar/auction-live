<template>
    <DataTable v-model:expandedRows="expandedRows" :value="auctionBidderDetails" showGridlines>
        <template #empty>
                    <div class="box-watermark">
                        No Bidder Found For Auction: {{auctionCode}}
                    </div>
                </template>
                <Column field="auctionCode" header="Auction Code"> </Column>
                <Column field="fullName" header="Bidder Name"> </Column>
                <Column field="email" header="Bidder EmailId"> </Column>
                <Column field="mobileNo" header="Bidder Mobile Number"> </Column>
                <Column field="status" header="Refund Status"> </Column>
                <Column header="Action">   
                    <template #body="slotProps">
                        <Button severity="secondary" @click="fetchBidderTransactionDetails(slotProps.data.userId)">
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
                        {{ bidderDetails.fullName }}
                    </div>
                </div>
                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Bidder Email: </label>
                        {{ bidderDetails.email }}
                    </div>
                </div>

                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Auction Code: </label>
                        {{ bidderDetails.auctionCode }}
                    </div>
                </div>

                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Auction EMD: </label>
                        {{ bidderDetails.auctionEMD }}
                    </div>
                </div>

                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">EMD Paid For: </label>
                        {{ bidderDetails.processingFeesCount }}
                    </div>
                </div>

                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Total EMD Amount Paid: ( {{bidderDetails.auctionEMD }} * {{ bidderDetails.processingFeesCount }} )</label>
                       <span>  {{ bidderDetails.totalEMDPaid }} </span>
                    </div>
                </div>

                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">No. of Properties Allocated: </label>
                        {{ bidderDetails.propertyAllocated }}
                    </div>
                </div>

                <div class="col-span-full md:col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Refund Amount:( {{ bidderDetails.totalEMDPaid }} - {{ bidderDetails.auctionEMD }} * {{ bidderDetails.propertyAllocated }}) </label>
                       {{ bidderDetails.refundAmount }}
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
  auctionId: Number,
  auctionCode: String
});
// const auctionBidderDetails = ref([{
//     fullName: 'paresh zanjare',
//     email: 'paresh@gmail.com',
//     mobileNo: '8484840948',
//     status: 'paid',
//     auctionId: '123',
//     auctionCode: 'MCF-1',
//     auctionEMD: '40000',
//     processingFeesCount: '2',
//     propertyAllocated: '1',
//     totalEMDPaid: '80000',
//     refundAmount: '40000',
//     userId:''
// }])
const auctionBidderDetails = ref([])
const bidderDetails = ref({
    fullName: 'paresh zanjare',
    email: 'paresh@gmail.com',
    // mobileNo: '8484840948',
    // status: 'paid',
    auctionId: '123',
    auctionCode: 'MCF-1',
    auctionEMD: '40000',
    processingFeesCount: '2',
    totalEMDPaid: '80000',
    emdPaid: '40000',
    propertyAllocated: '1',
    refundAmount: '40000',
    userId:''
})

const auctionId = ref()
const visible = ref(false);

function fetchAuctionBidderDetails(){
    auctionId.value = props.auctionId
    //console.log("printing from AuctionBidderDetails: ", auctionId.value)

    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchCancelledAuctionBidderDetails]")
        .setData({
            auctionId: props.auctionId
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchCancelledAuctionBidderDetails", true)
            if (rs.isValid("FetchCancelledAuctionBidderDetails")) {
                auctionBidderDetails.value = res.result
               
                // for (let index = 0; index < auctionBidderDetails.length; index++) {
                //     auctionBidderDetails[index].value.auctionCode = props.auctionCode
                    
                // }
                //console.log("***************", auctionBidderDetails)
            } else {
                rs.showErrorToast("FetchCancelledAuctionBidderDetails")
            }
        })
}

function fetchBidderTransactionDetails(userId){
    //console.log("Printing userId from fetchBidderTransactionDetails: ", userId)
    //console.log("printing from fetchBidderTransactionDetails: ", auctionId.value)
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchCancelledAuctionBidderTransactionDetails]")
        .setData({
            userId: userId,
            auctionId: auctionId.value
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchCancelledAuctionBidderTransactionDetails", true)
            if (rs.isValid("FetchCancelledAuctionBidderTransactionDetails")) {
                bidderDetails.value = res.result

                if(bidderDetails.value != null){
                visible.value = true
                }
                //console.log("Printing from FetchCancelledAuctionBidderTransactionDetails: ", bidderDetails.value)
            } else {
                rs.showErrorToast("FetchCancelledAuctionBidderTransactionDetails")
            }
        })
}

onMounted(() => {
    fetchAuctionBidderDetails()
});

</script>