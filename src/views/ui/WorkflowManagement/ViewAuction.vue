<template>
    <div>
        <div>
            <h1> {{ workflowStepData.displayName }}</h1>
        </div>

        <div>

            <div class="card flex justify-content-center" v-if="workflowStepData.data1?.step1.visible">
                <div class="flex flex-column gap-2">
                    <label for="refNo">Ref No: :</label>
                    <InputText id="refNo" :disabled="!workflowStepData.data1?.step1.editable" v-model="auctionDetailsData.referenceNumber" aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="aucCategory">Auction Category</label>
                    <InputText id="aucCategory" v-model="auctionDetailsData.inventoryCategoryName"
                        aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Auction Code</label>
                    <InputText id="username" v-model="auctionDetailsData.auctionCode" aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Description</label>
                    <InputText id="username" v-model="auctionDetailsData.auctionDescription"
                        aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Auction Type</label>
                    <InputText id="username" v-model="auctionDetailsData.auctionType" aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Auction Method</label>
                    <InputText id="username" v-model="auctionDetailsData.auctionMethodName"
                        aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Auction Process</label>
                    <InputText id="username" v-model="auctionDetailsData.auctionProcessName"
                        aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Department</label>
                    <InputText id="username" v-model="auctionDetailsData.departmentName" aria-describedby="username-help" />
                </div>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-2">
                    <label for="username">Item</label>
                    <InputText id="username" v-model="auctionDetailsData.inventoryHierarchy"
                        aria-describedby="username-help" />
                </div>
            </div>

        </div>
        <div>
            <div class="ml-auto">
                <span class="p-buttonset">
                    <Button v-for="item in label" @click="modalVisible(item)" :label="item.label" icon="pi pi-trash" />
                </span>
            </div>
            <div class="card flex justify-content-center">

                <Dialog v-model:visible="visible" :header=modalHeader :style="{ width: '25rem' }">
                    <span class="p-text-secondary block mb-5">Assign to Role {{ roleName }}</span>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label for="comment" class="font-semibold w-6rem">Comment</label>
                        <InputText id="comment" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="card flex justify-content-center">
                        <label for="login" class="font-semibold w-6rem">Login</label>
                        <Dropdown v-model="selectedLoginId" :options="cities" optionLabel="name"
                            placeholder="Select a Login" class="w-full md:w-14rem" />
                    </div>
                    <div class="flex justify-content-end gap-2">
                        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                        <Button type="button" :label=modalItem @click="visible = false"></Button>
                    </div>
                </Dialog>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import MQL from '@/plugins/mql.js';
import Dropdown from 'primevue/dropdown';

const visible = ref(false);
const roleName = ref("")
const cities = ref([])
const auctionDetailsData = ref([]);
const modalItem = ref("")
const modalHeader = ref("")
const modalVisible = (item) => {
    visible.value = true;

    modalItem.value = item.modalLabel;
    modalHeader.value = item.modalHeader;
    console.log(modalItem.value)
};
const label = ref([{ 'label': 'Sent Back', 'modalLabel': "Send Back", "modalHeader": 'Send Back' }, { 'label': 'Send For Approval', 'modalLabel': "Send For Approval", modalHeader: 'Send For Approval' }]);


const route = useRoute()

const workflowStepData = ref({})

const selectedLoginId = ref();

function fetchLogin() {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("o.[query_2cg7q8pv3snSxYXqrVYObWwLgLN]")
        .setData({ "fromStatusId": 21, "fromWorkflowStepId": workflowStepData.value.workflowStepId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2cg7q8pv3snSxYXqrVYObWwLgLN", true)
            if (rs.isValid("query_2cg7q8pv3snSxYXqrVYObWwLgLN")) {
            } else {
                rs.showErrorToast("query_2cg7q8pv3snSxYXqrVYObWwLgLN")
            }
        })
}

function fetchWorkflowStepData() {
    return new Promise((resolve, reject) => {
        new MQL()
            .useManagementServer()
            .setActivity("o.[query_2cg9Wj6KVFlFt8DMt6va6a4tjqm]")
            .setData({ "workflowStepDetailsId": route.params.workflowStepDetailsId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("query_2cg9Wj6KVFlFt8DMt6va6a4tjqm", true)
                if (rs.isValid("query_2cg9Wj6KVFlFt8DMt6va6a4tjqm")) {
                    console.log(res)
                    workflowStepData.value = res[0]
                    workflowStepData.value.data1 = JSON.parse(workflowStepData.value.data1) 
                    resolve()
                } else {
                    rs.showErrorToast("query_2cg9Wj6KVFlFt8DMt6va6a4tjqm")
                    reject()
                }
            })
    })
}
function FetchAuctionDetailsForView() {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionDetailsForView]")
        .setData({ "workflowStepDetailsId": 1 })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionDetailsForView", true)
            console.log(res, "result")
            if (rs.isValid("FetchAuctionDetailsForView")) {
                auctionDetailsData.value = res.result.fetchAuctionDetails

                console.log(auctionDetailsData.value, " auctionDetailsData")
            } else {
                rs.showErrorToast("FetchAuctionDetailsForView")
            }
        })


}





onMounted(() => {
    fetchWorkflowStepData()
    FetchAuctionDetailsForView()
});

</script>
