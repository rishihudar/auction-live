<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h5 class="title">Auction {{ auctionId }} Summary Page</h5>
                <!-- <Breadcrumb :model="crumbs">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <span :class="[item.icon, 'text-color']" />
                                <span class="bi-label">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <span v-else v-bind="props.action">
                            <span class="bi-label">{{ item.label }}</span>
                        </span>
                    </template>
                </Breadcrumb> -->
            </div>
        </div>
        <div class="box-preview-wrapper">
            <div class="box-section box-section-light">
                <div class="bs-header">
                    Step1 Details
                    <div class="bs-action">
                        <Button v-if="config?.step1.editable" severity="secondary" class="btn-sm"
                            @click="visible1 = true">
                            <fa-pen-to-square></fa-pen-to-square> Edit

                        </Button>
                        <Dialog v-model:visible="visible1" :draggable="false" modal :style="{ width: '50rem' }">
                            <Step1 :auction-id="auctionId" :config="config?.step1.fieldConfig" @next-tab="step1Save()"
                                @previous-tab="step1Save()" />
                        </Dialog>
                    </div>
                </div>
                <div class="bs-item-holder">
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Auction Type:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].auctionType }}
                        </div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Auction Method:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].auctionMethodName }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-section box-section-light">
                <div class="bs-header">
                    Step2 Details
                    <div class="bs-action">
                        <Button v-if="config?.step2.editable" severity="secondary" class="btn-sm"
                            @click="visible2 = true">
                            <fa-pen-to-square></fa-pen-to-square> Edit

                        </Button>
                        <Dialog v-model:visible="visible2" modal :style="{ width: '75rem' }">
                            <Step2 :auction-id="auctionId" :config="config?.step2.fieldConfig" @next-tab="step2Save"
                                @previous-tab="step2Save" />
                        </Dialog>
                    </div>
                </div>
                <div class="bs-item-holder">
                    <div class="bs-item col-span-4">
                        <div class="bs-label">Reference Number:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].auctionType }}
                        </div>
                    </div>
                    <div class="bs-item col-span-4">
                        <div class="bs-label">Auction Category:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].inventoryCategoryName }}
                        </div>
                    </div>
                    <div class="bs-item col-span-4">
                        <div class="bs-label">Auction Description:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].auctionDescription }}
                        </div>
                    </div>
                    <div class="bs-item col-span-4">
                        <div class="bs-label">Auction Process:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].auctionProcessName }}
                        </div>
                    </div>
                    <!-- <div class="bs-item col-span-4">
                        <div class="bs-label">Department:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].departmentName }}
                        </div>
                    </div> -->
                    <div class="bs-item col-span-4">
                        <div class="bs-label">Bid Submission/Placement:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].bidPlacementName }}
                        </div>
                    </div>
                    <!-- <div class="bs-item col-span-3">
                        <div class="bs-label">Event Processing Fee Mode:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].eventProcessingFeeMode }}
                        </div>
                    </div> -->
                    <div class="bs-item col-span-3">
                        <div class="bs-label">Event Processing Fee Amount:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].eventProcessingFees }}
                        </div>
                    </div>
                    <!-- <div class="bs-item col-span-3">
                        <div class="bs-label">EMD Fee Payment Mode:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].eventProcessingFeeMode }}
                        </div>
                    </div> -->
                    <div class="bs-item col-span-3">
                        <div class="bs-label">EMD Applied For:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].emdAppliedFor }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-section box-section-light">
                <div class="bs-header">
                    Step3 Details
                    <div class="bs-action">
                        <Button v-if="config?.step3.editable" severity="secondary" class="btn-sm"
                            @click="visible3 = true">
                            <fa-pen-to-square></fa-pen-to-square> Edit
                        </Button>
                        <Dialog v-model:visible="visible3" modal :style="{ width: '60rem' }">
                            <Step3 :auction-id="auctionId" :config="config?.step3.fieldConfig" @next-tab="step3Save"
                                @previous-tab="step3Save" />
                        </Dialog>
                    </div>
                </div>
                <div class="bs-item-holder">
                    <div class="bs-item col-span-4">
                        <div class="bs-label">Item Id:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].inventoryId }}
                        </div>
                    </div>
                    <div class="bs-item col-span-4">
                        <div class="bs-label">Item Name:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].inventoryHierarchy }}
                        </div>
                    </div>
                    <div class="bs-item col-span-4">
                        <div class="bs-label">Reserve Price:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].reservePrice }}
                        </div>
                    </div>
                    <div class="bs-item col-span-4">
                        <div class="bs-label">Modifier Value:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].modifierValue }}
                        </div>
                    </div>
                    <div class="bs-item col-span-4">
                        <div class="bs-label">Modifier Value Change After:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].modifierValueChangeName }}
                        </div>
                    </div>
                    <div class="bs-item col-span-4" v-if="auctionItemDocumentPath != '/'">
                        <div class="bs-buttons bs-buttons-left">
                            <!-- <a class="btn btn-sm btn-secondary" :href="auctionItemDocumentPath" target="_blank"> Auction Item Document</a> -->
                            <button class="btn btn-sm btn-secondary" @click="DownloadDocument(auctionItemDocumentPath)">
                                Auction Item Document
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-section box-section-light">
                <div class="bs-header">
                    Step4 Details
                    <div class="bs-action">
                        <Button v-if="config?.step4.editable" severity="secondary" class="btn-sm"
                            @click="visible4 = true">
                            <fa-pen-to-square></fa-pen-to-square> Edit
                        </Button>
                        <Dialog v-model:visible="visible4" modal :style="{ width: '60rem' }">
                            <Step4 :auction-id="auctionId" :config="config?.step4.fieldConfig" @next-tab="step4Save"
                                @previous-tab="step4Save" />
                        </Dialog>
                    </div>
                </div>
                <div class="bs-item-holder">
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Processing Fee and EMD Payment Start date:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].startDate }}
                        </div>
                    </div>
                    <div class="bs-item col-span-6">
                        <div class="bs-label">Processing Fee and EMD Payment End date:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].endDate }}
                        </div>
                    </div>
                    <div class="bs-item col-span-full">
                        <div class="bs-buttons">
                            <!-- <a class="btn btn-sm btn-secondary" :href="auctionDocumentPath" target="_blank"> Auction -->
                                <!-- Item</a> -->
                            <button class="btn btn-sm btn-secondary" @click="DownloadDocument(auctionDocumentPath)">Auction Document</button>
                            <!-- <a class="btn btn-sm btn-secondary" :href="auctionNoticeDocumentPath" target="_blank">
                                Notice
                                Document</a> -->
                            <button class="btn btn-sm btn-secondary" @click="DownloadDocument(auctionNoticeDocumentPath)">Notice Document</button>
                        </div>
                    </div>

                </div>
            </div>

            <History v-if="workflowStepDetailsId" :workflow-step-details-id="workflowStepDetailsId" />

            <!-- <Card class="profile-card">
                <template #header>
                    <div class="profile-header">
                        <h1>Auction {{ auctionId }} Summary Page</h1>
                    </div>
                </template>

                <template #content>
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

                            <Button v-if="config?.step1.editable" label="Edit" @click="visible1 = true" />
                            <Dialog v-model:visible="visible1" :draggable="false" modal :style="{ width: '50rem' }">
                                <Step1 :auction-id="auctionId" :config="config?.step1.fieldConfig" @next-tab="step1Save()" @previous-tab="step1Save()" />
                            </Dialog>
                        </div>
                    </div>

                    <Divider />

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
                            <Button v-if="config?.step2.editable" label="Edit" @click="visible2 = true" />
                            <Dialog v-model:visible="visible2" modal :style="{ width: '75rem' }">
                                <Step2 :auction-id="auctionId" :config="config?.step2.fieldConfig" @next-tab="step2Save" @previous-tab="step2Save" />
                            </Dialog>
                        </div>
                    </div>

                    <Divider />

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
                            <Button v-if="config?.step3.editable" label="Edit" @click="visible3 = true" />
                            <Dialog v-model:visible="visible3" modal :style="{ width: '60rem' }">
                                <Step3 :auction-id="auctionId" :config="config?.step3.fieldConfig" @next-tab="step3Save" @previous-tab="step3Save" />
                            </Dialog>
                        </div>
                    </div>

                    <Divider />
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
                            <Button v-if="config?.step4.editable" label="Edit" @click="visible4 = true" />
                            <Dialog v-model:visible="visible4" modal :style="{ width: '60rem' }">
                                <Step4 :auction-id="auctionId" :config="config?.step4.fieldConfig" @next-tab="step4Save" @previous-tab="step4Save" />
                            </Dialog>
                        </div>

                    </div>

                    <Divider />

                    <History v-if="workflowStepDetailsId" :workflow-step-details-id="workflowStepDetailsId" />

                </template>
            </Card> -->
        </div>
    </div>



