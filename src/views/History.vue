<template>
    <div class="profile-preview">
        <Card class="profile-card">
            <template #header>
                <div class="profile-header">
                    <h2>Approval History</h2>
                </div>
            </template>

            <template #content>
                <div class="profile-section">
                    <div class="profile-field" v-for="(item, index) in history" :key="index">
                        <span>
                            Workflow Step: 
                            <span style="font-weight: bold;">
                                {{ item.StepDisplayName }} 
                            </span>,
                            last action By
                            <span style="font-weight: bold;">
                                {{ item.fullName }}
                            </span>
                            ({{ item.roleName }})
                            On
                            <span style="font-weight: bold;">
                                {{ item.createdOn }}
                            </span>,
                            , Comment {{ item.comment }}, Decision taken {{ item.statusDisplayName }}
                        </span>
           
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Card from "primevue/card";
import MQL from "@/plugins/mql.js";

const history = ref([]); 

function FetchWorkflowStepDetailsHistory (){
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchWorkflowStepDetailsHistory]")
        .setData({"organizationId":1,"workflowStepDetailsId":2})
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchWorkflowStepDetailsHistory",true)
            if (rs.isValid("FetchWorkflowStepDetailsHistory")) {
                console.log(res)

                // Remove the console.log statement
                // console.log("res.result",res.result)

                history.value = res.result; 
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