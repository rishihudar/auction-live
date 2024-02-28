<template>
    <div class="gap-2  mx-auto">
        <div class="fm-row">
            <div class="w-full">
                <div class="fm-group">
                    <h1> Auction ID:{{ getLastInsertedAuctionId }} </h1>
                </div>
            </div>
        </div>

        <Divider />

        <div class="fm-row">
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="username">Reference Number</label>
                    <InputText id="username" v-model="auctionDetails.referenceNo" placeholder="Enter Reference Number" />
                    <!-- <span v-if="$v.auctionDetails.referenceNo.$error" class="text-red-500">{{ $v.auctionDetails.referenceNo.$errors[0].$message }}</span> -->
                </div>
            </div>

            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step1">Auction Category<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.auctionCategory" option-value="propertyCategoryId" variant="filled"
                        :options="auctionCategory" optionLabel="propertyCategoryName" placeholder="Select Auction Category"
                        class="w-full md:w-14rem" />
                    <span v-if="$v.auctionDetails.auctionCategory.$error" class="text-red-500">{{
                        $v.auctionDetails.auctionCategory.$errors[0].$message }}</span>
                </div>
            </div>
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step2">Auction Process<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.auctionProcess" option-value="auctionProcessId" variant="filled"
                        :options="auctionProcess" optionLabel="auctionProcessName" placeholder="Select Auction Process"
                        class="w-full md:w-14rem" />
                    <span v-if="$v.auctionDetails.auctionProcess.$error" class="text-red-500">{{
                        $v.auctionDetails.auctionProcess.$errors[0].$message }}</span>
                </div>
            </div>
        </div>

        <Divider />

        <div class="fm-row">
            <!-- <div class="w-full">
                <div class="fm-group"> -->
            <div class="justify-content-center">
                <label for="step2">Auction Description<span class="text-danger">*</span> </label>
                <Textarea v-model="auctionDetails.description" autoResize rows="3" cols="111"
                    placeholder="Enter Description" />
                <span v-if="$v.auctionDetails.description.$error" class="text-red-500">{{
                    $v.auctionDetails.description.$errors[0].$message }}</span>
            </div>
            <!-- </div>
            </div> -->
        </div>

        <Divider />

        <div class="fm-row">
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step2">Department<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.department" option-value="departmentId" variant="filled"
                        :options="departments" optionLabel="departmentName" placeholder="Select Department"
                        class="w-full md:w-14rem" />
                    <span v-if="$v.auctionDetails.department.$error" class="text-red-500">{{
                        $v.auctionDetails.department.$errors[0].$message }}</span>
                </div>
            </div>
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step2">Bid Submission/Placement<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.bidPlacement" option-value="bidPlacementId" variant="filled"
                        :options="bidPlacements" optionLabel="bidPlacementName"
                        placeholder=" Select Bid Submission/Placement" class="w-full md:w-14rem" />
                    <span v-if="$v.auctionDetails.bidPlacement.$error" class="text-red-500">{{
                        $v.auctionDetails.bidPlacement.$errors[0].$message }}</span>
                </div>
            </div>
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step2">Event Processsing Fee Mode<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.eventProcesssingFeeMode" option-value="paymentModeId" variant="filled"
                        :options="paymentModes" optionLabel="paymentModeName"
                        placeholder="Select Event Processsing Fee Mode" class="w-full md:w-14rem" />
                    <span v-if="$v.auctionDetails.eventProcesssingFeeMode.$error" class="text-red-500">{{
                        $v.auctionDetails.eventProcesssingFeeMode.$errors[0].$message }}</span>
                </div>
            </div>
        </div>

        <Divider />

        <div class="fm-row">
            <div class="w-1/3">
                <div class="fm-group">
                    <!-- {{ $v.auctionDetails.eventProcessingFeeAmount}} -->
                    <label for="username">Event Processing Fee Amount<span class="text-danger">*</span></label>
                    <InputNumber v-model="auctionDetails.eventProcessingFeeAmount" inputId="minmax-buttons" mode="decimal"
                        showButtons :min="0" />
                    <span v-if="$v.auctionDetails.eventProcessingFeeAmount.$error" class="text-red-500">{{
                        $v.auctionDetails.eventProcessingFeeAmount.$errors[0].$message }}</span>
                </div>
            </div>
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step2">EMD Fee Payment Mode<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.emdFeePaymentMode" option-value="paymentModeId" variant="filled"
                        :options="paymentModes" optionLabel="paymentModeName" placeholder=" Select EMD Fee Payment Mode"
                        class="w-full md:w-14rem" />
                    <span v-if="$v.auctionDetails.emdFeePaymentMode.$error" class="text-red-500">{{
                        $v.auctionDetails.emdFeePaymentMode.$errors[0].$message }}</span>
                </div>
            </div>
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step2">EMD Applied For<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.emdAppliedFor" option-value="emdAppliedForId" variant="filled"
                        :options="emdAppliedFor" optionLabel="emdAppliedForName" placeholder=" Select EMD Applied For"
                        class="w-full md:w-14rem" />
                    <span v-if="$v.auctionDetails.emdAppliedFor.$error" class="text-red-500">{{
                        $v.auctionDetails.emdAppliedFor.$errors[0].$message }}</span>
                </div>
            </div>
        </div>

        <Divider />

        <div class="fm-row">
            <!-- <div class="w-1/2">
                <div class="fm-group">
                    <span class="p-buttonset">
                        <Button @click="$router.push({ name: 'ROLE_MAKER' })" icon="pi pi-check" label="Back"></Button>
                    </span>
                </div>
            </div> -->
            <div class="w-full">
                <div class="fm-group">
                    <span class="p-buttonset">
                        <Button @click="InsertAuctionDataStep2" icon="pi pi-check" label="Save"></Button>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <!-- ,$router.push({ name: 'Step3' }) -->
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import MQL from '@/plugins/mql.js';
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators'
import { useAuctionPreparation } from '@/store/auctionPreparation.js'
import { storeToRefs } from 'pinia'

