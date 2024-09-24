<template>
    <div>
        <div>Workflow Step Order</div>
        <div>
            <!-- <DataTable :value="workflowStepOrders">
                <template #empty>
                    No Steps Order Configured
                </template>
<Column field="fromStepdisplayName" header="From Step">
    <template #body="{ data }">
                        {{ stepName(data.fromStep) }}
                    </template>
</Column>
<Column field="fromStatusdisplayName" header="From Status">
    <template #body="{ data }">
                        {{ statusName(data.fromStatus) }}
                    </template>
</Column>
<Column field="toStepdisplayName" header="To Step">
    <template #body="{ data }">
                        {{ stepName(data.toStep) }}
                    </template>
</Column>
<Column field="toStepdisplayName" header="To Status">
    <template #body="{ data }">
                        {{ statusName(data.toStatus) }}
                    </template>
</Column>
<Column field="Action" header="Action">
    <template #body="{ data }">
                        <Button @click="deleteData(data)" severity="danger" class="btn-sm">
                            <trash-can></trash-can>Delete
                        </Button>
                    </template>
</Column>
</DataTable> -->
            <DataView :value="workflowStepOrders">

                <template #list="data">
                    <div v-for="(item) in data.items" :key="item.workflowStepOrderId">
                        <!-- {{ item }} -->
                        <div class="flex flex-row justify-between">
                            <div class="card max-w-min">
                                <p class="text-lg font-semibold text-gray-500">
                                    {{ stepName(item.fromStep) }}
                                </p>
                                <p class="mt-1 text-base font-light text-gray-700">
                                    {{ statusName(item.fromStatus) }}
                                </p>
                            </div>
                                <arrow-right></arrow-right>
                            <div class="card max-w-min">
                                <p class="text-lg font-semibold text-gray-500">
                                    {{ stepName(item.toStep) }}
                                </p>
                                <p class="mt-1 text-base font-light text-gray-700">
                                    {{ statusName(item.toStatus) }}
                                </p>
                            </div>
                            <Button @click="deleteData(item)" severity="danger" class="btn-sm">
                                <trash-can></trash-can>Delete
                            </Button>
                        </div>

                    </div>
                </template>
            </DataView>
            <div class="form-grid">
                <div class="col-span-6">
                    <div class="fm-group">
                        <div class="fm-label">From Step</div>
                        <div class="fm-inner">
                            <Dropdown v-model="workflowStepOrderData.fromWorkflowStepId" :options="workflowsSteps"
                                showClear option-label="displayName" option-value="workflowStepId"
                                placeHolder="Select from step" />
                        </div>
                    </div>
                </div>

                <div class="col-span-6">
                    <div class="fm-group">
                        <div class="fm-label">From Status</div>
                        <div class="fm-inner">
                            <Dropdown v-model="workflowStepOrderData.fromStatusId" :options="statuses" showClear
                                option-label="statusDisplayName" option-value="statusId"
                                placeHolder="Select from status" />
                        </div>
                    </div>
                </div>

                <div class="col-span-6">
                    <div class="fm-group">
                        <div class="fm-label">To Step</div>
                        <div class="fm-inner">
                            <Dropdown v-model="workflowStepOrderData.toWorkflowStepId" :options="workflowsSteps"
                                showClear option-label="displayName" option-value="workflowStepId"
                                placeHolder="Select to step" />
                        </div>
                    </div>
                </div>

                <div class="col-span-6">
                    <div class="fm-group">
                        <div class="fm-label">To Status</div>
                        <div class="fm-inner">
                            <Dropdown v-model="workflowStepOrderData.toStatusId" :options="statuses" showClear
                                option-label="statusDisplayName" option-value="statusId"
                                placeHolder="Select from status" />
                        </div>
                    </div>
                </div>
                <Button @click="insertworkflowStepOrder">Add</Button>

            </div>
        </div>
    </div>
    <div class="flex justify-between">
        <Button @click="prevCallback" class="btn btn-secondary">
            Previous
        </Button>
        <Button @click="nextCallback" class="btn btn-success">
            Save & Next
        </Button>
    </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import { login } from '@/store/modules/login.js'
