<template>
    <div class="card">

        <div class="profile-header">
            <h2>Upcoming Auctions</h2>
        </div>
        <div class="table-custom">
            <DataTable v-model:expandedRows="expandedRows" :value="auctionDetails" @rowExpand="onRowExpand"
                @rowCollapse="onRowCollapse" showGridlines tableStyle="min-width: 50rem">

                <Column expander style="width: 50rem">
                    <template #rowtogglericon="">
                        Details
                    </template>
                </Column>
                <template #expansion="slot">
                    <div class="box-section">
                        <div class="bs-header">
                            Auction Details
                        </div>
                        <div class="bs-item-holder">
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Auction Type:</div>
                                <div class="bs-value">{{ slot.data.auctionType }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Auction Method:</div>
                                <div class="bs-value">{{ slot.data.auctionMethodName }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Auction Process:</div>
                                <div class="bs-value">{{ slot.data.auctionProcessName }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Bid Placement:</div>
                                <div class="bs-value">{{ slot.data.bidPlacementName }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">District:</div>
                                <div class="bs-value">{{ slot.data.district }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">MC:</div>
                                <div class="bs-value">{{ slot.data.mcName }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Location:</div>
                                <div class="bs-value">{{ slot.data.location }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Area:</div>
                                <div class="bs-value">{{ slot.data.area }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Participants:</div>
                                <div class="bs-value">{{ slot.data.participants }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Total EMD Paid For:</div>
                                <div class="bs-value">{{ slot.data.emdPaid }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Properties Available:</div>
                                <div class="bs-value">Upto {{ slot.data.itemCount }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">EMD:</div>
                                <div class="bs-value">{{ slot.data.eventEmdProcessingFees }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Reserve Price:</div>
                                <div class="bs-value">{{ slot.data.reservePrice }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Modifier Value:</div>
                                <div class="bs-value">{{ slot.data.modifierValue }}</div>
                            </div>
                            <div class="bs-item col-span-6" v-for="(doc, index) in slot.data.auctionDocuments" :key="index">
                                <div class="bs-buttons">
                                    <a :href="doc.documentPath" class="btn btn-sm btn-secondary">{{ doc.documentTypeName }}</a>
                                </div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-buttons">
                                    <Button @click="visible6 = true">
                                        Available Properties
                                        <Dialog v-model:visible="visible6" modal header="Available Properties" :style="{ width: '50rem' }">
                                            <div class="box-options">
                                                <Listbox :options="slot.data.item" optionLabel="item" class="w-full md:w-14rem" />
                                            </div>
                                        </Dialog>
                                    </button>
                                </div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-buttons">
                                    <schedule-button :entity-id="loginStore.loginDetails.entityId" :auction-id="slot.data.auctionCode" :item-list="slot.data.item"
                                    v-model:startDate="slot.data.auctionStartDate" v-model:endDate="slot.data.auctionEndDate" v-model:users="slot.data.users"></schedule-button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </template>
            </DataTable>
        </div>
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
import ScheduleButton from '@/components/SchedulerButton.vue'
import { login } from "../../store/modules/login.js";

const visible6 = ref(false);
const expandedRows = ref([]);
const auctionDetails = ref([]);
import { defineProps } from 'vue';
const loginStore = login();
const { auctionId } = defineProps({
    auctionId: Number
})

async function FetchAuctionDetailsByAuctionIdAdmin() {
    var participantsStatusId = await fetchAuctionStatus("AUCTION_PARTICIPATION");
    var emdStatusId = await fetchAuctionStatus("AUCTION_EMD_FEES_PAID");
    console.log(participantsStatusId.result.statusId, emdStatusId.result.statusId, auctionId, "participantsStatusId, emdStatusId, auctionId");
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionDetailsByAuctionIdAdmin]")
        .setData({
            auctionId: auctionId,
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
                res.result.fetchAuctionDetails.users = res.result.users.map(el=>el.userId);
                const auctionDetail = res.result.fetchAuctionDetails;
                console.log(auctionDetail, "auctionDetails")

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
    width: 120px;
    /* Adjust width as needed */
    margin-right: 10px;
    /* Example margin between label and span */
}

.profile-field {
    margin-bottom: 10px;
    /* Example margin */
    border-bottom: 1px solid #ccc;
    /* Add border to separate fields */
}</style>