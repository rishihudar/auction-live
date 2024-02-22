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
                </div>
            </div>

            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step1">Auction Category<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.auctionCategory" option-value="propertyCategoryId" variant="filled" :options="auctionCategory"
                    optionLabel="propertyCategoryName" placeholder="Select Auction Category"
                    class="w-full md:w-14rem" />
                </div>
            </div>
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step2">Auction Process<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.auctionProcess" option-value="auctionProcessId" variant="filled" :options="auctionProcess"
                    optionLabel="auctionProcessName" placeholder="Select Auction Process" class="w-full md:w-14rem" />
                </div>
            </div>
        </div>

        <Divider />

        <div class="fm-row">
            <!-- <div class="w-full">
                <div class="fm-group"> -->
                    <div class="justify-content-center">
                        <label for="step2">Auction Description<span class="text-danger">*</span> </label>
                        <Textarea v-model="auctionDetails.description" autoResize rows="3" cols="111" placeholder="Enter Description" />
                    </div>
                <!-- </div>
            </div> -->
        </div>

        <Divider />

        <div class="fm-row">
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step2">Department<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.department" option-value="departmentId" variant="filled" :options="departments"
                    optionLabel="departmentName" placeholder="Select Department" class="w-full md:w-14rem" />
                </div>
            </div>
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step2">Bid Submission/Placement<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.bidPlacement" option-value="bidPlacementId" variant="filled" :options="bidPlacements"
                    optionLabel="bidPlacementName" placeholder=" Select Bid Submission/Placement"
                    class="w-full md:w-14rem" />
                </div>
            </div>
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step2">Event Processsing Fee Mode<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.eventProcesssingFeeMode" option-value="paymentModeId" variant="filled" :options="paymentModes" optionLabel="paymentModeName"
                    placeholder="Select Event Processsing Fee Mode" class="w-full md:w-14rem" />
                </div>
            </div>
        </div>

        <Divider />

        <div class="fm-row">
            <div class="w-1/3">
                <div class="fm-group">
                    <FloatLabel>
                        <label for="username">Event Processing Fee Amount<span class="text-danger">*</span></label>
                        <InputNumber v-model="auctionDetails.eventProcessingFeeAmount" inputId="minmax-buttons" mode="decimal" showButtons :min="0"
                        :max="100" />
                    </FloatLabel>
                </div>
            </div>
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step2">EMD Fee Payment Mode<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.emdFeePaymentMode" option-value="paymentModeId" variant="filled" :options="paymentModes" optionLabel="paymentModeName"
                    placeholder=" Select EMD Fee Payment Mode" class="w-full md:w-14rem" />
                </div>
            </div>
            <div class="w-1/3">
                <div class="fm-group">
                    <label for="step2">EMD Applied For<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionDetails.emdAppliedFor" option-value="emdAppliedForId" variant="filled" :options="emdAppliedFor" optionLabel="emdAppliedForName"
                    placeholder=" Select EMD Applied For" class="w-full md:w-14rem" />
                </div>
            </div>
        </div>

        <Divider />

        <div class="fm-row">
            <div class="w-1/2">
                <div class="fm-group">
                    <span class="p-buttonset">
                        <Button @click="$router.push({ name: 'ROLE_MAKER' })" icon="pi pi-check" label="Back"></Button>
                    </span>
                </div>
            </div>
            <div class="w-1/2">
                <div class="fm-group">
                    <span class="p-buttonset">
                        <Button @click="InsertAuctionDataStep2" icon="pi pi-check" label="Next"></Button>
                    </span>
                </div>
            </div>
        </div>  
    </div>
    <!-- ,$router.push({ name: 'Step3' }) -->
</template>
<script setup>
import { ref, onMounted } from "vue";
import MQL from '@/plugins/mql.js';
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import { useAuctionPreparation } from '@/store/auctionPreparation.js'
import { storeToRefs } from 'pinia'

const store = useAuctionPreparation()
const { getLastInsertedAuctionId, getPropertyCategoryId  } = storeToRefs(store)

const auctionDetails = ref({
        referenceNo: '',
        description: '',
        // bidderCategory: '',
        auctionCategory: '',
        auctionProcess: '',
        // unit: '',
        department: '',
        bidPlacement: '',
        eventProcesssingFeeMode: '',
        eventProcessingFeeAmount: 0,
        emdFeePaymentMode: '',
        emdAppliedFor: '',
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

function InsertAuctionDataStep2() {
    new MQL()
        .useManagementServer()
        .setActivity('o.[InsertStep2AuctionData]')
        .setData({
            referenceNumber:  auctionDetails.value.referenceNo,
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
                console.log("LastUpdatedId from response",res.result);
                store.setPropertyCategoryId(auctionDetails.value.auctionCategory); 
                console.log("propertyCategoryId: ",getPropertyCategoryId.value);
            } else {
                rs.showErrorToast('InsertStep2AuctionData');
            }
        });

    console.log(auctionDetails.value);
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
