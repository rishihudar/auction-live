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
                <Button @click="navigateToRoute" class="btn btn-primary btn-add">
                    <fa-plus></fa-plus>
                    Create New Auction 
                </Button>
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
                <Column field="auctionCode" header="Auction Code" sortable></Column>
                <Column field="auctionDescription" header="Auction Description" sortable></Column>
                <Column field="auctionMethodName" header="Auction Method" sortable></Column>
                <Column field="auctionProcessName" header="Auction Process" sortable></Column>
                <Column field="action" header="Action">
                    <template #body="slotProps">
                        <!-- {{ slotProps.data.auctionCode }} -->
                        <Button severity="secondary" class="btn-sm"
                            @click="">
                            <fa-eye></fa-eye> Details
                        </Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import MQL from '@/plugins/mql.js';
import Button from 'primevue/button';
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import {useRouter} from 'vue-router'

import faEye from '../../../assets/icons/eye.svg'
import faPlus from '../../../assets/icons/plus.svg'
import faMagnifyingGlass from '../../../assets/icons/magnifying-glass.svg'
const router = useRouter()
var showCard = ref(false)
const crumbs = ref([
    { label: 'Home', route: '/home' },
    { label: 'Bidder', route: '/home' },
    { label: 'Auction List' }
])

const customers = ref([]);
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});




function AuctionList() {
    
					// Automatically generated
			new MQL()
            .useManagementServer()
			.setActivity("o.[FetchAuctionsWithApprovedStatus]")
			.setData({statusId:16})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchAuctionsWithApprovedStatus",true)
			if (rs.isValid("FetchAuctionsWithApprovedStatus")) {
                customers.value = res.result.auctionData

			} else
			 { 
			rs.showErrorToast("FetchAuctionsWithApprovedStatus")
			}
			})
			
}

function  navigateToRoute() {
      // Navigate to another route
      router.push('/auction-preparation')
    }


onMounted(() => {
   
    AuctionList()

});

</script>
