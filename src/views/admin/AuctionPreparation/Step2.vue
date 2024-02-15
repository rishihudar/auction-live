<template>
    <div>
        <div class="w-subtitle">
            Auction ID:
            <!-- {{ $store.state.AuctionPreparation.auctionId }} -->
        </div>

        <div class="fm-row">
            <div class="w-1/2">
                <div class="fm-group">
                    <FloatLabel>
                        <label for="username">Reference Number</label>
                        <InputText id="username" v-model="value" placeholder="Enter Reference Number" />

                    </FloatLabel>
                </div>
            </div>

            <div class="w-1/2">
                <div class="fm-group">
                    <label for="step1">Auction Category<span class="text-danger">*</span></label>

                    <Dropdown v-model="selectedAuctionCategory" variant="filled" :options="auctionCategory"
                        optionLabel="propertyCategoryName" placeholder="Select Auction Category"
                        class="w-full md:w-14rem" />


                </div>
            </div>

        </div>

        <div class="card flex justify-content-center">
            <label for="step2">Auction Description<span class="text-danger">*</span> </label>
            <Textarea v-model="value" autoResize rows="5" cols="30" placeholder="Enter Description" />
        </div>
        <div class="fm-row">
            <div class="w-1/2">
                <div class="fm-group">
                    <label for="step2">Auction Process<span class="text-danger">*</span></label>

                    <Dropdown v-model="selectedAuctionProcess" variant="filled" :options="auctionProcess"
                        optionLabel="auctionProcessName" placeholder="Select Auction Process" class="w-full md:w-14rem" />


                </div>

            </div>
            <div class="w-1/2">
                <div class="fm-group">
                    <label for="step2">Department<span class="text-danger">*</span></label>

                    <Dropdown v-model="selectedDepartment" variant="filled" :options="departments"
                        optionLabel="departmentName" placeholder="Select Department" class="w-full md:w-14rem" />

                </div>
            </div>
        </div>
        <div class="fm-row">
            <div class="w-1/4">
                <div class="fm-group">
                    <label for="step2">Bid Submission/Placement<span class="text-danger">*</span></label>

                    <Dropdown v-model="selectedBidPlacement" variant="filled" :options="bidPlacements"
                        optionLabel="bidPlacementName" placeholder=" Select Bid Submission/Placement"
                        class="w-full md:w-14rem" />


                </div>
            </div>

        </div>
        <div class="fm-row">
            <div class="w-1/2">
                <div class="fm-group">
                    <label for="step2">Event Processsing Fee Mode<span class="text-danger">*</span></label>

                    <Dropdown v-model="selectedPaymentMode" variant="filled" :options="paymentModes" optionLabel="paymentModeName"
                        placeholder="Select Event Processsing Fee Mode" class="w-full md:w-14rem" />

                </div>
            </div>

            <div class="w-1/2">
                <div class="fm-group">
                    <FloatLabel>
                        <label for="username">Event Processing Fee Amount<span class="text-danger">*</span></label>
                        <InputNumber v-model="incrementValue" inputId="minmax-buttons" mode="decimal" showButtons :min="0"
                            :max="100" />

                    </FloatLabel>
                </div>
            </div>
        </div>
        <div class="fm-row">
            <div class="w-1/2">
                <div class="fm-group">
                    <label for="step2">EMD Fee Payment Mode<span class="text-danger">*</span></label>

                    <Dropdown v-model="selectedPaymentMode" variant="filled" :options="paymentModes" optionLabel="paymentModeName"
                        placeholder=" Select EMD Fee Payment Mode" class="w-full md:w-14rem" />

                </div>
            </div>
            <div class="w-1/2">
                <div class="fm-group">
                    <label for="step2">EMD Applied For<span class="text-danger">*</span></label>

                    <Dropdown v-model="selectedEMDAppliedFor" variant="filled" :options="emdAppliedFor" optionLabel="emdAppliedForName"
                        placeholder=" Select EMD Applied For" class="w-full md:w-14rem" />

                </div>
            </div>
        </div>
        <div class="ml-auto">
            <span class="p-buttonset">
                <Button label="Back" @click="" icon="pi pi-trash" />
            </span>
        </div>
        <div class="ml-auto">
            <span class="p-buttonset">
                <Button label="Next" @click="" icon="pi pi-trash" />
            </span>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import MQL from '@/plugins/mql.js';
import Dropdown from 'primevue/dropdown';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';

import Textarea from 'primevue/textarea';
const incrementValue = ref();

const value = ref(null);
const selectedAuctionCategory = ref();
const selectedAuctionProcess = ref();
const selectedDepartment = ref();
const selectedBidPlacement = ref();
const bidPlacements = ref([])
const auctionCategory = ref([

]);
const selectedPaymentMode = ref();
const selectedEMDAppliedFor = ref();
 const paymentModes = ref([]);
const auctionMethod = ref([]);
const departments = ref([]);
const auctionProcess = ref([]);
const emdAppliedFor = ref([]);
function FetchInventoryCategories() {
    new MQL()
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





onMounted(() => {
    FetchInventoryCategories();
    FetchAllAuctionProcess();
    FetchAllDepartments();
    FetchAllBidPlacements();
    FetchAllPaymentModes();
    FetchAllEMDAppliedFor();
});
</script> 
