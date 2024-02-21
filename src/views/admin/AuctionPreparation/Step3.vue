
<template>
    <div>   
        <div>
                <div class="w-subtitle">
                    Auction ID:
                    <!-- {{ $store.state.AuctionPreparation.auctionId }} -->
                </div>
                <div class="card">
                    <DataTable :value="d" resizableColumns columnResizeMode="fit" showGridlines
                        tableStyle="min-width: 50rem">
                        <Column field="code" header="Sr. No."></Column>
                        <Column field="name" header="Item Id"></Column>
                        <Column field="category" header="Item Name"></Column>
                        <Column field="quantity" header="Reserved Price"></Column>
                        <Column field="name" header="Modifier Value"></Column>
                        <Column field="category" header="Modifier Value Change After"></Column>
                        <Column field="quantity" header="Action"></Column>
                    </DataTable>
                </div>
                <div class="ml-auto">
                    <span class="p-buttonset">
                        <Button label="ADD Items" @click="visible = true" icon="pi pi-trash" />
                    </span>
                </div>
                <div class="ml-auto">
                    <span class="p-buttonset">
                        <Button label="Back" @click="$router.push({ name: 'step2' })" icon="pi pi-trash" />
                    </span>
                </div>
                <Toast />
                <ConfirmDialog></ConfirmDialog>
                <div class="card flex flex-wrap gap-2 justify-content-center">
                    <Button @click="confirm1()" label="Next" outlined></Button>
 
                </div>
            </div>


<!-- --------------------------------------------------------------------------------------- -->


    <Dialog v-model:visible="visible" modal header="Add Item" :style="{ width: '75rem'}">
        <div class="gap-2  mx-auto">
            <div class="fm-row">
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="step1">District<span class="text-danger">*</span></label>
                        <Dropdown v-model="inventoryDistrictDetails.inventoryId" option-value="inventoryId" variant="filled" :options="districtDetail"
                        optionLabel="inventoryName" placeholder="Select District" @change="fetchMCNameFromInventoryMaster(inventoryDistrictDetails.inventoryId)" class="w-full md:w-14rem" />
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="step1">MC Name<span class="text-danger">*</span></label>
                        <Dropdown v-model="inventoryMcDetails.inventoryId" option-value="inventoryId" variant="filled" :options="mcDetail"
                        optionLabel="inventoryName" placeholder="Select MC Type" @change="fetchLocationFromInventoryMaster(inventoryMcDetails.inventoryId)"  class="w-full md:w-14rem" />
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="step1">Location<span class="text-danger">*</span></label>
                        <Dropdown v-model="inventoryLocationDetails.inventoryId" option-value="inventoryId" variant="filled" :options="locationDetail" optionLabel="inventoryName"
                        placeholder="Select Location" @change="fetchAreaFromInventoryMaster(inventoryLocationDetails.inventoryId)" class="w-full md:w-14rem" />
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="step1">Area <span class="text-danger">*</span></label>
                        <Dropdown v-model="inventoryAreaDetails"  variant="filled" :options="areaDetail" optionLabel="inventoryName"
                        placeholder="Select Area" class="w-full md:w-14rem" />
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="fm-group">
                            <label for="username">Reserve Price<span class="text-danger">*</span></label>
                            <InputText id="username" v-model="inventoryAreaDetails.inventoryReservePrice" placeholder="Enter Reserve Price" readonly/>
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="fm-group">
                            <label for="username">Unit<span class="text-danger">*</span></label>
                            <InputText id="username" v-model="inventoryAreaDetails.inventoryUnit"  placeholder="Enter Unit" />
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/3">
                    <div class="fm-group">
                            <label for="username">EMD<span class="text-danger">*</span></label>
                            <InputText id="username" v-model="inventoryAreaDetails.inventoryEMDAmount" placeholder="Enter EMD" readonly />
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="step2">Modifier Value <span class="text-danger">*</span></label>
                        <InputNumber v-model="modifierValue" inputId="minmax-buttons" mode="decimal" showButtons :min="0"/>
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="step2">Modifier Value Change<span class="text-danger">*</span></label>
                        <Dropdown v-model="selectedModifierValueChange" variant="filled" :options="modifiervaluechanges"
                            optionLabel="modifierValueChangeName" placeholder="Enter Modifier Value"
                            class="w-full md:w-14rem" />
                    </div>
                </div>
            </div>
            <div class="fm-row" v-if="selectedModifierValueChange.modifierValueChangeId === '2'">
                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="step1">Modifier Value After No. Of Extensions<span class="text-danger">*</span></label>

                        <InputNumber v-model="modifierValueExtentionCount" inputId="minmax-buttons" mode="decimal" showButtons :min="0"
                            :max="100" />

                    </div>
                </div>
                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="step1">Modifier Value After Extension<span class="text-danger">*</span></label>
                        <InputNumber v-model="modifierValueAfterExtention" inputId="minmax-buttons" mode="decimal" showButtons :min="0"/>
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-full">
                    <div class="fm-group">
                        <div class="card">
                            <Toast />
                            <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="false"
                                accept="image/*" :maxFileSize="2000000">
                                <template #empty>
                                    <p>Drag and drop files to here to upload, Max. file size 2 MB, Only pdf and images are allowed</p>
                                </template>
                                <!-- <p><strong>Note:- </strong> Max. file size 2 MB, Only pdf and images are allowed</p> -->
                            </FileUpload>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/2">
                    <div class="fm-group">
                        <!-- <button class="btn btn-danger-light danger-color" @click="visible = false">
                            Close
                        </button> -->
                        <Button @click="visible = false" icon="pi pi-check" label="Close"></Button>
                    </div>
                </div>
                <div class="w-1/2">
                    <div class="fm-group">
                        <!-- <button class="btn btn-primary-light pri-color" @click="addItem()" v-if="itemAreaCount != 0">
                            ADD
                        </button> -->
                        <Button @click="addItem()" icon="pi pi-check" label="Add" v-if="itemAreaCount != 0"></Button>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';
