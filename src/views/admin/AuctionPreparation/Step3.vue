
<template>
    <div>
        <template v-if="flag === 0">
            <div>
                <div class="w-subtitle">
                    Auction ID:
                    <!-- {{ $store.state.AuctionPreparation.auctionId }} -->
                </div>
                <div class="card">
                    <DataTable :value="products" resizableColumns columnResizeMode="fit" showGridlines
                        tableStyle="min-width: 50rem">
                        <Column field="code" header="Sr. No."></Column>
                        <Column field="name" header="Item Id"></Column>
                        <Column field="category" header="Item Name"></Column>
                        <Column field="quantity" header="Reserved Orice"></Column>
                        <Column field="name" header="Modifier Value"></Column>
                        <Column field="category" header="Modifier Value Chane After"></Column>
                        <Column field="quantity" header="Action"></Column>
                    </DataTable>
                </div>
                <div class="ml-auto">
                    <span class="p-buttonset">
                        <Button label="ADD Items" @click="changeFlag(1)" icon="pi pi-trash" />
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
        </template>
        <template v-else-if="flag === 1">
            <div class="row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="step1">District<span class="text-danger">*</span></label>

                        <Dropdown v-model="selectedDistrict" variant="filled" :options="districts"
                            optionLabel="inventoryName" placeholder="Select Auction Type" class="w-full md:w-14rem" />

                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="step1">MC Name<span class="text-danger">*</span></label>

                        <Dropdown v-model="selectedEntities.parentInventoryId" variant="filled" :options="MCs"
                            optionLabel="inventoryName" placeholder="Select MC Type" class="w-full md:w-14rem" />

                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="step1">Location<span class="text-danger">*</span></label>

                        <Dropdown v-model="selectedCity" variant="filled" :options="locations" optionLabel="inventoryName"
                            placeholder="Select Location" class="w-full md:w-14rem" />

                    </div>
                </div>
            </div>
            <div class="row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="step1">Area<span class="text-danger">*</span></label>

                        <Dropdown v-model="selectedCity" variant="filled" :options="areas" optionLabel="inventoryName"
                            placeholder="Select Area" class="w-full md:w-14rem" />

                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <FloatLabel>
                            <label for="username">Reserve Price<span class="text-danger">*</span></label>
                            <InputText id="username" v-model="value" placeholder="Enter Reserve Price" />

                        </FloatLabel>
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <FloatLabel>
                            <label for="username">Unit<span class="text-danger">*</span></label>
                            <InputText id="username" v-model="value" placeholder="Ente Unit" />

                        </FloatLabel>
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <FloatLabel>
                            <label for="username">EMD<span class="text-danger">*</span></label>
                            <InputText id="username" v-model="value" placeholder="Enter EMD" />

                        </FloatLabel>
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="step2">Modifier Value<span class="text-danger">*</span></label>

                        <InputNumber v-model="modifierValue1" inputId="minmax-buttons" mode="decimal" showButtons :min="0"
                            :max="100" />
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="step2">Modifier Value Change<span class="text-danger">*</span></label>

                        <Dropdown v-model="selectedModifierValueChange" variant="filled" :options="modifiervaluechanges"
                            optionLabel="modifierValueChangeName" placeholder="Enter Modifier Value"
                            class="w-full md:w-14rem" />
                    </div>
                </div>
            </div>
            <div class="fm-row" v-if="selectedModifierValueChange.modifierValueChangeName == 'After Extension'">
                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="step1">Modifier Value After No. Of Extensions<span class="text-danger">*</span></label>

                        <InputNumber v-model="modifierValue2" inputId="minmax-buttons" mode="decimal" showButtons :min="0"
                            :max="100" />

                    </div>
                </div>
                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="step1">Modifier Value After Extension<span class="text-danger">*</span></label>
                        <InputNumber v-model="modifierValue3" inputId="minmax-buttons" mode="decimal" showButtons :min="0"
                            :max="100" />


                    </div>
                </div>
            </div>

            <div class="card">
                <Toast />
                <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="false"
                    accept="image/*" :maxFileSize="1000000">
                    <template #empty>
                        <p>Drag and drop files to here to upload.</p>
                    </template>
                    <!-- <p>
              <strong>Note:- </strong> Max. file size 2 MB, Only pdf and
              images are allowed
            </p> -->
                </FileUpload>
            </div>
            <div class="fm-row">
                <button class="btn btn-danger-light danger-color" @click="changeFlag(0)">
                    Close
                </button>
                <button class="btn btn-primary-light pri-color" @click="addItem()" v-if="itemAreaCount != 0">
                    ADD
                </button>
            </div>

        </template>

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

const confirm = useConfirm();
const toast = useToast();

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
            toast.add({ severity: 'error', summary: 'Drafted', detail: 'You have drafted', life: 3000 });
        }
    });
};

// onMounted(() => {
//     ProductService.getProductsMini().then(data => products.value = data);
// });

const onAdvancedUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};
var flag = ref(0);
function changeFlag(newValue) {
    flag.value = newValue
    ref(flag)
    console.log("getting from change function", flag)
}
const products = ref();
const selectedCity = ref([]);
const selectedModifierValueChange = ref([]);
const districts = ref([]);

const locations = ref([{ inventoryName: "Ambala Central" }]);
const modifierValue1 = ref();
const modifierValue2 = ref();
const modifierValue3 = ref();
const areas = ref([{ inventoryName: "1000 SQM" }]);
const MC = ref([]);
const MCs = ref([{ inventoryName: " Muncipal Corporation Ambala" }]);
const selectedEntities = ref({
    inventoryName: '',
    parentInventoryId: '',
    inventoryCategoryId: '',
}
);
const modifiervaluechanges = ref([]);
const selectedDistrict = ref([]);
const inventoryCategoryId = 1
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
                districts.value = res.result;
                console.log("districts", districts)
            } else {
                rs.showErrorToast('ErrorFetchPropertiesFromInventoryMaster');
            }
        });
}
function FetchAllModifierValueChange() {
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
                rs.showErrorToast('ErrorFetchAllModifierValueChange');
            }
        });
}
// function FetchInventoryMCNamefromInventoryMaster() {
//     new MQL()
//         .setActivity('o.[FetchInventoryMCNamefromInventoryMaster]')
//         .setData()
//         .fetch()
//         .then((rs) => {
//             let res = rs.getActivity('FetchInventoryMCNamefromInventoryMaster', true);
//             if (rs.isValid('FetchInventoryMCNamefromInventoryMaster')) {
//                 console.log(res.result);
//                 MC.value = res.result;
//             } else {
//                 rs.showErrorToast('ErrorFetchInventoryMCNamefromInventoryMaster');
//             }
//         });
// }

onMounted(() => {
    FetchPropertiesFromInventoryMaster(inventoryCategoryId, parentInventoryId);
    FetchAllModifierValueChange();
    //FetchInventoryMCNamefromInventoryMaster();
})
</script>
