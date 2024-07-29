<template>
    <div>
        <template v-if="flag === 0">
            <div class="card">
                <DataTable responsiveLayout="scroll" v-model:filters="filters" :value="entities" paginator :rows="10"
                    dataKey="id" filterDisplay="row" :loading="loading"
                    :globalFilterFields="['entityId', 'entityName', 'entityShortName', 'entityAddress', 'entityContactNumber']">
                    <template #header>
                        <div class="flex justify-content-end">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                            </span>
                            <div class="ml-auto">
                                <span class="p-buttonset">
                                    <Button label="ADD" @click="changeFlag(1)" icon="pi pi-trash" />
                                </span>
                            </div>
                        </div>
                    </template>
                    <template #empty>No data found.</template>
                    <Column field="entityId" header="Id" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.entityId }}
                        </template>

                    </Column>

                    <Column field="entityName" header="Entity Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.entityName }}
                        </template>

                    </Column>
                    <Column field="entityShortName" header="Entity Short Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.entityShortName }}
                        </template>

                    </Column>
                    <Column field="entityAddress" header="Entity Address" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.entityAddress }}
                        </template>

                    </Column>
                    <Column field="districtName" header="Entity District Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.districtName }}
                        </template>

                    </Column>

                    <Column field=" entityContactNumber" header="Entity Contact Number" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.entityContactNumber }}
                        </template>
                    </Column>
                    <Column field="roundRule" header="Round Rule" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.roundRule }}
                        </template>
                    </Column>
                    <Column field=" eventProcessingFees" header="Entity Event Processing Fees" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.eventProcessingFees }}
                        </template>
                    </Column>
                    <Column field=" emiPaymentPercentage" header="Entity EMI Payment Percentage"
                        style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.emiPaymentPercentage }}
                        </template>
                    </Column>


                    <Column field="isParent" header="Entity Parent" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.isParent }}
                        </template>
                    </Column>

                    <Column header="Actions" style="min-width:12rem">

                        <template #body="{ data }">
                            <span class="p-buttonset">
                                <Button label="Edit" @click="editEntity(data), changeFlag(2)" icon="pi pi-trash" />
                            </span>
                            <!-- <span class="p-buttonset">
                                <Button label="Delete" @click="deleteEntity(data),reloadPage()" icon="pi pi-trash" />
                            </span> -->
                            <ConfirmDialog></ConfirmDialog>
                            <div class="w-1/2">
                                <div class="fm-group">
                                    <Button @click="confirmDelete(data)" type="submit"
                                        class="p-button p-button-primary">Delete</Button>
                                </div>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </template>
        <template v-else-if="flag === 1">
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">


                        <label for="organization">Select Organization<span>*</span></label>
                        <Dropdown v-model="entityData.organizationId" optionValue="organizationId"
                            :options="organization" optionLabel="organizationName" placeholder="Select a Organization"
                            class="w-full md:w-14rem" @change="fetchEntityTypesByOrganization" />
                    </div>
                    <div v-if="$v.entityData.organizationId.$error" class="fm-error">
                        {{ $v.entityData.organizationId.$errors[0].$message }}
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">

                        <!-- Bind the selected country to entityData.fklENtityTypeId -->
                        <label for="entityName">Entity Type<span>*</span></label>
                        <Dropdown v-model="entityData.entityTypeId" optionValue="entityTypeId" :options="entitytype"
                            optionLabel="entityTypeName" placeholder="Select a Entity Type" class="w-full md:w-14rem" />
                    </div>
                    <div v-if="$v.entityData.entityTypeId.$error" class="fm-error">
                        {{ $v.entityData.entityTypeId.$errors[0].$message }}
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="entityName">Entity Name<span>*</span></label>
                        <!-- <InputText id="entityName" v-model="entityData.entityName" /> -->
                        <InputText id="entityName" v-model="entityData.entityName" placeholder="Enter Entity Name" />

                    </div>
                    <div v-if="$v.entityData.entityName.$error" class="fm-error">
                        {{ $v.entityData.entityName.$errors[0].$message }}
                    </div>
                </div>
            </div>

            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="entityShortName">Entity Short Name<span>*</span></label>
                        <InputText id="entityShortName" v-model="entityData.entityShortName"
                            placeholder="Enter Entity Short Name" @input="checkEntityShortName" />
                    </div>
                    <!-- <div v-if="$v.entityData.entityShortName.$error" class="fm-error">
                        {{ $v.entityData.entityShortName.$errors[0].$message }}
                    </div> -->
                    <div v-if="$v.entityData.entityShortName.$error" class="fm-error">
                        {{ $v.entityData.entityShortName.$errors[0]?.$message }}
                    </div>
                </div>
                <div class="w-1/2">
                    <label for="countryName">Entity District Name<span>*</span></label>
                    <!-- Bind the selected country to stateData.fklCountryId -->
                    <Dropdown v-model="entityData.districtId" optionValue="districtId" :options="districts"
                        optionLabel="districtName" placeholder="Select a district" class="w-full md:w-14rem" />
                </div>
                <div v-if="$v.entityData.districtId.$error" class="fm-error">
                    {{ $v.entityData.districtId.$errors[0].$message }}
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="entityAddress">Entity Address<span>*</span></label>
                        <InputText id="entityAddress" v-model="entityData.entityAddress"
                            placeholder="Enter Entity Address" />

                    </div>
                    <div v-if="$v.entityData.entityAddress.$error" class="fm-error">
                        {{ $v.entityData.entityAddress.$errors[0].$message }}
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="entityContactNumber">Entity Contact Number<span>*</span></label>
                        <InputText id="entityContactNumber" v-model="entityData.entityContactNumber"
                            placeholder="Enter Entity Contact Number" />
                        <!-- <small id="username-help">Enter Entity Contact Number E.g 6398302275</small> -->
                    </div>
                    <div v-if="$v.entityData.entityContactNumber.$error" class="fm-error">
                        {{ $v.entityData.entityContactNumber.$errors[0].$message }}
                    </div>
                </div>

                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="entityContactNumber">Entity Round Rule<span>*</span></label>
                        <InputText id="entityContactNumber" v-model="entityData.roundRule"
                            placeholder="Enter Entity Round Rule" />
                        <!-- <small id="username-help">Enter Entity Round Rule E.g 3</small> -->
                    </div>
                    <div v-if="$v.entityData.roundRule.$error" class="fm-error">
                        {{ $v.entityData.roundRule.$errors[0].$message }}
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="entityContactNumber">Entity Event Processing Fees<span>*</span></label>
                        <InputText id="entityContactNumber" v-model="entityData.eventProcessingFees"
                            placeholder="Enter Entity Event Processing Fees" />
                        <!-- <small id="username-help">Enter Entity Event Processing Fees E.g 1000</small> -->
                    </div>
                    <div v-if="$v.entityData.eventProcessingFees.$error" class="fm-error">
                        {{ $v.entityData.eventProcessingFees.$errors[0].$message }}
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="entityContactNumber">Entity EMI Payment Percentage<span>*</span></label>
                        <InputText id="entityContactNumber" v-model="entityData.emiPaymentPercentage"
                            placeholder="Enter Entity EMI Payment Percentage " />
                        <!-- <small id="username-help">Enter Entity EMI Payment Percentage E.g 25</small> -->
                    </div>
                    <div v-if="$v.entityData.emiPaymentPercentage.$error" class="fm-error">
                        {{ $v.entityData.emiPaymentPercentage.$errors[0].$message }}
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="entityParent">Entity Parent<span>*</span></label>
                        <div class="card flex justify-content-center">
                            <Checkbox v-model="entityData.isParent" :binary="true" />
                        </div>
                        <small id="username-help">Enter Entity Parent E.g Yes or NO </small>
                    </div>
                    <div v-if="$v.entityData.isParent.$error" class="fm-error">
                        {{ $v.entityData.isParent.$errors[0].$message }}
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <Toast />
                        <ConfirmDialog></ConfirmDialog>
                        <div class="card flex flex-wrap gap-2 justify-content-center">
                            <Button @click="confirmADD(entityData)" icon="pi pi-check" label="Submit"></Button>
                            <Button @click="changeFlag(0)" icon="pi pi-times" label="Cancel" severity="danger"></Button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <Button @click="insertEntity(entityData), changeFlag(0), reloadPage()" icon="pi pi-check"
                    label="Submit"></Button> -->
            <!-- <Button @click="changeFlag(0), reloadPage()" icon="pi pi-check" label="Cancel"></Button> -->

        </template>

        <template v-else-if="flag === 2">
            <div class="fm-row">
                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="organizationName">Select Organization<span>*</span></label>

                        <Dropdown v-model="entityData.organizationId" optionValue="organizationId"
                            :options="organization" optionLabel="organizationName" placeholder="Select a Organization"
                            class="w-full md:w-14rem" @change="fetchEntityTypesByOrganization" />
                    </div>

                    <div v-if="$v.entityData.organizationId.$error" class="fm-error">
                        {{ $v.entityData.organizationId.$errors[0].$message }}
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="entityName"> Select Entity Type <span>*</span></label>
                        <!-- Bind the selected entitytype to entityData.entityTypeId -->
                        <Dropdown v-model="entityData.entityTypeId" optionValue="entityTypeId" :options="entitytype"
                            optionLabel="entityTypeName" placeholder="Select a Entity Type" class="w-full md:w-14rem" />
                    </div>
                    <div v-if="$v.entityData.entityType.$error" class="fm-error">
                        {{ $v.entityData.entityType.$errors[0].$message }}
                    </div>
                </div>

                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="entityName">Entity Name<span>*</span></label>
                        <InputText id="entityName" v-model="entityData.entityName" />
                        <!-- <small id="username-help">Enter Entity Name E.g UttarPradesh</small> -->
                    </div>
                    <div v-if="$v.entityData.entityName.$error" class="fm-error">
                        {{ $v.entityData.entityName.$errors[0].$message }}
                    </div>
                </div>
            </div>
            <div class="w-1/2">
                <label for="entityShortName">Entity Short Name<span>*</span></label>
                <InputText id="entityShortName" v-model="entityData.entityShortName" />
                <!-- <small id="username-help">Enter Entity Short Name E.g MCF</small> -->
            </div>
            <div v-if="$v.entityData.entityShortName.$error" class="fm-error">
                {{ $v.entityData.entityShortName.$errors[0].$message }}
            </div>
            <div class="w-1/2">
                <label for="countryName">Entity District Name<span>*</span></label>
                <!-- Bind the selected country to stateData.fklCountryId -->
                <Dropdown v-model="entityData.districtId" optionValue="districtId" :options="districts"
                    optionLabel="districtName" placeholder="Select a district" class="w-full md:w-14rem" />
            </div>
            <div v-if="$v.entityData.districtId.$error" class="fm-error">
                {{ $v.entityData.districtId.$errors[0].$message }}
            </div>
            <div class="w-1/2">
                <label for="entityAddress">Entity Address<span>*</span></label>
                <InputText id="entityAddress" v-model="entityData.entityAddress" />
                <!-- <small id="username-help">Enter Entity Address E.g MCF</small> -->
            </div>
            <div v-if="$v.entityData.entityAddress.$error" class="fm-error">
                {{ $v.entityData.entityAddress.$errors[0].$message }}
            </div>
            <div class="w-1/2">
                <label for="entityContactNumber">Entity Contact Number<span>*</span></label>
                <InputText id="entityContactNumber" v-model="entityData.entityContactNumber" />
                <!-- <small id="username-help">Enter Entity Contact Number E.g 6398302275</small> -->
            </div>
            <div v-if="$v.entityData.entityContactNumber.$error" class="fm-error">
                {{ $v.entityData.entityContactNumber.$errors[0].$message }}
            </div>
            <div class="w-1/2">
                <label for="roundRule">Entity Round Rule<span>*</span></label>
                <InputText id="roundRule" v-model="entityData.roundRule" />
                <!-- <small id="username-help">Enter Entity Round Rule E.g 1</small> -->
            </div>
            <div v-if="$v.entityData.roundRule.$error" class="fm-error">
                {{ $v.entityData.roundRule.$errors[0].$message }}
            </div>
            <div class="w-1/2">
                <label for="eventProFees">Entity Event Processing Fees<span>*</span></label>
                <InputText id="eventProFees" v-model="entityData.eventProcessingFees" />
                <!-- <small id="username-help">Enter Entity Event Processing Fees E.g 1000</small> -->
            </div>
            <div v-if="$v.entityData.eventProcessingFees.$error" class="fm-error">
                {{ $v.entityData.eventProcessingFees.$errors[0].$message }}
            </div>
            <div class="w-1/2">
                <label for="emiPayPercent">Entity EMI Payment Percentage<span>*</span></label>
                <InputText id="emiPayPercent" v-model="entityData.emiPaymentPercentage" />
                <!-- <small id="username-help">Enter Entity EMI Payment Percentage E.g 25 </small> -->
            </div>
            <div v-if="$v.entityData.emiPaymentPercentage.$error" class="fm-error">
                {{ $v.entityData.emiPaymentPercentage.$errors[0].$message }}
            </div>
            <div class="w-1/2">
                <label for="entityParent">Entity Parent</label>
                <div class="card flex justify-content-center">

                    <Checkbox v-model="entityData.isParent" :binary="true" />
                </div>
                <div v-if="$v.entityData.isParent.$error" class="fm-error">
                    {{ $v.entityData.isParent.$errors[0].$message }}
                </div>
                <!-- <small id="username-help">Enter Entity Parent E.g Yes or NO </small> -->
            </div>
            <Toast />
            <ConfirmDialog></ConfirmDialog>
            <div class="w-1/2">
                <div class="fm-group">
                    <Button @click="confirmEdit(entityData)" type="submit"
                        class="p-button p-button-primary">Submit</Button>
                    <Button @click="changeFlag(0)" icon="pi pi-times" label="Cancel" severity="danger"></Button>
                </div>

            </div>

        </template>

    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import MQL from '@/plugins/mql.js';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfirmDialog from 'primevue/confirmdialog';
