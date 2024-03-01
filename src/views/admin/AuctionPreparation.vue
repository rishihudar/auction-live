<template>
    <div class="card flex justify-content-center">
        <Stepper linear>
            <StepperPanel header="Header I">
                <template #content="{ nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <Step1 :auctionId="AuctionStore.getLastInsertedAuctionId" @submit="setAuctionId"
                            @nextTab="nextCallback()" />
                    </div>
                </template>
            </StepperPanel>
            <StepperPanel header="Header II">
                <template #content="{ prevCallback, nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <Step2 v-if="AuctionStore.getLastInsertedAuctionId"
                            :auctionId="AuctionStore.getLastInsertedAuctionId" @previousTab="prevCallback()"
                            @nextTab="nextCallback()" />
                    </div>
                </template>
            </StepperPanel>
            <StepperPanel header="Header III">
                <template #content="{ prevCallback, nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <Step3 v-if="AuctionStore.getLastInsertedAuctionId"
                            :auctionId="AuctionStore.getLastInsertedAuctionId" @previousTab="prevCallback()"
                            @nextTab="nextCallback()" />
                    </div>
                </template>
            </StepperPanel>
            <StepperPanel header="Header IV">
                <template #content="{ prevCallback, nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <Step4 v-if="AuctionStore.getLastInsertedAuctionId"
                            :auctionId="AuctionStore.getLastInsertedAuctionId" @previousTab="prevCallback()"
                            @nextTab="nextCallback()" />
                    </div>
                </template>
            </StepperPanel>
        </Stepper>
    </div>
</template>

<style scoped>
.p-stepper {
    flex-basis: 50rem;
}
</style>


<script setup>

import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';

import Step1 from '@/views/admin/AuctionPreparation/Step1.vue';
import Step2 from '@/views/admin/AuctionPreparation/Step2.vue';
import Step3 from '@/views/admin/AuctionPreparation/Step3.vue';
import Step4 from '@/views/admin/AuctionPreparation/Step4.vue';

import { useAuctionPreparation } from "../../store/auctionPreparation";
import { storeToRefs } from 'pinia';

const AuctionStore = useAuctionPreparation()
// const {  } = storeToRefs(AuctionStore)

function setAuctionId(id) {
    console.log(id)
    AuctionStore.setLastInsertedAuctionId(id)
}

</script>
  