import MQL from '@/plugins/mql.js';
import { useAuctionPreparation } from '@/store/auctionPreparation.js'
import { storeToRefs } from 'pinia'

const store = useAuctionPreparation()
const { getLastInsertedAuctionId, getPropertyCategoryId  } = storeToRefs(store)

const confirm = useConfirm();
const toast = useToast();

const visible = ref(false);
const confirm1 = () => {
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Save',
        acceptLabel: 'Send For Checking',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Drafted', detail: 'You have drafted', life: 3000 });
        }
    });
};

// onMounted(() => {
//     ProductService.getProductsMini().then(data => products.value = data);
// });

const onAdvancedUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};
// var flag = ref(0);
// function changeFlag(newValue) {
//     flag.value = newValue
//     ref(flag)
//     console.log("getting from change function", flag)
// }
//const products = ref();
//const selectedLocation = ref([]);
//const selectedArea = ref([]);

const districtDetail = ref([]);
const mcDetail = ref([]);
const locationDetail = ref([]);
const areaDetail = ref([]);
const itemAreaCount = ref(0);

//const locations = ref([{ inventoryName2: "Ambala Central" }]);
const modifierValue = ref("");
const modifierValueExtentionCount = ref(0);
const modifierValueAfterExtention = ref(0);
const selectedModifierValueChange = ref([]);
//const areas = ref([{ inventoryName1: "1000 SQM" }]);
//const mcData = ref([]);
//const MCs = ref([{ inventoryName: " Muncipal Corporation Ambala" }]);
// const selectedEntities = ref({
//     inventoryName: '',
//     parentInventoryId: '',
//     inventoryCategoryId: '',
// }
// );
// const selectedPrice=ref(null);
// const unitValue=ref(null);
// const emdPrice=ref(0);
const modifiervaluechanges = ref([]);
//const selectedDistrict = ref([]);
const inventoryDistrictDetails = ref([{
        inventoryName: "",
        inventoryId: 0,
        parentInventoryId: 0,
        inventoryLevelId:0,
}]);

const inventoryMcDetails = ref([{
        inventoryName: "",
        inventoryId: 0,
        parentInventoryId: 0,
        inventoryLevelId:0,
}]);

