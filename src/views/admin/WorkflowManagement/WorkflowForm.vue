<template>
    <div>
        <div>Workflow Data</div>
        <div class="form-grid">
            <!-- organization -->
            <div class="col-span-6">
                <div class="fm-group">
                    <div class="fm-label">Organization</div>
                    <div class="fm-inner">
                        <Dropdown v-model="workflowData.organizationId" :options="organizations"
                            option-value="organizationId" option-label="organizationName"
                            placeholder="Select a Organization" :disabled="workflowData.workflowId" />
                    </div>
                </div>
            </div>

            <!-- Entity -->
            <div class="col-span-6">
                <div class="fm-group">
                    <div class="fm-label">Entity</div>
                    <div class="fm-inner">
                        <Dropdown v-model="workflowData.entityId" :options="entities" option-value="entityId"
                            @update:modelValue="AssignWorkflowName" option-label="entityName"
                            placeholder="Select a Entity" :disabled="workflowData.workflowId" />
                    </div>
                </div>
            </div>

            <!-- workflow name -->
            <div class="col-span-6">
                <div class="fm-group">
                    <div class="fm-label">Workflow Name</div>
                    <div class="fm-inner">
                        <InputText id="workflowName" v-model="workflowData.workflowName"
                            :disabled="workflowData.workflowId" />
                    </div>
                </div>
            </div>

            <!-- workflow code -->
            <div class="col-span-6">
                <div class="fm-group">
                    <div class="fm-label">Workflow Code</div>
                    <div class="fm-inner">
                        <InputText id="workflowCode" :disabled="workflowData.workflowId"
                            v-model="workflowData.workflowCode" />
                    </div>
                </div>
            </div>
            <!-- Data 1 -->
            <div v-if="loginStore.role.roleCode == 'ROLE_DEVELOPER'" class="col-span-2">
                <div class="fm-group">
                    <div class="fm-label">Data 1</div>
                    <div class="fm-inner">
                        <InputText id="Data1" v-model="workflowData.data1" />
                    </div>
                </div>
            </div>

            <!-- Data 2 -->
            <div v-if="loginStore.role.roleCode == 'ROLE_DEVELOPER'" class="col-span-2">
                <div class="fm-group">
                    <div class="fm-label">Data 2</div>
                    <div class="fm-inner">
                        <InputText id="Data2" v-model="workflowData.data2" />
                    </div>
                </div>
            </div>

            <!-- Data 3 -->
            <div v-if="loginStore.role.roleCode == 'ROLE_DEVELOPER'" class="col-span-2">
                <div class="fm-group">
                    <div class="fm-label">Data 3</div>
                    <div class="fm-inner">
                        <InputText id="Data3" v-model="workflowData.data3" />
                    </div>
                </div>
            </div>

            <!-- Data 4 -->
            <div v-if="loginStore.role.roleCode == 'ROLE_DEVELOPER'" class="col-span-2">
                <div class="fm-group">
                    <div class="fm-label">Data 4</div>
                    <div class="fm-inner">
                        <InputText id="Data4" v-model="workflowData.data4" />
                    </div>
                </div>
            </div>


            <!-- Data 5 -->
            <div v-if="loginStore.role.roleCode == 'ROLE_DEVELOPER'" class="col-span-2">
                <div class="fm-group">
                    <div class="fm-label">Data 5</div>
                    <div class="fm-inner">
                        <InputText id="Data5" v-model="workflowData.data5" />
                    </div>
                </div>
            </div>

            <!-- Data 6 -->
            <div v-if="loginStore.role.roleCode == 'ROLE_DEVELOPER'" class="col-span-2">
                <div class="fm-group">
                    <div class="fm-label">Data 6</div>
                    <div class="fm-inner">
                        <InputText id="Data6" v-model="workflowData.data6" />
                    </div>
                </div>
            </div>

            <div v-if="!workflowData.workflowId" class="col-span-2">
                <div class="fm-group">
                    <div class="fm-label">Use a Workflow Template?</div>
                    <div class="fm-inner">
                        <Dropdown v-model="workflowTemplateId" :options="workflowTemplates"
                            option-value="workflowTemplateId" option-label="workflowTemplateName"
                            placeholder="Select a Template" :disabled="workflowData.workflowId" />
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="flex justify-between">
        <Button @click="closeForm()" class="btn btn-danger">
            Cancel
        </Button>
        <Button @click="submitWorkflow()" class="btn btn-success">
            Save & Next
        </Button>
    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import MQL from '@/plugins/mql.js'
import { login } from '@/store/modules/login.js'


const loginStore = login();

const organizations = ref([]);
const workflowTemplates = ref([]);
const entities = ref([]);
const workflowData = ref({
    data1: null,
    data2: null,
    data3: null,
    data4: null,
    data5: null,
    data6: null,
})

