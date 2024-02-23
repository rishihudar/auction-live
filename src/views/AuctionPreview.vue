
<template>
    <div class="profile-preview">
        <Card class="profile-card">
            <template #header>
                <div class="profile-header">
                    <h1>Step1 Details</h1>
                </div>
            </template>
            <div class="profile-section">

                <div class="profile-field">
                    <label class="bold-label" for="address">Auction Type:</label>
                    <span>{{ step1data.auctionType }}</span>
                </div>
            </div>
        </Card>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import Card from "primevue/card";
//import Divider from "primevue/divider";
import MQL from "@/plugins/mql.js";

const step1data = ref([]);
function fetchStep1AuctionPreview() {

    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAllStepsAuctionPreview]")
        .setData({ "auctionId": 3 })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAllStepsAuctionPreview", true)
            if (rs.isValid("FetchAllStepsAuctionPreview")) {
                console.log(res.result.fetchStep1AuctionPreview, "result")
                step1data.value = res.result.fetchStep1AuctionPreview
            } else {
                rs.showErrorToast("FetchAllStepsAuctionPreview")
            }
        })

}
function FetchAuctionDetailsForView() {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionDetailsForView]")
        .setData({ "auctionId": 3 })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionDetailsForView", true)
            if (rs.isValid("FetchAuctionDetailsForView")) {
                console.log(res, "result")
            } else {
                rs.showErrorToast("FetchAuctionDetailsForView")
            }
        })
}

onUnmounted(() => {
    fetchStep1AuctionPreview()
    FetchAuctionDetailsForView()
})

</script>
<style scoped>
.personal-details-container {
    display: flex;
    justify-content: space-between;
}

.personal-details {
    flex: 1;
    /* To occupy remaining space */
}

.profilePic-container {
    flex-shrink: 0;
    margin-top: 100px;
    /* To prevent shrinking */
}

.profile-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* Make the profile preview occupy the full viewport height */
}

.profile-card {
    width: 100%;
    /* Make the profile card occupy the full width */
    max-width: 70%;
    /* Optionally set a maximum width */
}

.profile-header {
    text-align: center;
}

.profile-section {
    margin-top: 20px;
}

.profile-info {
    display: flex;
    flex-wrap: wrap;
}

.profile-field {
    flex: 1 0 50%;
    /* Two columns on large screens */
    margin-right: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

.bold-label {
    font-weight: bold;
    margin-right: 10px;
}

.buttons-section {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding-right: 20px;
}

.p-button-primary {
    margin: 10px;
    display: inline-block;
}
</style>