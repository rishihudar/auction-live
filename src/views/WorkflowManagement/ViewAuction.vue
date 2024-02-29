<template>
    <div>
        <div>
            <h1> {{ workflowStepData.displayName }}</h1>
        </div>

        <div>

            <div class="card flex justify-content-center" v-if="workflowStepData.data1?.step1.visible">
                <div class="flex flex-column gap-2">
                    <label for="refNo">Ref No: :</label>
                    <InputText id="refNo" :disabled="!workflowStepData.data1?.step1.editable"
                        v-model="auctionDetailsData.referenceNumber" aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="aucCategory">Auction Category</label>
                    <InputText id="aucCategory" v-model="auctionDetailsData.inventoryCategoryName"
                        aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Auction Code</label>
                    <InputText id="username" v-model="auctionDetailsData.auctionCode" aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Description</label>
                    <InputText id="username" v-model="auctionDetailsData.auctionDescription"
                        aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Auction Type</label>
                    <InputText id="username" v-model="auctionDetailsData.auctionType" aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Auction Method</label>
                    <InputText id="username" v-model="auctionDetailsData.auctionMethodName"
                        aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Auction Process</label>
                    <InputText ref="ab" id="username" v-model="auctionDetailsData.auctionProcessName"
                        aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Department</label>
                    <InputText id="username" v-model="auctionDetailsData.departmentName" aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Item</label>
                    <InputText id="username" v-model="auctionDetailsData.inventoryHierarchy"
                        aria-describedby="username-help" />
                </div>
            </div>

        </div>
        <div>
            <div class="ml-auto">
                <span class="p-buttonset">
                    <Button v-for="item in label" @click="modalVisible(item)" :label="item.statusDisplayName"
                        :key="item.statusId"></Button>
                </span>
            </div>
            <div class="card flex justify-content-center">
                <Dialog v-model:visible="visible" modal :header=modalItem.statusDisplayName :style="{ width: '25rem' }">
                    <span class="p-text-secondary block mb-5">Assign to <strong>{{ role.roleName }}</strong></span>
                    <label for="comment" class="font-semibold w-6rem">Comment</label>
                    <InputText id="comment" v-model="comment" class="flex-auto" autocomplete="off" />
                    <small class="fm-error">{{ $v.comment.$errors[0]?.$message }}</small><br/>
                    <label for="login" class="font-semibold w-6rem">Login</label>
                    <Dropdown v-model="selectedLoginId" :options="logins" optionLabel="fullName" optionValue="userId"
                        placeholder="Select a Login" class="w-full md:w-14rem mb-3" />
                    <div class="flex justify-content-end gap-2">
                        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                        <Button type="button" :label=modalItem.statusDisplayName @click="submitWorkflow"></Button>
                    </div>
                </Dialog>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import MQL from '@/plugins/mql.js';
import Dropdown from 'primevue/dropdown';
import { login } from "../../store/modules/login";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { createToaster } from "@meforma/vue-toaster";

const visible = ref(false);
const toaster = createToaster({ position: "top-right", duration: 3000 });
const loginStore = login()
const comment = ref(null)
const role = ref({})
const logins = ref([])
const auctionDetailsData = ref([]);
const modalItem = ref({})
const modalVisible = async (item) => {
    modalItem.value = item
    await fetchLogin()
    visible.value = true
};
const label = ref();

const route = useRoute()

const workflowStepData = ref({})

const selectedLoginId = ref(null);

let rules = computed(() => ({
    comment: { required }
}));

const $v = useVuelidate(rules, { comment });

async function submitWorkflow() {

    const formValid = await $v.value.$validate();
    console.log(formValid);
    if (!formValid) {
        toaster.error("Please Add Comment")
        return
    }
    let data = {
        "assignedLoginId": selectedLoginId.value,
        "assignedRoleId": role.value.roleId,
        "comment": comment.value,
        "loginId": loginStore.loginId,
        "roleId": loginStore.roleId,
        "workflowStatusId": modalItem.value.statusId,
        "workflowStepDetailsId": route.params.workflowStepDetailsId,
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
            } else {
                rs.showErrorToast("UpdateWorkflowStepDetails")
            }
        })

}

function fetchLogin() {
    return new Promise((resolve, reject) => {

        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("o.[FetchRoleAndLoginFormNextStepAndStatus]")
            .setData({ "fromStatusId": modalItem.value.statusId, "fromWorkflowStepId": workflowStepData.value.workflowStepId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("FetchRoleAndLoginFormNextStepAndStatus", true)
                console.log(res)
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
            .setData({ "workflowStepDetailsId": route.params.workflowStepDetailsId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("query_2cg9Wj6KVFlFt8DMt6va6a4tjqm", true)
                if (rs.isValid("query_2cg9Wj6KVFlFt8DMt6va6a4tjqm")) {
                    console.log(res)
                    workflowStepData.value = res[0]
                    workflowStepData.value.data1 = JSON.parse(workflowStepData.value.data1)
                    resolve()
                } else {
                    rs.showErrorToast("query_2cg9Wj6KVFlFt8DMt6va6a4tjqm")
                    reject()
                }
            })
    })
}
function FetchAuctionDetailsForView() {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionDetailsForView]")
        .setData({ "workflowStepDetailsId": route.params.workflowStepDetailsId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionDetailsForView", true)
            console.log(res, "result")
            if (rs.isValid("FetchAuctionDetailsForView")) {
                // auctionDetailsData.value = res.result.fetchAuctionDetails
                // console.log(auctionDetailsData.value, " auctionDetailsData")
                label.value = res.result.NextStatus
            } else {
                rs.showErrorToast("FetchAuctionDetailsForView")
            }
        })


}





onMounted(() => {
    fetchWorkflowStepData()
    FetchAuctionDetailsForView()
});

</script>
