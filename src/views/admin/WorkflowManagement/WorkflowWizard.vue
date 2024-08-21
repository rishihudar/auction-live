<template>
    <Card>
        <template #title>Add Workflow</template>
        <template #content>
            <Stepper linear class="wizard-wrapper wizard-wrapper-prime" :active-step="activeStep">
                <StepperPanel header="Workflow">
                    <template #content="{ nextCallback }">
                        <WorkflowForm @next-tab="nextCallback" @prev-tab="closeForm"  :workflow-id="workflowId"/>
                    </template>
                </StepperPanel>

                <StepperPanel header="Workflow Step">
                    <template #content="{ nextCallback, prevCallback }">
                        <WorkflowStepForm @next-tab="nextCallback" @prev-tab="prevCallback" :workflow-id="workflowId" />
                    </template>
                </StepperPanel>

                <StepperPanel header="Workflow Step Status">
                    <template #content="{ nextCallback, prevCallback }">
                        <WorkflowStepStatusForm @next-tab="nextCallback" @prev-tab="prevCallback" :workflow-id="workflowId" />
                    </template>
                </StepperPanel>


                <StepperPanel header="Workflow Step Order">
                    <template #content="{ nextCallback, prevCallback }">
                        <WorflowStepOrderForm @next-tab="nextCallback" @prev-tab="prevCallback"  :workflow-id="workflowId" />
                    </template>
                </StepperPanel>
            </Stepper>

        </template>
    </Card>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import Card from 'primevue/card';
import Stepper from 'primevue/stepper';

import WorkflowForm from './WorkflowForm.vue';
import WorkflowStepForm from './WorkflowStepForm.vue';
import WorkflowStepStatusForm from './WorkflowStepStatusForm.vue';
import WorflowStepOrderForm from './WorkflowStepOrderForm.vue';
const activeStep = ref(0);

const { workflowId } = defineProps(['workflowId'])


const emits = defineEmits(['closeForm'])


const closeForm = () => {
    emits('closeForm')
}

onMounted(() => {
    console.log(workflowId)
})

</script>