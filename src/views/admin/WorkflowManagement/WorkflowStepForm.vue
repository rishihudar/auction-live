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
                                <InputText v-model="workflowStepData.displayName" />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-6">
                        <div class="fm-group">
                            <div class="fm-label">Step</div>
                            <div class="fm-inner">
                                <Dropdown v-model="workflowStepData.stepId" placeholder="Select Step"
                                    :options="stepsMaster" option-label="stepName" option-value="stepId"
                                    :disabled="workflowStepData.workflowSetpId" />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-6">
                        <div class="fm-group">
                            <div class="fm-label">Step Role Initiator Id</div>
                            <div class="fm-inner">
                                <Dropdown v-model="workflowStepData.roleInitiatorId" placeholder="Select a Role"
                                    :options="rolesMaster" option-label="roleName" option-value="roleId"
                                    :disabled="workflowStepData.workflowStepId" />
                            </div>
                        </div>
                    </div>


                    <div class="col-span-6">
                        <div class="fm-group">
                            <div class="fm-label">Step Initiator Login Id</div>
                            <div class="fm-inner">
                                <Dropdown v-model="workflowStepData.stepId" placeholder="Select a Login"
                                    :options="loginsMaster" option-label="loginName" option-value="loginId"
                                    :disabled="workflowStepData.workflowStepId" />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-4">
                        <div class="fm-group">
                            <div class="fm-label">Step Enable</div>
                            <div class="fm-inner">
                                <RadioButton v-model="workflowStepData.enabled" name="enabled" value="0" />
                                <label for="enabled">No</label>
                                <RadioButton v-model="workflowStepData.enabled" name="enabled" value="1" />
                                <label for="enabled">Yes</label>
                            </div>
                        </div>
                    </div>


                    <div class="col-span-4">
                        <div class="fm-group">
                            <div class="fm-label">Start Step</div>
                            <div class="fm-inner">
                                <RadioButton v-model="workflowStepData.startStep" name="startStep" value="0" />
                                <label for="startStep">No</label>
                                <RadioButton v-model="workflowStepData.startStep" name="startStep" value="1" />
                                <label for="startStep">Yes</label>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-4">
                        <div class="fm-group">
                            <div class="fm-label">End Step</div>
                            <div class="fm-inner">
                                <RadioButton v-model="workflowStepData.endStep" name="endStep" value="0" />
                                <label for="endStep">No</label>
                                <RadioButton v-model="workflowStepData.endStep" name="endStep" value="1" />
                                <label for="endStep">Yes</label>
                            </div>
                        </div>
                    </div>


                    <div class="col-span-2">
                        <div class="fm-group">
                            <div class="fm-label">Data 1</div>
                            <div class="fm-inner">
                                <InputText v-model="workflowStepData.data1" />
                            </div>
                        </div>
                    </div>


                    <div class="col-span-2">
                        <div class="fm-group">
                            <div class="fm-label">Data 2</div>
                            <div class="fm-inner">
                                <InputText v-model="workflowStepData.data2" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-span-2">
                        <div class="fm-group">
                            <div class="fm-label">Data 3</div>
                            <div class="fm-inner">
                                <InputText v-model="workflowStepData.data3" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-span-2">
                        <div class="fm-group">
                            <div class="fm-label">Data 4</div>
                            <div class="fm-inner">
                                <InputText v-model="workflowStepData.data4" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-span-2">
                        <div class="fm-group">
                            <div class="fm-label">Data 5</div>
                            <div class="fm-inner">
                                <InputText v-model="workflowStepData.data5" />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <Button @click="insertWorkflowStep" class="btn btn-success">
                Add Step
            </Button>

        </div>
        <DataTable :value="workflowSteps">
            <Column field="displayName" header="Step Name"></Column>
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
        <Button @click="submitWorkflowStep" class="btn btn-success">
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

const workflowStepData = ref({})
const workflowSteps = ref([])
const stepsMaster = ref([])


const { workflowId } = defineProps(['workflowId'])

const emits = defineEmits(['nextTab', 'prevTab'])


const fetchWorkflowStepMaster = () => {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2kbRa16oh1LXOaC3oz2O6EyGHIE]")
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2kbRa16oh1LXOaC3oz2O6EyGHIE", true)
            if (rs.isValid("query_2kbRa16oh1LXOaC3oz2O6EyGHIE")) {
                stepsMaster.value = res;
            } else {
                rs.showErrorToast("query_2kbRa16oh1LXOaC3oz2O6EyGHIE")
            }
        })
}

const submitWorkflowStep = () => {
    emits('nextTab')
}

const previousWorkflowStep = () => {
    emits('prevTab')
}

const editData = (data) => {
    console.log(data);
}



const insertWorkflowStep = () => {
    return new Promise((resolve) => {
        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("r.[InsertWorkflowStep]")
            .setData({ ...workflowStepData.value, 'loginId': loginStore.loginId, 'roleId': loginStore.role.roleId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("InsertWorkflowStep", true)
                if (rs.isValid("InsertWorkflowStep")) {
                    workflowStepData.value.workflowStepId = res.result.objectId;
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
})



</script>