<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Country Master</h2>
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
                    :value="country" 
                    paginator 
                    :rows="10" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"
                    dataKey="id"
                    :loading="loading" 
                    :globalFilterFields="['countryId', 'countryName', 'countryCode', 'countryShortName', 'countryTelephoneCode', 'nationality']"
                >
                    <template #empty>
                        <div class="box-watermark">
                            No country found.
                        </div>
                    </template>
                    <template #loading>Loading country data. Please wait...</template>
                    
                    <Column field="countryName" header="Country Name">
                        <template #body="{ data }">
                            {{ data.countryName }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Country Name" />
                        </template>
                    </Column>
                    <Column field="countryShortName" header="Country Short Name">
                        <template #body="{ data }">
                            {{ data.countryShortName }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Short Name" />
                        </template>
                    </Column>
                    <Column field="countryTelephoneCode" header="Country Telephone Code">
                        <template #body="{ data }">
                            {{ data.countryTelephoneCode }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Telephone Code" />
                        </template>
                    </Column>
                    <Column field="nationality" header="Nationality">
                        <template #body="{ data }">
                            {{ data.nationality }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="nationality" />
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
            <!-- **********Add Data************** -->
            <div class="card">
                <div class="card-header">
                    <div class="ch-title">Add Entry</div>
                </div>
                <div class="form-grid">
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="countryName">Country Name</label>
                            <div class="fm-inner">
                                <InputText id="countryName" v-model="countryData.countryName" />
                            </div>
                            <div class="fm-info">Enter Country name E.g India</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="countryCode">Country Code</label>
                            <div class="fm-inner">
                                <InputText id="countryCode" v-model="countryData.countryCode" />
                            </div>
                            <div class="fm-info">Enter Country Code E.g 91</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="countryShortName">Country Short Name</label>
                            <div class="fm-inner">
                                <InputText id="countryShortName" v-model="countryData.countryShortName" />
                            </div>
                            <div class="fm-info">Enter Country Shortname E.g IN</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="telephoneCode">Country Telephone Code</label>
                            <div class="fm-inner">
                                <InputText id="telephoneCode" v-model="countryData.countryTelephoneCode" />
                            </div>
                            <div class="fm-info">Enter Country Telephone code E.g +91</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="nationality">nationality</label>
                            <div class="fm-inner">
                                <InputText id="nationality" v-model="countryData.nationality" />
                            </div>
                            <div class="fm-info">Enter nationality E.g Indian</div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button @click="submitForm(countryData), changeFlag(0), reloadPage()" label="Submit"></Button>
                        <Button @click="changeFlag(0), reloadPage()" severity="danger" label="Cancel"></Button>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="flag == 2">
        <div class="flex flex-column gap-2 box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
            <div class="fm-row">
                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="countryName">Country Name</label>
                        <InputText id="countryName" v-model="countryData.countryName" />
                        <small id="username-help">Enter Country name E.g India</small>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="countryCode">Country Code</label>
                            <div class="fm-inner">
                                <InputText id="countryCode" v-model="countryData.countryCode" />
                            </div>
                            <div class="fm-info">Enter Country Code E.g 91</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="countryShortName">Country Short Name</label>
                            <div class="fm-inner">
                                <InputText id="countryShortName" v-model="countryData.countryShortName" />
                            </div>
                            <div class="fm-info">Enter Country Shortname E.g IN</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="telephoneCode">Country Telephone Code</label>
                            <div class="fm-inner">
                                <InputText id="telephoneCode" v-model="countryData.countryTelephoneCode" />
                            </div>
                            <div class="fm-info">Enter Country Telephone code E.g +91</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="nationality">nationality</label>
                            <div class="fm-inner">
                                <InputText id="nationality" v-model="countryData.nationality" />
                            </div>
                            <div class="fm-info">Enter nationality E.g Indian</div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button @click="updateData(countryData), changeFlag(0), reloadPage()" label="Submit"></Button>
                        <Button @click="changeFlag(0), reloadPage()" severity="danger" label="Cancel"></Button>
                    </div>
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
        
//     },
//     setup() {
        const country = ref([]);
        const loading = ref(true);
        const toast = useToast();
        var flag = ref(0)
        const filters = ref({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            nationality: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            countryTelephoneCode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            countryShortName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            countryName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

        });
        const countryData = ref({
        countryName: '',
        countryCode: '',
        countryShortName: '',
        countryTelephoneCode: '',
        nationality: ''
      });

      function handleEditClick(rowData) {
        countryData.value = {...rowData}
        // Switch to the edit mode
        changeFlag(2);
        }

        function updateData(countryData){
                // Perform form Edit logic here
                new MQL()
                    .useCoreServer()
                    .setActivity('o.[UpdateCountryById]')
                    .setData(countryData)
                    .fetch()
                    .then((rs) => {
                    let res = rs.getActivity('UpdateCountryById', true);
                    if (rs.isValid('UpdateCountryById')) {
                        // Show success toast
                        showSuccess
                        //rs.showToastSuccess('Form Submitted Successfully.');
                    } else {
                        // Show error toast
                        showError
                        //rs.showErrorToast('InsertCoInsertDistrictuntry');
                    }
                    loading.value = false; // Move loading to here
                    })
                }


      const submitForm = (countryData) => {
        // Check for null values in countryData

        if (countryData.countryName=="") {
            
            showError
            //showToastError('Form contains null values.');
            return;
        }else{
           
        // Perform form submission logic here
        new MQL()
            .useCoreServer()
            .setActivity('o.[InsertCountry]')
            .setData(countryData)
            .fetch()
            .then((rs) => {
            let res = rs.getActivity('InsertCountry', true);
            if (rs.isValid('InsertCountry')) {
                // Show success toast
                showSuccess
                //showToastSuccess('Form Submitted Successfully.');
            } else {
                // Show error toast
                showError
                //rs.showErrorToast('InsertCountry');
            }
            loading.value = false; // Move loading to here
            })
        
            .catch((error) => {
                showError
            //showToastError('An error occurred during form submission.');
            loading.value = false;
            });

        }
            };


        function getData() {
            new MQL()
                .useCoreServer()
                .setActivity('o.[FetchAllCountries]')
                .setData()
                .fetch()
                .then((rs) => {
                    let res = rs.getActivity('FetchAllCountries', true);
                    if (rs.isValid('FetchAllCountries')) {
                        showSuccess
                        country.value = res.result;
                    } else {
                        showError
                       // rs.showErrorToast('FetchAllCountries');
                    }
                    loading.value = false; // Move loading to here
                });
        }

        function deleteData(rowData) {
           // countryData.value = {...rowData}
            new MQL()
                .useCoreServer()
                .setActivity('o.[DeleteCountryById]')
                .setData(rowData)
                .fetch()
                .then((rs) => {
                    let res = rs.getActivity('DeleteCountryById', true);
                    if (rs.isValid('DeleteCountryById')) {
                        showSuccess
                        
                    } else {
                        showError
                       // rs.showErrorToast('FetchAllCountries');
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

        // const showToastSuccess = (message) => {
        // showToast({ severity: 'success', summary: 'Success', detail: message });
        // };

        // const showToastError = (message) => {
        // showToast({ severity: 'error', summary: 'Error', detail: message });
        // };

        // const showToast = (options) => {
        // const toast = this.$refs.toast;
        // if (toast) {
        //     toast.add(options);
        // }
        // };


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
        });

        // return {
        //     country,
        //     loading,
        //     filters,
        //     countryData,
        //     flag,
        //     toast,
        //     showSuccess,
        //     showInfo,
        //     showWarn,
        //     showError,
        //     changeFlag,
        //     reloadPage,
        //     updateData,
        //     handleEditClick,
        //     submitForm,
        //     deleteData
        // };
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
