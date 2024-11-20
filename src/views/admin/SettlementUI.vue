<template>
    <div>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Settlement Panel</h2>
            </div>
        </div>
        <div>

            <TabView>
            <TabPanel header="H1 EMD">
                <p class="m-0">
                    <SettlementEMD></SettlementEMD>
                </p>
            </TabPanel>
            <TabPanel header="H1 Initial Payment">
                <p class="m-0">
                <SettlementInitial></SettlementInitial>
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

import SettlementInitial from './SettlementInitial.vue';
import SettlementEMD from './SettlementEMD.vue';


</script>
