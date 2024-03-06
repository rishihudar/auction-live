<template>
  <DataTable v-model:expandedRows="expandedRows" :value="auctionDetails" showGridlines tableStyle="min-width: 50rem">
    <template #empty>No Auctions Found</template>
    <Column field="taskDate" header="Task Date"> </Column>
    <Column field="auctionCode" header="Auction Code"> </Column>
    <Column field="inventoryCategoryName" header="Auction Category"> </Column>
    <Column field="property" header="Available Properties"> </Column>
    <Column field="statusName" header="Status"> </Column>
    <Column field="auctionStatusName" header="Auction Status"> </Column>
    <Column header="Action">
      <template #body="row">
        <Button @click="showDialog(row.data.workflowStepDetailsId)" label="Details" />
      </template>
    </Column>
  </DataTable>
  <Dialog v-model:visible="visible" modal :style="{ width: '60rem' }">
    <ViewAuction :workflowStepDetailsId="workflowStepDetailsId" />
  </Dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import MQL from "@/plugins/mql.js";
import { login } from "../../store/modules/login";
import ViewAuction from "../WorkflowManagement/ViewAuction.vue";
const auctionDetails = ref([]);
const loginStore = login()
const visible = ref(false);
const expandedRows = ref([]);
const workflowStepDetailsId = ref(null)

function showDialog(id) {
  console.log(id);
  visible.value = true
  workflowStepDetailsId.value = id
}

function fetchAuctionDetailsForMyTask() {
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchAuctionDetailsForMyTask]")
    .setData({
      assignedLoginId: loginStore.loginId,
      assignedRoleId: loginStore.role.roleId,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAuctionDetailsForMyTask", true);
      console.log("log-", res.result.auctionDetails);
      auctionDetails.value = res.result.auctionDetails;
      if (rs.isValid("FetchAuctionDetailsForMyTask")) {
      } else {
        rs.showErrorToast("FetchAuctionDetailsForMyTask");
      }
    });
}
onMounted(() => {
  fetchAuctionDetailsForMyTask();
});
</script>


<style>
.bordered-input {
  border: 1px solid #ccc;
  padding: 5px;
  margin-right: 10px;
  /* Adjust margin as needed */
}
</style>