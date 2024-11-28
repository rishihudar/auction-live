<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">District Master</h2>
            </div>
            <div class="ph-action">
                <Button @click="changeFlag(1)" class="btn btn-primary btn-add">
                    <fa-plus></fa-plus>
                    Add Entry
                </Button>
            </div>
        </div>
        <template v-if="flag==0">
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
                <DataTable 
                    responsiveLayout="scroll"
                    v-model:filters="filters"
                    :value="district" 
                    paginator 
                    :rows="10" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"
                    showGridlines
                    dataKey="id"
                    :loading="loading" 
                    :globalFilterFields="['stateId', 'districtName']"
                >
                    <template #empty>
                        <div class="box-watermark">
                            No District found.
                        </div>
                    </template>
                    <template #loading>Loading District data. Please wait...</template>
                    
                    <Column field="districtName" header="District Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.districtName }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="District Name" />
                        </template>
                    </Column>
                
                    <Column header="Actions">
                        <template #body="{ data }">
                            <Button @click="handleEditClick(data)" severity="secondary" class="btn-sm">
                                <fa-pen-to-square></fa-pen-to-square>Edit
                            </Button>
                            <!-- <span class="p-buttonset">
                                <Button  @click="deleteData(data), reloadPage()" label="Delete" icon="pi pi-trash" />
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
                            <label class="fm-label" for="selectState">Select State</label>
                            <div class="fm-inner">
                                <Dropdown v-model="districtData.stateId" option-value="stateId" :options="state" optionLabel="stateName" placeholder="Select a State" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="districtName">District Name</label>
                            <div class="fm-inner">
                                <InputText id="districtName" v-model="districtData.districtName" />
                            </div>
                            <div class="fm-info">Enter District name E.g Nandurbar</div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button @click="submitForm(districtData), changeFlag(0), reloadPage()" label="Submit"></Button>
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
                            <label class="fm-label" for="selectState">Select State</label>
                            <div class="fm-inner">
                                <Dropdown v-model="districtData.stateId"  option-value="stateId" :options="state" optionLabel="stateName" placeholder="Select a State" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="districtName">District Name</label>
                            <div class="fm-inner">
                                <InputText id="districtName" v-model="districtData.districtName" />
                            </div>
                            <div class="fm-info">Enter District name E.g Nandurbar</div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button @click="updateData(districtData), changeFlag(0), reloadPage()" label="Submit"></Button>
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
import ScrollTop from 'primevue/scrolltop';
import ScrollPanel from 'primevue/scrollpanel';
import { useToast } from 'primevue/usetoast';
import Dropdown from 'primevue/dropdown';

import faPlus from "../../../assets/icons/plus.svg";
import faPenToSquare from "../../../assets/icons/pen-to-square.svg";


// export default {
//     components: {
//         DataTable,
//         Column,
//         Button,
//         ScrollTop,
//         ScrollPanel,
//         InputText,
//         Dropdown,
    
