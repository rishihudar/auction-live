<template>
    <div class="card">
        <div class="profile-header">
            <h2>Upcoming Auctions</h2>
        </div>
        <DataTable v-model:expandedRows="expandedRows" :value="auctionDetails" @rowExpand="onRowExpand"
            @rowCollapse="onRowCollapse" showGridlines tableStyle="min-width: 50rem">
            <Column field="auctionCode" header="Auction Code"> </Column>
            <Column field="auctionDescription" header="Auction Description"> </Column>
            <Column field="inventoryCategoryName" header="Auction Category"> </Column>
            <Column field="eventProcessingFees" header="Auction Fees"> </Column>
            <Column field="startDate" header="Processing Fee StartDate/Time">
            </Column>
            <Column field="endDate" header="Processing Fee EndDate/Time">
            </Column>
            <Column expander style="width: 5rem" />
            <template #expansion="slot">
                <div class="card">
                    <div class="profile-field">
                        <label class="bold-label" for="auctionType">Auction Type:</label>
                        <span>{{ slot.data.auctionType }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="auctionMethodName">Auction Method:</label>
                        <span>{{ slot.data.auctionMethodName }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="auctionProcessName">Auction Process:</label>
                        <span>{{ slot.data.auctionProcessName }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="bidPlacementName">Bid Placement:</label>
                        <span>{{ slot.data.bidPlacementName }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="district">District:</label>
                        <span>{{ slot.data.district }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="mcName">MC:</label>
                        <span>{{ slot.data.mcName }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="location">Location:</label>
                        <span>{{ slot.data.location }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="area">Area:</label>
                        <span>{{ slot.data.AREA }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="itemCount">Properties Available:</label>
                        <span>Upto {{ slot.data.itemCount }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="eventEmdProcessingFees">EMD:</label>
                        <span>{{ slot.data.eventEmdProcessingFees }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="reservePrice">Reserve Price:</label>
                        <span>{{ slot.data.reservePrice }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="modifierValue">Modifier Value:</label>
                        <span>{{ slot.data.modifierValue }}</span>
                    </div>
                    <div class="profile-field">
                        <!-- <span>{{ slot.data.auctionDocuments[0].documentPath }}</span> -->
                        <span><a :href="slot.data.auctionDocuments[0].documentPath" class="document-link">Auction
                                Document</a></span>

                    </div>
                    <div class="profile-field">
                        <span><a :href="slot.data.auctionDocuments[1].documentPath" class="document-link">Notice
                                Document</a></span>
                    </div>
                    <div class="profile-field">
                        <span><a :href="slot.data.auctionDocuments[2].documentPath" class="document-link">Item
                                Document</a></span>
                    </div>
                </div>
            </template>
        </DataTable>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useAuctionPreparation } from '@/store/auctionPreparation.js'
import { storeToRefs } from 'pinia'
import MQL from "@/plugins/mql.js";

const store = useAuctionPreparation()
const { getLastInsertedAuctionId, getPropertyCategoryId, getIsClicked } = storeToRefs(store)

const expandedRows = ref([]);
const auctionDetails = ref([]);
function FetchAuctionDetailsByAuctionId() {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionDetailsByAuctionId]")
        .setData({ "auctionId": getLastInsertedAuctionId.value })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionDetailsByAuctionId", true)
            if (rs.isValid("FetchAuctionDetailsByAuctionId")) {
                console.log(res)
                res.result.fetchAuctionDetails['auctionDocuments'] = res.result.fetchDocuments
                auctionDetails.value.push(res.result.fetchAuctionDetails)
                console.log(auctionDetails.value, "auctionDetails.value")

            } else {
                rs.showErrorToast("FetchAuctionDetailsByAuctionId")
            }
        })

}

onMounted(() => {
    FetchAuctionDetailsByAuctionId()
});
</script>
<style scoped>
.document-link {
    color: blue;
    text-decoration: underline;
}
</style>