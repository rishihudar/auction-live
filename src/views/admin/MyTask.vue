<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">My Tasks</h2>
            </div>
        </div>
        <div class="table-custom">
            <Paginator
                class="pagination-up"
                :rows="perPage"
                :rowsPerPageOptions="[10, 20, 30]"
                :totalRecords="totalRows"
                template="RowsPerPageDropdown"
                @page="handlePageChange"
            >
                <template #start>
                    <div class="fm-inner">
                        <InputText
                            v-model="filter"
                            placeholder="Search By Auction Code..."
                            @input="fetchAuctionDetailsForMyTask"
                        />
                        <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
                    </div>
                </template>
            </Paginator>
            <DataTable
                v-model:expandedRows="expandedRows"
                :value="auctionDetails"
                showGridlines
                :filters="filter"
            >
                <template #empty>
                    <div class="box-watermark">
                        No Auctions Found
                    </div>
                </template>
                <Column field="srNo" header="SrNo."> </Column>
                <Column field="taskDate" header="Task Date"> </Column>
                <Column field="auctionCode" header="Auction Code"> </Column>
                <Column field="inventoryCategoryName" header="Auction Category"> </Column>
                <Column field="property" header="Available Properties"> </Column>
                <Column field="statusName" header="Status"> </Column>
                <Column field="auctionStatusName" header="Auction Status"> </Column>
                <Column header="Action">
                    <template #body="row">
                        <Button
                            @click="showDialog(row.data.workflowStepDetailsId)"
                            class="btn-sm"
                            label="Details"
                        />
                    </template>
                </Column>
            </DataTable>
            <Paginator
                class="pagination-down"
                :rows="perPage"
                :rowsPerPageOptions="[5, 10, 20]"
                :totalRecords="totalRows"
                template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                @page="handlePageChange"
            />
        </div>

        <Dialog v-model:visible="visible" modal header="Auction Summary" :style="{ width: '60rem' }">
            <ViewAuction :workflowStepDetailsId="workflowStepDetailsId" @workflowsubmit="workflowsubmitted" />
        </Dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import MQL from "@/plugins/mql.js";
import { login } from "../../store/modules/login";
import ViewAuction from "../WorkflowManagement/ViewAuction.vue";
import Paginator from "primevue/paginator";

//const first = ref(0);
const auctionDetails = ref([]);
const loginStore = login();
const visible = ref(false);
const expandedRows = ref([]);
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);
const filter = ref("");

function handlePageChange(event) {
  //console.log("event", event);
  currentPage.value = event.page;
  perPage.value = event.rows;
  //console.log("event.page", event.page);
  fetchAuctionDetailsForMyTask();
}

const workflowStepDetailsId = ref(null);

function showDialog(id) {
  visible.value = true;
  workflowStepDetailsId.value = id;
  fetchAuctionDetailsForMyTask();

}

function workflowsubmitted() {
  visible.value = false;
  workflowStepDetailsId.value = null
  fetchAuctionDetailsForMyTask();
}

function fetchAuctionDetailsForMyTask() {

  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchAuctionDetailsForMyTask]")
    .setData({
      assignedLoginId: loginStore.loginId,
      assignedRoleId: loginStore.role.roleId,
      filter: "%" + filter.value.trim() + "%",
      skip: String(currentPage.value * perPage.value),
      limit: String(perPage.value),
    })
    .fetch()
    .then(function (rs) {
      let res = rs.getActivity("FetchAuctionDetailsForMyTask", true);
      if (rs.isValid("FetchAuctionDetailsForMyTask")) {
        //console.log("Fetched auction details:", res.result.auctionDetails);
        ////console.log("page.value", page);
        auctionDetails.value = res.result.auctionDetails;
        totalRows.value = res.result.rowCount.totalRows;
        //console.log("auctionDetails.value.length", auctionDetails.value.length);
        for (var i = 0; i < auctionDetails.value.length; i++) {
          auctionDetails.value[i].srNo = currentPage.value * perPage.value + i + 1;
          //console.log("SrNo-", currentPage.value * perPage.value + i + 1);
        }
      } else {
        rs.showErrorToast("FetchAuctionDetailsForMyTask");
      }
    })
    .catch(function (error) {
      console.error("Error fetching auction details:", error);
    });
}
onMounted(() => {
  fetchAuctionDetailsForMyTask();
});
</script>


<style>
</style>
