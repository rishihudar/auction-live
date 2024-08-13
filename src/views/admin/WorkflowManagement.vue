<template>
    <div>
        <template v-if="flag">
            <div class="page-header">
                <div class="ph-text">
                    <h2 class="title">Workflow Management</h2>
                </div>
                <div class="ph-action">
                    <Button @click="changeFlag(false)" class="btn btn-primary btn-add">
                        <fa-plus></fa-plus>
                        Add Workflow
                    </Button>
                </div>
            </div>
            <div class="table-custom">
                <Paginator class="pagination-up" :rows="perPage" :rowsPerPageOptions="[10, 20, 30]"
                    :totalRecords="totalRows" template="RowsPerPageDropdown" @page="handlePageChange">
                    <template #start>
                        <div class="fm-inner">
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                            <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
                        </div>
                    </template>
                </Paginator>
                <DataTable responsiveLayout="scroll" v-model:filters="filters" :value="workflows" paginator :rows="10"
                    dataKey="id" :loading="loading" :globalFilterFields="['workflowName', 'workflowCode']">
                    <template #empty>
                        <div class="box-watermark">
                            No workflows found.
                        </div>
                    </template>
                    <template #loading>Loading workflow data. Please wait...</template>

                    <Column field="workflowName" header="Workflow Name">
                        <template #body="{ data }">
                            {{ data.workflowName }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Search by workflow name" />
                        </template>
                    </Column>
                    <Column field="workflowCode" header="Workflow Code">
                        <template #body="{ data }">
                            {{ data.workflowCode }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Search by workflow code" />
                        </template>
                    </Column>
                    <Column header="Actions">
                        <template #body="{ data }">
                            <Button @click="editData(data)" severity="secondary" class="btn-sm">
                                <fa-pen-to-square></fa-pen-to-square>Edit
                            </Button>
                        </template>
                    </Column>
                </DataTable>
            </div>

        </template>
        <template v-else>
            <Card>
                <template #title>Add Workflow</template>
                <template #content>
                    <Stepper linear class="wizard-wrapper wizard-wrapper-prime" :active-step="activeStep">
                        <StepperPanel header="Workflow">
                            <template #content>
                                <div class="flex flex-column h-12rem">
                                    <div class="form-grid">
                                        <!-- organization -->
                                        <div class="col-span-2">
                                            <div class="fm-group">
                                                <div class="fm-label">Organization</div>
                                                <div class="fm-inner">
                                                    <Dropdown v-model="workflowData.organizationId"
                                                        :options="organizations" option-value="organizationId"
                                                        option-label="organizationName"
                                                        placeholder="Select a Organization"
                                                        :disabled="workflowData.workflowId" />
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Entity -->
                                        <div class="col-span-2">
                                            <div class="fm-group">
                                                <div class="fm-label">Entity</div>
                                                <div class="fm-inner">
                                                    <Dropdown v-model="workflowData.entityId" :options="entities"
                                                        option-value="entityId" option-label="entityName"
                                                        placeholder="Select a Entity"
                                                        :disabled="workflowData.workflowId" />
                                                </div>
                                            </div>
                                        </div>
                                        <!-- workflow name -->
                                        <div class="col-span-2">
                                            <div class="fm-group">
                                                <div class="fm-label">Workflow Name</div>
                                                <div class="fm-inner">
                                                    <InputText id="workflowName" v-model="workflowData.workflowName" />
                                                </div>
                                            </div>
                                        </div>
                                        <!-- workflow code -->
                                        <div class="col-span-2">
                                            <div class="fm-group">
                                                <div class="fm-label">Workflow Code</div>
                                                <div class="fm-inner">
                                                    <InputText id="workflowCode" :disabled="workflowData.workflowId"
                                                        v-model="workflowData.workflowCode" />
                                                </div>
                                            </div>


                                            <!-- Data 1 -->
                                            <div class="col-span-2">
                                                <div class="fm-group">
                                                    <div class="fm-label">Data 1</div>
                                                    <div class="fm-inner">
                                                        <InputText id="Data1" v-model="workflowData.data1" />
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Data 2 -->
                                            <div class="col-span-2">
                                                <div class="fm-group">
                                                    <div class="fm-label">Data 2</div>
                                                    <div class="fm-inner">
                                                        <InputText id="Data2" v-model="workflowData.data2" />
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Data 3 -->
                                            <div class="col-span-2">
                                                <div class="fm-group">
                                                    <div class="fm-label">Data 3</div>
                                                    <div class="fm-inner">
                                                        <InputText id="Data3" v-model="workflowData.data3" />
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Data 4 -->
                                            <div class="col-span-2">
                                                <div class="fm-group">
                                                    <div class="fm-label">Data 4</div>
                                                    <div class="fm-inner">
                                                        <InputText id="Data4" v-model="workflowData.data4" />
                                                    </div>
                                                </div>
                                            </div>


                                            <!-- Data 5 -->
                                            <div class="col-span-2">
                                                <div class="fm-group">
                                                    <div class="fm-label">Data 5</div>
                                                    <div class="fm-inner">
                                                        <InputText id="Data5" v-model="workflowData.data5" />
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Data 6 -->
                                            <div class="col-span-2">
                                                <div class="fm-group">
                                                    <div class="fm-label">Data 6</div>
                                                    <div class="fm-inner">
                                                        <InputText id="Data6" v-model="workflowData.data6" />
                                                    </div>
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
                        </StepperPanel>

                        <!--  -->
                        <StepperPanel header="Workflow Step">
                            <template #content="{ nextCallback, prevCallback }">
                                <div class="flex flex-column h-12rem">
                                    <div>Workflow Step</div>
                                    <div>
                                        <div class="flex flex-column h-12rem">
                                            <div class="form-grid">

                                                <div class="col-span-2">
                                                    <div class="fm-group">
                                                        <div class="fm-label">Display Name</div>
                                                        <div class="fm-inner">
                                                            <InputText v-model="workflowStepData.displayName" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-span-2">
                                                <div class="fm-group">
                                                    <div class="fm-label">Step</div>
                                                    <div class="fm-inner">
                                                        <Dropdown v-model="workflowStepData.stepId"
                                                            placeholder="Select a Organization" :options="stepsMaster"
                                                            option-label="stepName" option-value="stepId"
                                                            :disabled="workflowStepData.workflowStepId" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <DataTable :value="workflowSteps">
                                        <Column field="displayName" header="Step Name"></Column>
                                    </DataTable>
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
                        </StepperPanel>

                        <StepperPanel header="Workflow Step Status">
                            <template #content="{ nextCallback, prevCallback }">
                                <div class="flex flex-column h-12rem">
                                    <p>workflow page 3</p>
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
                        </StepperPanel>


                        <StepperPanel header="Workflow Step Order">
                            <template #content="{ nextCallback, prevCallback }">
                                <div class="flex flex-column h-12rem">
                                    <p>workflow page 4</p>
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
                        </StepperPanel>
                    </Stepper>

                </template>
            </Card>
        </template>
    </div>
</template>

<script setup>
import faPlus from "../../../assets/icons/plus.svg";
import MQL from "../../plugins/mql.js"
import faPenToSquare from "../../../assets/icons/pen-to-square.svg";
import Button from 'primevue/button';
import Card from 'primevue/card';
import { onMounted, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Dropdown from 'primevue/dropdown';
import { login } from '../../store/modules/login'

const perPage = ref(10);
const totalRows = ref(0);
const handlePageChange = (event) => {
    console.log(event);
};

const loginStore = login()

const workflowData = ref({})

const workflowStepData = ref({})

const workflows = ref([
    {
        workflowId: 1,
        workflowname: "Workflow 1",
        workflowcode: "WF1",
    }
]);

const loading = ref(true);

const flag = ref(true);
const activeStep = ref(0);

const organizations = ref([]);
const entities = ref([]);


const workflowSteps = ref([]);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    workflowName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    workflowCode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

});
const changeFlag = (flag_) => {
    flag.value = flag_;
};

function fetchWorkflows() {
    loading.value = true;
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[FetchWorkflow]")
        .setData()
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchWorkflow", true)
            if (rs.isValid("FetchWorkflow")) {

                workflows.value = res.result;
                totalRows.value = res.result.length;
                loading.value = false;
            } else {
                rs.showErrorToast("FetchWorkflow")
            }
        })

}

