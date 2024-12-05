<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">State Master</h2>
            </div>
            <div class="ph-action">
                <Button @click="changeFlag(1)" class="btn btn-primary btn-add">
                    <fa-plus></fa-plus>
                    Add Entry
                </Button>
            </div>
        </div>
        <template v-if="flag == 0">
            <div class="table-custom">
                <Paginator
                    class="pagination-up"
                    :rows="perPage"
                    :rowsPerPageOptions="[10, 20, 30]"
                    :totalRecords="totalRows"
                    template="RowsPerPageDropdown"
                    @page="handlePageChange"
                >
                    <template #start>
                        <div class="fm-inner">
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                            <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
                        </div>
                    </template>
                </Paginator>
                <DataTable responsiveLayout="scroll" v-model:filters="filters" :value="states" paginator :rows="10"
                    dataKey="id" :loading="loading"
                    :globalFilterFields="['stateName', 'stateCode', 'isUnionTerritories']"
                >
                    <template #empty>
                        <div class="box-watermark">
                            No states found.
                        </div>
                    </template>
                    <template #loading>Loading state data. Please wait...</template>

                    <Column field="stateName" header="State Name">
                        <template #body="{ data }">
                            {{ data.stateName }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Search by state name" />
                        </template>
                    </Column>
                    <Column field="stateCode" header="State Code">
                        <template #body="{ data }">
                            {{ data.stateCode }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Search by  state code" />
                        </template>
                    </Column>
                    <Column field="isUnionTerritories" header="UnionTerritories">
                        <template #body="{ data }">
                            {{ data.isUnionTerritories }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Search by Yes or No" />
                        </template>
                    </Column>
                    <Column header="Actions">
                        <template #body="{ data }">
                            <Button @click="editState(data), changeFlag(2)" severity="secondary" class="btn-sm">
                                <fa-pen-to-square></fa-pen-to-square>Edit
                            </Button>
                            <!-- <span class="p-buttonset">
                                <Button label="Delete" @click="deleteState(data),reloadPage()" icon="pi pi-trash" />
                            </span> -->
                        </template>
                    </Column>
                </DataTable>
                <Paginator
                    class="pagination-down"
                    :rows="perPage"
                    :rowsPerPageOptions="[5, 10, 20]"
                    :totalRecords="totalRows"
                    template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    @page="handlePageChange"
                />
            </div>
        </template>
        <template v-else-if="flag == 1">
            <div class="card">
                <div class="card-header">
                    <div class="ch-title">Add Entry</div>
                </div>
                <div class="form-grid">
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="countryName">Country Name</label>
                            <div class="fm-inner">
                                <!-- Bind the selected country to stateData.fklCountryId -->
                                <Dropdown v-model="stateData.countryId" optionValue="countryId" editable :options="countries" optionLabel="countryName" placeholder="Select a Country" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="stateName">State Name</label>
                            <div class="fm-inner">
                                <!-- Bind the state name to stateData.vsStateName -->
                                <InputText id="stateName" v-model="stateData.stateName" />
                            </div>
                            <div id="stateName-help" class="fm-info">Enter State name (e.g., Uttar Pradesh)</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="stateCode">State Code</label>
                            <div class="fm-inner">
                                <!-- Bind the state code to stateData.vsStateCode -->
                                <InputText id="stateCode" v-model="stateData.stateCode" />
                            </div>
                            <div id="stateCode-help" class="fm-info">Enter State Code (e.g., AN)</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <div class="fm-check-holder">
                                <div class="fm-checkbox">
                                    <!-- Directly include the Checkbox component in the template -->
                                    <Checkbox v-model="stateData.isUnionTerritories" :binary="true" inputId="union" />
                                    <label for="union">Union Territories</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button @click="insertState(stateData), changeFlag(0), reloadPage()" label="Submit"></Button>
                        <Button @click="changeFlag(0), reloadPage()" severity="danger" label="Cancel"></Button>
                    </div>
                </div>
            </div>
        </template>

        <template v-else-if="flag == 2">
            <div class="card">
                <div class="card-header">
                    <div class="ch-title">Edit Entry</div>
                </div>
                <div class="form-grid">
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="countryName">Country Name</label>
                            <div class="fm-inner">
                                <!-- Bind the selected country to stateData.fklCountryId -->
                                <Dropdown v-model="stateData.countryId" optionValue="countryId" :options="countries"
                                    optionLabel="countryName" placeholder="Select a City" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="stateName">State Name</label>
                            <div class="fm-inner">
                                <InputText id="stateName" v-model="stateData.stateName" />
                            </div>
                            <div class="fm-info">Enter State name E.g UttarPradesh</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="stateCode">State Code</label>
                            <div class="fm-inner">
                                <InputText id="stateCode" v-model="stateData.stateCode" />
                            </div>
                            <div class="fm-info">Enter State Code E.g 91</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <div class="fm-check-holder">
                                <div class="fm-checkbox">
                                    <!-- Directly include the Checkbox component in the template -->
                                    <Checkbox v-model="stateData.isUnionTerritories" :binary="true" inputId="editUnion" />
                                    <label for="editUnion">Union Territories</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div>
                        <h1>{{ stateData }}</h1>
                    </div> -->
                    <div class="fm-action">
                        <Button @click=" updateState(stateData), changeFlag(0), reloadPage()" label="Submit"></Button>
                        <Button @click="changeFlag(0), reloadPage()" severity="danger" label="Cancel"></Button>
                    </div>
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

import Checkbox from 'primevue/checkbox';

import Dropdown from 'primevue/dropdown';

import faPlus from "../../../assets/icons/plus.svg";
import faPenToSquare from "../../../assets/icons/pen-to-square.svg";

const states = ref([]);
const loading = ref(true);
var flag = ref(0);

const stateData = ref({
    stateName: '',
    stateCode: '',
    isUnionTerritories: false,
  //  countryId: '',

});

const countries = ref([]);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    stateName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    stateCode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    isUnionTerritories: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

});
function changeFlag(newValue) {
    flag.value = newValue
    ref(flag)
    //console.log("getting from change function", flag)
}

function FetchStateName() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchAllState]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllState', true);
            if (rs.isValid('FetchAllState')) {
                //console.log(res.result);
                //states.value = res.result;
                states.value = res.result.map(state => ({
                    ...state,
                    isUnionTerritories: state.isUnionTerritories == 1 ? 'Yes' : 'No'
                }));
            } else {
                rs.showErrorToast('FetchAllState');
            }
            loading.value = false; // Move loading to here
        });
}
function FetchCountryName() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchAllCountries]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllCountries', true);
            if (rs.isValid('FetchAllCountries')) {
                //console.log(res.result);
                countries.value = res.result;

            } else {
                rs.showErrorToast('FetchAllCountries');
            }
            loading.value = false; // Move loading to here
        });
}
function insertState(stateData) {
    if (stateData.stateName == "") {
        //console.log("Please provide all Details")

    } else {


        new MQL()
            .useCoreServer()
            .setActivity('o.[InsertState]')
            .setData(stateData)
            .fetch()
            .then((rs) => {
                let res = rs.getActivity('InsertState', true);
                if (rs.isValid('InsertState')) {
                    //console.log(res.result);
                    //console.log("stateData from Insert", stateData);
                } else {
                    rs.showErrorToast('InsertState');
                }
                loading.value = false;
            });
    }
}
function updateState(stateData) {
    new MQL()
        .useCoreServer()
        .setActivity('o.[UpdateStateById]')
        .setData(stateData)
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('UpdateStateById', true);
            if (rs.isValid('UpdateStateById')) {
                //console.log(res.result);
                //console.log("stateData update", stateData);
                // Optionally, you can reload the page or update the state list after insertion

            } else {
                rs.showErrorToast('UpdateState');
            }
            loading.value = false;
        });
}
function reloadPage() {
    window.location.reload();
    //console.log("we are reloading page")
}
function editState(state) {
    // Set stateData to the values of the selected state
    stateData.value = { ...state };
    stateData.value = { ...stateData.value, isUnionTerritories: stateData.value.isUnionTerritories == 'Yes' ? true : false };


    //console.log("from edit function", stateData)
    // Update the flag to indicate edit mode
    changeFlag(2);
}
function deleteState(data) {
    new MQL()
        .useCoreServer()
        .setActivity('o.[DeleteStateById]')
        .setData(data)
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('DeleteStateById', true);
            if (rs.isValid('DeleteStateById')) {
                //console.log(res.result);
            } else {
                rs.showErrorToast('DeleteStateById');
            }
            loading.value = false;
        });
}


onMounted(() => {
    FetchStateName();
    FetchCountryName();

});



</script>

<!-- <style scoped>
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
</style> -->
