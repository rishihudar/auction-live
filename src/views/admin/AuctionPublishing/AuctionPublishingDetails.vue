<template>
  <div class="card">
    <DataTable :value="auctionData" showGridlines tableStyle="min-width: 50rem">
      <Column field="auctionId" header="Auction Code"> </Column>
      <Column field="auctionDescription" header="Auction Description"> </Column>
      <Column field="auctionCategoryName" header="Auction Category"> </Column>
      <Column field="processingFees" header="Auction Fees"> </Column>
      <Column field="auctionRegStartDate" header="Processing Fee StartDate/Time">
      </Column>
      <Column field="auctionRegEndDate" header="Processing Fee EndDate/Time">
      </Column>
      <Column header="Action"
        ><template #body="rowData">
          <Button
            @click="viewAuctionDetails(rowData)"
            label="Action"
          /> 
          <div v-if="showDetails">           
            <p>Additional details for Auction ID {{ rowData.data.auctionId }}</p>
          </div>
         </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import MQL from "@/plugins/mql.js";

const auctionData = ref([
  {
    auctionCategoryName: "Booth",
    auctionDescription: "Publish auc 1",
    auctionId: 5,
    auctionMethod: "Normal",
    auctionProcess: "Forward",
    auctionRegEndDate: "2024-02-29 13:17:31",
    auctionRegStartDate: "2024-02-17 13:17:28",
    auctionStatus: "Auction Published",
    auctionStatusId: 17,
    auctionType: "Open",
    auctionUserId: 54,
    auctionUsersStatusId: 5,
    auctionUsersStatusName: "EXPIRED",
    bidPlacementName: "Bid Factor",
    districtName: "Faridabad",
    emdAppliedForName: "Auction and Item Wise",
    emdFeeMode: "Online",
    emdFees: 4,
    entityId: 2,
    entityName: "Municiapal Corporation Faridabad",
    eventProcessingFeeMode: "Online",
    processingFees: 1000,
    propertiesEligibleFor: 1,
  },
  {
    auctionCategoryName: "Booth",
    auctionDescription: "Publish auc 1",
    auctionId: 6,
    auctionMethod: "Normal",
    auctionProcess: "Forward",
    auctionRegEndDate: "2024-02-29 13:17:31",
    auctionRegStartDate: "2024-02-17 13:17:28",
    auctionStatus: "Auction Published",
    auctionStatusId: 17,
    auctionType: "Open",
    auctionUserId: 54,
    auctionUsersStatusId: 5,
    auctionUsersStatusName: "EXPIRED",
    bidPlacementName: "Bid Factor",
    districtName: "Faridabad",
    emdAppliedForName: "Auction and Item Wise",
    emdFeeMode: "Online",
    emdFees: 4,
    entityId: 2,
    entityName: "Municiapal Corporation Faridabad",
    eventProcessingFeeMode: "Online",
    processingFees: 1000,
    propertiesEligibleFor: 1,
  },
]);
 const showDetails =ref(false);
const viewAuctionDetails = (rowData) => {
  showDetails.value = !showDetails.value;
  console.log("Button clicked for row:", rowData.data.auctionId,"showDetails.value",showDetails.value);
};


function fetchAuctionDetailsForPublishing() {
  // Automatically generated
  new MQL();
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
