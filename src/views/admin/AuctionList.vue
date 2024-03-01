<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Auction List</h2>
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
                <router-link to="/auction-preparation" class="btn btn-primary btn-add">
                    <fa-plus></fa-plus>
                    Create New Auction
                </router-link>
            </div>
        </div>
        <div class="table-custom">
            <DataTable :value="customers" :filters="filters" sortMode="multiple" paginator paginatorPosition="both" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" >
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
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import faPlus from '../../../assets/icons/plus.svg'
import faMagnifyingGlass from '../../../assets/icons/magnifying-glass.svg'

var showCard = ref(false)
const crumbs = ref([
    { label: 'Home', route: '/home' },
    { label: 'Bidder', route: '/home' },
    { label: 'Auction List' }
])

const customers = ref([
    {
        id: 1000,
        name: 'James Butt',
        country: {
            name: 'Algeria',
            code: 'dz'
        },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: true,
        activity: 17,
        representative: {
            name: 'Ioni Bowcher',
            image: 'ionibowcher.png'
        },
        balance: 70663
    },
    {
        id: 1001,
        name: 'Josephine Darakjy',
        country: {
            name: 'Egypt',
            code: 'eg'
        },
        company: 'Chanay, Jeffrey A Esq',
        date: '2019-02-09',
        status: 'proposal',
        verified: true,
        activity: 0,
        representative: {
            name: 'Amy Elsner',
            image: 'amyelsner.png'
        },
        balance: 82429
    },
    {
        id: 1002,
        name: 'Art Venere',
        country: {
            name: 'Panama',
            code: 'pa'
        },
        company: 'Chemel, James L Cpa',
        date: '2017-05-13',
        status: 'qualified',
        verified: false,
        activity: 63,
        representative: {
            name: 'Asiya Javayant',
            image: 'asiyajavayant.png'
        },
        balance: 28334
    },
    {
        id: 1003,
        name: 'Lenna Paprocki',
        country: {
            name: 'Slovenia',
            code: 'si'
        },
        company: 'Feltz Printing Service',
        date: '2020-09-15',
        status: 'new',
        verified: false,
        activity: 37,
        representative: {
            name: 'Xuxue Feng',
            image: 'xuxuefeng.png'
        },
        balance: 88521
    }
]);
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
</script>
