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
                            <ol v-for="(item, index) in history" :key="index">
                                <li class="list-disc">
                                        Workflow Step: <span class="font-bold"> {{ item.StepDisplayName }},</span>
                                        last action By <span class="font-bold"> {{ item.fullName }} </span>
                                        ({{ item.roleName }}) On
                                        <span class="font-bold"> {{ item.createdOn }} </span>
                                        Comment {{ item.comment }}, Decision taken {{ item.statusDisplayName }}
                                </li>

                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Card from "primevue/card";
import MQL from "@/plugins/mql.js";
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

                // Remove the console.log statement
                // console.log("res.result",res.result)

                history.value = res.result.fetchWorkflowStepDetailsHistory;
                history.value.push(res.result.fetchCurrent)
                console.log(history.value, "history.value")
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