</template>

<script setup>
import { ref, onMounted } from "vue";
import MQL from "@/plugins/mql.js";
import History from "./History.vue";
import Step1 from "./admin/AuctionPreparation/Step1.vue";
import Step2 from "./admin/AuctionPreparation/Step2.vue";
import Step3 from "./admin/AuctionPreparation/Step3.vue";
import Step4 from "./admin/AuctionPreparation/Step4.vue";
import Dialog from 'primevue/dialog';
import MQLCdn from '@/plugins/mqlCdn.js';

import faPenToSquare from '../../assets/icons/pen-to-square.svg'


const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const crumbs = ref([
    { label: 'Home', route: '/home' },
    { label: 'Auction', route: '/home' },
    { label: 'Aution Preview' }
])

const { auctionId, workflowStepDetailsId, config } = defineProps({
    auctionId: {
        type: [Number, String],
        default: null,
        required: true
    },
    workflowStepDetailsId: {
        type: [Number, String],
        default: null,
    },
    config: {
        type: Object,
        default: null
    }
})



const auctionNoticeDocumentPath = ref("");
const auctionItemDocumentPath = ref("");
const auctionDocumentPath = ref("");

function step1Save() {
    visible1.value = false
    FetchAuctionSummaryByAuctionId()
}
function step2Save() {
    visible2.value = false
    FetchAuctionSummaryByAuctionId()
}
function step3Save() {
    visible3.value = false
    FetchAuctionSummaryByAuctionId()
}
function step4Save() {
    visible4.value = false
    FetchAuctionSummaryByAuctionId()
}