import MQL from '@/plugins/mql.js'
import trashCan from "../../../../assets/icons/trash-can.svg";
import arrowRight from "../../../../assets/icons/arrow-right.svg"
import DataView from "primevue/dataview"



const loginStore = login()
const { workflowId } = defineProps(['workflowId'])

const emits = defineEmits(['nextTab', 'prevTab'])

const workflowStepOrderData = ref({
    'workflowId': workflowId
})


const workflowsSteps = ref([])

const workflowStepOrders = ref([])

const stepName = (stepId) => {
    let workflowStep = workflowsSteps.value.find(w => w.workflowStepId == stepId)
    return workflowStep ? workflowStep.displayName : '-'
}


const statusName = (statusId) => {
    let status = statuses.value.find(s => s.statusId == statusId)
    return status ? status.statusDisplayName : '-'
}


const deleteData = (data) => {
    deleteWorkflowStepOrder(data.workflowStepOrderId)
}


//TODO: fetch workflowsteps

const fetchWorkflowSteps = () => {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2kauHSwfx6s4TLIKFed7d5oRsgO]")
        .setData({ 'workflowId': workflowId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2kauHSwfx6s4TLIKFed7d5oRsgO", true)
            if (rs.isValid("query_2kauHSwfx6s4TLIKFed7d5oRsgO")) {
                workflowsSteps.value = res;
            } else {
                rs.showErrorToast("query_2kauHSwfx6s4TLIKFed7d5oRsgO")
            }
        })
}



//TODO: fetch statuses


const fetchStatues = () => {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2kyQwSEKcUNG7zNUhNBIv0I75ii]")
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2kyQwSEKcUNG7zNUhNBIv0I75ii", true)
            if (rs.isValid("query_2kyQwSEKcUNG7zNUhNBIv0I75ii")) {
                console.log(res);
                statuses.value = res.map((r) => ({ ...r, statusId: Number(r.statusId) }))
            } else {
                rs.showErrorToast("query_2kyQwSEKcUNG7zNUhNBIv0I75ii")
            }
        })
}



// TODO: insert workflow step order

const insertworkflowStepOrder = () => {

    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[InsertWorkflowStepOrder]")
        .setData({ ...workflowStepOrderData.value, 'userId': loginStore.loginId, 'roleId': loginStore.role.roleId, 'organizationId': loginStore.organizationId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("InsertWorkflowStepOrder", true)
            if (rs.isValid("InsertWorkflowStepOrder")) {
                fetchWorkflowStepOrder()
                workflowStepOrderData.value = {
                    'workflowId': workflowId
                }
            } else {
                rs.showErrorToast("InsertWorkflowStepOrder")
            }
        })

}

// TODO: delete workflow step order
const deleteWorkflowStepOrder = (id) => {

    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[DeleteWorkflowStepOrder]")
        .setData({ 'workflowStepOrderId': id })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("DeleteWorkflowStepOrder", true)
            if (rs.isValid("DeleteWorkflowStepOrder")) {
                fetchWorkflowStepOrder()
            } else {
                rs.showErrorToast("DeleteWorkflowStepOrder")
            }
        })
}



const fetchWorkflowStepOrder = () => {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2kYHSfWUs7V7YzzaXQDHENCsmak]")
        .setData({ 'workflowId': workflowId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2kYHSfWUs7V7YzzaXQDHENCsmak", true)
            if (rs.isValid("query_2kYHSfWUs7V7YzzaXQDHENCsmak")) {
                console.log(res)
                workflowStepOrders.value = res
            } else {
                rs.showErrorToast("query_2kYHSfWUs7V7YzzaXQDHENCsmak")
            }
        })
}

const statuses = ref([])

const nextCallback = () => {
    emits('nextTab')
}

const prevCallback = () => {
    emits('prevTab')
}

onMounted(() => {
    fetchWorkflowSteps()
    fetchStatues()
    fetchWorkflowStepOrder()
})
</script>