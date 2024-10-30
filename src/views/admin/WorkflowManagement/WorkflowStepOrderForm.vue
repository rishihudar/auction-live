<template>
    <div>
        <div>Workflow Step Order</div>
        <div class="form-grid">
            <div class="col-span-8 h-80 w-auto">
                <div id="paper"></div>
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
            {{ findStepFromId(edge[1].get('source').id) }} to {{ findStepFromId(edge[1].get('target').id) }} for {{
                edge[1].get('labels')[0].attrs.text.text }}
        </strong>
        <div class="flex justify-between mt-1">
            <Button @click="cancelModal">Cancel</Button>
            <Button severity="danger" @click="deleteWorkflowStepOrder(edge[0])">Delete</Button>
        </div>
    </Dialog>

</template>

<script setup>
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import { login } from '@/store/modules/login.js'
import MQL from '@/plugins/mql.js'
// import { MarkerType } from '@vue-flow/core'
import { createToaster } from '@meforma/vue-toaster'

import { dia, shapes, linkTools } from '@joint/core';


const toaster = createToaster()

const nodes = ref({})
const edges = ref({})

const visible = ref(false)

const edge = ref(null)


const graph = ref(null)
const paper = ref(null)

const loginStore = login()

const { workflowId } = defineProps(['workflowId'])

const emits = defineEmits(['nextTab', 'prevTab'])

const workflowStepOrderData = ref({ 'workflowId': workflowId })


const workflowsSteps = ref([])

const workflowStepOrders = ref([])

const stepName = (stepId) => {
    let workflowStep = workflowsSteps.value.find(w => w.workflowStepId == stepId)
    return workflowStep ? workflowStep.displayName : '-'
}


const cancelModal = () => {
    visible.value = false
    edge.value = null
}



const statusName = (statusId) => {
    let status = statuses.value.find(s => s.statusId == statusId)
    return status ? status.statusDisplayName : '-'
}


const findStepFromId = (id) => {
    var fromStep = Object.entries(nodes.value).find(([key, value]) => {
        // console.log(key, value.id, id);
        if (value.id == id) {
            return key
        }
    })
    // console.log(fromStep[1].attributes.attrs.label.text);
    return fromStep[1].attributes.attrs.label.text

}


const deleteData = (data) => {
    Object.entries(edges.value).map(([key, value]) => {

        if (value.id == data) {
            visible.value = true
            edge.value = [key, value]
            console.log(key);

        }
    })
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
                    nodes.value = {}
                    let positionX = 50
                    let positionY = 50
                    graph.value.clear()
                    for (let index = 0; index < res.length; index++) {
                        let element = res[index];

                        // let node = {
                        //     id: String(element.workflowStepId),
                        //     data: { label: element.displayName },
                        //     position: { x: positionX + (200 * index), y: positionY + (100 * index) },
                        //     class: 'light',
                        // }
                        // // if (element.startStep == 1) {
                        // //     node.type = 'input'
                        // // }
                        // // if (element.endStep == 1) {
                        // //     node.type = 'output'
                        // // }
                        if (true) {
                            console.log(element.workflowStepId, element.workflowStepId in nodes.value, nodes.value);

                            nodes.value[element.workflowStepId] = new shapes.standard.Rectangle();
                            nodes.value[element.workflowStepId].position(positionX + (200 * index), positionY + (100 * index));
                            nodes.value[element.workflowStepId].resize(180, 50);
                            nodes.value[element.workflowStepId].addTo(graph.value);
                            nodes.value[element.workflowStepId].attr('body', { stroke: '#CAB460', rx: 2, ry: 2 });
                            nodes.value[element.workflowStepId].attr('label', { text: element.displayName, fill: '#353535' });
                        }
                    }
                    resolve()
                } else {
                    rs.showErrorToast("query_2kauHSwfx6s4TLIKFed7d5oRsgO")
                }
            })
    })
}

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
                    statuses.value = res.map((r) => ({ ...r, statusId: Number(r.statusId) }))
                    resolve()
                } else {
                    rs.showErrorToast("query_2kyQwSEKcUNG7zNUhNBIv0I75ii")
                }
            })
    })
}

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
                await fetchWorkflowSteps()
                await fetchWorkflowStepOrder()
                workflowStepOrderData.value = {
                    'workflowId': workflowId
                }
            } else {
                rs.showErrorToast("InsertWorkflowStepOrder")
            }
        })

}

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
                visible.value = false
                edges.value[id].remove()
                edge.value = null
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
                    edges.value = {}
                    for (let workflowsteporder of workflowStepOrders.value) {
                        //     let edge = {
                        //         id: String(workflowsteporder.workflowStepOrderId),
                        //         source: String(workflowsteporder.fromStep),
                        //         target: String(workflowsteporder.toStep),
                        //         label: `${statusName(workflowsteporder.toStatus)} ❌`,
                        //         data: { label: `${statusName(workflowsteporder.toStatus)}` },
                        //         markerEnd: MarkerType.ArrowClosed,
                        //         animated: true,
                        //         type: 'smoothstep',
                        //         labelBgStyle: { fill: 'lightgreen' }
                        // }
                        //     edges.value.push(edge)
                        edges.value[workflowsteporder.workflowStepOrderId] = new shapes.standard.Link();
                        edges.value[workflowsteporder.workflowStepOrderId].source(nodes.value[workflowsteporder.fromStep]);
                        edges.value[workflowsteporder.workflowStepOrderId].target(nodes.value[workflowsteporder.toStep])
                        edges.value[workflowsteporder.workflowStepOrderId].addTo(graph.value);
                        edges.value[workflowsteporder.workflowStepOrderId].appendLabel({ attrs: { text: { text: `${statusName(workflowsteporder.toStatus)}` } } });
                        edges.value[workflowsteporder.workflowStepOrderId].router('orthogonal');
                        edges.value[workflowsteporder.workflowStepOrderId].connector('straight', { cornerType: 'line' });

                        const removeButton = new linkTools.Remove({
                            action: function (evt, linkView, buttonView) {
                                deleteData(this.model.id)
                            }
                        });



                        const toolsView = new dia.ToolsView({
                            tools: [removeButton]
                        });


                        const linkView = edges.value[workflowsteporder.workflowStepOrderId].findView(paper.value);
                        linkView.addTools(toolsView);

                        paper.value.on('link:mouseenter', function (linkView) {
                            linkView.addTools(toolsView);
                        });

                        paper.value.on('link:mouseleave', function (linkView) {
                            linkView.removeTools();
                        });



                    }
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

const makeWorkflow = () => {
    return new Promise((resolve, reject) => {
        const namespace = shapes;

        graph.value = new dia.Graph({}, { cellNamespace: namespace });

        paper.value = new dia.Paper({
            el: document.getElementById('paper'),
            model: graph.value,
            width: '100%',
            height: '100%',
            background: { color: '#F5F5F5' },
            cellViewNamespace: namespace
        });
        resolve()
    })
    // create paper
}


onMounted(async () => {
    await makeWorkflow()
    await fetchWorkflowSteps()
    await fetchStatues()
    await fetchWorkflowStepOrder()
})
</script>


<style>
body {
    margin: unset;
}

#paper {
    margin: auto auto 0 auto;
}
</style>
