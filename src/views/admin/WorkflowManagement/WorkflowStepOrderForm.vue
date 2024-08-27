<template>
    <div>
        <div>Workflow Step Order</div>
        <div>
            <div class="form-grid">

                <div class="col-span-6">
                    <div class="fm-group">
                        <div class="fm-label">From Step</div>
                        <div class="fm-inner">
                            <Dropdown v-model="workflowStepOrderData.fromStepId" :options="workflowSteps" showClear
                                placeHolder="Select from step" />
                        </div>
                    </div>
                </div>

                <div class="col-span-6">
                    <div class="fm-group">
                        <div class="fm-label">From Status</div>
                        <div class="fm-inner">
                            <Dropdown v-model="workflowStepOrderData.fromStatusId" :options="statuses" showClear
                                placeHolder="Select from status" />
                        </div>
                    </div>
                </div>

                <div class="col-span-6">
                    <div class="fm-group">
                        <div class="fm-label">To Step</div>
                        <div class="fm-inner">
                            <Dropdown v-model="workflowStepOrderData.toStepId" :options="workflowSteps" showClear
                                placeHolder="Select to step" />
                        </div>
                    </div>
                </div>

                <div class="col-span-6">
                    <div class="fm-group">
                        <div class="fm-label">To Status</div>
                        <div class="fm-inner">
                            <Dropdown v-model="workflowStepOrderData.toStatusId" :options="statuses" showClear
                                placeHolder="Select from status" />
                        </div>
                    </div>
                </div>
                <Button @click="insertworkflowStepOrder">Add</Button>

            </div>
            <DataTable :value="workflowStepOrders">
                <Column field="fromStepdisplayName" header="From Step"></Column>
                <Column field="fromStatusdisplayName" header="From Status"></Column>
                <Column field="toStepdisplayName" header="To Step"></Column>
                <Column field="toStepdisplayName" header="To Status"></Column>
                <Column field="Action" header="Action">
                    <template #body="{ data }">
                        <Button @click="deleteData(data)" severity="danger" class="btn-sm">
                            <trash-can></trash-can>Delete
                        </Button>
                    </template>
                </Column>
            </DataTable>
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
    return step ? workflowStep.displayName : '-'
}


const statusName = (statusId) => {
    let status = statuses.value.find(s => s.statusId == statusId)
    return status ? status.statusName : '-'
}


const deleteData = (data) => {
    deleteWorkflowStepOrder(data.workflowStepOrderId)
}


//TODO: fetch workflowsteps

const fetchWorkflowSteps = () => {
    // Automatically generated
   
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
        .setData({ ...workflowStepOrderData.value, 'userId': loginStore.loginId, 'roleId': loginStore.role.roleId, 'organisationId': loginStore.organisationId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("InsertWorkflowStepOrder", true)
            if (rs.isValid("InsertWorkflowStepOrder")) {

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