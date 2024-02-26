<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">UI Form Wizard</h2>
                <Breadcrumb :model="crumbs">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <span class="bi-label">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <span v-else v-bind="props.action">
                            <span class="bi-label">{{ item.label }}</span>
                        </span>
                    </template>
                </Breadcrumb>
            </div>
        </div>
        <div class="wizard-wrapper">
            <div class="wizard-progress"><span class="wp-value"></span></div>
            <div class="wizard-steps">
                <div class="ws-item" :class="[{ 'active': index == currentStep }, { 'completed': index < currentStep }]" v-for="(item, index) in steps" :key="index">
                    <div class="ws-item-icon"><fa-check v-if="index < currentStep" /><span v-else>{{ index + 1 }}</span></div>
                    <div class="ws-item-title">{{ item.title }}</div>
                </div>
            </div>
            <div class="wizard-content">
                <template class="wc-item" v-for="(item, index) in steps" :key="index">
                    <div class="wc-item" :data-index="index" v-if="index == currentStep">
                        Step {{ index }}
                    </div>
                </template>
                <div class="wc-action">
                    <Button severity="secondary" class="btn-prev" @click="wPrev()">Previous</Button>
                    <Button severity="secondary" class="btn-next" @click="wNext()">Next</Button>
                    <Button class="btn-submit">Submit</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import faCheck from '../../../assets/icons/check.svg'

var collegeName = ref('')
var collegeNameVernacular = ref('')
var popularName = ref('')
var currentStep = ref(1)
const steps = ref([
    {
        id: 1,
        title: 'Registration',
        text: 'This is the registration content'
    },
    {
        id: 2,
        title: 'Contact Details',
        text: 'This is where you add the contact details'
    },
    {
        id: 3,
        title: 'College Details',
        text: 'College Details are here'
    }
])
const crumbs = ref([
    { label: 'Home', route: '/home' },
    { label: 'Bidder', route: '/home' },
    { label: 'Components', route: '/ui/form-wizard' },
    { label: 'Form Wizard' }
])

function wPrev() {
    currentStep.value = currentStep.value - 1
    wStepChange()
}
function wNext() {
    currentStep.value = currentStep.value + 1
    wStepChange()
}

function wStepChange() {
    const wProgress = document.querySelector('.wizard-progress')
    const wProgressValue = document.querySelector('.wizard-progress .wp-value')
    const item = document.querySelector('.wizard-steps .ws-item')
    const itemCount = steps.value.length
    const itemWidth = item.scrollWidth
    const itemWidthAll = itemWidth * (itemCount - 1)

    wProgress.style.width = itemWidthAll + 'px'
    wProgressValue.style.width = itemWidth * currentStep.value + 'px'
}

onMounted(() => {
    wStepChange()
})
</script>
