<template>

    <div class="card">
        <div class="card-header">
            <div class="ch-title">Deactivate Bidders</div>
        </div>
        <div class="form-grid">
            <div class="col-span-6">
                <div class="fm-group">
                    <!-- <label class="fm-label" for="role">Bidders</label> -->
                    <div class="fm-inner">
                        <MultiSelect v-model="selectedBidders" :options="bidderMaster" optionLabel="label"
                            placeholder="Select Bidders" class="w-full md:w-20rem" />
                    </div>
                    <!-- <div id="fullName-help" class="fm-info">Select Bidders</div> -->
                    <div v-if="$v.selectedBidders.$error" class="fm-error">
                        {{ $v.selectedBidders.$errors[0].$message }}
                    </div>
                </div>
            </div>
            <div class="col-span-6">
                <!-- <label class="fm-label" for="role">.</label> -->
                <div class="fm-group">
                    <Button @click="openModal()" label="Deactivate"></Button>
                </div>
            </div>
        </div>
    </div>
    <Toast />
    <div>
        <Dialog v-model:visible="visible" modal header="Confirm Deactivation" :style="{ width: '50rem' }">

            <div>
                <span>Are you sure you want to deactivate the selected bidders?</span>
            </div>

            <div class="fm-action  fm-action-center">
                <Button @click="visible = false" label="Close"></Button>
                <Button @click="DeactivateBidders" label="Deactivate"></Button>
            </div>

        </Dialog>
    </div>

</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import MQL from '@/plugins/mql.js';
import Button from 'primevue/button';
import { login } from "../../store/modules/login";
import { helpers, required } from '@vuelidate/validators';
import MultiSelect from 'primevue/multiselect';
import { useToast } from "primevue/usetoast";



const selectedBidders = ref([]);
const bidderMaster = ref([]);
const loginStore = login()
const { loginId } = storeToRefs(loginStore)
const toast = useToast();
const visible = ref(false)
const statusId = ref(0)
var data = []


function sendData(userId) {
    var data = [];
    selectedBidders.value.map((el) => {
        data.push({
            userId: el.value,
            modifiedBy: loginId.value,
            status: statusId.value
        });
    });
    return data
}

const openModal = async () => {
    const result = await $v.value.$validate();

    if (selectedBidders.value.length == 0 || !result) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please select bidder', life: 3000 });
    } else {
        console.log("selectedBidders.value", selectedBidders.value)
        data = sendData()
        console.log("data", data)
        visible.value = true
    }
}

function DeactivateBidders() {
    new MQL()
        .useManagementServer()
        .setActivity("r.[DeactivateBidders]")
        .setData({ "data": data })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("DeactivateBidders", true)
            if (rs.isValid("DeactivateBidders")) {
                toast.add({ severity: 'success', summary: 'Success', detail: 'Bidders Deactivated Successfully', life: 3000 });
                visible.value = false
                FetchBidderData()
                resetForm() // Reset the form
            } else {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Error in Deactivating Bidders, please try again', life: 3000 });
                visible.value = false
                // rs.showErrorToast("DeactivateBidders")
            }
        })
}

function fetchBidderDeactivationStatus() {
    new MQL()
        .useManagementServer()
        .setActivity("r.[FetchBidderDeactivationStatus]")
        .setData({ "key": "BIDDER_DEACTIVATION" })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchBidderDeactivationStatus", true)
            if (rs.isValid("FetchBidderDeactivationStatus")) {
                statusId.value = res.result[0].statusId
                console.log("statusId.value", statusId.value)
            } else {
                rs.showErrorToast("FetchBidderDeactivationStatus")
            }
        })
}


function FetchBidderData() {
    new MQL()
        .useManagementServer()
        .setActivity("r.[FetchBidders]")
        .setData()
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchBidders", true)
            if (rs.isValid("FetchBidders")) {
                // bidderMaster.value = res.result
                bidderMaster.value = res.result.map((el) => {
                    return {
                        label: el.bidderEmail,
                        value: el.userId
                    }
                })
                console.log("bidderMaster.value", bidderMaster.value)
            } else {
                rs.showErrorToast("FetchBidders")
            }
        })

}

const resetForm = () => {
    console.log("resetForm")
    selectedBidders.value = '';
      $v.value.$reset(); // Reset the validation state
    };

const rules = {
    selectedBidders: {
        required: helpers.withMessage('Bidder Selection is required', required)
    }
};
const $v = useVuelidate(rules, { selectedBidders });


onMounted(() => {
    FetchBidderData()
    fetchBidderDeactivationStatus()
});
</script>