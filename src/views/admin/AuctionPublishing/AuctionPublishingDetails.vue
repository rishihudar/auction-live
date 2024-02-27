<template>
  <div class="card">
    <DataTable
      :value="auctionDetails"
      showGridlines
      tableStyle="min-width: 50rem"
    >
      <Column field="auctionCode" header="Auction Code"></Column>
      <Column field="auctionDescription" header="Auction Description"></Column>
      <Column field="category" header="Auction Category"></Column>
      <Column field="auctionFee" header="Auction Fees"></Column>
      <Column field="startDate" header="Processing Fee StartDate/Time"></Column>
      <Column field="endDate" header="Processing Fee EndDate/Time"></Column>
      <Column field="action" header="Action"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import { onMounted } from "vue";
import MQL from "@/plugins/mql.js";

function fetchAuctionDetailsForPublishing() {
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("r.[FetchPublishedAuctionsBidder]")
    .setData({
      entityId: 2,
      organizationId: 1,
      statusCode: "AUCTION_PUBLISHED",
      userId: 22,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchPublishedAuctionsBidder", true);
      //console.log("res.result",res.result.value);
      if (rs.isValid("FetchPublishedAuctionsBidder")) {
      } else {
        rs.showErrorToast("FetchPublishedAuctionsBidder");
      }
    });
}

onMounted(() => {
  fetchAuctionDetailsForPublishing();
});
</script>
