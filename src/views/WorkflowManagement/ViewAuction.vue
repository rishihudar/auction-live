<template>
    <div>
        <h6>{{ workflowStepData.displayName }}</h6>
        <AuctionPreview v-if="workflowStepDetailsId && auctionId" :workflowStepDetailsId="workflowStepDetailsId"
            :auctionId="auctionId" :vsAuctionCode="vsAuctionCode" :config="workflowStepData.data1" />
    </div>
    <div>
        <div v-if="showAction" class="btn-wrapper centered mt-5">
            <Button class="btn-long" v-for="item in label" @click="modalVisible(item)" :label="item.statusDisplayName"
                :key="item.statusId"></Button>
        </div>
        <Dialog v-model:visible="visible" modal :header=modalItem.statusDisplayName :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5" v-if="workflowStepData.endStep == 0">Assign to <strong>{{
                    role.roleName }}</strong></span>
            <label for="comment" class="font-semibold w-6rem">Comment</label>
            <InputText id="comment" v-model="comment" class="flex-auto" autocomplete="off" />
            <small class="fm-error" v-if="$v.comment.$error">{{ $v.comment.$errors[0].$message }}</small><br />
            <label v-if="workflowStepData.endStep == 0" for="login" class="font-semibold w-6rem">Login</label>
            <Dropdown v-if="workflowStepData.endStep == 0" v-model="selectedLoginId" :options="logins"
                optionLabel="fullName" optionValue="userId" placeholder="Select a Login"
                class="w-full md:w-14rem mb-3" />
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" :label=modalItem.statusDisplayName @click="submitWorkflow"></Button>
            </div>
        </Dialog>
    </div>
    <Dialog v-model:visible="auctionPublish" modal header="Auction Publish" :style="{ width: '25rem' }">
        <p>Auction <strong>{{ vsAuctionCode }}</strong> Approved Successfully.</p>
        <p>Do you want to publish this auction?</p>
        <p class="bg-yellow-100 rounded-2xl border-2 border-yellow-500 border-dashed p-2 my-2 text-sm "><strong>NOTE:</strong>The following action will change the role to <strong>PUBLISHER</strong></p>
        <Button @click="redirectToPublish">Ok</Button>
        <Button  @click="cancel" severity="info">Cancel</Button>
    </Dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import MQL from '@/plugins/mql.js';
import Dropdown from 'primevue/dropdown';
import { login } from "../../store/modules/login";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { createToaster } from "@meforma/vue-toaster";
import { useRouter } from "vue-router";
import AuctionPreview from "../AuctionPreview.vue";

const toaster = createToaster({ position: "top-right", duration: 3000 });
const loginStore = login()
const router = useRouter()

const visible = ref(false);
const comment = ref(null)
const role = ref({})
const logins = ref([])
const modalItem = ref({})
const auctionId = ref()
const auctionPublish = ref(false)
const vsAuctionCode = ref()
const { workflowStepDetailsId } = defineProps({
    // Basic prop definition
    workflowStepDetailsId: {
        type: Number,
        required: true,
        default: null
    }
})


const emit = defineEmits(['workflowsubmit'])

const modalVisible = async (item) => {
    modalItem.value = item
    await fetchLogin()
    visible.value = true
};
const label = ref();


const workflowStepData = ref({})

const selectedLoginId = ref(null);


let rules = computed(() => ({
    comment: { required }
}));

const $v = useVuelidate(rules, { comment });


const showAction = computed(() => (
    workflowStepData.value.assignedRoleId == loginStore.currentRole.roleId &&
    (!workflowStepData.value.assignedLoginId || workflowStepData.value.assignedLoginId == loginStore.loginId)
))


