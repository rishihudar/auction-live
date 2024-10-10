<template>
    <div>
      <div class="page-header">
        <div class="ph-text">
          <h2 class="title">Rejected H1 Refund</h2>
        </div>
      </div>
      <!-- Sample Master tables-->
      <div class="table-custom">
        <Paginator class="pagination-up" :rows="perPage" :rowsPerPageOptions="[10, 20, 30]" :totalRecords="totalRows"
          template="RowsPerPageDropdown" @page="handlePageChange">
          <template #start>
            <div class="fm-inner">
              <InputText v-model="filter" placeholder="Search By Auction Code..." @input="fetchConcludedAuctionsUser" />
              <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
            </div>
          </template>
        </Paginator>
        <DataTable v-model:expandedRows="expandedRows" showGridlines :value="products" :filters="filters">
          <!-- <Column field="srNo" header="Sr No"></Column> -->
          <Column field="auctionCode" header=" Auction Code"></Column>
          <!-- <Column
                  field="auctionDescription"
                  header="Auction Description"
              ></Column>
              <Column field="auctionCategoryName" header="Auction Category"></Column> -->
          <Column header="Auction Category - Auction Description">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.auctionCategoryName }}-
                {{ slotProps.data.auctionDescription }}<br>
  
              </div>
            </template>
          </Column>
          <Column field="auctionStartDate" header="Auction StartDate/Time"></Column>
          <Column field="auctionEndDate" header="Auction EndDate/Time"></Column>
  
        </DataTable>
        <Paginator class="pagination-down" :rows="perPage" :rowsPerPageOptions="[10, 20, 30]" :totalRecords="totalRows"
          template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" @page="handlePageChange" />
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import { FilterMatchMode } from "primevue/api";
  import { login } from "../../store/modules/login.js";
  import MQL from "@/plugins/mql.js";
  import { useRoute } from "vue-router";
//   import html2pdf from "html2pdf.js";
  const expandedRows = ref([]);
//   const displayModal = ref(false);
//   const displayModal1 = ref(false);
  const route = useRoute();
//   const html2PdfRef = ref(null);
//   const loginStore = login();
  const products = ref();
  const entityId = ref("");
  const perPage = ref(10);
  const totalRows = ref();
  const currentPage = ref(0);
  const filter = ref("");
//   let auctionId = ref([]);
//   const auctionDetails = ref({});
//   let auctionDetailsReport = ref({});
//   let auctionDetailsReport1 = ref({});
//   let auctionH1Report = ref({});
//   let auctionH1Report1 = ref({});
  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  onMounted(() => {
    entityId.value = route.params.id;
    fetchConcludedAuctionsUser();
  });
  function handlePageChange(event) {
    currentPage.value = event.page;
    perPage.value = event.rows;
    //console.log("event.page", event.page);
    fetchConcludedAuctionsUser();
  }
  
  function fetchConcludedAuctionsUser() {
    //console.log("Selected Entity Id", login().loginDetails);
    new MQL()
    .useManagementServer()
      .setActivity("r.[FetchConcludedAuctionsUser]")
      .setData({
        entityId: login().loginDetails.entityId,
        organizationId: login().loginDetails.organizationId,
        statusCode: "AUCTION_CONCLUDED",
        filter: "%" + filter.value.trim() + "%",
        skip: String(currentPage.value * perPage.value),
        limit: String(perPage.value),
      })
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("FetchConcludedAuctionsUser", true);
        if (rs.isValid("FetchConcludedAuctionsUser")) {
          products.value = res.result.concludedAuctions;
          //console.log(res.result, "concluded result**********");
          //console.log(res.result.concludedAuctions,"concluded auction@@@@@@@")
          totalRows.value = res.result.rowCount.totalRows;
          //console.log("totalRows@@@@",totalRows)
          //console.log("auctionDetails.value.length", products.value.length);
          for (var i = 0; i < products.value.length; i++) {
            products.value[i].srNo = currentPage.value * perPage.value + i + 1;
            //console.log("SrNo-", currentPage.value * perPage.value + i + 1);
          }
        } else {
          rs.showErrorToast("FetchConcludedAuctionsUser");
        }
      });
  }
  
  </script>
  