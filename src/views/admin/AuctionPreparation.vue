<template>
    <div>
        <Stepper linear class="wizard-wrapper wizard-wrapper-prime">
            <StepperPanel header="Step I">
                <template #content="{ nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <Step1 :auctionId="AuctionStore.getLastInsertedAuctionId" @submit="setAuctionId"
                            @nextTab="nextCallback()" />
                    </div>
                </template>
            </StepperPanel>
            <StepperPanel header="Step II">
                <template #content="{ prevCallback, nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <Step2 v-if="AuctionStore.getLastInsertedAuctionId"
                            :auctionId="AuctionStore.getLastInsertedAuctionId" @previousTab="prevCallback()"
                            @nextTab="nextCallback()" />
                    </div>
                </template>
            </StepperPanel>
            <StepperPanel header="Step III">
                <template #content="{ prevCallback, nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <Step3 v-if="AuctionStore.getLastInsertedAuctionId"
                            :auctionId="AuctionStore.getLastInsertedAuctionId"
                            :multiplyingFactor = "mulfac"
                            @previousTab="prevCallback()"
                            @nextTab="nextCallback()" />
                    </div>
                </template>
            </StepperPanel>
            <StepperPanel header="Step IV">
                <template #content="{ prevCallback, nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <Step4 v-if="AuctionStore.getLastInsertedAuctionId"
                            :auctionId="AuctionStore.getLastInsertedAuctionId"
                            :multiplyingFactor = "mulfac"
                            @previousTab="prevCallback()"
                            @nextTab="nextCallback()" />
                    </div>
                </template>
            </StepperPanel>
        </Stepper>
    </div>
</template>

<script setup>

import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';

import Step1 from '@/views/admin/AuctionPreparation/Step1.vue';
import Step2 from '@/views/admin/AuctionPreparation/Step2.vue';
import Step3 from '@/views/admin/AuctionPreparation/Step3.vue';
import Step4 from '@/views/admin/AuctionPreparation/Step4.vue';
import {ref, onMounted} from 'vue';
import { useAuctionPreparation } from "../../store/auctionPreparation";
import MQL from '@/plugins/mql.js';

const AuctionStore = useAuctionPreparation()
// const {  } = storeToRefs(AuctionStore)

function setAuctionId(id) {
    //console.log(id)
    AuctionStore.setLastInsertedAuctionId(id)
}

var mulfac = ref(0)

function fetchMultiplyingFactor(){
			// Automatically generated
            new MQL()
            .useManagementServer()
			.setActivity("o.[FetchCustomParam]")
			.setData({"customParam":"MULTIPLYING_FACTOR"})
			
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchCustomParam",true)
			if (rs.isValid("FetchCustomParam")) {
                mulfac = res.result.customParam
                console.log ("#########", mulfac)
			} else
			 { 
			rs.showErrorToast("FetchCustomParam")
			}
			})
}	

    onMounted(() => {
        fetchMultiplyingFactor()
})
</script>
