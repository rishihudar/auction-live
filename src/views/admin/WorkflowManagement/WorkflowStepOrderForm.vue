<template>
    <div>
        <div>Workflow Step Order</div>
        <div class="form-grid">
            <div class="col-span-8 h-80 w-auto">
                <VueFlow v-if="nodes.length > 0 && edges.length > 0" :nodes="nodes" :edges="edges"
                    :default-viewport="{ zoom: 1.5 }" class="border rounded-md">

                    <Background pattern-color="#aaa" :gap="16" />

                    <!-- <MiniMap /> -->
                    <Controls position="top-left"></Controls>

                </VueFlow>
            </div>
            <div class="col-span-4 form-grid">
                <div class="col-span-6">
                    <div class="fm-group">
                        <div class="fm-label">From Step</div>
                        <div class="fm-inner">
                            <Dropdown v-model="workflowStepOrderData.fromWorkflowStepId" :options="workflowsSteps"
                                showClear option-label="displayName" option-value="workflowStepId"
                                placeHolder="Select from step" />
                        </div>
                    </div>
                </div>

                <div class="col-span-6">
                    <div class="fm-group">
                        <div class="fm-label">From Status</div>
                        <div class="fm-inner">
                            <Dropdown v-model="workflowStepOrderData.fromStatusId" :options="statuses" showClear
                                option-label="statusDisplayName" option-value="statusId"
                                placeHolder="Select from status" />
                        </div>
                    </div>
                </div>

                <div class="col-span-6">
                    <div class="fm-group">
                        <div class="fm-label">To Step</div>
                        <div class="fm-inner">
                            <Dropdown v-model="workflowStepOrderData.toWorkflowStepId" :options="workflowsSteps"
                                showClear option-label="displayName" option-value="workflowStepId"
                                placeHolder="Select to step" />
                        </div>
                    </div>
                </div>

                <div class="col-span-6">
                    <div class="fm-group">
                        <div class="fm-label">To Status</div>
                        <div class="fm-inner">
                            <Dropdown v-model="workflowStepOrderData.toStatusId" :options="statuses" showClear
                                option-label="statusDisplayName" option-value="statusId"
                                placeHolder="Select from status" />
                        </div>
                    </div>
                </div>
                <Button class="col-span-12" @click="insertworkflowStepOrder">Add</Button>

            </div>
        </div>
    </div>
    <div class="flex justify-between">
        <Button @click="prevCallback" class="btn btn-secondary">
            Previous
        </Button>
        <Button @click="nextCallback" class="btn btn-success">
            Save & Next
        </Button>
    </div>
    <Dialog :closable="false" :style="{ width: '50rem' }" modal header="Delete Connection" v-model:visible="visible"
        :draggable="false">
        Would you like to delete the order from <br />
        <strong>
            {{ edge.sourceNode.data.label }} -> {{ edge.targetNode.data.label }} ({{ edge.data.label }})
        </strong>
        <div class="flex justify-between mt-1">
            <Button @click="cancelModal">Cancel</Button>
            <Button severity="danger" @click="deleteStepOrder">Delete</Button>
        </div>
    </Dialog>
</template>

<script setup>
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import { login } from '@/store/modules/login.js'
import MQL from '@/plugins/mql.js'
import trashCan from "../../../../assets/icons/trash-can.svg";
import arrowRight from "../../../../assets/icons/arrow-right.svg"
import DataView from "primevue/dataview"

import { VueFlow, useVueFlow, MarkerType } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { createToaster } from '@meforma/vue-toaster'


const toaster = createToaster()

const edge = ref(null)

const visible = ref(false)

const cancelModal = () => {
    visible.value = false
    edge.value = null
}


const deleteStepOrder = async () => {
    visible.value = false
    console.log(edge.value.id);
    deleteWorkflowStepOrder(edge.value.id)
    edge.value = null
    await fetchWorkflowStepOrder()
    toaster.success('Flow Deleted Successfully')

}


const { onInit, onConnect, addEdges, onEdgeClick } = useVueFlow()


onEdgeClick(async (e) => {
    visible.value = true
    console.log(e.edge);
    edge.value = e.edge

})



onInit((vueFlowInstance) => {
    // instance is the same as the return of `useVueFlow`
    vueFlowInstance.fitView()
})


onConnect((connection) => {
    addEdges(connection)
})


const nodes = ref([])

const edges = ref([])





const loginStore = login()
const { workflowId } = defineProps(['workflowId'])

const emits = defineEmits(['nextTab', 'prevTab'])

const workflowStepOrderData = ref({
    'workflowId': workflowId
})


const workflowsSteps = ref([])

const workflowStepOrders = ref([])

const stepName = (stepId) => {
    let workflowStep = workflowsSteps.value.find(w => w.workflowStepId == stepId)
    return workflowStep ? workflowStep.displayName : '-'
}


const statusName = (statusId) => {
    let status = statuses.value.find(s => s.statusId == statusId)
    return status ? status.statusDisplayName : '-'
}


