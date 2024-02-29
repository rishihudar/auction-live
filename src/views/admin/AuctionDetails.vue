<template>
    <div class="card">
        <div class="profile-header">
            <h2>Upcoming Auctions</h2>
        </div>
        <DataTable v-model:expandedRows="expandedRows" :value="auctionDetails" @rowExpand="onRowExpand"
            @rowCollapse="onRowCollapse" showGridlines tableStyle="min-width: 50rem">

            <Column expander style="width: 50rem">
                <template #rowtogglericon="">
                    <Button label="Action" />
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
import { useAuctionPreparation } from '@/store/auctionPreparation.js'
import { storeToRefs } from 'pinia'

import Listbox from 'primevue/listbox';

import MQL from "@/plugins/mql.js";

import Dialog from 'primevue/dialog';

const store = useAuctionPreparation()
const { getLastInsertedAuctionId, getPropertyCategoryId, getIsClicked } = storeToRefs(store)

const visible6 = ref(false);
const expandedRows = ref([]);
const auctionDetails = ref([]);

function FetchAuctionDetailsByAuctionId() {
    console.log(getLastInsertedAuctionId.value,"******")
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionDetailsByAuctionId]")
        .setData({ "auctionId": getLastInsertedAuctionId.value})
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionDetailsByAuctionId", true)
            if (rs.isValid("FetchAuctionDetailsByAuctionId")) {
                console.log(res)
                res.result.fetchAuctionDetails['auctionDocuments'] = res.result.fetchDocuments
                res.result.fetchAuctionDetails.item = JSON.parse("[" + res.result.fetchAuctionDetails.item + "]");
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