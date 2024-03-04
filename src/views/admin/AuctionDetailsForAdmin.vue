<template>
    <div class="card">

        <div class="profile-header">
            <h2>Upcoming Auctions</h2>
        </div>
        <div class="table-custom">

            <div class="box-section">
                <div class="bs-header">
                    Auction Details
                </div>
                <div class="bs-item-holder">
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Auction Type:</div>
                        <div class="bs-value">{{ auctionDetails.auctionType }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Auction Method:</div>
                        <div class="bs-value">{{ auctionDetails.auctionMethodName }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Auction Process:</div>
                        <div class="bs-value">{{ auctionDetails.auctionProcessName }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Bid Placement:</div>
                        <div class="bs-value">{{ auctionDetails.bidPlacementName }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">District:</div>
                        <div class="bs-value">{{ auctionDetails.district }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">MC:</div>
                        <div class="bs-value">{{ auctionDetails.mcName }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Location:</div>
                        <div class="bs-value">{{ auctionDetails.location }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Area:</div>
                        <div class="bs-value">{{ auctionDetails.area }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Participants:</div>
                        <div class="bs-value">{{ auctionDetails.participants }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Total EMD Paid For:</div>
                        <div class="bs-value">{{ auctionDetails.emdPaid }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Properties Available:</div>
                        <div class="bs-value">Upto {{ auctionDetails.itemCount }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">EMD:</div>
                        <div class="bs-value">{{ auctionDetails.eventEmdProcessingFees }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Reserve Price:</div>
                        <div class="bs-value">{{ auctionDetails.reservePrice }}</div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Modifier Value:</div>
                        <div class="bs-value">{{ auctionDetails.modifierValue }}</div>
                    </div>
                    <div class="bs-item col-span-6" v-for="(doc, index) in auctionDetails.auctionDocuments"
                        :key="index">
                        <div class="bs-buttons">
                            <a :href="doc.documentPath" class="btn btn-sm btn-secondary">{{ doc.documentTypeName }}</a>
                        </div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-buttons">
                            <Button @click="visible6 = true">
                                Available Properties

                                <Dialog v-model:visible="visible6" modal 
                                    :style="{ width: '50rem' }">

                                    <div class="box-section">
                                        <div class="bs-header">
                                            Available Properties
                                        </div>
                                        <div class="bs-item-holder">
                                            <div class="bs-item col-span-6" v-for="item in auctionDetails.item" :key="item.id">
                                                <div class="bs-label">Item Name:</div>
                                                <div class="bs-value"> {{ item.item }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <span >
                                        {{ item }}
                                    </span>
                                     </Dialog>
                            </button>
                        </div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-buttons">
                            <schedule-button :entity-id="loginStore.loginDetails.entityId"
                                :auction-id="auctionDetails.auctionCode" :item-list="auctionDetails.item"
                                v-model:startDate="auctionDetails.auctionStartDate"
                                v-model:endDate="auctionDetails.auctionEndDate"
                                v-model:users="auctionDetails.users"></schedule-button>
                        </div>
                    </div>
                </div>

            </div>

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
const auctionDetails = ref({});
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
                res.result.fetchAuctionDetails.users = res.result.users.map(el => el.userId);
                const auctionDetailObj = res.result.fetchAuctionDetails;
                console.log(auctionDetailObj, "auctionDetails")

                // Map documents to an object with documentTypeName as key and documentPath as value
                const documentsMap = {};
                auctionDetailObj.auctionDocuments.forEach(doc => {
                    documentsMap[doc.documentTypeName] = doc.documentPath;
                });

                // Assign documentsMap to auctionDetailObj
                auctionDetailObj.documentsMap = documentsMap;

                auctionDetails.value = auctionDetailObj;
                console.log(auctionDetails.value, "auctionDetails.value********");
                console.log(auctionDetails.value, "auctionDetails.value********");

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
}
</style>