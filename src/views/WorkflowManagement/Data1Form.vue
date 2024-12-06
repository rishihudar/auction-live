<template>
    <div>
        <form>
            <p>This is configuration for Auction Preview</p>
            <!-- Loop over each step -->
            <div v-for="(step, stepKey) in formData" :key="stepKey">
                <p class="text-xl font-bold text-gray-800">{{ stepKey }}</p>
                <!-- {{ step }} -->
                <label :for="stepKey">Should {{ stepKey }} Visible?</label>
                <div class="flex p-2">
                    <RadioButton v-model="step.visible" :value="true" />
                    <label for="ingredient1" class="m-2">Yes</label>
                    <RadioButton v-model="step.visible" :value="false" />
                    <label for="ingredient1" class="m-2">No</label>
                </div>
                <label :for="stepKey">Should {{ stepKey }} Editable? </label>
                <div class="flex  p-2">
                    <RadioButton v-model="step.editable" :value="true" />
                    <label for="ingredient1" class="m-2">Yes</label>
                    <RadioButton v-model="step.editable" :value="false" />
                    <label for="ingredient1" class="m-2">No</label>
                </div>

                <!-- Loop over each field in fieldConfig -->
                <div v-for="(fieldValue, fieldKey) in step.fieldConfig" :key="fieldKey">
                    <label :for="fieldKey">{{ getLabel(fieldKey) }}?</label>
                    <div class="flex p-2">
                        <RadioButton v-model="step.fieldConfig[fieldKey]" :value="true" />
                        <label for="ingredient1" class="m-2">Yes</label>
                        <RadioButton v-model="step.fieldConfig[fieldKey]" :value="false" />
                        <label for="ingredient1" class="m-2">No</label>
                    </div>
                    <!-- <input :id="fieldKey" type="text" v-model="step.fieldConfig[fieldKey]" /> -->
                </div>
            </div>
        </form>
        <div class="flex justify-between">
            <!-- <Button @click="prevCallback" class="btn btn-secondary">
                        Previous
                    </Button> -->
            <Button @click="submit" class="btn btn-success">
                Submit
            </Button>
        </div>
        <!-- </template> -->
        <!-- </Card> -->
    </div>
</template>

<script setup>
// import { ref } from 'vue';
import { onMounted, ref } from 'vue'
import RadioButton from 'primevue/radiobutton'
// import Card from 'primevue/card'


const props = defineProps(['formData'])
const emits = defineEmits(['data'])

const formDataLabel = ref({

    auctionTypeDataVisible: 'Should the Auction Type be visible?',
    auctionTypeDataReadonly: 'Should the Auction Type be editable?',
    auctionMethodDataVisible: 'Should the Auction Method be visible?',
    auctionMethodDataReadonly: 'Should the Auction Method be editable?',

    referenceNoVisible: 'Should the Reference Number be visible?',
    referenceNoReadonly: 'Should the Reference Number be editable?',
    descriptionVisible: 'Should the description be visible?',
    descriptionReadonly: 'Should the description be editable?',
    auctionCategoryVisible: 'Should the Auction Category be visible?',
    auctionCategoryReadonly: 'Should the Auction Category be editable?',
    auctionProcessVisible: 'Should the Auction Process be visible?',
    auctionProcessReadonly: 'Should the Auction Process be editable?',
    departmentVisible: 'Should the Department be visible?',
    departmentReadonly: 'Should the Department be editable',
    bidPlacementVisible: 'Should the Bid Placement be visible?',
    bidPlacementReadonly: 'Should the Bid Placement be editable?',
    eventProcesssingFeeModeVisible: 'Should the Event Processing Fee Mode be visible?',
    eventProcesssingFeeModeReadonly: 'Should the Event Processing Fee Mode be editable?',
    eventProcessingFeeAmountVisible: 'Should the Event Processing Fee Amount be visible?',
    eventProcessingFeeAmountReadonly: 'Should the Event Processing Fee Amount be editable?',
    emdFeePaymentModeVisible: 'Should the EMD Fee Payment Mode be visible?',
    emdFeePaymentModeReadonly: 'Should the EMD Fee Payment Mode be editable?',
    emdAppliedForVisible: 'Should the EMD be applied for?',
    emdAppliedForReadonly: 'Should the EMD be editable?',

    inventoryDistrictDetailsVisible: 'Should the Inventory District Details be visible?',
    inventoryDistrictDetailsReadonly: 'Should the Inventory District Details be editable?',
    inventoryMcDetailsVisible: 'Should the Inventory MC Details be visible?',
    inventoryMcDetailsReadonly: 'Should the Inventory MC Details be editable?',
    inventoryLocationDetailsVisible: 'Should the Inventory Location Details be visible?',
    inventoryLocationDetailsReadonly: 'Should the Inventory Location Details be editable?',
    inventoryAreaDetailsVisible: 'Should the Inventory Area Details be visible?',
    inventoryAreaDetailsReadonly: 'Should the Inventory Area Details be editable?',
    modifierValueVisible: 'Should the Modifier Value be visible?',
    modifierValueReadonly: 'Should the Modifier Value be editable?',
    selectedModifierValueChangeVisible: 'Should the Selected Modifier Value Change be visible?',
    selectedModifierValueChangeReadonly: 'Should the Selected Modifier Value Change be editable?',
    modifierValueExtentionCountVisible: 'Should the Modifier Value Extention Count be visible?',
    modifierValueExtentionCountReadonly: 'Should the Modifier Value Extention Count be editable?',
    modifierValueAfterExtentionVisible: 'Should the Modifier Value After Extention be visible?',
    modifierValueAfterExtentionReadonly: 'Should the Modifier Value After Extention be editable?',

    selectedStartDateVisible: 'Should the Selected Start Date be visible?',
    selectedStartDateReadonly: 'Should the Selected Start Date be editable?',
    selectedEndDateVisible: 'Should the Selected End Date be visible?',
    selectedEndDateReadonly: 'Should the Selected End Date be editable?',
    docNameVisible: 'Should the Document Name be visible?',
    docNameReadonly: 'Should the Document Name be editable?',
    NoticeDocNameVisible: 'Should the Notice Document Name be visible?',
    NoticeDocNameReadonly: 'Should the Notice Document Name be editable?'

})

