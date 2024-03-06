<template>
  <div class="table-custom">
    <DataTable v-model:expandedRows="expandedRows" :value="products" showGridlines tableStyle="min-width: 50rem">
      <Column field="auctionId" header="Auction Code"></Column>
      <Column field="auctionDescription" header="Auction Description"></Column>
      <Column field="auctionCategoryName" header="Auction Category"></Column>
      <Column field="districtName" header="District Name"></Column>
      <Column field="entityName" header="Entity Name"></Column>
      <Column field="auctionRegStartDate" header="Processing and EMD Fee Pay Start Date/Time"></Column>
      <Column field="auctionRegEndDate" header="Processing and EMD Fee Pay End Date/Time"></Column>
      <Column expander style="width: 5rem" field="" header="Action">
      </Column>
      <template #expansion="slot">
        <AuctionDetailsForAdmin :auctionId="slot.data.auctionId"> </AuctionDetailsForAdmin>
      </template>
    </DataTable>
  </div>

</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { login } from "../../store/modules/login.js";
import MQL from "@/plugins/mql.js";
import { useRoute } from "vue-router";
import AuctionDetailsForAdmin from "../admin/AuctionDetailsForAdmin.vue";


const expandedRows = ref([]);

const route = useRoute();
const loginStore = login();
const products = ref();

const entityId = ref("");
onMounted(() => {
  entityId.value = route.params.id;
  // console.log("selectedEntityId", id.value);
  fetchPublishedAuctionsBidder();
});
onBeforeMount(() => {
  // fetchPublishedAuctionsBidder();
});

let auctionId = ref();
function fetchPublishedAuctionsBidder() {
  console.log("Selected Entity Id", login().loginDetails);
  new MQL()
    .useManagementServer()
    .setActivity("r.[FetchPublishedAuctionsBidder]")
    .setData({
      organizationId: login().loginDetails.organizationId,
      entityId: login().loginDetails.entityId,
      userId: login().loginDetails.loginId,
      statusCode: "AUCTION_PUBLISHED"
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchPublishedAuctionsBidder", true);
      if (rs.isValid("FetchPublishedAuctionsBidder")) {
        products.value = res.result
        console.log('Published Auctions Scheduler', res.result);
        auctionId.value = res.result.auctionId
      } else {
        rs.showErrorToast("FetchPublishedAuctionsBidder");
      }
    });
}



</script>
