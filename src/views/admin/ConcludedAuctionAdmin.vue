<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Concluded Auction</h2>
            </div>
        </div>
        <!-- Sample Master tables-->
        <div class="table-custom">
            <DataTable v-model:expandedRows="expandedRows" :value="products" :filters="filters" sortMode="multiple"
                paginator paginatorPosition="both" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
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
                <Column field="auctionId" header=" Auction Code"></Column>
                <Column field="auctionDescription" header="Auction Description"></Column>
                <Column field="auctionCategoryName" header="Auction Category"></Column>
                <Column field="auctionStartDate" header="Auction StartDate/Time"></Column>
                <Column field="auctionEndDate" header="Auction EndDate/Time"></Column>
                <Column expander  style="width: 50rem" field="" header="Action">
                </Column>
                
                <template #expansion="slot">
                    <AuctionDetailsForConcludedAuction :auctionId = "slot.data.auctionId" >  </AuctionDetailsForConcludedAuction>
                </template>
            </DataTable>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { login } from "../../store/modules/login.js";
import MQL from "@/plugins/mql.js";
import { useRoute } from "vue-router";
import AuctionDetailsForConcludedAuction from "./AuctionDetailsForConcludedAuction.vue";

const expandedRows = ref([]);

const route = useRoute();
const loginStore = login();
const products = ref();
const entityId = ref("");
let auctionId = ref([]);
const auctionDetails = ref({});
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
onMounted(() => {
    entityId.value = route.params.id;
    fetchConcludedAuctionsBidder();
    
});

function fetchConcludedAuctionsBidder() {
    console.log("Selected Entity Id", login().loginDetails);
    new MQL()
        .useManagementServer()
        .setActivity("r.[FetchConcludedAuctionsBidder]")
        .setData({
            entityId: login().loginDetails.entityId,
            organizationId: login().loginDetails.organizationId,
            userId: login().loginDetails.loginId,
            statusCode: "AUCTION_CONCLUDED",
        })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity("FetchConcludedAuctionsBidder", true);
            if (rs.isValid("FetchConcludedAuctionsBidder")) {
                products.value = res.result;
                console.log(res.result, "concluded result**********");
                auctionId.value = res.result.auctionId
                console.log(auctionId.value, "auctionId.value@@@@@@")
            } else {
                rs.showErrorToast("FetchConcludedAuctionsBidder");
            }
        });
}

</script>
