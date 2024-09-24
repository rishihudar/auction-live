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
            <workflow-wizard :workflow-id="workflowId" @close-form="closeForm" @workflow-id="assignWorkflowId" />
        </template>
    </div>
</template>

<script setup>
import faPlus from "../../../../assets/icons/plus.svg";
import MQL from "@/plugins/mql.js"
import faPenToSquare from "../../../../assets/icons/pen-to-square.svg";
import Button from 'primevue/button';
import { onMounted, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import workflowWizard from './WorkflowWizard.vue';
import { watch } from "vue";

const perPage = ref(10);
const totalRows = ref(0);
const handlePageChange = (event) => {
    console.log(event);
};


const workflowId = ref(null)

const assignWorkflowId = (workflowId_) => {
    workflowId.value = workflowId_;
}


const workflows = ref([
    {
        workflowId: 1,
        workflowname: "Workflow 1",
        workflowcode: "WF1",
    }
]);

const loading = ref(true);

const flag = ref(true);




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

const closeForm = () => {
    workflowId.value = null;
    changeFlag(true);
}

watch(flag,(flagvalue) => {
    if (flagvalue) {
        fetchWorkflows()
    }
})

const editData = (data) => {
    workflowId.value = data.workflowId;
    changeFlag(false);
}



onMounted(() => {
    fetchWorkflows();
});
</script>