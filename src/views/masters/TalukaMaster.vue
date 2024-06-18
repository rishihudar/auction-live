<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Taluka Master</h2>
            </div>
            <div class="ph-action">
                <Button @click="changeFlag(1)" class="btn btn-primary btn-add">
                    <fa-plus></fa-plus>
                    Add Entry
                </Button>
            </div>
        </div>
        <template v-if="flag === 0">
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
                <DataTable responsiveLayout="scroll" v-model:filters="filters" :value="taluka" paginator :rows="10" dataKey="id" :loading="loading" :globalFilterFields="['talukaName',]">
                    <!-- <template #empty>No talukas found.</template> -->
                    <template #loading>Loading taluka data. Please wait...</template>

                    <Column field="talukaName" header="Taluka Name">
                        <template #body="{ data }">
                            {{ data.talukaName }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Search by name" />
                        </template>
                    </Column>

                    <Column header="Actions">
                        <template #body="{ data }">
                            <Button @click="editTaluka(data), changeFlag(2)" severity="secondary" class="btn-sm">
                                <fa-pen-to-square></fa-pen-to-square>Edit
                            </Button>
                            <!-- <span class="p-buttonset">
                                <Button label="Delete" @click="deleteTaluka(data),reloadPage()" icon="pi pi-trash" />
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
        <template v-else-if="flag === 1">
            <!-- *************Add Data**************** -->
            <div class="card">
                <div class="card-header">
                    <div class="ch-title">Add Entry</div>
                </div>
                <div class="form-grid">
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="districtName">District Name</label>
                            <div class="fm-inner">
                                <!-- Bind the selected district to talukaData.fklDistrictId -->
                                <Dropdown v-model="talukaData.districtId" optionValue="districtId" :options="districts" optionLabel="districtName" placeholder="Select District Name" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="talukaName">Taluka Name</label>
                            <div class="fm-inner">
                                <!-- Bind the state name to talukaData.vsStateName -->
                                <InputText id="talukaName" v-model="talukaData.talukaName" />
                            </div>
                            <div id="talukaName-help" class="fm-info">Enter Taluka Name (e.g., Nandurbar)</div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button @click="insertTaluka(talukaData), changeFlag(0), reloadPage()" label="Submit"></Button>
                        <Button @click="changeFlag(0), reloadPage()" severity="danger" label="Cancel"></Button>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="flag === 2">
            <!-- *************Edit Data************ -->
            <div class="card">
                <div class="card-header">
                    <div class="ch-title">Add Entry</div>
                </div>
                <div class="form-grid">
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="districtName">District Name</label>
                            <div class="fm-inner">
                                <!-- Bind the selected district to talukaData.fklDistrictId -->
                                <Dropdown v-model="talukaData.districtId" optionValue="districtId" :options="districts" optionLabel="districtName" placeholder="Select District Name" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="talukaName">taluka Name</label>
                            <div class="fm-inner">
                                <InputText id="talukaName" v-model="talukaData.talukaName" />
                            </div>
                            <div id="talukaName-help" class="fm-info">Enter Taluka name E.g Nandurbar</div>
                        </div>
                    </div>
                    <!-- <div>
                        <h1>{{ talukaData }}</h1>
                    </div> -->
                    <div class="fm-action">
                        <Button @click=" updateTaluka(talukaData), changeFlag(0), reloadPage()" label="Submit"></Button>
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
import Dropdown from 'primevue/dropdown';

import faPlus from "../../../assets/icons/plus.svg";
import faPenToSquare from "../../../assets/icons/pen-to-square.svg";

const loading = ref(true);
var flag = ref(0);

const talukaData = ref({
    talukaName: '',
    districtId: '',
});
const districts = ref([]);
const taluka = ref([]);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    talukaName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

function changeFlag(newValue) {
    flag.value = newValue
    ref(flag)
    console.log("getting from change function", flag)
}

function FetchDistrictName() {
    new MQL()
        .setActivity('o.[FetchAllDistrict]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllDistrict', true);
            if (rs.isValid('FetchAllDistrict')) {
                console.log(res.result);
                districts.value = res.result;

            } else {
                rs.showErrorToast('FetchAllDistrict');
            }
            loading.value = false; // Move loading to here
        });
}
function FetchTalukaName() {
    new MQL()
        .setActivity('o.[FetchAllTaluka]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllTaluka', true);
            if (rs.isValid('FetchAllTaluka')) {
                console.log(res.result);
                taluka.value = res.result;

            } else {
                rs.showErrorToast('FetchAllTaluka');
            }
            loading.value = false; // Move loading to here
        });
}
function insertTaluka(talukaData) {
    if (talukaData.talukaName == "") {
        console.log("Please provide all Details")

    } else {
        new MQL()
            .setActivity('o.[InsertTaluka]')
            .setData(talukaData)
            .fetch()
            .then((rs) => {
                let res = rs.getActivity('InsertTaluka', true);
                if (rs.isValid('InsertTaluka')) {
                    console.log(res.result);
                    console.log("talukaData from Insert", talukaData);
                    // Optionally, you can reload the page or update the state list after insertion
                    // FetchTalukaName()
                } else {
                    rs.showErrorToast('InsertTaluka');
                }
                loading.value = false;
            });
    }
}
function updateTaluka(talukaData) {
    new MQL()
        .setActivity('o.[UpdateTalukaById]')
        .setData(talukaData)
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('UpdateTalukaById', true);
            if (rs.isValid('UpdateTalukaById')) {
                console.log(res.result);
                console.log("stateData update", talukaData);

            } else {
                rs.showErrorToast('UpdateTalukaById');
            }
            loading.value = false;
        });
}
function reloadPage() {
    window.location.reload();
    console.log("we are reloading page")
}
function editTaluka(taluka) {
    // Set talukaData to the values of the selected taluka
    talukaData.value = { ...taluka };
    console.log("from edit function", talukaData)
    // Update the flag to indicate edit mode
    changeFlag(2);
}
function deleteTaluka(data) {
    new MQL()
        .setActivity('o.[DeleteTalukaById]')
        .setData(data)
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('DeleteTalukaById', true);
            if (rs.isValid('DeleteTalukaById')) {
                console.log(res.result);
            } else {
                rs.showErrorToast('DeleteTalukaById');
            }
            loading.value = false;
        });
}

onMounted(() => {
    FetchTalukaName();
    FetchDistrictName();

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