async function submitWorkflow() {
    const formValid = await $v.value.$validate();
    //console.log(formValid);
    if (!formValid) {
        toaster.error("Please Add Comment")
        return
    }
    let data = {
        "assignedLoginId": selectedLoginId.value,
        "assignedRoleId": role.value.roleId,
        "comment": comment.value,
        "loginId": loginStore.loginId,
        "roleId": loginStore.currentRole.roleId,
        "workflowStatusId": modalItem.value.statusId,
        "workflowStepDetailsId": workflowStepDetailsId,
        "workflowStepId": workflowStepData.value.workflowStepId
    }
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("o.[UpdateWorkflowStepDetails]")
        .setData(data)
        .fetch()
        .then(rs => {
            let res = rs.getActivity("UpdateWorkflowStepDetails", true)
            if (rs.isValid("UpdateWorkflowStepDetails")) {
                visible.value = false
                // modalItem.value = null
                toaster.success(`${modalItem.value.statusDisplayName} Successfully`)
                if (modalItem.value.statusDisplayName == 'Approve Auction') {
                    if (loginStore.roleNames.findIndex((r) => r.roleCode == 'ROLE_PUBLISHER') > -1) {
                        auctionPublish.value = true
                    } else {
                    emit('workflowsubmit')
                }
                } else {
                    emit('workflowsubmit')
                }
            } else {
                rs.showErrorToast("UpdateWorkflowStepDetails")
            }
        })
}


function redirectToPublish() {
    loginStore.SET_ROLE(loginStore.roleNames.find((r) => r.roleCode == 'ROLE_PUBLISHER'))
    router.push({name: 'ROLE_PUBLISHER'})
}

function cancel() {
    emit('workflowsubmit')
}

function fetchLogin() {
    return new Promise((resolve, reject) => {
        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("o.[FetchRoleAndLoginFormNextStepAndStatus]")
            .setData({
                "fromStatusId": modalItem.value.statusId,
                "fromWorkflowStepId": workflowStepData.value.workflowStepId,
                'entityId': loginStore.entityId
            })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("FetchRoleAndLoginFormNextStepAndStatus", true)
                //console.log(res)
                if (rs.isValid("FetchRoleAndLoginFormNextStepAndStatus")) {
                    logins.value = res.result.nextLogins
                    role.value.roleName = res.result.nextRole.displayName
                    role.value.roleId = res.result.nextRole.roleId
                    resolve()
                } else {
                    rs.showErrorToast("FetchRoleAndLoginFormNextStepAndStatus")
                }
            })
    })
}

function fetchWorkflowStepData() {
    return new Promise((resolve, reject) => {
        new MQL()
            .useManagementServer()
            .setActivity("o.[query_2cg9Wj6KVFlFt8DMt6va6a4tjqm]")
            .setData({ "workflowStepDetailsId": workflowStepDetailsId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("query_2cg9Wj6KVFlFt8DMt6va6a4tjqm", true)
                if (rs.isValid("query_2cg9Wj6KVFlFt8DMt6va6a4tjqm")) {
                    //console.log(res)
                    workflowStepData.value = res[0]
                    workflowStepData.value.data1 = JSON.parse(workflowStepData.value.data1)
                    auctionId.value = workflowStepData.value.auctionId
                    vsAuctionCode.value = workflowStepData.value.vsAuctionCode
                    console.log(workflowStepData.value, "workflowStepData")
                    // AuctionStore.setLastInsertedAuctionId( workflowStepData.value.auctionId)
                    resolve()
                } else {
                    rs.showErrorToast("query_2cg9Wj6KVFlFt8DMt6va6a4tjqm")
                    reject()
                }
            })
    })
}
function fetchAuctionDetailsForView() {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionDetailsForView]")
        .setData({ "workflowStepDetailsId": workflowStepDetailsId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionDetailsForView", true)
            //console.log(res, "result")
            if (rs.isValid("FetchAuctionDetailsForView")) {
                // auctionDetailsData.value = res.result.fetchAuctionDetails
                // //console.log(auctionDetailsData.value, " auctionDetailsData")
                label.value = res.result.NextStatus
            } else {
                rs.showErrorToast("FetchAuctionDetailsForView")
            }
        })
}





onMounted(async () => {
    await fetchWorkflowStepData()
    fetchAuctionDetailsForView()
});

</script>
