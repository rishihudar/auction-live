<template>
  <div>
    <div class="page-header">
      <div class="ph-text">
        <h2 class="title">Item Lifecycle Report</h2>
      </div>
      <div class="ph-action">
        <!-- Excel Report Button -->
        <button @click="fetchdataforExcel" class="btn btn-primary cursor-pointer">
          Download Item Lifecycle Report
        </button>
        <JsonExcel
          :data="json_data"
          type="xlsx"
          class="hidden"
          worksheet="My Worksheet"
          name="Item Lifecycle Report.xlsx"
          ref="jsonExcel"
        >
        </JsonExcel>
      </div>
    </div>
    <!-- Wrapper for the entire table with custom styles -->
    <div class="table-custom">
        <!-- Top paginator for navigating through pages -->
        <Paginator
            class="pagination-up"
            :rows="perPage"
            :rowsPerPageOptions="[10, 20, 30]"
            :totalRecords="totalRows"
            template="RowsPerPageDropdown"
            @page="handlePageChange"
        >
            <!-- Custom template slot for search input in paginator -->
            <template #start>
                <div class="fm-inner">
                    <!-- Input field for filtering results by Flat Code -->
                    <InputText
                        v-model="filter"
                        placeholder="Search By Flat Code..."
                        @input="fetchlifeCycleReportData"
                    />
                    <!-- Magnifying glass icon for search -->
                    <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
                </div>
            </template>
        </Paginator>
        <!-- Data table for displaying lifecycle report -->
        <DataTable
            v-model:expandedRows="expandedRows"
            :value="itemLifeCycleReport"
            :filters="filter"
            sortMode="multiple"
        >
            <!-- Display message when no data is available -->
            <template #empty>
                <div class="box-watermark">No Data Found.</div>
            </template>

            <!-- Table columns with sortable functionality -->
            <Column field="srNo" header="SrNo." sortable></Column>
            <Column field="Entity" header="Entity" sortable></Column>
            <Column field="Item Hierarchy" header="Item Hierarchy" sortable></Column>
            <Column field="Auction Code" header="Auction Code" sortable></Column>
            <Column field="Auction Start Date" header="Auction Start Date" sortable></Column>
            <Column field="Auction End Date" header="Auction End Date" sortable></Column>
            <Column field="Status After Auction" header="Status After Auction" sortable></Column>
        </DataTable>

        <!-- Bottom paginator for navigation -->
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
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick } from "vue"; // Importing necessary Vue composition APIs
import MQL from "@/plugins/mql.js"; // Custom plugin for API calls
import DataTable from "primevue/datatable"; // PrimeVue DataTable component
import Column from "primevue/column"; // PrimeVue Column component
import JsonExcel from "vue-json-excel3"; // Importing the JsonExcel component for exporting data to Excel
// Reactive variables for managing the state of the component
const filter = ref(''); // Search filter for the table
const perPage = ref(10); // Number of rows per page
const totalRows = ref(); // Total number of rows (fetched from the API)
const currentPage = ref(0); // Current page number
const itemLifeCycleReport = ref([]); // Data to be displayed in the table
const json_data = ref([]); // Data to be exported to Excel
const jsonExcel = ref(null); // Reference to the JsonExcel component
// Function to handle page change events from the paginator
function handlePageChange(event) {
  currentPage.value = event.page; // Update current page
  perPage.value = event.rows; // Update rows per page
  fetchlifeCycleReportData(); // Fetch new data for the current page
}

// Function to fetch lifecycle report data from the server
function fetchlifeCycleReportData() {
    new MQL() // Initialize the custom MQL plugin
        .useManagementServer() // Specify the management server
        .setActivity("r.[ItemLifeCycleReport]") // Set the activity name for the API call
        .setData({
            filter: "%" + filter.value.trim() + "%", // Apply the search filter
            skip: String(currentPage.value * perPage.value), // Skip rows for pagination
            limit: String(perPage.value), // Limit the number of rows per page
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("ItemLifeCycleReport", true); // Fetch activity response
            if (rs.isValid("ItemLifeCycleReport")) {
                itemLifeCycleReport.value = res.result.lifecycleReportDetails; // Update table data
                totalRows.value = res.result.rowCount.totalRows; // Update total rows count
                
                // Add serial numbers to the rows
                for (var i = 0; i < itemLifeCycleReport.value.length; i++) {
                    itemLifeCycleReport.value[i].srNo = currentPage.value * perPage.value + i + 1;
                }
            } else {
                rs.showErrorToast("ItemLifeCycleReport"); // Show error message on failure
            }
        });
}
// Function to fetch data for Excel export
function fetchdataforExcel(){
					// Automatically generated
          new MQL()
          .useManagementServer()
			.setActivity("r.[FetchItemLifecycleReportData]")// Set the activity name for the API call
			.setData({filter: "%" + filter.value.trim() + "%",})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchItemLifecycleReportData",true)
			if (rs.isValid("FetchItemLifecycleReportData")) {
        json_data.value = res.result;// Update the data to be exported to Excel
        nextTick(() => { //nextTick function is used to ensure that the DOM is updated before triggering the Excel file generation. This is necessary because the json_data value is updated asynchronously, and we need to wait for the DOM to reflect this change before calling jsonExcel.value.generate().
          jsonExcel.value.generate();// Trigger the Excel file generation
        });
			} else
			 { 
			rs.showErrorToast("FetchItemLifecycleReportData")
			}
			});
}

// Fetch initial data when the component is mounted
onMounted(() => {
    fetchlifeCycleReportData(); // Fetch initial item lifecycle report data
});
</script>