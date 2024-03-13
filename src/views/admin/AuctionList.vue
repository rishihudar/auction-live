<template>
  <div>
    <div class="page-header">
      <div class="ph-text">
        <h2 class="title">Auction List</h2>
        <!-- <Breadcrumb :model="crumbs">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <span :class="[item.icon, 'text-color']" />
                                <span class="bi-label">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <span v-else v-bind="props.action">
                            <span class="bi-label">{{ item.label }}</span>
                        </span>
                    </template>
                </Breadcrumb> -->
      </div>
      <div class="ph-action">
        <Button @click="navigateToRoute" class="btn btn-primary btn-add">
          <fa-plus></fa-plus>
          Create New Auction
        </Button>
      </div>
    </div>
    <div class="table-custom">
      <DataTable
        v-model:expandedRows="expandedRows"
        :value="customers"
        :filters="filters"
        sortMode="multiple"
      >
        <template #paginatorstart>
          <div class="fm-inner">
            <InputText
              v-model="filters['global'].value"
              placeholder="Search..."
            />
            <fa-magnifying-glass
              class="fm-icon fm-prefix"
            ></fa-magnifying-glass>
          </div>
        </template>
        <Column field="srNo" header="SrNo." sortable></Column>
        <Column field="auctionCode" header="Auction Code" sortable></Column>
        <Column
          field="auctionDescription"
          header="Auction Description"
          sortable
        ></Column>
        <Column
          field="auctionMethodName"
          header="Auction Method"
          sortable
        ></Column>
        <Column
          field="auctionProcessName"
          header="Auction Process"
          sortable
        ></Column>
        <!-- <Column field="action" header="Action">
                    <template #body="slotProps">
                        {{ slotProps.data.auctionCode }}
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" label="Details"
                            @click=" visible = true" />
                    </template>
                </Column> -->

        <Column expander header="action" style="width: 5rem">
          <!-- <template #rowtogglericon=""> -->
          <template #body="slotProps">
            <!-- <fa-eye></fa-eye> Details -->
            <!-- {{ slotProps.data.auctionCode }}
                        {{ slotProps.data.inventoryCategoryId }} -->
            <Button
              icon="pi pi-eye"
              class="p-button-rounded p-button-info"
              label="Edit"
              @click="
                editAuction(
                  slotProps.data.auctionCode,
                  slotProps.data.inventoryCategoryId
                )
              "
            />
          </template>
        </Column>
        <!-- <template #expansion="slot">
                    <div class="box-section">
                        <div class="bs-header">
                            Auction Description
                        </div>
                        <div class="bs-item-holder">
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Auction Type:</div>
                                <div class="bs-value">{{ slot.data.auctionType }}</div>
                            </div>
                            <div class="bs-item col-span-6">
                                <div class="bs-label">Auction Method:</div>
                                <div class="bs-value">{{ slot.data.auctionMethodName }}</div>
                            </div>
                            <div class="bs-item col-span-4">
                                <div class="bs-label">Auction Process:</div>
                                <div class="bs-value">{{ slot.data.auctionProcessName }}</div>
                            </div>
                            <div class="bs-item col-span-4">
                                <div class="bs-label">Bid Placement:</div>
                                <div class="bs-value">{{ slot.data.bidPlacementName }}</div>
                            </div>
                            <div class="bs-item col-span-4">
                                <div class="bs-label">District:</div>
                                <div class="bs-value">{{ slot.data.district }}</div>
                            </div>
                            <div class="bs-item col-span-4">
                                <div class="bs-label">MC:</div>
                                <div class="bs-value">{{ slot.data.mcName }}</div>
                            </div>
                            <div class="bs-item col-span-4">
                                <div class="bs-label">Location:</div>
                                <div class="bs-value">{{ slot.data.location }}</div>
                            </div>
                            <div class="bs-item col-span-4">
                                <div class="bs-label">Area:</div>
                                <div class="bs-value">{{ slot.data.AREA }}</div>
                            </div>
                             <div class="bs-item col-span-4">
                            <label class="bold-label" for="itemCount">Properties Available:</div>
                            <div class="bs-value">Upto {{ slot.data.itemCount }}</div>
                        </div> 
                            <div class="bs-item col-span-4">
                                <div class="bs-label">EMD:</div>
                                <div class="bs-value">{{ slot.data.eventEmdProcessingFees }}</div>
                            </div>
                            <div class="bs-item col-span-4">
                                <div class="bs-label">Reserve Price:</div>
                                <div class="bs-value">{{ slot.data.reservePrice }}</div>
                            </div>
                            <div class="bs-item col-span-4">
                                <div class="bs-label">Modifier Value:</div>
                                <div class="bs-value">{{ slot.data.modifierValue }}</div>
                            </div>
                        </div>
                    </div>
                </template> -->
      </DataTable>
      <Paginator
        :rows="perPage"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        :rowsPerPageOptions="[5, 10, 15]"
        :totalRecords="totalRows"
        v-if="totalRows > perPage"
        @page="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import MQL from "@/plugins/mql.js";
import Button from "primevue/button";
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useRouter } from "vue-router";
import faPlus from "../../../assets/icons/plus.svg";
import faMagnifyingGlass from "../../../assets/icons/magnifying-glass.svg";
import { fetchAuctionStatus } from "../../plugins/helpers";
import { useAuctionPreparation } from "../../store/auctionPreparation.js";
import { storeToRefs } from "pinia";
import Paginator from "primevue/paginator";
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);
const AuctionStore = useAuctionPreparation();
const { getLastInsertedAuctionId } = storeToRefs(AuctionStore);

const router = useRouter();
var showCard = ref(false);
const expandedRows = ref([]);
const crumbs = ref([
  { label: "Home", route: "/home" },
  { label: "Bidder", route: "/home" },
  { label: "Auction List" },
]);

import faEye from "../../../assets/icons/eye.svg";

const customers = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const visible = ref(false);

function handlePageChange(event) {
  currentPage.value = event.page;
  console.log("event.page", event.page);
  AuctionList(currentPage.value);
}
async function AuctionList(page) {
  var AUCTION_DRAFTED;
  const resultStatus = await fetchAuctionStatus("AUCTION_DRAFTED");
  if (resultStatus.error == null) {
    AUCTION_DRAFTED = resultStatus.result.statusId;
  } else {
  }
  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchAuctionsWithApprovedStatus]")
    .setData({
      statusId: AUCTION_DRAFTED,
      skip: String(page * perPage.value),
      limit: String(perPage.value),
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAuctionsWithApprovedStatus", true);
      if (rs.isValid("FetchAuctionsWithApprovedStatus")) {
        customers.value = res.result.auctionData;
        totalRows.value = res.result.rowCount.totalRows;
        for (var i = 0; i < customers.value.length; i++) {
          customers.value[i].srNo = page * perPage.value + i + 1;
          console.log("SrNo-", page * perPage.value + i + 1);
        }
      } else {
        rs.showErrorToast("FetchAuctionsWithApprovedStatus");
      }
    });

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
  AuctionStore.setLastInsertedAuctionId(null);
  AuctionStore.setPropertyCategoryId("");
  router.push("/auction-preparation");
}

function editAuction(aucId, invCatId) {
  // Navigate to another route
  AuctionStore.setLastInsertedAuctionId(aucId);
  AuctionStore.setPropertyCategoryId(invCatId);
  router.push("/auction-preparation");
}

onMounted(() => {
  AuctionList(currentPage.value);
});
</script>
