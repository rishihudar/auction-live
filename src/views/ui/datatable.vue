<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">UI Datatable</h2>
            </div>
        </div>
        <!-- Sample Master Cards-->
        <div class="w-full px-5 py-5 rounded-xl mb-5 bg-white shadow">
            <div class="fm-row">
                <div class="w-1/3">
                    <div class="fm-group">
                        <label for="countryName">Country Name</label>
                        <InputText id="countryName"  />
                        <div class="p-info">Enter Country name E.g India</div>
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="fm-group" > 
                        <label for="countryCode">Country Code</label>
                        <InputText id="countryCode" />
                        <div class="p-info">Enter Country Code E.g 91</div>
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="fm-group" > 
                        <label for="countryShortName">Country Short Name</label>
                        <InputText id="countryShortName" />
                        <div class="p-info">Enter Country Shortname E.g IN</div>
                    </div>
                </div>
            </div>
            <div class="form-row">
            
            </div>

            <div class="form-row">
            
            </div>

            <div class="form-row">
            
            </div>

            <div class="form-row">
            <label for="telephoneCode">Country Telephone Code</label>
            <InputText id="telephoneCode" />
            <small id="username-help">Enter Country Telephone code E.g +91</small>
            </div>

            <div class="form-row">
            <label for="nationality">Nationality</label>
            <InputText id="nationality"  />
            <small id="username-help">Enter Nationality E.g Indian</small>
            </div>

            <!-- <Button @click="submitForm(countryData), changeFlag(0), reloadPage()" icon="pi pi-check" label="Submit"></Button>
            <Button @click="changeFlag(0), reloadPage()" icon="pi pi-check" label="Cancel"></Button> -->

        </div>

        <!-- Sample Master tables-->
        <div class="table-custom">
            <DataTable class="p-table-customized" :value="customers" :filters="filters" sortMode="multiple" paginator paginatorPosition="bottom" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" >
                <!-- <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">Manage Products</h4>
                    </div>
                </template> -->
                <template #header>
                    <!-- <FormKit
                        v-model="filters['global'].value"
                        type="text"
                        name="search"
                        placeholder="Search..."
                        outer-class="$reset fk-group-inline"
                    /> -->
                    <div class="searchbar-wrapper">
                        <div class="fm-group fm-group-table">
                            <div class="fm-inner">
                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M384 208A176 176 0 1 0 32 208a176 176 0 1 0 352 0zM343.3 366C307 397.2 259.7 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 51.7-18.8 99-50 135.3L507.3 484.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L343.3 366z"/></svg>
                            </div>
                        </div>
                        <Button type="submit">Insert</Button
                        >
                    </div>
                    
                </template>
                <Column field="name" header="Name" sortable></Column>
                <Column field="country.name" header="Country" sortable></Column>
                <Column field="company" header="Company" sortable></Column>
                <Column field="representative.name" header="Representative" sortable></Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { CustomerService } from '@/store/CustomerService'
import Button from 'primevue/button';

const customers = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

onMounted(() => {
    CustomerService.getCustomersMedium().then((data) => (customers.value = data));
});
</script>