import { or } from '@vuelidate/validators';
import Checkbox from 'primevue/checkbox';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';

const confirm = useConfirm();
const toast = useToast();
const entities = ref([]);
const loading = ref(true);
var flag = ref(0);
const districts = ref([]);

const entityData = ref({
    entityName: '',
    entityShortName: '',
    entityAddress: '',
    entityContactNumber: '',
    entityTypeId: '',
    organizationId: '',
    roundRule: '',
    eventProcessingFees: '',
    emiPaymentPercentage: '',
    isParent: false,
    districtId: '',
    entitytype: ''


});
const isUniqueEntityShortName = helpers.withAsync(async (value) => {
    if (!value) return true; 
    const response = await new MQL()
        .useCoreServer()
        .setActivity("o.[CountEntityShortName]")
        .setData({ entityShortName: value }) // Pass the entityShortName directly
        .fetch();

    const res = response.getActivity("CountEntityShortName", true);

    if (response.isValid("CountEntityShortName")) {
        const count = res.result.countEntity; // Extract the count from the response object
        return count === 0; // Ensure to compare with 0
    } else {
        response.showErrorToast("CountEntityShortName");
        return false;
    }
});

async function checkEntityShortName(newValue) {
    const isShortNameAvailable = await CountEntityShortName(newValue);
    //console.log("shortName", isShortNameAvailable)
    if (!isShortNameAvailable) {
        //console.log("!isShortNameAvailable", isShortNameAvailable)
        // Display error message indicating that entity short name already exists
        toast.add({ severity: 'error', summary: 'Entity Short Name Error', detail: 'Entity short name already exists.', life: 3000 });
    }
}
async function CountEntityShortName() {
    try {
        const response = await new MQL()
            .useCoreServer()
            .setActivity("o.[CountEntityShortName]")
            .setData({ entityShortName: entityData.value.entityShortName }) // Pass the entityShortName directly
            .fetch();

        const res = response.getActivity("CountEntityShortName", true);

        if (response.isValid("CountEntityShortName")) {
            count.value = res.result.countEntity; // Extract the count from the response object
            //console.log("Entity short name count:", count.value);
            //console.log("count", count)
            return count.value == 0; // Ensure to compare with 0
        } else {
            response.showErrorToast("CountEntityShortName");
            return false;
        }
    } catch (error) {
        console.error("Error counting entity short name:", error);
        return false;
    }
}
const rules = computed(() => ({
    entityData: {
        districtId: {
            required: helpers.withMessage('District is required', required)
        },
        isParent: {
            required: helpers.withMessage('Check is required', required)
        },
        emiPaymentPercentage: {
            required: helpers.withMessage('Emi Payment Percentage is required', required)
        },
        eventProcessingFees: {
            required: helpers.withMessage('Event processing fees is required', required)
        },
        roundRule: {
            required: helpers.withMessage('Round rule is required', required)
        },
        organizationId: {
            required: helpers.withMessage('Organization is required', required)
        },
        entityTypeId: {
            required: helpers.withMessage('Entity type is required', required)
        },
        entityContactNumber: {
            required: helpers.withMessage('Entity contact number is required', required)
        },
        entityAddress: {
            required: helpers.withMessage('Entity address is required', required)
        },
        entityShortName: {
            required: helpers.withMessage('Entity short name is required', required),
            isUniqueEntityShortName: helpers.withMessage('Entity short name already exists', isUniqueEntityShortName)
        },
        entityName: {
            required: helpers.withMessage('Entity name is required', required)
        }
    }
}));
const $v = useVuelidate(rules, { entityData });
let count = ref([]);
const organization = ref([]);
const organizationId = ref([]);
const entitytype = ref([]);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    entityName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    entityShortName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    entityAddress: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    entitycontactNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