const store = useAuctionPreparation()
const { getLastInsertedAuctionId, getPropertyCategoryId } = storeToRefs(store)

const auctionDetails = ref({
    referenceNo: '',
    description: '',
    // bidderCategory: '',
    auctionCategory: '',
    auctionCategoryName: '',
    auctionProcess: '',
    auctionProcessName: '',
    departmentName: '',
    bidPlacementName: '',
    // unit: '',
    department: '',
    bidPlacement: '',
    eventProcesssingFeeMode: '',
    eveventProcesssingFeeModeName: '',
    eventProcessingFeeAmount: '',
    emdFeePaymentMode: '',
    emdAppliedFor: '',
    emdAppliedForName: '',
    emdFeePaymentModeName: '',
    // emdFeeAmount: ''
});
const bidPlacements = ref([])
const auctionCategory = ref([]);
const departments = ref([]);
const auctionProcess = ref([]);
const emdAppliedFor = ref([]);
const paymentModes = ref([]);




function FetchInventoryCategories() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchInventoryCategories]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchInventoryCategories', true);
            if (rs.isValid('FetchInventoryCategories')) {
                console.log(res.result);
                auctionCategory.value = res.result;
            } else {
                rs.showErrorToast('ErrorFetchInventoryCategories');
            }
        });
}

function FetchAllAuctionProcess() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchAllAuctionProcess]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllAuctionProcess', true);
            if (rs.isValid('FetchAllAuctionProcess')) {
                console.log(res.result);
                auctionProcess.value = res.result;
            } else {
                rs.showErrorToast('ErrorFetchAllAuctionProcess');
            }
        });
}

function FetchAllDepartments() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchAllDepartments]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllDepartments', true);
            if (rs.isValid('FetchAllDepartments')) {
                console.log(res.result);
                departments.value = res.result;
            } else {
                rs.showErrorToast('ErrorFetchAllDepartments');
            }
        });
}

function FetchAllBidPlacements() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchAllBidPlacements]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllBidPlacements', true);
            if (rs.isValid('FetchAllBidPlacements')) {
                console.log(res.result);
                bidPlacements.value = res.result;
            } else {
                rs.showErrorToast('ErrorFetchAllBidPlacements');
            }
        });
}

function FetchAllPaymentModes() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchAllPaymentModes]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllPaymentModes', true);
            if (rs.isValid('FetchAllPaymentModes')) {
                console.log(res.result);
                paymentModes.value = res.result;
            } else {
                rs.showErrorToast('ErrorFetchAllPaymentModes');
            }
        });
}

function FetchAllEMDAppliedFor() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchAllEMDAppliedFor]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllEMDAppliedFor', true);
            if (rs.isValid('FetchAllEMDAppliedFor')) {
                console.log(res.result);
                emdAppliedFor.value = res.result;
            } else {
                rs.showErrorToast('ErrorFetchAllEMDAppliedFor');
            }
        });
}

