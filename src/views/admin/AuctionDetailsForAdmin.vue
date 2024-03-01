<template>
    <div class="card">
        
        <div class="profile-header">
            <h2>Upcoming Auctions</h2>
        </div>
        <DataTable v-model:expandedRows="expandedRows" :value="auctionDetails" @rowExpand="onRowExpand"
            @rowCollapse="onRowCollapse" showGridlines tableStyle="min-width: 50rem">

            <Column expander style="width: 50rem">
                <template #rowtogglericon="">
                    Details
                </template>
            </Column>
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
                        <span>{{ slot.data.area }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="area">Participants:</label>
                        <span>{{ slot.data.participants }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="area">Total EMD Paid For:</label>
                        <span>{{ slot.data.emdPaid}}</span>
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
                    <div class="profile-field" v-for="(doc, index) in slot.data.auctionDocuments" :key="index">
                        <span><a :href="doc.documentPath" class="document-link">{{ doc.documentTypeName }}</a></span>
                    </div>



                    <Button label="Available Properties" @click="visible6 = true" />
                    <Dialog v-model:visible="visible6" modal header="Available Properties" :style="{ width: '25rem' }">
                        <div class="profile-field">
                            <Listbox :options="slot.data.item" optionLabel="item" class="w-full md:w-14rem" />
                        </div>
                    </Dialog>

                </div>
            </template>
        </DataTable>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Listbox from 'primevue/listbox';
import MQL from "@/plugins/mql.js";
import Dialog from 'primevue/dialog';
import { fetchAuctionStatus } from "../../plugins/helpers";
const visible6 = ref(false);
const expandedRows = ref([]);
const auctionDetails = ref([]);
import { defineProps } from 'vue';

const  {auctionId}  = defineProps({
    auctionId: Number
})

async function FetchAuctionDetailsByAuctionIdAdmin() {
  var participantsStatusId = await fetchAuctionStatus("AUCTION_PARTICIPATION");
  var emdStatusId = await fetchAuctionStatus("AUCTION_EMD_FEES_PAID");
  console.log(participantsStatusId.result.statusId, emdStatusId.result.statusId, auctionId, "participantsStatusId, emdStatusId, auctionId");
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionDetailsByAuctionIdAdmin]")
        .setData( {
            auctionId:auctionId,
           participantStatusId: participantsStatusId.result.statusId,
           emdPaidStatusId: emdStatusId.result.statusId
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionDetailsByAuctionIdAdmin", true)
            if (rs.isValid("FetchAuctionDetailsByAuctionIdAdmin")) {
                console.log(res)
                res.result.fetchAuctionDetails['auctionDocuments'] = res.result.fetchDocuments
                res.result.fetchAuctionDetails.item = JSON.parse("[" + res.result.fetchAuctionDetails.item + "]");
                res.result.fetchAuctionDetails.participants = res.result.participationNEMD.participants;
                res.result.fetchAuctionDetails.emdPaid = res.result.participationNEMD.emdPaid;
                const auctionDetail = res.result.fetchAuctionDetails;
                console.log(auctionDetail,"auctionDetails")

                // Map documents to an object with documentTypeName as key and documentPath as value
                const documentsMap = {};
                auctionDetail.auctionDocuments.forEach(doc => {
                    documentsMap[doc.documentTypeName] = doc.documentPath;
                });

                // Assign documentsMap to auctionDetail
                auctionDetail.documentsMap = documentsMap;

                auctionDetails.value.push(auctionDetail);
                console.log(auctionDetails.value, "auctionDetails.value");

                // You can access document paths using auctionDetail.documentsMap in the template
            } else {
                rs.showErrorToast("FetchAuctionDetailsByAuctionIdAdmin")
            }
        })
}

onMounted(() => {
    FetchAuctionDetailsByAuctionIdAdmin()
});
</script>

<style scoped>
.document-link {
    color: blue;
    text-decoration: underline;
}
.profile-field label {
    display: inline-block;
    width: 120px; /* Adjust width as needed */
    margin-right: 10px; /* Example margin between label and span */
}
.profile-field {
    margin-bottom: 10px; /* Example margin */
    border-bottom: 1px solid #ccc; /* Add border to separate fields */
}
</style>