<template>
    <div>
        <template v-if="flag === 0">
            <div class="card">
                <DataTable responsiveLayout="scroll" v-model:filters="filters" :value="taluka" paginator :rows="10"
                    dataKey="id" filterDisplay="row" :loading="loading" :globalFilterFields="['talukaName',]">
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
                    <template #empty>No talukas found.</template>
                    <template #loading>Loading taluka data. Please wait.</template>
                    <Column field="talukaName" header="Taluka Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.talukaName }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Search by name" />
                        </template>
                    </Column>


                    <Column header="Actions" style="min-width:12rem">

                        <template #body="{ data }">

                            <span class="p-buttonset">
                                <Button label="Edit" @click="editTaluka(data), changeFlag(2)" icon="pi pi-trash" />
                            </span>
                            <!-- <span class="p-buttonset">
                                <Button label="Delete" @click="deleteTaluka(data),reloadPage()" icon="pi pi-trash" />
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
                        <label for="districtName">District Name</label>
                        <!-- Bind the selected district to talukaData.fklDistrictId -->
                        <Dropdown v-model="talukaData.districtId" optionValue="districtId" :options="districts"
                            optionLabel="districtName" placeholder="Select District Name" class="w-full md:w-14rem" />
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="talukaName">Taluka Name</label>
                        <!-- Bind the state name to talukaData.vsStateName -->
                        <InputText id="talukaName" v-model="talukaData.talukaName" />
                        <small id="talukaName-help">Enter Taluka Name (e.g., Nandurbar)</small>
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <Button @click="insertTaluka(talukaData), changeFlag(0), reloadPage()" icon="pi pi-check"
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
                        <label for="districtName">District Name</label>
                        <!-- Bind the selected district to talukaData.fklDistrictId -->
                        <Dropdown v-model="talukaData.districtId" optionValue="districtId" :options="districts"
                            optionLabel="districtName" placeholder="Select District Name" class="w-full md:w-14rem" />
                    </div>
                </div>
                <div class="w-1/4">
                    <div class="fm-group">
                        <label for="talukaName">taluka Name</label>
                        <InputText id="talukaName" v-model="talukaData.talukaName" />
                        <small id="talukaName-help">Enter Taluka name E.g Nandurbar</small>
                    </div>
                </div>
            </div>
            <!-- <div>
                    <h1>{{ talukaData }}</h1>
                </div> -->
            <div class="fm-row">
                <div class="w-1/4">
                    <div class="fm-group">
                        <Button @click=" updateTaluka(talukaData), changeFlag(0), reloadPage()" icon="pi pi-check"
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
import Dropdown from 'primevue/dropdown';

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
                rs.showErrorToast('ErrorFetchAllDistrict');
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
                rs.showErrorToast('ErrorFetchAllTaluka');
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
                    rs.showErrorToast('ErrorInsertState');
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
                rs.showErrorToast('ErrorUpdateState');
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
                rs.showErrorToast('ErrorUpdateState');
            }
            loading.value = false;
        });
}

onMounted(() => {
    FetchTalukaName();
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