function changeFlag(newValue) {
    flag.value = newValue
    ref(flag)
    //console.log("getting from change function", flag)
}

function FetchEntities() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchEntityDetails]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchEntityDetails', true);
            if (rs.isValid('FetchEntityDetails')) {
                //console.log(res.result);
                entities.value = res.result.map(entity => ({
                    ...entity,
                    isParent: entity.isParent == 1 ? 'Yes' : 'No'

                }));


            } else {
                rs.showErrorToast('FetchEntityDetails');
            }
            loading.value = false; // Move loading to here
        });
}
function FetchOrganizations() {
    new MQL()
        .useCoreServer()
        .setActivity("o.[FetchOrganizationDetails]")
        .setData({})
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchOrganizationDetails", true)
            if (rs.isValid("FetchOrganizationDetails")) {
                //console.log("result@@@@", res.result)
                organization.value = res.result
                organizationId.value = res.result[0].organizationId;
                //console.log("organizationId", organizationId.value)

            } else {
                rs.showErrorToast("FetchOrganizationDetails")
            }
        })

}
function FetchEntityTypeByOrganization(organizationId) {
    //console.log("OrganizationData", organizationId.value)
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchEntityTypeByOrganizationId]')
        .setData({ organizationId: organizationId.value })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchEntityTypeByOrganizationId', true);
            if (rs.isValid('FetchEntityTypeByOrganizationId')) {
                //console.log(res.result);
                entitytype.value = res.result;

            } else {
                rs.showErrorToast('FetchEntityTypeByOrganizationId');
            }
            loading.value = false; // Move loading to here
        });
}

