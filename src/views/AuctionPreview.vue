
<template>
    <div class="fm-row">
        <Button label="Edit" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Step1 Details" :style="{ width: '25rem' }">

        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";

import Button from 'primevue/button';

import Dialog from 'primevue/dialog';

const visible = ref(false);
new MQL()
    .setActivity("o.[FetchAllStepsAuctionPreview]")
    .setData({ "auctionId": 3 })
    .fetch()
    .then(rs => {
        let res = rs.getActivity("FetchAllStepsAuctionPreview", true)
        if (rs.isValid("FetchAllStepsAuctionPreview")) {
            step1data.value = res.result.fetchStep1AuctionPreview
        } else {
            rs.showErrorToast("FetchAllStepsAuctionPreview")
        }
    })



</script>
