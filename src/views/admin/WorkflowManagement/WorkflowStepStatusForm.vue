<template>
    <div>
        <p>Workflow Step Status</p>
        <div>
            <div>
                <div class="form-grid">

                    <div class="col-span-6">
                        <div class="fm-group">
                            <div class="fm-label">Workflow Step</div>
                            <div class="fm-inner">
                                <Dropdown v-model="workflowStepStatusData.workflowStepId" placeholder="Select Step"
                                    :options="workflowSteps" option-label="displayName" option-value="workflowStepId"
                                    :disabled="workflowStepStatusData.workflowStepStatusId" />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-6">
                        <div class="fm-group">
                            <div class="fm-label">Step Status</div>
                            <div class="fm-inner">
                                <Dropdown v-model="workflowStepStatusData.statusId" placeholder="Select Status"
                                    :options="statuses" option-label="statusDisplayName" option-value="statusId"
                                    :disabled="workflowStepStatusData.workflowStepStatusId" />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-6">
                        <div class="fm-group">
                            <div class="fm-label">Step Status Display Name</div>
                            <div class="fm-inner">
                                <InputText type="text" v-model="workflowStepStatusData.displayName" />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-6">
                        <div class="fm-group">
                            <div class="fm-label">Step Status Display Order</div>
                            <div class="fm-inner">
                                <InputText type="text" v-model="workflowStepStatusData.displayOrder" />
                            </div>
                        </div>
                    </div>
                </div>

                <Button @click="submitWorkflowStepStatus" class="btn btn-primary">
                    {{ workflowStepStatusData.workflowStepStatusId ? 'Edit' : 'Add' }} Workflow Step Status
                </Button>
            </div>

            <DataTable :value="workflowStepStatus">
                <Column field="workflowStepId" header="Workflow Step">
                    <template #body="{ data }">
                        <span>{{ workflowStepName(data.workflowStepId) }}</span>
                    </template>
                </Column>

                <Column field="statusId" header="Workflow Step Status">
                    <template #body="{ data }">
                        <span>{{ statusName(data.statusId) }}</span>
                    </template>
                </Column>

                <Column field="displayName" header="Workflow Step Status Display Name">
                    <template #body="{ data }">
                        <span>{{ data.displayName }}</span>
                    </template>
                </Column>

                <Column field="Action" header="Action">
                    <template #body="{ data }">
                        <Button @click="editData(data)" severity="secondary" class="btn-sm">
                            <fa-pen-to-square></fa-pen-to-square>Edit
                        </Button>
                        <Button @click="deleteData(data)" severity="danger" class="btn-sm">
                            <trash-can></trash-can>Delete
                        </Button>
                    </template>
                </Column>

            </DataTable>
        </div>
    </div>
    <div class="flex justify-between">
        <Button @click="previousWorkflowStepStatus" class="btn btn-secondary">
            Previous
        </Button>
        <Button @click="nextStep" class="btn btn-success">
            Save & Next
        </Button>
    </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';
import MQL from '@/plugins/mql.js';
import InputText from 'primevue/inputtext';
import faPenToSquare from "../../../../assets/icons/pen-to-square.svg";
import trashCan from "../../../../assets/icons/trash-can.svg";
import { ref, onMounted } from 'vue'

import { login } from '@/store/modules/login.js'


const loginStore = login()

const { workflowId } = defineProps(['workflowId'])
const emits = defineEmits(['nextTab', 'prevTab'])

const workflowStepStatusData = ref({})

const workflowStepStatus = ref([])


const statuses = ref([])


const workflowSteps = ref([])

const editData = (data) => {
    workflowStepStatusData.value = {...data}
}


const deleteData = (data) => {

}


const nextStep = () => {
    emits('nextTab')
}

const previousWorkflowStepStatus = () => {
    emits('prevTab')
}


const updateWorkflowStepStatus = () => {
    return new Promise((resolve) => {
        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("r.[UpdateWorkflowStepStatus]")
            .setData({ ...workflowStepStatusData.value, 'userId': loginStore.loginId, 'roleId': loginStore.role.roleId, 'organizationId': loginStore.organizationId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("UpdateWorkflowStepStatus", true)
                if (rs.isValid("UpdateWorkflowStepStatus")) {
                    resolve()
                } else {
                    rs.showErrorToast("UpdateWorkflowStepStatus")
                }
            })
    })


}

const addWorkflowStepStatus = () => {

    return new Promise((resolve) => {

        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("r.[InsertWorkflowStepStatus]")
            .setData({ ...workflowStepStatusData.value, 'userId': loginStore.loginId, 'roleId': loginStore.role.roleId, 'organizationId': loginStore.organizationId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("InsertWorkflowStepStatus", true)
                if (rs.isValid("InsertWorkflowStepStatus")) {
                    resolve()
                } else {
                    rs.showErrorToast("InsertWorkflowStepStatus")
                }
            })

    })

}


const submitWorkflowStepStatus = async () => {
    if (workflowStepStatusData.value.workflowStepStatusId) {
        await updateWorkflowStepStatus()
    } else {
        await addWorkflowStepStatus()
    }
    fetchWorkflowStatues()
    workflowStepStatusData.value = {}

}

const fetchWorkflowStatues = () => {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2kPbBHDnmaKIrVAKCanyftGm7lj]")
        .setData({ 'workflowId': workflowId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2kPbBHDnmaKIrVAKCanyftGm7lj", true)
            if (rs.isValid("query_2kPbBHDnmaKIrVAKCanyftGm7lj")) {
                console.log(res);
                workflowStepStatus.value = res
            } else {
                rs.showErrorToast("query_2kPbBHDnmaKIrVAKCanyftGm7lj")
            }
        })
}

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


const statusName = (statusId) => {
    let status = statuses.value.find(status => status.statusId == statusId)
    return status ? status.statusDisplayName : ''
}


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
                workflowSteps.value = res;
            } else {
                rs.showErrorToast("query_2kauHSwfx6s4TLIKFed7d5oRsgO")
            }
        })
}

const workflowStepName = (workflowStepId) => {
    let step = workflowSteps.value.find(step => step.workflowStepId == workflowStepId)
    return step ? step.displayName : ''
}

onMounted(() => {
    fetchWorkflowStatues()
    fetchWorkflowSteps()
    fetchStatues()
})

</script>