function FetchDistrictName() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchAllDistrict]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllDistrict', true);
            if (rs.isValid('FetchAllDistrict')) {
                //console.log(res.result);
                districts.value = res.result;

            } else {
                rs.showErrorToast('FetchAllDistrict');
            }
            loading.value = false; // Move loading to here
        });
}
const fetchEntityTypesByOrganization = () => {
    FetchEntityTypeByOrganization(organizationId);
};

function insertEntity(entityData) {
    //console.log("############", entityData.value)
    new MQL()
        .useCoreServer()
        .setActivity('o.[InsertEntity]')
        .setData(entityData.value)
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('InsertEntity', true);
            if (rs.isValid('InsertEntity')) {
                //console.log(res.result);
                //console.log("entityData from Insert", entityData);

            } else {
                rs.showErrorToast('InsertState');
            }
            loading.value = false;
        });
}


const updateEntity = async (entityData) => {
    // function updateEntity(entityData) {
    new MQL()
        .useCoreServer()
        .setActivity('o.[UpdateEntityById]')
        .setData(entityData)
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('UpdateEntityById', true);
            if (rs.isValid('UpdateEntityById')) {
                //console.log(res.result);
            } else {
                rs.showErrorToast('UpdateEntityById');
            }
            loading.value = false;
        });

}
function reloadPage() {
    window.location.reload();
    //console.log("we are reloading page")
}