function FetchOrganizations() {
    new MQL()
        .useCoreServer()
        .setActivity("o.[FetchOrganizationDetails]")
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchOrganizationDetails", true)
            if (rs.isValid("FetchOrganizationDetails")) {
                organizations.value = res.result
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
                entities.value = res
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
            .setData({ ...workflowData.value, 'loginId': loginStore.loginId, 'roleId': loginStore.role.roleId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("InsertWorkflow", true)
                if (rs.isValid("InsertWorkflow")) {
                    workflowData.value.workflowId = res.result.objectId;
                    resolve()
                } else {
                    rs.showErrorToast("InsertWorkflow")
                }
            })
    })

}

const submitWorkflow = async () => {
    if (workflowData.value.workflowId) {
        await updateWorkflowMaster();
    } else {
        await createWorkflowMaster();
    }
    activeStep.value = activeStep.value + 1;
    fetchWorkflowSteps();
}

const closeForm = () => {
    workflowData.value = {};
    changeFlag(true);
}

const editData = (data) => {
    workflowData.value = data;
    changeFlag(false);
}


const fetchWorkflowSteps = () => {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2kauHSwfx6s4TLIKFed7d5oRsgO]")
        .setData({ 'workflowId': workflowData.value.workflowId })
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

const fetchWorkflowStatus = () => {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2kPbBHDnmaKIrVAKCanyftGm7lj]")
        .setData({})
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2kPbBHDnmaKIrVAKCanyftGm7lj", true)
            if (rs.isValid("query_2kPbBHDnmaKIrVAKCanyftGm7lj")) {
            } else {
                rs.showErrorToast("query_2kPbBHDnmaKIrVAKCanyftGm7lj")
            }
        })
}


onMounted(() => {
    fetchWorkflows();
    FetchOrganizations();
    FetchEntities();
});
</script>