const workflowTemplateId = ref(0)



const emits = defineEmits(['nextTab', 'prevTab', 'workflowId'])
const { workflowId } = defineProps(['workflowId'])



function FetchOrganizations() {
    new MQL()
        .useCoreServer()
        .setActivity("o.[FetchOrganizationDetails]")
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchOrganizationDetails", true)
            if (rs.isValid("FetchOrganizationDetails")) {
                // organizations.value = res.result
                organizations.value = res.result.map(org => ({ ...org, organizationId: Number(org.organizationId) }));
            } else {
                rs.showErrorToast("FetchOrganizationDetails")
            }
        })
}

function FetchEntities() {
    new MQL()
        .useManagementServer()
        .setActivity('r.[query_2kasdQkG8LjS4adjYWAvm4JaCzO]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('query_2kasdQkG8LjS4adjYWAvm4JaCzO', true);
            if (rs.isValid('query_2kasdQkG8LjS4adjYWAvm4JaCzO')) {
                entities.value = res.map(entity => ({ ...entity, entityId: Number(entity.entityId) }));
            } else {
                rs.showErrorToast('query_2kasdQkG8LjS4adjYWAvm4JaCzO');
            }
        });
}

const createWorkflowMaster = () => {

    return new Promise((resolve) => {
        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("r.[InsertWorkflow]")
            .setData({ ...workflowData.value, 'userId': loginStore.loginId, 'roleId': loginStore.role.roleId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("InsertWorkflow", true)
                if (rs.isValid("InsertWorkflow")) {
                    workflowData.value.workflowId = res.result.objectId;
                    emits('workflowId', res.result.objectId)
                    resolve()
                } else {
                    rs.showErrorToast("InsertWorkflow")
                }
            })
    })

}



const updateWorkflowMaster = () => {
    // Automatically generated
    return new Promise((resolve) => {
        new MQL()
            .useManagementServer()
            .setActivity("r.[UpdateWorkflow]")
            .setData({ ...workflowData.value, 'userId': loginStore.loginId, 'roleId': loginStore.role.roleId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("UpdateWorkflow", true)
                if (rs.isValid("UpdateWorkflow")) {
                    resolve()
                } else {
                    rs.showErrorToast("UpdateWorkflow")
                }
            })
    })

}

const fetchWorkflowData = () => {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2krOr3LBbS6IGwCYlPg54ozpOMG]")
        .setData({ 'workflowId': workflowId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2krOr3LBbS6IGwCYlPg54ozpOMG", true)
            if (rs.isValid("query_2krOr3LBbS6IGwCYlPg54ozpOMG")) {
                console.log(res);
                workflowData.value = res[0];

            } else {
                rs.showErrorToast("query_2krOr3LBbS6IGwCYlPg54ozpOMG")
            }
        })
}


const makeWorkflowFromTemplate = () => {

    return new Promise((resolve, reject) => {
        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("r.[MakeWorkflowFromTemplate]")
            .setData({ "entityId": workflowData.value.entityId, "loginId": loginStore.loginId, "organizationId": workflowData.value.organizationId, "roleId": loginStore.role.roleId, "workflowCode": workflowData.value.workflowCode, "workflowMasterTemplateId": workflowTemplateId.value, "workflowName": workflowData.value.workflowName })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("MakeWorkflowFromTemplate", true)
                if (rs.isValid("MakeWorkflowFromTemplate")) {
                    resolve()
                } else {
                    rs.showErrorToast("MakeWorkflowFromTemplate" )
                }
            })
    })


}

const submitWorkflow = async () => {

    if (workflowData.value.workflowId) {
        await updateWorkflowMaster();
    } else {
        if (workflowTemplateId.value != 0) {
            await makeWorkflowFromTemplate()
        } else {
            await createWorkflowMaster();
        }
    }
    emits('nextTab')
}

const AssignWorkflowName = () => {
    workflowData.value.workflowName = entities.value.find((e) => (e.entityId == workflowData.value.entityId)).entityName
}


const closeForm = () => {
    emits('prevTab')
}


const fetchWorkflowTemplates = () => {
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2mEReQDLrgzMelGutYwOe7DBb8s]")
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2mEReQDLrgzMelGutYwOe7DBb8s", true)
            if (rs.isValid("query_2mEReQDLrgzMelGutYwOe7DBb8s")) {
                workflowTemplates.value = res
                workflowTemplates.value.unshift({
                    'workflowTemplateId': 0,
                    'workflowTemplateName': 'Manual'
                })
            } else {
                rs.showErrorToast("query_2mEReQDLrgzMelGutYwOe7DBb8s")
            }
        })
}


onMounted(() => {
    FetchOrganizations();
    FetchEntities();
    fetchWorkflowTemplates();
    if (workflowId) {
        fetchWorkflowData()
    }
})
</script>