const auctionSummary = ref([{}]);

function FetchAuctionSummaryByAuctionId() {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionSummaryByAuctionId]")
        .setData({ "auctionId": auctionId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionSummaryByAuctionId", true)
            //console.log(res, "res")
            if (rs.isValid("FetchAuctionSummaryByAuctionId")) {
                auctionSummary.value = res.result
                //console.log(auctionSummary.value, "auctionSummary")

                let updatedAuctionSummary = auctionSummary.value[0]
                //console.log(auctionSummary.value.length, "auctionSummary.value.length")
                for (let i = 1; i < auctionSummary.value.length; i++) {
                    let index = i;
                    let refKey = `ref${index}`;
                    updatedAuctionSummary[refKey] = {
                        "documentPath": auctionSummary.value[i].documentPath,
                        "documentTypeName": auctionSummary.value[i].documentTypeName
                    };

                }
                //console.log(updatedAuctionSummary, "updatedAuctionSummary")

                auctionSummary.value.forEach((item) => {
                    if (item.documentTypeName == "AUCTION_ITEM_DOCUMENT") {
                        auctionItemDocumentPath.value = item.documentPath
                        //console.log(auctionItemDocumentPath.value, "auctionItemDocumentPath")
                    }
                    if (item.documentTypeName == "AUCTION_DOCUMENT") {
                        auctionDocumentPath.value = item.documentPath
                        //console.log(auctionDocumentPath.value, "auctionDocumentPath")
                    }
                    if (item.documentTypeName == "NOTICE_DOCUMENT") {
                        auctionNoticeDocumentPath.value = item.documentPath
                        //console.log(auctionNoticeDocumentPath.value, "auctionNoticeDocumentPath")
                    }
                });
            } else {
                rs.showErrorToast("FetchAuctionSummaryByAuctionId")
            }
        })
}
function DownloadDocument(url) {
    //console.log(url, "url")
    if (url !== "") {
        new MQLCdn()
            .setCDNPath(url)
            .enablePageLoader(true)
            .downloadFile("downloadBtn")
            .then((res) => {
                if (!res.isValid()) {
                    res.showErrorToast();
                }
            });
    } else {
        toaster.error("File can'nt be downloaded!")
    }
};
onMounted(() => {
    FetchAuctionSummaryByAuctionId()
})


</script>