<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">SMS Management</h2>
            </div>
        </div>

        <!-- Wrapper for the entire table with custom styles -->
        <div class="table-custom">
            <!-- Data table for displaying SMS details -->
            <DataTable
                v-model:expandedRows="expandedRows"
                :value="smsDetails"
                sortMode="multiple"
            >
                <!-- Display message when no data is available -->
                <template #empty>
                    <div class="box-watermark">No Data Found.</div>
                </template>

                <!-- Table columns with sortable functionality -->
                <Column field="srNo" header="SrNo." sortable></Column>
                <Column field="SMSType" header="SMS Type" sortable></Column>
                <Column field="Body" header="Body" sortable></Column>
                <Column field="vsTemplateId" header="Template Id" sortable></Column>
                <Column field="bActive" header="SMS Status" sortable>
                    <template #body="slotProps">
                        <ToggleButton 
                            v-model="slotProps.data.bActive" 
                            class="w-6rem" 
                            onLabel="Active" 
                            offLabel="Inactive" 
                            :onValue="1" 
                            :offValue="0" 
                        />
                    </template>
                </Column>
                <Column field="bEnabled" header="SMS ON/OFF" sortable>
                    <template #body="slotProps">
                        <ToggleButton 
                            v-model="slotProps.data.bEnabled" 
                            class="w-8rem" 
                            onLabel="On" 
                            offLabel="Off" 
                            :onValue="1" 
                            :offValue="0" 
                        />
                    </template>
                </Column>
            </DataTable>
            <div class="card flex justify-content-center">
                <Button label="Save" @click="saveChanges" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Importing necessary Vue composition APIs
import MQL from "@/plugins/mql.js"; // Custom plugin for API calls
import DataTable from "primevue/datatable"; // PrimeVue DataTable component
import Column from "primevue/column"; // PrimeVue Column component
import ToggleButton from 'primevue/togglebutton';
import toast from "../../../assets/presets/alive/toast";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 3000 });
const smsDetails = ref([]); // Data to be displayed in the table
const expandedRows = ref([]); // Expanded rows for the DataTable
const bEnabled = ref(true);
const bActive= ref([]);
import { login } from "@/store/modules/login.js"; // Importing login store module
const loginStore = login();  
// Function to fetch SMS details from the server
function fetchSMSDetails(){   
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchSMSDetails]")
        .setData({})
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchSMSDetails", true);
            if (rs.isValid("FetchSMSDetails")) {
                smsDetails.value = res.result.smsDetails.map(item => ({
                    ...item,
                })); // Update table data with original status values
            } else {
                rs.showErrorToast("FetchSMSDetails"); // Show error message on failure
            }
        });
}
    
// Function to save changes
function saveChanges() {
    const processedData = smsDetails.value
        .map((item) => ({
            vsTemplateId: item.vsTemplateId,
            bActive: item.bActive ? 1 : 0,
            bEnabled: item.bEnabled ? 1 : 0,
            loginId: loginStore.loginDetails.loginId,
        }));
        if (processedData.length > 0) {
        // Update reactive references
        bActive.value = processedData.map(item => item.bActive);
        bEnabled.value = processedData.map(item => item.bEnabled);
        UpdateSmsStatus(processedData, loginStore.loginDetails.loginId);
    }  else {
        toaster.info("No changes found.");
    }

}

function UpdateSmsStatus(processedData, loginId){
    new MQL()
        .useManagementServer()
        .setActivity("o.[ForloopforTemplateId]")
        .setData({ "processedData": processedData,"loginId": loginId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("ForloopforTemplateId", true);
            if (rs.isValid("ForloopforTemplateId")) {
                fetchSMSDetails();
                toaster.success("Changes saved successfully.");
            } else {
                rs.showErrorToast("ForloopforTemplateId");
            }
        });
}	
// Fetch initial data when the component is mounted
onMounted(() => {
    fetchSMSDetails(); // Fetch initial SMS details
});
</script>