const inventoryLocationDetails = ref([{
        inventoryName: "",
        inventoryId: 0,
        parentInventoryId: 0,
        inventoryLevelId:0,
}]);

const inventoryAreaDetails = ref([{
        inventoryName: "",
        inventoryId: 0,
        parentInventoryId: 0,
        inventoryLevelId:0,
        inventoryReservePrice:0,
        inventoryUnit:"",
        inventoryEMDAmount:0,
}]);

const inventoryCategoryId = getPropertyCategoryId.value;
const parentInventoryId = 0


function FetchPropertiesFromInventoryMaster(inventoryCategoryId, parentInventoryId) {
    new MQL()
        .setActivity('o.[FetchPropertiesFromInventoryMaster]')
        .setData({ inventoryCategoryId: inventoryCategoryId, parentInventoryId: parentInventoryId })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchPropertiesFromInventoryMaster', true);
            if (rs.isValid('FetchPropertiesFromInventoryMaster')) {
                console.log(res.result);
                districtDetail.value = res.result;
                console.log("printing districtDetail ", districtDetail.value)
            } else {
                rs.showErrorToast('FetchPropertiesFromInventoryMaster');
            }
        });
}
const fetchMCNameFromInventoryMaster = (parentId) => {
    new MQL()
        .setActivity('o.[FetchPropertiesFromInventoryMaster]')
        .setData({ inventoryCategoryId: inventoryCategoryId, parentInventoryId:parentId })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchPropertiesFromInventoryMaster', true);
            if (rs.isValid('FetchPropertiesFromInventoryMaster')) {
                console.log(res.result);
                mcDetail.value = res.result;
                console.log("MC Data", mcDetail)
            } else {
                rs.showErrorToast('FetchPropertiesFromInventoryMaster');
            }
        });
}
const fetchLocationFromInventoryMaster = (parentId) => {
    new MQL()
        .setActivity('o.[FetchPropertiesFromInventoryMaster]')
        .setData({ inventoryCategoryId: inventoryCategoryId, parentInventoryId:parentId })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchPropertiesFromInventoryMaster', true);
            if (rs.isValid('FetchPropertiesFromInventoryMaster')) {
                console.log(res.result);
                locationDetail.value = res.result;
                console.log("MC Data", mcDetail)
            } else {
                rs.showErrorToast('FetchPropertiesFromInventoryMaster');
            }
        });
}
const fetchAreaFromInventoryMaster = (parentId) => {
    new MQL()
        .setActivity('o.[FetchPropertiesFromInventoryMaster]')
        .setData({ inventoryCategoryId: inventoryCategoryId, parentInventoryId:parentId })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchPropertiesFromInventoryMaster', true);
            if (rs.isValid('FetchPropertiesFromInventoryMaster')) {
                console.log(res.result);
                areaDetail.value = res.result;
                itemAreaCount.value = res.result.length;
                console.log("MC Data", mcDetail)
            } else {
                rs.showErrorToast('FetchPropertiesFromInventoryMaster');
            }
        });
}
function FetchAllModifierValueChange  () {
    new MQL()
        .setActivity('o.[FetchAllModifierValueChange]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllModifierValueChange', true);
            if (rs.isValid('FetchAllModifierValueChange')) {
                console.log(res.result);
                modifiervaluechanges.value = res.result;
            } else {
                rs.showErrorToast('FetchAllModifierValueChange');
            }
        });
}

// const updatePrice = () => {
//         // Find the selected area object  
//             selectedPrice.value = 50000; // Assuming the price is stored in the 'price' property of the area object   
//     };

// const findEmd=(inventoryAreaDetails)=>{
//      if(inventoryAreaDetails.inventoryUnit==""){
//         emdPrice.value=inventoryAreaDetails.inventoryReservePrice*0.25;
//     }else{
//         emdPrice.value=inventoryAreaDetails.inventoryReservePrice
//     }
// };

onMounted(() => {
    FetchPropertiesFromInventoryMaster(inventoryCategoryId, parentInventoryId);
    FetchAllModifierValueChange();
    //FetchInventoryMCNamefromInventoryMaster();
})
</script>
