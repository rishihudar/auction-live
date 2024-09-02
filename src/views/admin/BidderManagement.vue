<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Bidder Management</h2>
            </div>
        </div>
        <div class="box-grid card-master-holder">
            <div class="card card-master col-span-4 2xl:col-span-3" @click="navigateToBidderDeactivation()">
                <div class="cm-title">Bidder Deactivation</div>
                <div class="cm-content">
                    To Deactivate the Bidders
                </div>
            </div>

            <div class="card card-master col-span-4 2xl:col-span-3" @click="navigateToBidderActivation()">
                <div class="cm-title">Bidder Activation</div>
                <div class="cm-content">
                    To Activate the Bidders
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from "../../router";

function navigateToBidderDeactivation() {
    router.push({path:'/BidderDeactivation'});
}

function navigateToBidderActivation() {
    router.push({path:'/BidderActivation'});
}

</script>