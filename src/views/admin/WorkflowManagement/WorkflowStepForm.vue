<template>
    <div>
        <div>Workflow Step</div>
        <div>
            <div>
                <div class="form-grid">

                    <div class="col-span-6">
                        <div class="fm-group">
                            <div class="fm-label">Display Name</div>
                            <div class="fm-inner">
                                <InputText v-model="workflowStepData.displayName"
                                    :disabled="workflowStepData.workflowStepId" />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-6">
                        <div class="fm-group">
                            <div class="fm-label">Step</div>
                            <div class="fm-inner">
                                <Dropdown v-model="workflowStepData.stepId" placeholder="Select Step"
                                    :options="stepsMaster" option-label="stepName" option-value="stepId"
                                    :disabled="workflowStepData.workflowStepId" />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-6">
                        <div class="fm-group">
                            <div class="fm-label">Step Role Initiator Id</div>
                            <div class="fm-inner">
                                <Dropdown v-model="workflowStepData.initiatorRoleId" placeholder="Select a Role"
                                    :options="rolesMaster" option-label="roleDisplayName" option-value="roleId"
                                    :disabled="workflowStepData.workflowStepId" @change="fetchLogins" />
                            </div>
                        </div>
                    </div>


                    <div class="col-span-6">
                        <div class="fm-group">
                            <div class="fm-label">Step Initiator Login Id</div>
                            <div class="fm-inner">
                                <Dropdown v-model="workflowStepData.initiatorLoginId" placeholder="Select a Login"
                                    :options="loginsMaster" option-label="fullName" option-value="userId" showClear
                                    :disabled="workflowStepData.workflowStepId" />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-4">
                        <div class="fm-group">
                            <div class="fm-label">Step Enable</div>
                            <div class="fm-inner">
                                <RadioButton v-model="workflowStepData.enabled" name="enabled" value="0"
                                    :disabled="workflowStepData.workflowStepId" />
                                <label for="enabled">No</label>
                                <RadioButton v-model="workflowStepData.enabled" name="enabled" value="1"
                                    :disabled="workflowStepData.workflowStepId" />
                                <label for="enabled">Yes</label>
                            </div>
                        </div>
                    </div>


                    <div class="col-span-4">
                        <div class="fm-group">
                            <div class="fm-label">Is this the Start Step?</div>
                            <div class="fm-inner">
                                <RadioButton v-model="workflowStepData.startStep" name="startStep" value="0"
                                    :disabled="workflowStepData.workflowStepId" />
                                <label for="startStep">No</label>
                                <RadioButton v-model="workflowStepData.startStep" name="startStep" value="1"
                                    :disabled="workflowStepData.workflowStepId" />
                                <label for="startStep">Yes</label>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-4">
                        <div class="fm-group">
                            <div class="fm-label">Is this the End Step?</div>
                            <div class="fm-inner">
                                <RadioButton v-model="workflowStepData.endStep" name="endStep" value="0"
                                    :disabled="workflowStepData.workflowStepId" />
                                <label for="endStep">No</label>
                                <RadioButton v-model="workflowStepData.endStep" name="endStep" value="1"
                                    :disabled="workflowStepData.workflowStepId" />
                                <label for="endStep">Yes</label>
                            </div>
                        </div>
                    </div>


                    <div v-if="loginStore.role.roleCode == 'DEVELOPER'" class="col-span-2">
                        <div class="fm-group">
                            <div class="fm-label">Data 1</div>
                            <div class="fm-inner">
                                <InputText v-model="workflowStepData.data1" />
                            </div>
                        </div>
                    </div>


                    <div v-if="loginStore.role.roleCode == 'DEVELOPER'" class="col-span-2">
                        <div class="fm-group">
                            <div class="fm-label">Data 2</div>
                            <div class="fm-inner">
                                <InputText v-model="workflowStepData.data2" />
                            </div>
                        </div>
                    </div>

                    <div v-if="loginStore.role.roleCode == 'DEVELOPER'" class="col-span-2">
                        <div class="fm-group">
                            <div class="fm-label">Data 3</div>
                            <div class="fm-inner">
                                <InputText v-model="workflowStepData.data3" />
                            </div>
                        </div>
                    </div>

                    <div v-if="loginStore.role.roleCode == 'DEVELOPER'" class="col-span-2">
                        <div class="fm-group">
                            <div class="fm-label">Data 4</div>
                            <div class="fm-inner">
                                <InputText v-model="workflowStepData.data4" />
                            </div>
                        </div>
                    </div>

                    <div v-if="loginStore.role.roleCode == 'DEVELOPER'" class="col-span-2">
                        <div class="fm-group">
                            <div class="fm-label">Data 5</div>
                            <div class="fm-inner">
                                <InputText v-model="workflowStepData.data5" />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <Button @click="submitWorkflowStep" class="btn btn-success">
                {{ workflowStepData.workflowStepId ? 'Edit' : 'Add' }} Step
            </Button>

        </div>
        <DataTable :value="workflowSteps">
            <Column field="displayName" header="Step Display Name"></Column>
            <Column field="stepId" header="Step Name">
                <template #body="{ data }">
                    {{ stepName(data.stepId) }}
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
    <div class="flex justify-between">
        <Button @click="previousWorkflowStep" class="btn btn-secondary">
            Previous
        </Button>
        <Button @click="nextTab" class="btn btn-success">
            Save & Next
        </Button>
    </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import { ref, onMounted } from 'vue';