const deleteData = (data) => {
    deleteWorkflowStepOrder(data.workflowStepOrderId)
}


//TODO: fetch workflowsteps

const fetchWorkflowSteps = () => {
    return new Promise((resolve) => {
        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("r.[query_2kauHSwfx6s4TLIKFed7d5oRsgO]")
            .setData({ 'workflowId': workflowId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("query_2kauHSwfx6s4TLIKFed7d5oRsgO", true)
                if (rs.isValid("query_2kauHSwfx6s4TLIKFed7d5oRsgO")) {
                    workflowsSteps.value = res
                    nodes.value = []
                    let positionX = 50
                    let positionY = 50
                    for (let index = 0; index < res.length; index++) {
                        let element = res[index];
                        let node = {
                            id: String(element.workflowStepId),
                            data: { label: element.displayName },
                            position: { x: positionX + (200 * index), y: positionY + (100 * index) },
                            class: 'light',
                        }
                        if (element.startStep == 1) {
                            node.type = 'input'
                        }
                        if (element.endStep == 1) {
                            node.type = 'output'
                        }
                        nodes.value.push(node)
                    }
                    resolve()
                } else {
                    rs.showErrorToast("query_2kauHSwfx6s4TLIKFed7d5oRsgO")
                }
            })
    })

}



//TODO: fetch statuses


const fetchStatues = () => {
    return new Promise((resolve, reject) => {

        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("r.[query_2kyQwSEKcUNG7zNUhNBIv0I75ii]")
            .fetch()
            .then(rs => {
                let res = rs.getActivity("query_2kyQwSEKcUNG7zNUhNBIv0I75ii", true)
                if (rs.isValid("query_2kyQwSEKcUNG7zNUhNBIv0I75ii")) {
                    console.log(res);
                    statuses.value = res.map((r) => ({ ...r, statusId: Number(r.statusId) }))
                    resolve()
                } else {
                    rs.showErrorToast("query_2kyQwSEKcUNG7zNUhNBIv0I75ii")
                }
            })
    })
}



// TODO: insert workflow step order

const insertworkflowStepOrder = () => {

    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[InsertWorkflowStepOrder]")
        .setData({ ...workflowStepOrderData.value, 'userId': loginStore.loginId, 'roleId': loginStore.role.roleId, 'organizationId': loginStore.organizationId })
        .fetch()
        .then(async (rs) => {
            let res = rs.getActivity("InsertWorkflowStepOrder", true)
            if (rs.isValid("InsertWorkflowStepOrder")) {
                await fetchWorkflowStepOrder()
                await fetchWorkflowSteps()
                workflowStepOrderData.value = {
                    'workflowId': workflowId
                }
            } else {
                rs.showErrorToast("InsertWorkflowStepOrder")
            }
        })

}

// TODO: delete workflow step order
const deleteWorkflowStepOrder = (id) => {

    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[DeleteWorkflowStepOrder]")
        .setData({ 'workflowStepOrderId': id })
        .fetch()
        .then(async (rs) => {
            let res = rs.getActivity("DeleteWorkflowStepOrder", true)
            if (rs.isValid("DeleteWorkflowStepOrder")) {
                await fetchWorkflowStepOrder()
            } else {
                rs.showErrorToast("DeleteWorkflowStepOrder")
            }
        })
}



const fetchWorkflowStepOrder = () => {
    return new Promise((resolve) => {
        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("r.[query_2kYHSfWUs7V7YzzaXQDHENCsmak]")
            .setData({ 'workflowId': workflowId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("query_2kYHSfWUs7V7YzzaXQDHENCsmak", true)
                if (rs.isValid("query_2kYHSfWUs7V7YzzaXQDHENCsmak")) {
                    workflowStepOrders.value = res
                    edges.value = []
                    edges.value = workflowStepOrders.value.map((workflowsteporder) => (
                        {
                            id: String(workflowsteporder.workflowStepOrderId),
                            source: String(workflowsteporder.fromStep),
                            target: String(workflowsteporder.toStep),
                            label: `${statusName(workflowsteporder.toStatus)} ❌`,
                            data: { label: `${statusName(workflowsteporder.toStatus)}` },
                            markerEnd: MarkerType.ArrowClosed,
                            animated: true,
                            // style: { stroke: 'Aquamarine' },
                            type: 'smoothstep',
                            labelBgStyle: { fill: 'lightgreen' }
                        }))
                    resolve()
                } else {
                    rs.showErrorToast("query_2kYHSfWUs7V7YzzaXQDHENCsmak")
                }
            })
    })
}

const statuses = ref([])

const nextCallback = () => {
    emits('nextTab')
}

const prevCallback = () => {
    emits('prevTab')
}


onMounted(async () => {
    await fetchWorkflowSteps()
    await fetchStatues()
    await fetchWorkflowStepOrder()
})
</script>


<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';

@import '@vue-flow/controls/dist/style.css';
</style>