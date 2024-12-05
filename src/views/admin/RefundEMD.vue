<template>
    <div>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Refund Panel</h2>
            </div>
        </div>
        <div>

            <TabView>
            <TabPanel header="Non H1">
                <p class="m-0">
                    <NonH1Refund></NonH1Refund>
                </p>
            </TabPanel>
            <TabPanel header="Rejected H1">
                <p class="m-0">
                <RejectedH1Refund></RejectedH1Refund>
                </p>
            </TabPanel>
            
        </TabView>
            
        </div>
    </div>
</template>

<script setup>
import ConfirmDialog from 'primevue/confirmdialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

import NonH1Refund from './NonH1Refund.vue';
import RejectedH1Refund from './RejectedH1Refund.vue';
import { onBeforeMount, ref } from "vue";
import { login } from "../../store/modules/login";
import MQL from "@/plugins/mql.js";
import router from "../../router";
import { useCardStore } from "../../store/cards";
import { storeToRefs } from 'pinia';

const cardStore = useCardStore()
const { cardId } = storeToRefs(cardStore)

const loginStore = login();


onBeforeMount(() => {
  
});
</script>
