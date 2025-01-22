<template>
    <DataTable v-model:expandedRows="expandedRows" :value="auctionBidderDetails" showGridlines>
        <template #empty>
            <div class="box-watermark">
                No Bidder Found For Auction: {{ auctionCode }}
            </div>
        </template>
        <Column field="auctionCode" header="Auction Code"> </Column>
        <Column field="fullName" header="Bidder Name"> </Column>
        <Column field="email" header="Bidder EmailId"> </Column>
        <Column field="mobileNo" header="Bidder Mobile Number"> </Column>
        <Column field="refundStatus" header="Refund Status"> </Column>
        <Column header="Action">
            <template #body="slotProps">
                <Button severity="secondary" @click="showDetails(slotProps.data)">
                    Details
                </Button>
            </template>
        </Column>
    </DataTable>

    <!-- Dialog for displaying bidder details -->
    <Dialog v-model:visible="visible" modal header="Refund Details (Cancelled Auction)" :style="{ width: '50rem' }">
        <div class="form-grid">
            <Toast />
            <div class="col-span-full md:col-span-6">
                <div class="fm-group">
                    <label class="fm-label">Bidder Name: </label>
                    {{ bidderDetails.fullName }}
                </div>
            </div>
            <div class="col-span-full md:col-span-6">
                <div class="fm-group">
                    <label class="fm-label">Bidder Email: </label>
                    {{ bidderDetails.email }}
                </div>
            </div>
            <div class="col-span-full md:col-span-6">
                <div class="fm-group">
                    <label class="fm-label">Auction Code: </label>
                    {{ bidderDetails.auctionCode }}
                </div>
            </div>
            <div class="col-span-full md:col-span-6">
                <div class="fm-group">
                    <label class="fm-label">Auction EMD: </label>
                    {{ bidderDetails.auctionEmd }}
                </div>
            </div>
            <div class="col-span-full md:col-span-6">
                <div class="fm-group">
                    <label class="fm-label">EMD Paid For: </label>
                    {{ bidderDetails.emdPaidFor}}
                </div>
            </div>
            <div class="col-span-full md:col-span-6">
                <div class="fm-group">
                    <label class="fm-label">Total EMD Amount Paid: ( {{ bidderDetails.auctionEmd }} * {{ bidderDetails.emdPaidFor }} )</label>
                    <span> {{ bidderDetails.amount }} </span>
                </div>
            </div>
            
            <div class="col-span-full md:col-span-6">
                <div class="fm-group">
                    <label class="fm-label">Refund Amount:  </label>
                    {{ bidderDetails.refundAmount }}
                </div>
            </div>
            <div class="fm-action fm-action-center">
                <Button severity="danger" @click="visible = false" label="Close"></Button>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import MQL from "@/plugins/mql.js";
import { useToast } from "primevue/usetoast";

const props = defineProps({
    auctionId: Number,
    auctionCode: String
});

const auctionBidderDetails = ref([]);
const bidderDetails = ref({});
const visible = ref(false);

function fetchAuctionBidderDetails() {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchCancelledAuctionBidderDetails]")
        .setData({
            auctionId: props.auctionCode
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchCancelledAuctionBidderDetails", true);
            if (rs.isValid("FetchCancelledAuctionBidderDetails")) {
                auctionBidderDetails.value = res.result;
            } else {
                rs.showErrorToast("FetchCancelledAuctionBidderDetails");
            }
        });
}

function showDetails(data) {
    bidderDetails.value = { ...data };
    visible.value = true;
}

onMounted(() => {
    fetchAuctionBidderDetails();
});
</script>
