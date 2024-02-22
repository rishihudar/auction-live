<template>
    <div>
        <template v-if="flag === 0">
            <div class="card">
                <DataTable responsiveLayout="scroll" v-model:filters="filters" :value="states" paginator :rows="10"
                    dataKey="id" filterDisplay="row" :loading="loading"
                    :globalFilterFields="['stateName', 'stateCode', 'isUnionTerritories']">
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
                    <template #empty>No states found.</template>
                    <template #loading>Loading state data. Please wait.</template>
                    <Column field="stateName" header="State Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.stateName }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Search by state name" />
                        </template>
                    </Column>
                    <Column field="stateCode" header="State Code" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.stateCode }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Search by  state code" />
                        </template>
                    </Column>
                    <Column field="isUnionTerritories" header="UnionTerritories" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.isUnionTerritories }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Search by Yes or No" />
                        </template>
                    </Column>
                    <Column header="Actions" style="min-width:12rem">

                        <template #body="{ data }">

                            <span class="p-buttonset">
                                <Button label="Edit" @click="editState(data), changeFlag(2)" icon="pi pi-trash" />
                            </span>
                            <!-- <span class="p-buttonset">
                                <Button label="Delete" @click="deleteState(data),reloadPage()" icon="pi pi-trash" />
                            </span> -->

                        </template>
                    </Column>
                </DataTable>
            </div>
        </template>
        <template v-else-if="flag === 1">
            <div class="fm-row">
                <div class="w-1/4">

                    <div class="fm-group">
                        <label for="countryName">Country Name</label>
                        <!-- Bind the selected country to stateData.fklCountryId -->
                        <Dropdown v-model="stateData.countryId" optionValue="countryId" editable :options="countries"
                            optionLabel="countryName" placeholder="Select a Country" class="w-full md:w-14rem" />
                    </div>
                </div>


                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="stateName">State Name</label>
                        <!-- Bind the state name to stateData.vsStateName -->
                        <InputText id="stateName" v-model="stateData.stateName" />
                        <small id="stateName-help">Enter State name (e.g., Uttar Pradesh)</small>
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="stateCode">State Code</label>
                        <!-- Bind the state code to stateData.vsStateCode -->
                        <InputText id="stateCode" v-model="stateData.stateCode" />
                        <small id="stateCode-help">Enter State Code (e.g., AN)</small>
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="unionTerritories">Union Territories</label>
                        <!-- Directly include the Checkbox component in the template -->
                        <div class="card flex justify-content-center">
                            <Checkbox v-model="stateData.isUnionTerritories" :binary="true" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <Button @click="insertState(stateData), changeFlag(0), reloadPage()" icon="pi pi-check"
                            label="Submit"></Button>
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <Button @click="changeFlag(0), reloadPage()" icon="pi pi-check" label="Cancel"></Button>
                    </div>
                </div>
            </div>
        </template>

        <template v-else-if="flag === 2">
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="countryName">Country Name</label>
                        <!-- Bind the selected country to stateData.fklCountryId -->
                        <Dropdown v-model="stateData.countryId" optionValue="countryId" :options="countries"
                            optionLabel="countryName" placeholder="Select a City" class="w-full md:w-14rem" />
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="stateName">State Name</label>
                        <InputText id="stateName" v-model="stateData.stateName" />
                        <small id="username-help">Enter State name E.g UttarPradesh</small>
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="stateCode">State Code</label>
                        <InputText id="stateCode" v-model="stateData.stateCode" />
                        <small id="username-help">Enter State Code E.g 91</small>
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="unionTerritories">Union Territories</label>
                        <!-- Directly include the Checkbox component in the template -->
                        <div class="card flex justify-content-center">
                            <Checkbox v-model="stateData.isUnionTerritories" :binary="true" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div>
                <h1>{{ stateData }}</h1>
            </div> -->
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <Button @click=" updateState(stateData), changeFlag(0), reloadPage()" icon="pi pi-check"
                            label="Submit"></Button>
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <Button @click="changeFlag(0), reloadPage()" icon="pi pi-check" label="Cancel"></Button>
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
    console.log("getting from change function", flag)
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
                console.log(res.result);
                //states.value = res.result;
                states.value = res.result.map(state => ({
                    ...state,
                    isUnionTerritories: state.isUnionTerritories == 1 ? 'Yes' : 'No'
                }));
            } else {
                rs.showErrorToast('ErrorFetchAllState');
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
                console.log(res.result);
                countries.value = res.result;

            } else {
                rs.showErrorToast('ErrorFetchAllCountries');
            }
            loading.value = false; // Move loading to here
        });
}
function insertState(stateData) {
    if (stateData.stateName == "") {
        console.log("Please provide all Details")

    } else {


        new MQL()
            .useCoreServer()
            .setActivity('o.[InsertState]')
            .setData(stateData)
            .fetch()
            .then((rs) => {
                let res = rs.getActivity('InsertState', true);
                if (rs.isValid('InsertState')) {
                    console.log(res.result);
                    console.log("stateData from Insert", stateData);
                } else {
                    rs.showErrorToast('ErrorInsertState');
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
                console.log(res.result);
                console.log("stateData update", stateData);
                // Optionally, you can reload the page or update the state list after insertion

            } else {
                rs.showErrorToast('ErrorUpdateState');
            }
            loading.value = false;
        });
}
function reloadPage() {
    window.location.reload();
    console.log("we are reloading page")
}
function editState(state) {
    // Set stateData to the values of the selected state
    stateData.value = { ...state };
    stateData.value = { ...stateData.value, isUnionTerritories: stateData.value.isUnionTerritories == 'Yes' ? true : false };


    console.log("from edit function", stateData)
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
                console.log(res.result);
            } else {
                rs.showErrorToast('ErrorDeleteState');
            }
            loading.value = false;
        });
}


onMounted(() => {
    FetchStateName();
    FetchCountryName();

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