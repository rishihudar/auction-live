<template>
    <div class="box-preview-wrapper" v-if="history.length > 0">
        <div class="box-section box-section-light">
            <div>
                <div class="bs-header">
                    <h2>Approval History</h2>
                </div>
                <div>

                    <div class="bs-item-holder">
                        <div class="bs-item col-span-12">
                            <DataTable :value="history" showGridlines tableStyle="border-collapse: separate;">
                                <Column field="stepDisplayName" header="Step"></Column>
                                <Column field="fullName" header="User"></Column>
                                <Column field="roleName" header="Role"></Column>
                                <Column field="createdOn" header="Created On"></Column>
                                <Column field="commentW" header="Comment"></Column>
                                <Column field="statusDisplayName" header="Status"></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MQL from "@/plugins/mql.js";
import DataTable from 'primevue/datatable';
import { login } from "../store/modules/login";
const loginStore = login()

const history = ref([]);

const { workflowStepDetailsId } = defineProps({
    workflowStepDetailsId: {
        type: [Number, String],
        default: null,
        required: true
    }
})

function FetchWorkflowStepDetailsHistory() {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchWorkflowStepDetailsHistory]")
        .setData({ "organizationId": loginStore.organizationId, "workflowStepDetailsId": workflowStepDetailsId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchWorkflowStepDetailsHistory", true)
            if (rs.isValid("FetchWorkflowStepDetailsHistory")) {
                console.log(res)
                history.value = res.result;
            } else {
                rs.showErrorToast("FetchWorkflowStepDetailsHistory")
            }
        })
}


onMounted(() => {
    FetchWorkflowStepDetailsHistory()
})
</script>

<style scoped>
.workflow-step {
    font-weight: bold;
}
</style>