//     },
//     setup() {
        //const selectedState = ref();
        const state = ref([]);
        const district = ref([]);
        const loading = ref(true);
        const toast = useToast();
        var flag = ref(0);

        const filters = ref({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            stateId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            districtName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

        });

        const districtData = ref({
                stateId: '',
                districtName: '',
            });


      function handleEditClick(rowData) {
                districtData.value = {...rowData}
                // Switch to the edit mode
                changeFlag(2);
                }

        function updateData(districtData){
                // Perform form Edit logic here
                new MQL()
                    .useCoreServer()
                    .setActivity('o.[UpdateDistrictById]')
                    .setData({stateId: districtData.stateId, districtName: districtData.districtName, districtId: districtData.districtId})
                    .fetch()
                    .then((rs) => {
                    let res = rs.getActivity('UpdateDistrictById', true);
                    if (rs.isValid('UpdateDistrictById')) {
                        // Show success toast
                        showSuccess 
                        //showToastSuccess('Form Submitted Successfully.', res.result);
                    } else {
                        // Show error toast
                        showError
                        //rs.showErrorToast('InsertCoInsertDistrictuntry');
                    }
                    loading.value = false; // Move loading to here
                    })
                }


      const submitForm = (districtData) => {

        // Check for null values in countryData
        if (districtData.districtName=="") {
            showError()
            //showToastError('Form contains null values.');
            return;
        }else{
        
        // Perform form submission logic here
        new MQL()
            .useCoreServer()
            .setActivity('o.[InsertDistrict]')
            .setData({stateId: districtData.stateId, districtName: districtData.districtName})
            .fetch()
            .then((rs) => {
            let res = rs.getActivity('InsertDistrict', true);
            if (rs.isValid('InsertDistrict')) {
                // Show success toast
                rs.showSuccess("data submmitted")
                //showToastSuccess('Form Submitted Successfully.', res.result);
            } else {
                // Show error toast
                showError()
                //rs.showErrorToast('InsertCoInsertDistrictuntry');
            }
            loading.value = false; // Move loading to here
            })

            .catch((error) => {
            console.error('Error submitting form:', error);
            showError
           // showToastError('An error occurred during form submission.');
            loading.value = false;
            });
        }
            };


        function getData() {
            new MQL()
                .useCoreServer()
                .setActivity('o.[FetchAllDistrict]')
                .setData()
                .fetch()
                .then((rs) => {
                    let res = rs.getActivity('FetchAllDistrict', true);
                    if (rs.isValid('FetchAllDistrict')) {
                        //showToastSuccess("Fetch district data", res.result)
                        showSuccess
                        district.value = res.result;
                    } else {
                        showError
                       // rs.showErrorToast('FetchAllDistrict');
                    }
                    loading.value = false; // Move loading to here
                });
        }


        function deleteData(rowData) {
           // countryData.value = {...rowData}
            new MQL()
                .useCoreServer()
                .setActivity('o.[DeleteDistrictById]')
                .setData(rowData)
                .fetch()
                .then((rs) => {
                    let res = rs.getActivity('DeleteDistrictById', true);
                    if (rs.isValid('DeleteDistrictById')) {
                        showSuccess
                        
                    } else {
                        showError
                       // rs.showErrorToast('FetchAllCountries');
                    }
                    loading.value = false; // Move loading to here
                });
        }

        function getStateData() {
            new MQL()
                .useCoreServer()
                .setActivity('o.[FetchAllState]')
                .setData()
                .fetch()
                .then((rs) => {
                    let res = rs.getActivity('FetchAllState', true);
                    if (rs.isValid('FetchAllState')) {
                        //showToastSuccess("Fetch state data", res.result)
                        showSuccess
                        state.value = res.result;
                    } else {
                        showError
                        //rs.showErrorToast('FetchAllState');
                    }
                    loading.value = false; // Move loading to here
                });
        }
        function changeFlag(newValue){
            flag.value = newValue
            ref(flag)
        }

        function reloadPage() {
        window.location.reload();
        }

        const hasNullValues = (data) => {
        for (const key in data) {
            if (data[key] === null || data[key] === undefined) {
            return true;
            }
        }
        return false;
        };

    //     const showToastSuccess = (message) => {
    //     showToast({ severity: 'success', summary: 'Success', detail: message });
    //     };

    //     const showToastError = (message) => {
    //     showToast({ severity: 'error', summary: 'Error', detail: message });
    //     };

    //     const showToast = (options) => {
    //    // const toast = this.$refs.toast;
    //     if (toast) {
    //         toast.add(options);
    //     }
    //     };
        
        const showSuccess = () => {
                toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
            };

        const showInfo = () => {
                toast.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', life: 3000 });
            };

        const showWarn = () => {
                toast.add({ severity: 'warn', summary: 'Warn Message', detail: 'Message Content', life: 3000 });
            };

        const showError = () => {
                toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
            };


        onMounted(() => {
            getData();
            getStateData();
        });

//         return {
//             district,
//             state,
//             //selectedState,
//             loading,
//             filters,
//             districtData,
//             flag,
//             toast,
//             changeFlag,
//             reloadPage,
//             handleEditClick,
//             // showToastSuccess,
//             // showToastError,
//             // showToast,
//             showSuccess,
//             showInfo,
//             showWarn,
//             showError,
//             updateData,
//             submitForm,
//             deleteData
//         };
//     },
// };
</script>

<!-- <style scoped>
  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .gap-2 {
    gap: 2rem; /* Adjust the gap as needed */
  }

  .form-row {
    margin-bottom: 1rem; /* Adjust the margin as needed */
  }
</style> -->
