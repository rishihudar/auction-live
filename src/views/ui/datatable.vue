<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">UI Datatable</h2>
                <Breadcrumb :model="crumbs">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <!-- <span :class="[item.icon, 'text-color']" /> -->
                                <span class="bi-label">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <span v-else v-bind="props.action">
                            <span class="bi-label">{{ item.label }}</span>
                        </span>
                    </template>
                </Breadcrumb>
            </div>
            <div class="ph-action">
                <Transition name="fade-left" mode="out-in">
                    <Button class="btn-add" @click="showCard = true" v-if="!showCard">
                        <fa-plus></fa-plus>
                        Add Entry
                    </Button>
                    <Button severity="secondary" @click="showCard = false" v-else>
                        <fa-table></fa-table>
                        View Table
                    </Button>
                </Transition>
            </div>
        </div>
        <Transition name="fade-up" mode="out-in">
            <!-- Sample Master Cards-->
            <div class="card card-add-entry" v-if="showCard">
                <div class="card-header">
                    <div class="ch-title">Add New Entry</div>
                </div>
                <div class="form-grid">
                    <div class="col-span-full md:col-span-6">
                        <div class="fm-group">
                            <label class="fm-label" for="countryName">Country Name</label>
                            <div class="fm-check-holder fm-check-vertical">
                                <div v-for="category of categories" :key="category.key" class="fm-checkbox">
                                    <Checkbox v-model="selectedCategories" :inputId="category.key" name="category" :value="category.name" />
                                    <label :for="category.key">{{ category.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-full md:col-span-6">
                        <div class="fm-group">
                            <label class="fm-label" for="countryName">Country Name</label>
                            <div class="fm-check-holder">
                                <div v-for="radio in radios" :key="radio.key" class="fm-checkbox">
                                    <RadioButton v-model="selectedRadio" :inputId="radio.key" name="radio" :value="radio.name" />
                                    <label :for="radio.key">{{ radio.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-full md:col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="countryName">Country Name</label>
                            <div class="fm-inner">
                                <InputText id="countryName" />
                            </div>
                            <div class="fm-info">Enter Country name E.g India</div>
                        </div>
                    </div>
                    <div class="col-span-full md:col-span-4">
                        <div class="fm-group"> 
                            <label class="fm-label" for="countryCode">Country Code</label>
                            <div class="fm-inner">
                                <InputText id="countryCode" />
                            </div>
                            <div class="fm-info">Enter Country Code E.g 91</div>
                        </div>
                    </div>
                    <div class="col-span-full md:col-span-4">
                        <div class="fm-group"> 
                            <label class="fm-label" for="countryShortName">Country Short Name</label>
                            <div class="fm-inner">
                                <InputText id="countryShortName" />
                            </div>
                            <div class="fm-info">Enter Country Shortname E.g IN</div>
                        </div>
                    </div>
                    <div class="col-span-full md:col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="telephoneCode">Country Telephone Code</label>
                            <div class="fm-inner">
                                <InputText id="telephoneCode" />
                            </div>
                            <div class="fm-info">Enter Country Telephone code E.g +91</div>
                        </div>
                    </div>
                    <div class="col-span-full md:col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="nationality">Nationality</label>
                            <div class="fm-inner">
                                <InputText id="nationality" />
                            </div>
                            <div class="fm-info">Enter Nationality E.g Indian</div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button label="Submit"></Button>
                        <Button severity="danger" outlined label="Cancel"></Button>
                    </div>
                </div>
            </div>

            <!-- Sample Master tables-->
            <div class="table-custom" v-else>
                <DataTable :value="customers" :filters="filters" sortMode="multiple" paginator paginatorPosition="both" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" >
                    <!-- <template #header>
                        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                            <h4 class="m-0">Manage Products</h4>
                        </div>
                    </template> -->
                    <template #paginatorstart>
                        <div class="fm-inner">
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                            <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
                        </div>
                    </template>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="country.name" header="Country" sortable></Column>
                    <Column field="company" header="Company" sortable></Column>
                    <Column field="representative.name" header="Representative" sortable></Column>
                </DataTable>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { CustomerService } from '@/store/CustomerService'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import faPlus from '../../../assets/icons/plus.svg'
import faTable from '../../../assets/icons/table.svg'
import faMagnifyingGlass from '../../../assets/icons/magnifying-glass.svg'

var showCard = ref(false)
const crumbs = ref([
    { label: 'Home', route: '/home' },
    { label: 'Bidder', route: '/home' },
    { label: 'Components', route: '/ui/datatable' },
    { label: 'Datatable' }
])

const categories = ref([
    {name: "Accounting", key: "A"},
    {name: "Marketing", key: "M"},
    {name: "Production", key: "P"},
    {name: "Research", key: "R"}
]);
const selectedCategories = ref(['Marketing']);

const radios = ref([
    {name: "AccountingRadio", key: "AR"},
    {name: "MarketingRadio", key: "MR"},
    {name: "ProductionRadio", key: "PR"},
    {name: "ResearchRadio", key: "RR"}
]);
const selectedRadio = ref('MarketingRadio');

const customers = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

onMounted(() => {
    CustomerService.getCustomersMedium().then((data) => (customers.value = data));
});
</script>