import MQL from '@/plugins/mql.js';
import faPenToSquare from "../../../../assets/icons/pen-to-square.svg";
import trashCan from "../../../../assets/icons/trash-can.svg";
import { login } from '@/store/modules/login.js'


const loginStore = login();

const workflowStepData = ref({
    initiatorLoginId: null,
    enabled: "1",
    data1: null,
    data2: null,
    data3: null,
    data4: null,
    data5: null
})
const workflowSteps = ref([])
const rolesMaster = ref([])
const loginsMaster = ref([])
const stepsMaster = ref([])


const { workflowId } = defineProps(['workflowId'])

const emits = defineEmits(['nextTab', 'prevTab'])

const fetchLogins = () => {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2l0kJtvarJt4TQtG9u9cTcFJF0Y]")
        .setData({ 'roleId': workflowStepData.value.initiatorRoleId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2l0kJtvarJt4TQtG9u9cTcFJF0Y", true)
            if (rs.isValid("query_2l0kJtvarJt4TQtG9u9cTcFJF0Y")) {
                loginsMaster.value = res
            } else {
                rs.showErrorToast("query_2l0kJtvarJt4TQtG9u9cTcFJF0Y")
            }
        })
}

const fetchRoles = () => {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2l0fpK138ZDo9ktNbzsyfNNktYs]")
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2l0fpK138ZDo9ktNbzsyfNNktYs", true)
            if (rs.isValid("query_2l0fpK138ZDo9ktNbzsyfNNktYs")) {
                rolesMaster.value = res.map(a => ({ ...a, roleId: Number(a.roleId) }))
            } else {
                rs.showErrorToast("query_2l0fpK138ZDo9ktNbzsyfNNktYs")
            }
        })
}

const fetchWorkflowStepMaster = () => {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2kbRa16oh1LXOaC3oz2O6EyGHIE]")
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2kbRa16oh1LXOaC3oz2O6EyGHIE", true)
            if (rs.isValid("query_2kbRa16oh1LXOaC3oz2O6EyGHIE")) {
                stepsMaster.value = res.map(r => ({ ...r, stepId: Number(r.stepId) }));
            } else {
                rs.showErrorToast("query_2kbRa16oh1LXOaC3oz2O6EyGHIE")
            }
        })
}

const nextTab = () => {
    emits('nextTab')
}

const previousWorkflowStep = () => {
    emits('prevTab')
}

const editData = (data) => {
    console.log(data);
    workflowStepData.value = { ...data }
}

const updateWorkflowStep = () => {
    return new Promise((resolve) => {
        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("r.[UpdateWorkflowStep]")
            .setData({ ...workflowStepData.value, 'userId': loginStore.loginId, 'roleId': loginStore.role.roleId, 'organizationId': loginStore.organizationId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("UpdateWorkflowStep", true)
                if (rs.isValid("UpdateWorkflowStep")) {
                    resolve()
                } else {
                    rs.showErrorToast("UpdateWorkflowStep")
                }
            })
    })


}


const submitWorkflowStep = async () => {
    if (workflowStepData.value.workflowStepId) {
        await updateWorkflowStep()
    } else {
        await insertWorkflowStep()
    }
    fetchWorkflowSteps()
    workflowStepData.value = {
        initiatorLoginId: null,
        data1: null,
        data2: null,
        data3: null,
        data4: null,
        data5: null
    }
}

const deleteData = (data) => {

    console.log(data);
    
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[DeleteWorkflowStep]")
        .setData({ 'workflowStepId': data.workflowStepId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("DeleteWorkflowStep", true)
            if (rs.isValid("DeleteWorkflowStep")) {
                console.log(res);
                fetchWorkflowSteps()
            } else {
                rs.showErrorToast("DeleteWorkflowStep")
            }
        })

}

const stepName = (id) => {
    let step = stepsMaster.value.find(step => step.stepId == id)
    return step ? step.stepName : ''
}



const insertWorkflowStep = () => {
    return new Promise((resolve) => {
        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("r.[InsertWorkflowStep]")
            .setData({ ...workflowStepData.value, 'userId': loginStore.loginId, 'roleId': loginStore.role.roleId, 'organizationId': loginStore.organizationId, 'workflowId': workflowId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("InsertWorkflowStep", true)
                if (rs.isValid("InsertWorkflowStep")) {
                    resolve()
                } else {
                    rs.showErrorToast("InsertWorkflowStep")
                }
            })
    })
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

onMounted(() => {
    fetchWorkflowStepMaster()
    fetchWorkflowSteps()
    fetchRoles()
})



</script>