const InsertAuctionDataStep2 = async () => {
    const result = await $v.value.$validate();
    if (result) {
        alert("success, form submitted")
        new MQL()
            .useManagementServer()
            .setActivity('o.[InsertStep2AuctionData]')
            .setData({
                referenceNumber: auctionDetails.value.referenceNo,
                auctionDescription: auctionDetails.value.description,
                inventoryCategoryId: auctionDetails.value.auctionCategory,
                auctionProcessId: auctionDetails.value.auctionProcess,
                departmentId: auctionDetails.value.department,
                bidPlacement: auctionDetails.value.bidPlacement,
                eventProcessingFeeMode: auctionDetails.value.eventProcesssingFeeMode,
                eventProcessingFees: auctionDetails.value.eventProcessingFeeAmount,
                eventEmdFeeMode: auctionDetails.value.emdFeePaymentMode,
                emdAppliedFor: auctionDetails.value.emdAppliedFor,
                auctionId: getLastInsertedAuctionId.value
            })
            .fetch()
            .then((rs) => {
                let res = rs.getActivity('InsertStep2AuctionData', true);
                if (rs.isValid('InsertStep2AuctionData')) {
                    console.log("LastUpdatedId from response", res.result);
                    store.setPropertyCategoryId(auctionDetails.value.auctionCategory);
                    console.log("propertyCategoryId: ", getPropertyCategoryId.value);
                } else {
                    rs.showErrorToast('InsertStep2AuctionData');
                }
            });

        console.log(auctionDetails.value);
    } else {
        alert("error, form not submitted")
    }
}


const rules = computed(() => ({
    auctionDetails: {
        referenceNo: { required: helpers.withMessage('Reference Number is required', required)
        },
        description: {
            required: helpers.withMessage('Description is required', required)
        },
        auctionCategory: {
            required: helpers.withMessage('Auction Category is required', required)

        },
        auctionProcess: {
            required: helpers.withMessage('Auction Process is required', required)
        },
        department: {
            required: helpers.withMessage('Department is required', required)
        },
        bidPlacement: {
            required: helpers.withMessage('Bid Placement is required', required)
        },
        eventProcesssingFeeMode: {
            required: helpers.withMessage('Event Processsing Fee Mode is required', required)

        },
        eventProcessingFeeAmount: {
            required: helpers.withMessage('Event Processing Fee Amount is required', required)
        },
        emdFeePaymentMode: {
            required: helpers.withMessage('EMD Fee Payment Mode is required', required)
        },
        emdAppliedFor: {
            required: helpers.withMessage('EMD Applied For is required', required)
        }
    }
}));

const $v = useVuelidate(rules, { auctionDetails }); 

function FetchAllStepsAuctionPreview() {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAllStepsAuctionPreview]")
        .setData({ "auctionId": getLastInsertedAuctionId.value })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAllStepsAuctionPreview", true)
            if (rs.isValid("FetchAllStepsAuctionPreview")) {
                console.log("FetchAllStepsAuctionPreview", res.result);
                auctionDetails.value.referenceNo = res.result.fetchStep2AuctionPreview.referenceNumber;
                auctionDetails.value.auctionCategoryName = res.result.fetchStep2AuctionPreview.inventoryCategoryName;
                auctionDetails.value.auctionCategory = `${res.result.fetchStep2AuctionPreview.inventoryCategoryId}`;
                auctionDetails.value.description = res.result.fetchStep2AuctionPreview.auctionDescription;
                auctionDetails.value.auctionProcessName = res.result.fetchStep2AuctionPreview.auctionProcessName;
                auctionDetails.value.auctionProcess = `${res.result.fetchStep2AuctionPreview.auctionProcessId}`;
                auctionDetails.value.departmentName = res.result.fetchStep2AuctionPreview.departmentName;
                auctionDetails.value.department = `${res.result.fetchStep2AuctionPreview.departmentId}`;
                auctionDetails.value.bidPlacementName = res.result.fetchStep2AuctionPreview.bidPlacementName;
                auctionDetails.value.bidPlacement = `${res.result.fetchStep2AuctionPreview.bidPlacement}`;
                auctionDetails.value.eveventProcesssingFeeModeName = res.result.fetchStep2AuctionPreview.eventProcessingFeeModeName;
                auctionDetails.value.eventProcesssingFeeMode = `${res.result.fetchStep2AuctionPreview.eventProcessingFeeMode}`;
                auctionDetails.value.eventProcessingFeeAmount = res.result.fetchStep2AuctionPreview.eventProcessingFees;
                auctionDetails.value.emdAppliedFor = `${res.result.fetchStep2AuctionPreview.emdAppliedFor}`;
                auctionDetails.value.emdAppliedForName = res.result.fetchStep2AuctionPreview.emdAppliedForName;
                auctionDetails.value.emdFeePaymentMode = `${res.result.fetchStep2AuctionPreview.eventProcessingFeeMode}`;
                auctionDetails.value.emdFeePaymentModeName = res.result.fetchStep2AuctionPreview.emdFeePaymentModeName;
            } else {
                rs.showErrorToast("FetchAllStepsAuctionPreview")
            }
        })
}

onMounted(() => {
    FetchInventoryCategories();
    FetchAllAuctionProcess();
    FetchAllDepartments();
    FetchAllBidPlacements();
    FetchAllPaymentModes();
    FetchAllEMDAppliedFor();
    FetchAllStepsAuctionPreview();
});
</script> 
