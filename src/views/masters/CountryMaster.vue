<template>
    <div>
        <template v-if="flag===0">
            <div class="card">
                <DataTable 
                responsiveLayout="scroll" 
                v-model:filters="filters" 
                :value="country" 
                paginator 
                :rows="10" 
                :rowsPerPageOptions="[5, 10, 20, 50]"
                showGridlines
                dataKey="id"
                filterDisplay="row" 
                :loading="loading" 
                :globalFilterFields="['countryId', 'countryName', 'countryCode', 'countryShortName', 'countryTelephoneCode', 'nationality']">

                    <template #header>
                        <div class="flex justify-content-between">

                            <div class="mr-auto">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                                </span>
                            </div>

                            <div class="flex flex-wrap align-items-center justify-content-center">
                                <span class="flex align-items-center">
                                    <h1 class="mr-2">COUNTRY MASTER</h1>
                                </span>
                            </div>
                            
                            <div class="ml-auto">
                                <span class="p-buttonset">
                                    <Button @click="changeFlag(1)" label="Add" icon="pi pi-trash" />
                                </span>
                            </div>
                        </div>
                    </template>

                    <template #empty>No country found.</template>

                    <template #loading>Loading country data. Please wait.</template>
                    
                    <Column field="countryName" header="Country Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.countryName }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Country Name" />
                        </template>
                    </Column>
                    <Column field="countryShortName" header="Country Short Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.countryShortName }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Short Name" />
                        </template>
                    </Column>
                    <Column field="countryTelephoneCode" header="Country Telephone Code" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.countryTelephoneCode }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="Telephone Code" />
                        </template>
                    </Column>
                    <Column field="nationality" header="nationality" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.nationality }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                placeholder="nationality" />
                        </template>
                    </Column>
                    <Column header="Actions" style="min-width:12rem">

                        <template #body="{ data }">

                            <span class="p-buttonset">
                                <Button @click="handleEditClick(data)" label="Edit" icon="pi pi-trash" />
                            </span>

                            <!-- <span class="p-buttonset">
                                <Button  @click="deleteData(data), reloadPage()" label="Delete" icon="pi pi-trash" />
                            </span> -->

                        </template>
                    </Column>
                </DataTable>
            </div>
        </template>
        <template v-else-if="flag === 1">
        <div class="flex flex-column gap-2 box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
            <div class="fm-row">
                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="countryName">Country Name</label>
                        <InputText id="countryName" v-model="countryData.countryName" />
                        <small id="username-help">Enter Country name E.g India</small>
                    </div>
                </div>
                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="countryCode">Country Code</label>
                        <InputText id="countryCode" v-model="countryData.countryCode" />
                        <small id="username-help">Enter Country Code E.g 91</small>
                    </div>
                </div>
            </div>

            <div class="fm-row">
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="countryShortName">Country Short Name</label>
                        <InputText id="countryShortName" v-model="countryData.countryShortName" />
                        <small id="username-help">Enter Country Shortname E.g IN</small>
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="telephoneCode">Country Telephone Code</label>
                        <InputText id="telephoneCode" v-model="countryData.countryTelephoneCode" />
                        <small id="username-help">Enter Country Telephone code E.g +91</small>
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="nationality">nationality</label>
                        <InputText id="nationality" v-model="countryData.nationality" />
                        <small id="username-help">Enter nationality E.g Indian</small>
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/2">
                    <div class="fm-group">
                        <Button @click="submitForm(countryData), changeFlag(0), reloadPage()" icon="pi pi-check" label="Submit"></Button>
                    </div>
                </div>

                <div class="w-1/2">
                    <div class="fm-group">
                    <Button @click="changeFlag(0), reloadPage()" icon="pi pi-check" label="Cancel"></Button>
                    </div>
                </div>
            </div>
                                
        </div>
        </template>
        <template v-else-if="flag === 2">
        <div class="flex flex-column gap-2 box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
            <div class="fm-row">
                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="countryName">Country Name</label>
                        <InputText id="countryName" v-model="countryData.countryName" />
                        <small id="username-help">Enter Country name E.g India</small>
                    </div>
                </div>
                <div class="w-1/2">
                    <div class="fm-group">
                        <label for="countryCode">Country Code</label>
                        <InputText id="countryCode" v-model="countryData.countryCode" />
                        <small id="username-help">Enter Country Code E.g 91</small>
                    </div>
                </div>
            </div>

            <div class="fm-row">
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="countryShortName">Country Short Name</label>
                        <InputText id="countryShortName" v-model="countryData.countryShortName" />
                        <small id="username-help">Enter Country Shortname E.g IN</small>
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="telephoneCode">Country Telephone Code</label>
                        <InputText id="telephoneCode" v-model="countryData.countryTelephoneCode" />
                        <small id="username-help">Enter Country Telephone code E.g +91</small>
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="nationality">nationality</label>
                        <InputText id="nationality" v-model="countryData.nationality" />
                        <small id="username-help">Enter nationality E.g Indian</small>
                    </div>
                </div>
            </div>
            <div class="fm-row">
                <div class="w-1/2">
                    <div class="fm-group">
                        <Button @click="updateData(countryData), changeFlag(0), reloadPage()" icon="pi pi-check" label="Submit"></Button>
                    </div>
                </div>

                <div class="w-1/2">
                    <div class="fm-group">
                        <Button @click="changeFlag(0), reloadPage()" icon="pi pi-check" label="Cancel"></Button>
                    </div>
                </div>
            </div>
        </div>
        </template>
</div>
</template>
  
<script>
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


export default {
    components: {
        DataTable,
        Column,
        Button,
        ScrollTop,
        ScrollPanel,
        InputText,
        
    },
    setup() {
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

        return {
            country,
            loading,
            filters,
            countryData,
            flag,
            toast,
            showSuccess,
            showInfo,
            showWarn,
            showError,
            changeFlag,
            reloadPage,
            updateData,
            handleEditClick,
            submitForm,
            deleteData
        };
    },
};
</script>

<style scoped>
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
</style>