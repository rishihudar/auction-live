

<template>
    <div class="profile-preview">
        <Card class="profile-card">
            <template #header>
                <div class="profile-header">
                    <h1>Auction Summary Page</h1>
                </div>
            </template>

            <template #content>
                <!-- Step1 Details -->

                <div class="profile-section">
                    <h2>Step1 Details</h2>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Auction Type:</label>
                        <span>{{ auctionSummary[0].auctionType }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Auction Method:</label>
                        <span>{{ auctionSummary[0].auctionMethodName }}</span>
                    </div>
                    <div class="ml-auto">
                        <Button label="Edit" @click="visible1 = true" />
                        <Dialog v-model:visible="visible1" modal :style="{ width: '50rem' }">
                            <Step1 :ref="Step1" />

                        </Dialog>
                    </div>

                </div>

                <!-- Divider -->
                <Divider />

                <!-- Step2 Details -->
                <div class="profile-section">
                    <h2>Step2 Details</h2>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Reference Number:</label>
                        <span>{{ auctionSummary[0].referenceNumber }}</span>
                    </div>

                    <div class="profile-field">
                        <label class="bold-label" for="address">Auction Category:</label>
                        <span>{{ auctionSummary[0].inventoryCategoryName }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Auction Description:</label>
                        <span>{{ auctionSummary[0].auctionDescription }}</span>
                    </div>
                    <div class="profile-field">

                        <label class="bold-label" for="address">Auction Process:</label>
                        <span>{{ auctionSummary[0].auctionProcessName }}</span>
                    </div>
                    <div class="profile-field">

                        <label class="bold-label" for="address">Department:</label>
                        <span>{{ auctionSummary[0].departmentName }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Bid Submission/Placement:</label>
                        <span>{{ auctionSummary[0].bidPlacementName }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Event Processing Fee Mode :</label>
                        <span>{{ auctionSummary[0].eventProcessingFeeMode }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Event Processing Fee Amount:</label>
                        <span>{{ auctionSummary[0].eventProcessingFees }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">EMD Fee Payment Mode:</label>
                        <span>{{ auctionSummary[0].eventProcessingFeeMode }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">EMD Applied For:</label>
                        <span>{{ auctionSummary[0].emdAppliedFor }}</span>
                    </div>
                    <div class="ml-auto">
                       
                    <Button label="Edit" @click="visible2 = true" />
                    <Dialog v-model:visible="visible2" modal :style="{ width: '75rem' }">
                        <Step2 :ref="Step2" />

                    </Dialog>
                    </div>
                </div>
                <Divider />

                <!-- Step3 Details -->
                <div class="profile-section">
                    <h2>Step3 Details</h2>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Item Id:</label>
                        <span>{{ auctionSummary[0].inventoryId }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Item Name:</label>
                        <span>{{ auctionSummary[0].inventoryHierarchy }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Reserved Price:</label>
                        <span>{{ auctionSummary[0].reservePrice }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Modifier Value:</label>
                        <span>{{ auctionSummary[0].modifierValue }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Modifier Value Change After:</label>
                        <span>{{ auctionSummary[0].modifierValueChangeName }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Auction Item Document:</label>
                        <span><a :href="auctionItemDocumentPath">Click Here</a></span>
                    </div>
                    <div class="ml-auto">
                       
                       <Button label="Edit" @click="visible3 = true" />
                       <Dialog v-model:visible="visible3" modal :style="{ width: '60rem' }">
                        <Step3 :ref="Step3" />

                       </Dialog>
                       </div>
                   
                </div>
                <Divider />

                <!-- Step4 Details -->
                <div class="profile-section">
                    <div class="profile-field">
                        <h2>Step4 Details</h2>
                        <label class="bold-label" for="address">Processing Fee and EMD Payment Start date:</label>
                        <span>{{ auctionSummary[0].startDate }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Processing Fee and EMD Payment End date:</label>
                        <span>{{ auctionSummary[0].endDate }}</span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Auction Document:</label>
                        <span><a :href="auctionDocumentPath">Click Here</a></span>
                    </div>
                    <div class="profile-field">
                        <label class="bold-label" for="address">Notice Document:</label>
                        <span><a :href="auctionNoticeDocumentPath">Click Here</a></span>
                    </div>
                    <div class="ml-auto">
                       
                       <Button label="Edit" @click="visible4 = true" />
                       <Dialog v-model:visible="visible4" modal :style="{ width: '60rem' }">
                        <Step4 :ref="Step4" />

                       </Dialog>
                       </div>
                </div>
                <Divider />
                <History v-if="true" />


            
            </template>
        </Card>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import Card from "primevue/card";
import Divider from "primevue/divider";
import MQL from "@/plugins/mql.js";
import { useRouter } from 'vue-router';
import History from "./History.vue";
import { useAuctionPreparation } from '@/store/auctionPreparation.js'
import { storeToRefs } from 'pinia'
import Step1 from "./admin/AuctionPreparation/Step1.vue";
import Step2 from "./admin/AuctionPreparation/Step2.vue";
import Step3 from "./admin/AuctionPreparation/Step3.vue";
import Step4 from "./admin/AuctionPreparation/Step4.vue";
import Dialog from 'primevue/dialog';


const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);

const store = useAuctionPreparation()
const { getLastInsertedAuctionId, getPropertyCategoryId, getIsClicked } = storeToRefs(store)


const router = useRouter();

const auctionNoticeDocumentPath = ref("");
const auctionItemDocumentPath = ref("");
const auctionDocumentPath = ref("");


const auctionSummary = ref([
    {}
]);

function FetchAuctionSummaryByAuctionId() {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionSummaryByAuctionId]")
        .setData({ "auctionId": getLastInsertedAuctionId.value })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionSummaryByAuctionId", true)
            console.log(res, "res")
            if (rs.isValid("FetchAuctionSummaryByAuctionId")) {
                auctionSummary.value = res.result
                console.log(auctionSummary.value, "auctionSummary")

                let updatedAuctionSummary = auctionSummary.value[0]
                console.log(auctionSummary.value.length, "auctionSummary.value.length")
                for (let i = 1; i < auctionSummary.value.length; i++) {
                    let index = i; //1,2
                    let refKey = `ref${index}`;
                    updatedAuctionSummary[refKey] = {
                        "documentPath": auctionSummary.value[i].documentPath,
                        "documentTypeName": auctionSummary.value[i].documentTypeName
                    };

                }
                console.log(updatedAuctionSummary, "updatedAuctionSummary")

                auctionSummary.value.forEach((item) => {
                    if (item.documentTypeName == "AUCTION_ITEM_DOCUMENT") {
                        auctionItemDocumentPath.value = item.documentPath
                        console.log(auctionItemDocumentPath.value, "auctionItemDocumentPath")
                    }
                    if (item.documentTypeName == "AUCTION_DOCUMENT") {
                        auctionDocumentPath.value = item.documentPath
                        console.log(auctionDocumentPath.value, "auctionDocumentPath")
                    }
                    if (item.documentTypeName == "NOTICE_DOCUMENT") {
                        auctionNoticeDocumentPath.value = item.documentPath
                        console.log(auctionNoticeDocumentPath.value, "auctionNoticeDocumentPath")
                    }
                });
            } else {
                rs.showErrorToast("FetchAuctionSummaryByAuctionId")
            }
        })
}
onMounted(() => {
    FetchAuctionSummaryByAuctionId()
})


</script>