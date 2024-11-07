<template>
    <div class="wizard-content">
        <div class="wc-item">
            <div class="wc-header">
                <div class="wc-title">Auction Code: {{ auctionCodeToShow }}</div>
            </div>
            <div class="table-custom" v-if="addedItem && addedItem.length > 0">
                <DataTable :value="addedItem" resizableColumns
                    columnResizeMode="fit" showGridlines tableStyle="min-width: 50rem">
                    <Column field="inventoryId" header="Inventory Id"></Column>
                    <Column field="inventoryHierarchy" header="Inventory Name"></Column>
                    <Column field="reservePrice" header="Reserve Price"></Column>
                    <Column field="modifierValue" header="Modifier Value"></Column>
                    <Column field="modifierValueChangeName" header="Modifier Value Change After"></Column>
                    <Column field="action" header="Action">
                        <template #body="slotProps">
                            <Button severity="danger" class="btn-sm" @click="deleteItem(slotProps.data)">
                                <fa-trash-can></fa-trash-can>
                                Remove
                            </Button>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div v-else>
                <!-- <h4>INVENTORY ITEM NOT AVAILABLE</h4> -->
                <div class="box-watermark">Inventory Items Not Available</div>
            </div>
            <div class="box-table-action">
                <!-- <Button label="Add Items" @click="visible = true" :disabled="getIsClicked" /> -->
                <Button label="Add Items" @click="visible = true" :disabled="addedItem && addedItem.length > 0" />
            </div>
        </div>

        <Toast />
        <ConfirmDialog></ConfirmDialog>

        <div class="wc-action">
            <!-- <Button label="Back" @click="$router.push({ name: 'step2' })" icon="pi pi-trash" /> -->
            <Button label="Back" @click="prevCallback()" severity="secondary" />
            <!-- <Button @click="confirm1(),handleClick(false)" label="Save" outlined></Button> -->
            <!-- <Button label="Save" @click="confirm1()" icon="pi pi-trash" /> -->
            <!-- <Button   v-if="getIsClicked"   label="Next" @click="nextCallback()" class="btn-submit" /> -->
            <Button v-if="addedItem && addedItem.length > 0" label="Next" @click="nextCallback()" class="btn-submit" />
        </div>

        <!-- --------------------------------------------------------------------------------------- -->
        <Toast />
        <Dialog v-model:visible="visible" modal header="Add Item" :style="{ width: '75rem' }">
            <div class="form-grid">
                <Toast />
                <div class="col-span-full md:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">District</label>
                        <div class="fm-inner">
                            <Dropdown v-model="inventoryDistrictDetails.inventoryId" option-value="inventoryId"
                                variant="filled" :options="districtDetail" optionLabel="inventoryName"
                                placeholder="Select District"
                                @change="fetchMCNameFromInventoryMaster(inventoryDistrictDetails.inventoryId)" />
                        </div>
                        <div v-if="$v.inventoryDistrictDetails.inventoryId.$error" class="fm-error">
                            {{ $v.inventoryDistrictDetails.inventoryId.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">MC Name</label>
                        <div class="fm-inner">
                            <Dropdown v-model="inventoryMcDetails.inventoryId" option-value="inventoryId"
                                variant="filled" :options="mcDetail" optionLabel="inventoryName"
                                placeholder="Select MC Type"
                                @change="fetchLocationFromInventoryMaster(inventoryMcDetails.inventoryId)" />
                        </div>
                        <div v-if="$v.inventoryMcDetails.inventoryId.$error" class="fm-error">
                            {{ $v.inventoryMcDetails.inventoryId.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Location</label>
                        <div class="fm-inner">
                            <Dropdown v-model="inventoryLocationDetails.inventoryId" option-value="inventoryId"
                                variant="filled" :options="locationDetail" optionLabel="inventoryName"
                                placeholder="Select Location"
                                @change="fetchAreaFromInventoryMaster(inventoryLocationDetails.inventoryId)" />
                        </div>
                        <div v-if="$v.inventoryLocationDetails.inventoryId.$error" class="fm-error">
                            {{ $v.inventoryLocationDetails.inventoryId.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="step1">Area</label>
                        <div class="fm-inner">
                            <Dropdown v-model="inventoryAreaDetails" variant="filled" :options="areaDetail"
                                optionLabel="inventoryName" placeholder="Select Area"
                                @change="fetchAvailablePropertyCount(inventoryAreaDetails.inventoryId)" />
                        </div>
                        <div v-if="$v.inventoryAreaDetails.inventoryId.$error" class="fm-error">
                            {{ $v.inventoryAreaDetails.inventoryId.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="Reserve Price">Reserve</label>
                        <div class="fm-inner">
                            <InputText id="username" v-model="inventoryAreaDetails.inventoryReservePrice"
                                placeholder="Enter Reserve Price" readonly />
                        </div>
                        <div v-if="$v.inventoryAreaDetails.inventoryReservePrice.$error" class="fm-error">
                            {{ $v.inventoryAreaDetails.inventoryReservePrice.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="Unit">Unit</label>
                        <div class="fm-inner">
                            <InputText id="username" v-model="inventoryAreaDetails.inventoryUnit" readonly
                                placeholder="Enter Unit" />
                        </div>
                        <div v-if="$v.inventoryAreaDetails.inventoryUnit.$error" class="fm-error">
                            {{ $v.inventoryAreaDetails.inventoryUnit.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="EMD">EMD</label>
                        <div class="fm-inner">
                            <InputText id="username" v-model="inventoryAreaDetails.inventoryEMDAmount"
                                placeholder="Enter EMD" readonly />
                        </div>
                        <div v-if="$v.inventoryAreaDetails.inventoryEMDAmount.$error" class="fm-error">
                            {{ $v.inventoryAreaDetails.inventoryEMDAmount.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="Modifier Value">Modifier Value</label>
                        <div class="fm-inner">
                            <InputNumber v-model="modifierValue" inputId="minmax-buttons" mode="decimal" showButtons
                                :min="1" />
                        </div>
                        <div v-if="$v.modifierValue.$error" class="fm-error">
                            {{ $v.modifierValue.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="Modifier Value Change">Modifier Value Change</label>
                        <div class="fm-inner">
                            <Dropdown v-model="selectedModifierValueChange" variant="filled"
                                :options="modifiervaluechanges" optionLabel="modifierValueChangeName"
                                placeholder="Enter Modifier Value" />
                        </div>
                        <div v-if="$v.selectedModifierValueChange.modifierValueChangeId.$error" class="fm-error">
                            {{ $v.selectedModifierValueChange.modifierValueChangeId.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="fm-row col-span-full" v-if="selectedModifierValueChange.modifierValueChangeId === '2'">
                    <div class="col-span-full md:col-span-6">
                        <div class="fm-group">
                            <label class="fm-label" for="Modifier Value After No. Of Extensions">No of extensions after Modifier value is Modified</label>
                            <div class="fm-inner">
                                <InputNumber v-model="modifierValueExtentionCount" inputId="minmax-buttons"
                                    mode="decimal" showButtons :min="0" :max="100" />
                            </div>
                            <div v-if="$v.modifierValueExtentionCount.$error" class="fm-error">
                                {{ $v.modifierValueExtentionCount.$errors[0].$message }}
                            </div>
                        </div>
                    </div>
                    <div class="col-span-full md:col-span-6">
                        <div class="fm-group">
                            <label class="fm-label" for="No of extensions after Modifier value is Modified">Modifier Value After
                                Extension</label>
                            <div class="fm-inner">
                                <InputNumber v-model="modifierValueAfterExtention" inputId="minmax-buttons"
                                    mode="decimal" showButtons :min="0" />
                            </div>
                            <div v-if="$v.modifierValueAfterExtention.$error" class="fm-error">
                                {{ $v.modifierValueAfterExtention.$errors[0].$message }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-full ">
                    Available Properties:-{{ propertyCount }}
                </div>
                <div class="col-span-full " v-if="!uploadedFile">
                    <div class="fm-group">
                        <Toast />
                        <FileUpload v-model="uploadedFile" :accept="docType" :multiple="false" :fileLimit="1"
                            :max-file-size="docSize * multiplyingFactor" :custom-upload="true" @uploader="onAdvancedUpload">
                            <template #empty>
                                <p>Drag and drop files to here to upload, Max. file size {{ docSize  }} KB , Only
                                    {{docType}}  are allowed</p>
                            </template>
                            <!-- <p><strong>Note:- </strong> Max. file size 2 MB, Only pdf and images are allowed</p> -->
                        </FileUpload>
                        <!-- <div v-if="$v.uploadedFile.$error" class="fm-error">
                            {{ $v.uploadedFile.$errors[0].$message }}
                        </div> -->
                    </div>
                </div>
                <div class="col-span-full fm-action fm-action-center mb-3">
                    <Button v-if="uploadedFile" severity="secondary" @click="viewImage(filePath)">
                        <fa-eye></fa-eye> 
                    </Button>
                    <Button v-if="uploadedFile" severity="danger" @click="deleteDoc()">
                        <fa-trash-can></fa-trash-can> 
                    </Button>
                </div>
                <div class="fm-action  fm-action-center">
                    <Button @click="visible = false" label="Close"></Button>
                    <Button @click="AddStep3AuctionData" label="Add" v-if="propertyCount != 0"></Button>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, defineProps } from 'vue';
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
import MQLCdn from '@/plugins/mqlCdn.js';
import { useAuctionPreparation } from '@/store/auctionPreparation.js'
import { fetchAuctionStatus } from "../../../plugins/helpers";
import { storeToRefs } from 'pinia'
import { useVuelidate } from '@vuelidate/core';
import { helpers, integer, required } from '@vuelidate/validators'
import { createToaster } from "@meforma/vue-toaster";
import { login } from "../../../store/modules/login";
import faEye from '../../../../assets/icons/eye.svg';
import faTrashCan from '../../../../assets/icons/trash-can.svg';

const loginStore = login()
const { role, loginId, entityId } = storeToRefs(loginStore)



const toaster = createToaster({ position: "top-right", duration: 5000 });

const store = useAuctionPreparation()
const { getPropertyCategoryId, getIsClicked } = storeToRefs(store)

const { auctionId, config, multiplyingFactor } = defineProps({
    auctionId: {
        type: Number,
        default: null,
        required: true
    },
    config: {
        type: Object,
        default: null
    },

    multiplyingFactor : {
        type : Number,
        default: null
    }
})

const categoryId = ref('');
const confirm = useConfirm();
const toast = useToast();
const visible = ref(false);
const districtDetail = ref([]);
const mcDetail = ref([]);
const locationDetail = ref([]);
const areaDetail = ref([]);
const itemAreaCount = ref(0);

// const  showDocument = (url) => {
//         window.open(url, '_blank'); 
//     }


const propertyCount = ref();
const myFile = ref("");
const fileName = ref("");
const fullPath = ref("");
const filePath = ref("");
const docTypeId = ref(0);
const docSize = ref();
const docName = ref();
const docType = ref();
const userDataSheet = ref([]);
const docValidation = ref([]);
const uploadedFile = ref('');
const statusData = ref([]);
const displayName = ref();
const statusId = ref();
const Vue = window.app;
const auctionCodeToShow = ref();

const modifierValue = ref("");
const modifierValueExtentionCount = ref('');
const modifierValueAfterExtention = ref('');
const selectedModifierValueChange = ref({
    modifierValueChangeId: '',
    modifierValueChangeName: ''

});
const addedItem = ref([]);

const modifiervaluechanges = ref([]);
const inventoryDistrictDetails = ref({
    inventoryName: "",
    inventoryId: '',
    parentInventoryId: 0,
    inventoryLevelId: 0,
});

const inventoryMcDetails = ref({
    inventoryName: "",
    inventoryId: '',
    parentInventoryId: 0,
    inventoryLevelId: 0,
});

const inventoryLocationDetails = ref({
    inventoryName: "",
    inventoryId: 0,
    parentInventoryId: 0,
    inventoryLevelId: 0,
});

const inventoryAreaDetails = ref({
    inventoryName: "",
    inventoryId: '',
    parentInventoryId: 0,
    inventoryLevelId: 0,
    inventoryReservePrice: '',
    inventoryUnit: '',
    inventoryEMDAmount: '',
    inventoryHierarchy: '',
});

const inventoryCategoryId = ref('');
const parentInventoryId = 0

const emit = defineEmits({
    nextTab: null,
    previousTab: null
});
function prevCallback() {
    emit('previousTab')
}
function nextCallback() {
    emit('nextTab')
}
const handleClick = (input) => {
    // Your button click logic here

    //console.log("is clicked: ", getIsClicked.value)
    store.setIsClicked(input);
};


function fetchPropertiesFromInventoryMaster(inventoryCategoryId, parentInventoryId) {
    console.log("!!!!!!!!!!!inventoryCategoryId", inventoryCategoryId);
    console.log("!!!!!!!!!parentInventoryId", parentInventoryId);
    new MQL()
        .useManagementServer()
        .setActivity('o.[FetchPropertiesFromInventoryMaster]')
        .setData({ inventoryCategoryId: inventoryCategoryId, parentInventoryId: parentInventoryId, entityId: entityId.value})
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchPropertiesFromInventoryMaster', true);
            if (rs.isValid('FetchPropertiesFromInventoryMaster')) {
                //console.log(res.result);
                districtDetail.value = res.result;
                //console.log("printing districtDetail ", districtDetail.value)
            } else {
                rs.showErrorToast('FetchPropertiesFromInventoryMaster');
            }
        });
}
const fetchMCNameFromInventoryMaster = (parentId) => {
    new MQL()
        .useManagementServer()
        .setActivity('o.[FetchPropertiesFromInventoryMaster]')
        .setData({ inventoryCategoryId: inventoryCategoryId.value, parentInventoryId: parentId, entityId: entityId.value })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchPropertiesFromInventoryMaster', true);
            if (rs.isValid('FetchPropertiesFromInventoryMaster')) {
                //console.log(res.result);
                mcDetail.value = res.result;
                //console.log("MC Data", mcDetail)
            } else {
                rs.showErrorToast('FetchPropertiesFromInventoryMaster');
            }
        });
}
const fetchLocationFromInventoryMaster = (parentId) => {
    new MQL()
        .useManagementServer()
        .setActivity('o.[FetchPropertiesFromInventoryMaster]')
        .setData({ inventoryCategoryId: inventoryCategoryId.value, parentInventoryId: parentId, entityId: entityId.value })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchPropertiesFromInventoryMaster', true);
            if (rs.isValid('FetchPropertiesFromInventoryMaster')) {
                //console.log(res.result);
                locationDetail.value = res.result;
                //console.log("MC Data", mcDetail)
            } else {
                rs.showErrorToast('FetchPropertiesFromInventoryMaster');
            }
        });
}
const fetchAreaFromInventoryMaster = (parentId) => {
    new MQL()
        .useManagementServer()
        .setActivity('o.[FetchPropertiesFromInventoryMaster]')
        .setData({ inventoryCategoryId: inventoryCategoryId.value, parentInventoryId: parentId, entityId: entityId.value })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchPropertiesFromInventoryMaster', true);
            if (rs.isValid('FetchPropertiesFromInventoryMaster')) {
                //console.log(res.result);
                areaDetail.value = res.result;
                itemAreaCount.value = res.result.length;
                //console.log("MC Data", mcDetail)
            } else {
                rs.showErrorToast('FetchPropertiesFromInventoryMaster');
            }
        });
}
function FetchAllModifierValueChange() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchAllModifierValueChange]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllModifierValueChange', true);
            if (rs.isValid('FetchAllModifierValueChange')) {
                //console.log(res.result);
                modifiervaluechanges.value = res.result;
            } else {
                rs.showErrorToast('FetchAllModifierValueChange');
            }
        });
}

 const fetchInventoryCategoryId = async () =>{
    new MQL()
    .useManagementServer()
    .setActivity('o.[FetchInventoryCategoryId]')
    .setData({auctionId: auctionId})
    .fetch()
    .then((rs) => {
        let res = rs.getActivity('FetchInventoryCategoryId', true);
        if (rs.isValid('FetchInventoryCategoryId')) {
            // console.log(res.result);
            categoryId.value = res.result.propertyCategoryId;
            inventoryCategoryId.value = categoryId.value;
            // console.log("##########printing categoryId ", categoryId.value)
            fetchPropertiesFromInventoryMaster(inventoryCategoryId.value, parentInventoryId);
        } else {
            rs.showErrorToast('FetchInventoryCategoryId');
        }
    });
}


const onAdvancedUpload = async (event) => {
    // try {
    let timeStamp = Date.now();
    //console.log(timeStamp, "timeStamp")
    //console.log("event", event.files[0])
    myFile.value = event.files[0].name;
    //console.log("myFile", myFile.value)
    const formData = new FormData();
    formData.append('file', event.files[0]);
    //uploadedFile.value = true;
    //new mqlCDN add-------------------------------------------------------------------------------
    new MQLCdn()
        // .useManagementServer()
        .enablePageLoader(true)// FIXED: change this to directory path
        //.isPrivateBucket(true) // (optional field) if you want to upload file to private bucket
        .setDirectoryPath(auctionId + "/AuctionPreparation/ItemDocument") // (optional field) if you want to save  file to specific directory path
        .setFormData(formData) // (required) sets file data
        .setFileName(timeStamp + "_" + myFile.value) // (optional field) if you want to set name to file that is being uploaded
        // FIXED: pass buckeyKey instead of name
        .setBucketKey("2ciy8jTCjhcc6Ohu2hGHyY16nHn") // (required) valid bucket key need to set in which file will be uploaded.
        .setPurposeId("2cixqU1nhJHru2m1S0uIxdKSgMb") // (required) valid purposeId need to set in which file will be uploaded.
        .setClientId("2cixqU1nhJHru2m1S0uIxdKSgMb") // (required) valid purposeId need to set in which file will be uploaded.
        //clientID:2ZncVDPZRGYZwwteYYbB3aw4fr7
        .uploadFile("uploadtBtn")
        .then((res) => {
            // (required) this will upload file takes element id (optional param) which will be blocked while file upload..
            if (res.isValid()) {
                fileName.value = timeStamp + "_" + myFile.value;
                filePath.value = res.uploadedFileURL().filePath;
                // fullPath.value = Vue.getCDNBaseURL();
                //console.log("fileName", fileName.value);
                //console.log("filePath", filePath.value);
                //console.log("fullPath", fullPath.value);
                uploadedFile.value = true;
                // emits('childEvent', { fileName: fileName.value, filePath: filePath.value,fullPath: fullPath.value});
                //toaster.success("file uploaded.");
                toast.add({ severity: 'success', summary: 'Success', detail: 'File Uploaded', life: 3000 });
                // cropVisible.value=false
            } else {
                res.showErrorToast();
            }
        });

   




}


const AddStep3AuctionData = async () => {
    // //console.log("auctionId", getLastInsertedAuctionId.value); 
    // //console.log("inventoryId", inventoryAreaDetails.value.inventoryId);
    // //console.log("modifierValue", modifierValue.value);
    // //console.log("modifierValueChangeId", selectedModifierValueChange.value.modifierValueChangeId);
    // //console.log("numberOfExtension", modifierValueExtentionCount.value);
    // //console.log("modifierValueAfterExtension", modifierValueAfterExtention.value);
    // //console.log("documentTypeId", docTypeId.value);
    // //console.log("documentFilePath",filePath.value);
    // //console.log("documentPath", fullPath.value + "/" + fileName.value);
    // //console.log("documentFileName",fileName.value);
    // //console.log("inventoryCategoryId", getPropertyCategoryId.value);
    // //console.log("statusId", statusId.value);

    
    const result = await $v.value.$validate();
    let errorCount = $v.value.$errors.length;
    if (selectedModifierValueChange.value.modifierValueChangeId === '1') {
        errorCount = errorCount - 2
    }

    if (errorCount == 0) {
        // alert("Form data is valid, form submitted");
        toast.add({ severity: 'success', summary: 'Success', detail: 'Form data is valid, form submitted', life: 3000 });

        //console.log("################EntityId: ", entityId.value)
        // Automatically generated
        new MQL()
            .useManagementServer()
            .setActivity("o.[InsertStep3AuctionData]")
            .setData({
                auctionId: auctionId,
                eventEmdProcessingFees: inventoryAreaDetails.value.inventoryEMDAmount,
                inventoryId: inventoryAreaDetails.value.inventoryId,
                modifierValue: modifierValue.value,
                modifierValueChangeId: selectedModifierValueChange.value.modifierValueChangeId,
                numberOfExtension: modifierValueExtentionCount.value,
                modifierValueAfterExtension: modifierValueAfterExtention.value,
                documentTypeId: docTypeId.value,
                documentFilePath: filePath.value,
                documentPath: "/" + filePath.value,
                documentFileName: fileName.value,
                inventoryCategoryId: categoryId.value,
                modifiedByUserId: loginId.value,
                modifiedByRoleId: role.value.roleId,
                statusId: statusId.value,
                entityId: entityId.value,
                moduleName: "AP-STEP3"
            })
            .fetch()
            .then(rs => {
                //console.log(rs)
                let res = rs.getActivity("InsertStep3AuctionData", true)
                //console.log(res)
                if (rs.isValid("InsertStep3AuctionData")) {
                    addItem();
                    // handleClick(true);
                    visible.value = false
                    //console.log("Response of Step 3 Data insert : ", res.result)
                } else {
                    rs.showErrorToast("InsertStep3AuctionData")
                }
            })

    } else {
        // alert("Form data is invalid, please check the form");
        toast.add({ severity: 'error', summary: 'Drafted', detail: 'Form data is invalid, please check the form', life: 3000 });
    }



}

function fetchDocumentsValidationDetails() {
    // Automatically generated
    new MQL()
        .useCoreServer()
        .setActivity("o.[fetchDocumentsValidationDetails]")

        .fetch()
        .then(rs => {
            let res = rs.getActivity("fetchDocumentsValidationDetails", true)
            docValidation.value = res.result.validation
            docValidation.value.forEach(item => {
                if (item.typeName == "AUCTION_ITEM_DOCUMENT") {
                    docName.value = item.typeName;
                    docSize.value = item.fileSize;
                    docType.value = item.fileType;
                    docTypeId.value = item.typeId;
                    //console.log("docName.value", docName.value);
                }
            });
        })
}


async function FetchAuctionStatus(code) {
    
    const statusResult = await fetchAuctionStatus(code)
    if (statusResult.error == null) {
        statusId.value = statusResult.result.statusId
        displayName.value = statusResult.result.displayName
    } else {
        toaster.error("Oops! Please Contact")
    }
}



function addItem() {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAllStepsAuctionPreview]")
        .setData({ "auctionId": auctionId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAllStepsAuctionPreview", true)
            if (rs.isValid("FetchAllStepsAuctionPreview")) {
                //if(!res.result.fetchStep3AuctionPreview == null){
                addedItem.value = res.result.fetchStep3AuctionPreview;
                auctionCodeToShow.value = res.result.fetchStep1AuctionPreview.auctionCode;
                // Ensure your data is correctly populated
                //console.log("***************", addedItem.value);

                // }
                //console.log("Response of Step 3 Data insert : ", res.result);
                //console.log("addedItem", addedItem.value);
            } else {
                rs.showErrorToast("FetchAllStepsAuctionPreview")
            }
        })


}

const documentDetails = ref([])

const docFileName = ref("")
const docFilePath = ref("")
const docPath = ref("")
const docFileTypeId = ref(0)


function RemoveItemFromDB() {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchDocumentDetails]")
        .setData({ "auctionId": auctionId })
        .fetch()
        .then(async rs => {
            let res = rs.getActivity("FetchDocumentDetails", true)
            if (rs.isValid("FetchDocumentDetails")) {
                documentDetails.value = res.result;
                documentDetails.value.forEach(item => {
                    docFileName.value = item.documentFileName;
                    docFilePath.value = item.documentFilePath;
                    docPath.value = item.documentPath;
                    docFileTypeId.value = item.documentTypeId;
                });
                //console.log("documentDetails", documentDetails.value);
                //console.log("docFileName", docFileName.value);
                //console.log("docFilePath", docFilePath.value);
                //console.log("docPath", docPath.value);
                //console.log("docFileTypeId", docFileTypeId.value);

                await FetchAuctionStatus('AUCTION_ITEM_DELETED');
                //console.log("statusId", statusId.value);
                // Automatically generated
                new MQL()
                    .useManagementServer()
                    .setActivity("o.[DeleteStep3Data]")
                    .setData({
                        "auctionId": auctionId,
                        "documentFileName": docFileName.value,
                        "documentFilePath": docFilePath.value,
                        "documentPath": docPath.value,
                        "documentTypeId": docFileTypeId.value,
                        "statusId": statusId.value,
                        "modifiedByUserId": loginId.value,
                        "modifiedByRoleId": role.value.roleId
                    })
                    .fetch()
                    .then(rs => {
                        let res = rs.getActivity("DeleteStep3Data", true)
                        if (rs.isValid("DeleteStep3Data")) {
                            // handleClick(false);
                        } else {
                            rs.showErrorToast("DeleteStep3Data")
                        }
                    })

            } else {
                rs.showErrorToast("FetchDocumentDetails")
            }
        })
}

function deleteItem(data) {
    confirm.require({
        message: 'Are you sure you want to Remove Inventory?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'No',
        acceptLabel: 'Yes',
        accept: () => {
            RemoveItemFromDB();
            toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Inventory Item Removed', life: 3000 });
            addedItem.value = addedItem.value.filter((item) => item !== data);
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Drafted', detail: 'Inventory Item Not Removed', life: 3000 });
        }
    });
}

const rules = computed(() => ({
    inventoryDistrictDetails: {
        inventoryId: { required: helpers.withMessage('District is required', required) },
    },

    inventoryMcDetails: {
        inventoryId: { required: helpers.withMessage('MC Name is required', required) },
    },

    inventoryLocationDetails: {
        inventoryId: { required: helpers.withMessage('Location is required', required) },
    },

    inventoryAreaDetails: {
        inventoryId: { required: helpers.withMessage('Area is required', required) },
        inventoryReservePrice: { required: helpers.withMessage('Reserve Price is required', required) },
        inventoryUnit: { required: helpers.withMessage('Unit is required', required) },
        inventoryEMDAmount: { required: helpers.withMessage('EMD is required', required) },
    },

    modifierValue: { required: helpers.withMessage('Modifier Value is required', required) },

    selectedModifierValueChange: {
        modifierValueChangeId: { required: helpers.withMessage('Modifier Value Change is required', required) },
    },
    modifierValueExtentionCount: { required: helpers.withMessage('Modifier Value After No. Of Extensions is required', required) },

    modifierValueAfterExtention: { required: helpers.withMessage('Modifier Value After Extension is required', required) },

    uploadedFile: { },
}));

const $v = useVuelidate(rules, {
    inventoryDistrictDetails,
    inventoryMcDetails,
    inventoryLocationDetails,
    inventoryAreaDetails,
    modifierValue,
    selectedModifierValueChange,
    modifierValueExtentionCount,
    modifierValueAfterExtention,
    // uploadedFile
});

function DownloadDocument(url) {
    if (url !== "") {
        new MQLCdn()
            .setCDNPath(url)
            .enablePageLoader(true)
            .downloadFile("downloadBtn")
            .then((res) => {
                if (!res.isValid()) {
                    res.showErrorToast();
                }
            });
    } else {
        toaster.error("File can'nt be downloaded!")
    }
};
function fetchAvailablePropertyCount(id) {


    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAvailablePropertyCount]")
        .setData({ parentInventoryId: id })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAvailablePropertyCount", true)
            if (rs.isValid("FetchAvailablePropertyCount")) {
                propertyCount.value = res.result.unsoldPropertyCount.propertyCount
                //console.log("count", res.result.unsoldPropertyCount.propertyCount);
            } else {
                rs.showErrorToast("FetchAvailablePropertyCount")
            }
        })

}

const deleteFile = (url) => {
    console.log("url is",url)
    return new Promise((resolve) => {
        new MQLCdn()
        
        .setBucketKey("2ciy8jTCjhcc6Ohu2hGHyY16nHn") // (required) valid bucket key need to set in which file will be uploaded.
        .setPurposeId("2cixqU1nhJHru2m1S0uIxdKSgMb") // (required) valid purposeId need to set in which file will be uploaded.
        .setClientId("2cixqU1nhJHru2m1S0uIxdKSgMb")
        .setDirectoryPath(auctionId + "/AuctionPreparation/ItemDocument")

            .setFileName(url)
            .enablePageLoader(true)
            .deleteFile()
            .then((res) => {
                //console.log(res);
                if (res.isValid()) {
                    toaster.error("file deleted");
                    
                    resolve()
                } else {
                    res.showErrorToast();
                }
            });
    })
}


const deleteDoc = async () => {
    await deleteFile(fileName.value)
    fileName.value = null
    filePath.value = ""
    uploadedFile.value = false
    
    

}


let imagePath=ref()
    function viewImage(path) {
      imagePath.value = path;

      if(!path.startsWith('http')) {
        console.log("Inside "+path)
        imagePath.value =   Vue.getCDNBaseURL()+'/'+imagePath.value
      }

console.log("path is "+imagePath.value)
      // if (path.endsWith('.pdf')) {
      //   console.log("inside pdfs")
        fetchImage(imagePath.value)
//         viewImageModalPDF.value = true;
// } else {
  // fetchImage(path)
  // viewImageModalImage.value=true;
// }



    }

function fetchImage(url) {

  const myHeaders = new Headers();

myHeaders.append("Authorization", 'Bearer ' + sessionStorage.getItem('user-token'));
myHeaders.append("Accept", "application/json, text/plain, */*");
const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(url, requestOptions)
  .then((response) =>
    response.blob())
    .then((blob) => {
    // Create a URL for the image
    const imageUrl = URL.createObjectURL(blob);

    imagePath.value =  imageUrl;
    console.log("imagePath.value is",imagePath.value)
    // viewImageModalImage.value=true
    window.open(imageUrl);
  })
  .catch((error) => console.error(error));
  
}




onMounted(() => {
    fetchInventoryCategoryId();
    // fetchPropertiesFromInventoryMaster(inventoryCategoryId, parentInventoryId);
    FetchAllModifierValueChange();
    fetchDocumentsValidationDetails();

    //FetchInventoryMCNamefromInventoryMaster();
    FetchAuctionStatus('AUCTION_ITEM_PENDING');
    addItem();
})
</script>