const formData = ref({
    step1: {
        visible: true,
        editable: true,
        fieldConfig: {
            auctionTypeDataVisible: true,
            auctionTypeDataReadonly: false,
            auctionMethodDataVisible: true,
            auctionMethodDataReadonly: false
        }
    },
    step2: {
        visible: true,
        editable: true,
        fieldConfig: {
            referenceNoVisible: true,
            referenceNoReadonly: false,
            descriptionVisible: true,
            descriptionReadonly: false,
            auctionCategoryVisible: true,
            auctionCategoryReadonly: false,
            auctionProcessVisible: true,
            auctionProcessReadonly: false,
            departmentVisible: true,
            departmentReadonly: false,
            bidPlacementVisible: true,
            bidPlacementReadonly: false,
            eventProcesssingFeeModeVisible: true,
            eventProcesssingFeeModeReadonly: false,
            eventProcessingFeeAmountVisible: true,
            eventProcessingFeeAmountReadonly: false,
            emdFeePaymentModeVisible: true,
            emdFeePaymentModeReadonly: false,
            emdAppliedForVisible: true,
            emdAppliedForReadonly: false
        }
    },
    step3: {
        visible: true,
        editable: true,
        fieldConfig: {
            inventoryDistrictDetailsVisible: true,
            inventoryDistrictDetailsReadonly: false,
            inventoryMcDetailsVisible: true,
            inventoryMcDetailsReadonly: false,
            inventoryLocationDetailsVisible: true,
            inventoryLocationDetailsReadonly: false,
            inventoryAreaDetailsVisible: true,
            inventoryAreaDetailsReadonly: false,
            modifierValueVisible: true,
            modifierValueReadonly: false,
            selectedModifierValueChangeVisible: true,
            selectedModifierValueChangeReadonly: false,
            modifierValueExtentionCountVisible: true,
            modifierValueExtentionCountReadonly: false,
            modifierValueAfterExtentionVisible: true,
            modifierValueAfterExtentionReadonly: false
        }
    },
    step4: {
        visible: true,
        editable: true,
        fieldConfig: {
            selectedStartDateVisible: true,
            selectedStartDateReadonly: false,
            selectedEndDateVisible: true,
            selectedEndDateReadonly: false,
            docNameVisible: true,
            docNameReadonly: false,
            NoticeDocNameVisible: true,
            NoticeDocNameReadonly: false
        }
    }
});


function getLabel(str) {
    return formDataLabel.value[str];
}


function submit() {
    console.log(JSON.stringify(formData.value));
    emits('data', JSON.stringify(formData.value))
}


onMounted(() => {
    console.log('Hello');

    if (props.formData != undefined) {
        formData.value = props.formData
    }
})
</script>