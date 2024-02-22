
<template>  
    <div class="gap-2  mx-auto">
        <div class="fm-row">
            <div class="w-full">
                <h1>Auction ID: {{ getLastInsertedAuctionId }}</h1>
            </div>
        </div>

        <Divider />

        <div class="fm-row">
            <div class="w-full">
                <div class="card">
                    <DataTable :value="addedItem" resizableColumns columnResizeMode="fit" showGridlines
                        tableStyle="min-width: 50rem">
                        <!-- <Column field="srNumber" header="Sr. No."></Column> -->
                        <Column field="inventoryId" header="Inventory Id"></Column>
                        <Column field="inventoryAreaName" header="Inventory Name"></Column>
                        <Column field="itemReservePrice" header="Reserved Price"></Column>
                        <Column field="modifierVal" header="Modifier Value"></Column>
                        <Column field="modifierValAfter" header="Modifier Value Change After"></Column>
                        <Column field="action" header="Action">
                            <template #body="slotProps">
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" label="Remove" @click="deleteItem(slotProps.data)" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>

        <Divider /> 

        <div class="fm-row">
            <div class="w-full">
                <Button label="ADD Items" @click="visible = true" icon="pi pi-trash" />
            </div>
        </div>

        <Divider />

        <div class="fm-row">
            <div class="w-1/2">
                <div class="fm-group">
                    <Button label="Back" @click="$router.push({ name: 'step2' })" icon="pi pi-trash" />
                </div>
            </div>
            <Toast />
            <ConfirmDialog></ConfirmDialog>
            <div class="w-1/2">
                <div class="fm-group">
                    <Button @click="confirm1()" label="Next" outlined></Button>
                </div>
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
import Divider from 'primevue/divider';
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
const districtDetail = ref([]);
const mcDetail = ref([]);
const locationDetail = ref([]);
const areaDetail = ref([]);
const itemAreaCount = ref(0);

const modifierValue = ref("");
const modifierValueExtentionCount = ref(0);
const modifierValueAfterExtention = ref(0);
const selectedModifierValueChange = ref([]);
const addedItem = ref([]);

const modifiervaluechanges = ref([]);
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
        inventoryHierarchy:"",
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

function addItem() {
    // let srNumber = addedItem.value.length + 1;
    let inventoryId = inventoryAreaDetails.value.inventoryId;
    let inventoryAreaName = inventoryAreaDetails.value.inventoryHierarchy;
    let itemReservePrice = inventoryAreaDetails.value.inventoryReservePrice;
    let modifierVal = modifierValue.value;
    let modifierValAfter = selectedModifierValueChange.value.modifierValueChangeName;
    addedItem.value.push({ inventoryId, inventoryAreaName, itemReservePrice, modifierVal, modifierValAfter });
    // reset();
}
// function reset(){
//     inventoryDistrictDetails.value.inventoryId = null;
//     inventoryMcDetails.value.inventoryId = null;
//     inventoryLocationDetails.value.inventoryId = null;
//     inventoryAreaDetails.value.inventoryId = null;
// };
function deleteItem(data) {
    confirm.require({
        message: 'Are you sure you want to Remove Inventory?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'No',
        acceptLabel: 'Yes',
        accept: () => {
            toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Inventory Item Removed', life: 3000 });
            addedItem.value = addedItem.value.filter((item) => item !== data);
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Drafted', detail: 'Inventory Item Not Removed', life: 3000 });
        }
    });
}
const onAdvancedUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

onMounted(() => {
    FetchPropertiesFromInventoryMaster(inventoryCategoryId, parentInventoryId);
    FetchAllModifierValueChange();
    //FetchInventoryMCNamefromInventoryMaster();
})
</script>
