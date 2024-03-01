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
            <DataTable v-model:expandedRows="expandedRows" :value="customers" :filters="filters" sortMode="multiple"
                paginator paginatorPosition="both" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
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
                <!-- <Column field="action" header="Action">
                    <template #body="slotProps">
                        {{ slotProps.data.auctionCode }}
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" label="Details"
                            @click=" visible = true" />
                    </template>
                </Column> -->

                <Column expander header="action" style="width: 5rem">
                    <template #rowtogglericon="">
                        <Button label="Details" />
                    </template>
                </Column>
                <template #expansion="slot">
                    <div class="card">
                        <div class="profile-field">
                            <label class="bold-label" for="auctionType">Auction Type:</label>
                            <span>{{ slot.data.auctionType }}</span>
                        </div>
                        <div class="profile-field">
                            <label class="bold-label" for="auctionMethodName">Auction Method:</label>
                            <span>{{ slot.data.auctionMethodName }}</span>
                        </div>
                        <div class="profile-field">
                            <label class="bold-label" for="auctionProcessName">Auction Process:</label>
                            <span>{{ slot.data.auctionProcessName }}</span>
                        </div>
                        <div class="profile-field">
                            <label class="bold-label" for="bidPlacementName">Bid Placement:</label>
                            <span>{{ slot.data.bidPlacementName }}</span>
                        </div>
                        <div class="profile-field">
                            <label class="bold-label" for="district">District:</label>
                            <span>{{ slot.data.district }}</span>
                        </div>
                        <div class="profile-field">
                            <label class="bold-label" for="mcName">MC:</label>
                            <span>{{ slot.data.mcName }}</span>
                        </div>
                        <div class="profile-field">
                            <label class="bold-label" for="location">Location:</label>
                            <span>{{ slot.data.location }}</span>
                        </div>
                        <div class="profile-field">
                            <label class="bold-label" for="area">Area:</label>
                            <span>{{ slot.data.AREA }}</span>
                        </div>
                        <!-- <div class="profile-field">
                        <label class="bold-label" for="itemCount">Properties Available:</label>
                        <span>Upto {{ slot.data.itemCount }}</span>
                    </div> -->
                        <div class="profile-field">
                            <label class="bold-label" for="eventEmdProcessingFees">EMD:</label>
                            <span>{{ slot.data.eventEmdProcessingFees }}</span>
                        </div>
                        <div class="profile-field">
                            <label class="bold-label" for="reservePrice">Reserve Price:</label>
                            <span>{{ slot.data.reservePrice }}</span>
                        </div>
                        <div class="profile-field">
                            <label class="bold-label" for="modifierValue">Modifier Value:</label>
                            <span>{{ slot.data.modifierValue }}</span>
                        </div>
                    </div>
                </template>
            </DataTable>

        </div>
    </div>
</template>

<script setup>
import MQL from '@/plugins/mql.js';
import Button from 'primevue/button';
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useRouter } from 'vue-router'
import faPlus from '../../../assets/icons/plus.svg'
import faMagnifyingGlass from '../../../assets/icons/magnifying-glass.svg'
import { fetchAuctionStatus } from '../../plugins/helpers';
const router = useRouter()
var showCard = ref(false)
const expandedRows = ref([]);
const crumbs = ref([
    { label: 'Home', route: '/home' },
    { label: 'Bidder', route: '/home' },
    { label: 'Auction List' }
])

const customers = ref([]);
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const visible = ref(false);


async function AuctionList() {
    var AUCTION_DRAFTED
    const resultStatus = await fetchAuctionStatus("AUCTION_DRAFTED")
    if (resultStatus.error == null) {
        AUCTION_DRAFTED = resultStatus.result.statusId
    } else {

    }
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionsWithApprovedStatus]")
        .setData({ statusId: AUCTION_DRAFTED })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionsWithApprovedStatus", true)
            if (rs.isValid("FetchAuctionsWithApprovedStatus")) {
                customers.value = res.result.auctionData
            } else {
                rs.showErrorToast("FetchAuctionsWithApprovedStatus")
            }
        })

    // Automatically generated


}

// function FetchAuctionDetailsByAuctionId(auctionId) {

//    new MQL()
//        .useManagementServer()
//        .setActivity("o.[FetchAuctionDetailsByAuctionId]")
//        .setData({auctionId:auctionId.value})
//        .fetch()
//        .then(rs => {

//            let res = rs.getActivity("FetchAuctionDetailsByAuctionId", true)
//            if (rs.isValid("FetchAuctionDetailsByAuctionId")) {
//                console.log(res)
//                res.result.fetchAuctionDetails['auctionDocuments'] = res.result.fetchDocuments
//                res.result.fetchAuctionDetails.item = JSON.parse("[" + res.result.fetchAuctionDetails.item + "]");
//                const auctionDetail = res.result.fetchAuctionDetails;
//                console.log(auctionDetail,"auctionDetails")

//                // Map documents to an object with documentTypeName as key and documentPath as value
//                const documentsMap = {};
//                auctionDetail.auctionDocuments.forEach(doc => {
//                    documentsMap[doc.documentTypeName] = doc.documentPath;
//                });

//                // Assign documentsMap to auctionDetail
//                auctionDetail.documentsMap = documentsMap;

//                auctionDetails.value.push(auctionDetail);
//                console.log(auctionDetails.value, "auctionDetails.value");

//                // You can access document paths using auctionDetail.documentsMap in the template
//            } else {
//                rs.showErrorToast("FetchAuctionDetailsByAuctionId")
//            }
//        })
// }

function navigateToRoute() {
    // Navigate to another route
    router.push('/auction-preparation')
}


onMounted(() => {

    AuctionList()

});

</script>
