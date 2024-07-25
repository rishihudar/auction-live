<template>
    <!-- <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">User Detail Report</h2>
            </div>
        </div>
        <div class="fm-action">
            <JsonExcel :data="json_data" :fields="processingReportFields" type="xlsx" class="btn btn-primary cursor-pointer" worksheet="My Worksheet" name="UserDetailReport.xlsx">
                Excel Report
            </JsonExcel>
        </div>
        <div class="box-grid">
            <div class="card col-span-6">
                <div class="form-grid">
                    <div class="col-span-full">
                        <div class="fm-group">
                            <label class="fm-label">Select Date</label>
                            <div class="fm-inner">
                                <Calendar v-model="dates" selectionMode="range" :manualInput="false" :maxDate="currentDate2" :show-icon="true"
                                    @date-select="MISProcessingFeeReport" />
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    </div> -->
    <div class="page-header">
            <div class="ph-text">
                <h2 class="title">User Detail Report</h2>
            </div>
        
            <div class="ph-action">
                <JsonExcel :data="product" :fields="processingReportFields" type="xlsx" class="btn btn-primary cursor-pointer" worksheet="My Worksheet" name="UserDetailReport.xlsx">
                    Excel Report
                </JsonExcel>
            </div>
    </div> 
    <div class="page-content">
        <div class="table-custom">
            <Paginator
                class="pagination-up"
                :rows="perPage"
                :rowsPerPageOptions="[5, 10, 20, 30]"
                :totalRecords="totalRows"
                template="RowsPerPageDropdown"
                @page="handlePageChange"
            >
                <template #start>
                    <div class="fm-inner">
                        <InputText v-model="filter" placeholder="Search By anything" />
                        <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
                    </div>
                </template>
            </Paginator>
            <DataTable
                v-model:expandedRows="expandedRows"
                :value="json_data"
                showGridlines
            >
                <template #empty>
                    <div class="box-watermark">
                        No users found.
                    </div>
                </template>
                <template #loading>Loading users data. Please wait.</template>

                <!-- Additional columns -->
                <Column field="fullName" header="Full Name">
                    <template #body="{ data }">{{ data.fullName }}</template>
                </Column>
                <Column field="districtName" header="District Name">
                    <template #body="{ data }">{{ data.district }}</template>
                </Column>
                <Column field="password" header="password">
                    <template #body="{ data }">{{ data.password }}</template>
                </Column>
                <Column field="mobile" header="Mobile">
                    <template #body="{ data }">{{ data.mobileNumber }}</template>
                </Column>
                <Column field="email" header="Email">
                    <template #body="{ data }">{{ data.emailId }}</template>
                </Column>
                <Column field="username" header="Username">
                    <template #body="{ data }">{{ data.username }}</template>
                </Column>
                <Column field="entityName" header="Entity Name">
                    <template #body="{ data }">{{ data.entityName }}</template>
                </Column>
                <Column field="role" header="Role">
                    <template #body="{ data }">{{ data.roles }}</template>
                </Column>
                <Column field="departmentId" header="Department">
                    <template #body="{ data }">{{ data.branchDepartment }}</template>
                </Column>
                <Column field="cadreId" header="Cadre">
                    <template #body="{ data }">{{ data.cadre }}</template>
                </Column>
                <Column field="designationId" header="Designation">
                    <template #body="{ data }">{{ data.designation }}</template>
                </Column>
                <!-- <Column header="Actions">
                    <template #body="{ data }">
                        <Button @click="handleEditClick(data)" severity="secondary" class="btn-sm">
                            <fa-pen-to-square></fa-pen-to-square>Edit
                        </Button>
                        <span class="p-buttonset">
                            <Button  @click="deleteData(data), reloadPage()" label="Delete" icon="pi pi-trash" />
                        </span>
                    </template>
                </Column> -->
            </DataTable>
            <Paginator
                class="pagination-down"
                :rows="perPage"
                :rowsPerPageOptions="[5, 10, 20, 30]"
                :totalRecords="totalRows"
                template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                @page="handlePageChange"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted} from "vue";
import MQL from "@/plugins/mql.js";
import JsonExcel from "vue-json-excel3";
import { login } from "../../store/modules/login";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';

const expandedRows = ref([]);
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);
const filter = ref("");
const loginStore = login();
let json_data = ref([]);
let product = ref([]);
const processingReportFields = {  
    'Username':'username',
    'Password': 'password',
    'Full Name': 'fullName',
    'District': 'district',
    'Entity Name': 'entityName',
    'Organization Name': 'organizationName',
    'Roles': 'roles',
    'Email Id': 'emailId',
    'Mobile Number': 'mobileNumber',
    'Branch/Department': 'branchDepartment',
    'Designation':  'designation',
    'Cadre': 'cadre',
};

function handlePageChange(event) {
  currentPage.value = event.page;
  perPage.value = event.rows;
  console.log("event.page", event.page);
  UserExportedData();
}

function UserExportedData() {
        new MQL()
                .useManagementServer()
                .setActivity("r.[UserDetailsReport]")
                .setData({
                    entityId : loginStore.loginDetails.entityId,
                    filter: "%" + filter.value.trim() + "%",
                    skip: String(currentPage.value * perPage.value),
                    limit: String(perPage.value),
                })
                .fetch()
                .then(rs => {
                        let res = rs.getActivity("UserDetailsReport", true)
                        if (rs.isValid("UserDetailsReport")) {
                                json_data.value = res.result.userData;
                                totalRows.value = res.result.rowCount.totalRows;
                                console.log("json_data************",json_data.value);
                                console.log(totalRows.value);
                                for (var i = 0; i < json_data.value.length; i++) {
                                json_data.value[i].srNo = currentPage.value * perPage.value + i + 1;
                                console.log("SrNo-", currentPage.value * perPage.value + i + 1);
                                }
                        } else {
                                rs.showErrorToast("UserDetailsReport")
                        }
                })
}

function UserExport() {
    new MQL()
        .useManagementServer()
        .setActivity("r.[FetchUserData]")
        .setData({
            entityId : loginStore.loginDetails.entityId
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchUserData", true)
            if (rs.isValid("FetchUserData")) {
                product.value = res.result;
                console.log("product************",product.value);
            } else {
                rs.showErrorToast("FetchUserData")
            }
        })
}

onMounted(() => {
    UserExportedData();
    UserExport();
});
// }

</script>

<style></style>
