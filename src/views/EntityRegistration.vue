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


                        <label for="organization">Select Organization</label>
                        <Dropdown v-model="entityData.organizationId" optionValue="organizationId"
                            :options="organization" optionLabel="organizationName" placeholder="Select a Organization"
                            class="w-full md:w-14rem" @change="fetchEntityTypesByOrganization" />
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">

                        <!-- Bind the selected country to entityData.fklENtityTypeId -->
                        <label for="entityName">Entity Type</label>
                        <Dropdown v-model="entityData.entityTypeId" optionValue="entityTypeId" :options="entitytype"
                            optionLabel="entityTypeName" placeholder="Select a Entity Type" class="w-full md:w-14rem" />
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="entityName">Entity Name</label>
                        <InputText id="entityName" v-model="entityData.entityName" />
                        <small id="username-help">Enter Entity Name E.g UttarPradesh</small>
                    </div>
                </div>
            </div>

            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="entityShortName">Entity Short Name</label>
                        <InputText id="entityShortName" v-model="entityData.entityShortName" />
                        <small id="username-help">Enter Entity Short Name E.g MCF</small>

                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="entityAddress">Entity Address</label>
                        <InputText id="entityAddress" v-model="entityData.entityAddress" />
                        <small id="username-help">Enter Entity Address E.g MCF</small>
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="entityContactNumber">Entity Contact Number</label>
                        <InputText id="entityContactNumber" v-model="entityData.entityContactNumber" />
                        <small id="username-help">Enter Entity Contact Number E.g 6398302275</small>
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <Toast />
                        <ConfirmDialog></ConfirmDialog>
                        <div class="card flex flex-wrap gap-2 justify-content-center">
                            <Button @click="confirmADD(entityData)" icon="pi pi-check" label="Submit"></Button>
                            <Button @click="changeFlag(0), reloadPage()" icon="pi pi-times" label="Cancel"
                                severity="danger"></Button>
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
                        <label for="organizationName">Select Organization</label>

                        <Dropdown v-model="entityData.organizationId" optionValue="organizationId"
                            :options="organization" optionLabel="organizationName" placeholder="Select a Organization"
                            class="w-full md:w-14rem" @change="fetchEntityTypesByOrganization" />
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="entityName"> Select Entity Type</label>
                        <!-- Bind the selected entitytype to entityData.entityTypeId -->
                        <Dropdown v-model="entityData.entityTypeId" optionValue="entityTypeId" :options="entitytype"
                            optionLabel="entityTypeName" placeholder="Select a Entity Type" class="w-full md:w-14rem" />
                    </div>
                </div>

                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="entityName">Entity Name</label>
                        <InputText id="entityName" v-model="entityData.entityName" />
                        <small id="username-help">Enter Entity Name E.g UttarPradesh</small>
                    </div>
                </div>
            </div>
            <div class="w-1/2">
                <label for="entityShortName">Entity Short Name</label>
                <InputText id="entityShortName" v-model="entityData.entityShortName" />
                <small id="username-help">Enter Entity Short Name E.g MCF</small>
            </div>

            <div class="w-1/2">
                <label for="entityAddress">Entity Address</label>
                <InputText id="entityAddress" v-model="entityData.entityAddress" />
                <small id="username-help">Enter Entity Address E.g MCF</small>
            </div>

            <div class="w-1/2">
                <label for="entityContactNumber">Entity Contact Number</label>
                <InputText id="entityContactNumber" v-model="entityData.entityContactNumber" />
                <small id="username-help">Enter Entity Contact Number E.g 6398302275</small>
            </div>

            <div class="w-1/2">
                <label for="roundRule">Entity Round Rule</label>
                <InputText id="roundRule" v-model="entityData.roundRule" />
                <small id="username-help">Enter Entity Round Rule E.g 1</small>
            </div>
            <div class="w-1/2">
                <label for="eventProFees">Entity Event Processing Fees</label>
                <InputText id="eventProFees" v-model="entityData.eventProcessingFees" />
                <small id="username-help">Enter Entity Event Processing Fees E.g 1000</small>
            </div>
            <div class="w-1/2">
                <label for="emiPayPercent">Entity EMI Payment Percentage</label>
                <InputText id="emiPayPercent" v-model="entityData.emiPaymentPercentage" />
                <small id="username-help">Enter Entity Event Processing Fees E.g 34 </small>
            </div>
            <div class="w-1/2">
                <label for="entityParent">Entity Parent</label>
                <div class="card flex justify-content-center">
                    {{ entityData.isParent }}
                    <Checkbox v-model="entityData.isParent" :binary="true" />
                </div>
                <small id="username-help">Enter Entity Parent E.g Yes or NO </small>
            </div>
            <Toast />
            <ConfirmDialog></ConfirmDialog>
            <div class="w-1/2">
                <div class="fm-group">
                    <Button @click="confirmEdit(entityData)" type="submit"
                        class="p-button p-button-primary">Submit</Button>
                    <Button @click="changeFlag(0), reloadPage()" icon="pi pi-times" label="Cancel"
                        severity="danger"></Button>
                </div>

            </div>

        </template>

    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
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
const confirm = useConfirm();
const toast = useToast();
const entities = ref([]);
const loading = ref(true);
var flag = ref(0);

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
    isParent: false


});
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
    console.log("getting from change function", flag)
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
                console.log(res.result);
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
                console.log("result@@@@", res.result)
                organization.value = res.result
                organizationId.value = res.result[0].organizationId;
                console.log("organizationId", organizationId.value)

            } else {
                rs.showErrorToast("FetchOrganizationDetails")
            }
        })

}
function FetchEntityTypeByOrganization(organizationId) {
    console.log("OrganizationData", organizationId.value)
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchEntityTypeByOrganizationId]')
        .setData({ organizationId: organizationId.value })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchEntityTypeByOrganizationId', true);
            if (rs.isValid('FetchEntityTypeByOrganizationId')) {
                console.log(res.result);
                entitytype.value = res.result;

            } else {
                rs.showErrorToast('FetchEntityTypeByOrganizationId');
            }
            loading.value = false; // Move loading to here
        });
}
const fetchEntityTypesByOrganization = () => {
    FetchEntityTypeByOrganization(organizationId);
};