function editEntity(entity) {
    //console.log("Before edit: ", entity);

    // Set entityData to the values of the selected state
    entityData.value = {
        ...entity,
        entityTypeId: parseInt(entity.entityTypeId),
        // isParent: data.isParent == 'Yes' ? true : false

    };
    entityData.value = { ...entityData.value, isParent: entityData.value.isParent == 'Yes' ? true : false };



    //console.log("After edit: ", entityData);

    // Update the flag to indicate edit mode
    changeFlag(2);
}


const confirmEdit = async (entityData) => {
    const result = await $v.value.$validate();
    if (result) {
        confirm.require({
            message: 'Are you sure you want to edit Entity?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // entityData.value = { ...entity };
                // entityData.value = { ...entityData.value, isParent: entityData.value.isParent == 'Yes' ? true : false };
                updateEntity(entityData),
                    changeFlag(0), reloadPage()
                toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    } else {
        //alert("error, form not submitted")
        // toast.add({ severity: 'error', summary: 'Drafted', detail: 'Please fill all fields', life: 3000 });
        //console.log("eror in validation")

        toast.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill all required fields.', life: 3000 });
        return;
    }
};


const confirmADD = async () => {
    const result = await $v.value.$validate();
    if (result) {
        confirm.require({
            message: 'Are you sure you want to add Entity?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                insertEntity(entityData)
                toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    } else {
        toast.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill all required fields.', life: 3000 });
        return;
    }
};



const confirmDelete = (data) => {
    confirm.require({
        message: 'Are you sure you want to delete Entity?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            deleteEntity(data), changeFlag(0), reloadPage()
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

function deleteEntity(data) {
    new MQL()
        .useCoreServer()
        .setActivity('o.[DeleteEntityById]')
        .setData(data)
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('DeleteEntityById', true);
            if (rs.isValid('DeleteEntityById')) {
                //console.log(res.result);
            } else {
                rs.showErrorToast('DeleteEntity');
            }
            loading.value = false;
        });
}

onMounted(() => {
    FetchEntities();
    FetchOrganizations();
    FetchDistrictName();

});
</script>
<style scoped>
.flex-column {
    display: flex;
    flex-direction: column;
}

.gap-2 {
    gap: 2rem;
    /* Adjust the gap as needed */
}

.form-row {
    margin-bottom: 1rem;
    /* Adjust the margin as needed */
}
</style>