function insertEntity(entityData) {
    new MQL()
        .useCoreServer()
        .setActivity('o.[InsertEntity]')
        .setData(entityData)
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('InsertEntity', true);
            if (rs.isValid('InsertEntity')) {
                console.log(res.result);
                console.log("entityData from Insert", entityData);

            } else {
                rs.showErrorToast('InsertState');
            }
            loading.value = false;
        });
}
function updateEntity(entityData) {
    // new MQL()
    //     .useCoreServer()
    //     .setActivity('o.[UpdateEntityById]')
    //     .setData(entityData)
    //     .fetch()
    //     .then((rs) => {
    //         let res = rs.getActivity('UpdateEntityById', true);
    //         if (rs.isValid('UpdateEntityById')) {
    //             console.log(res.result);
    //             console.log("entityData update", entityData);
    //             // Optionally, you can reload the page or update the state list after insertion

    //         } else {
    //             rs.showErrorToast('UpdateEntityById');
    //         }
    //         loading.value = false;
    //     });

    new MQL()
        .useCoreServer()
        .setActivity('o.[UpdateEntityById]')
        .setData(entityData)
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('UpdateEntityById', true);
            if (rs.isValid('UpdateEntityById')) {
                console.log(res.result);
            } else {
                rs.showErrorToast('UpdateEntityById');
            }
            loading.value = false;
        });

}
function reloadPage() {
    window.location.reload();
    console.log("we are reloading page")
}


function editEntity(entity) {
    console.log("Before edit: ", entity);

    // Set entityData to the values of the selected state
    entityData.value = {
        ...entity,
        entityTypeId: parseInt(entity.entityTypeId),
        // isParent: data.isParent == 'Yes' ? true : false

    };
    entityData.value = { ...entityData.value, isParent: entityData.value.isParent == 'Yes' ? true : false };



    console.log("After edit: ", entityData);

    // Update the flag to indicate edit mode
    changeFlag(2);
}


const confirmEdit = (entityData) => {
    confirm.require({
        message: 'Are you sure you want to edit Entity?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // entityData.value = { ...entity };
            // entityData.value = { ...entityData.value, isParent: entityData.value.isParent == 'Yes' ? true : false };
            updateEntity(entityData), changeFlag(0), reloadPage()
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const confirmADD = (entityData) => {
    confirm.require({
        message: 'Are you sure you want to add Entity?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            insertEntity(entityData), changeFlag(0), reloadPage()
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
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
                console.log(res.result);
            } else {
                rs.showErrorToast('DeleteEntity');
            }
            loading.value = false;
        });
}

onMounted(() => {
    FetchEntities();
    //  FetchEntityTypeByOrganization(organizationId);
    FetchOrganizations();

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