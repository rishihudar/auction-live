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
                <JsonExcel :data="json_data" :fields="processingReportFields" type="xlsx" class="btn btn-primary cursor-pointer" worksheet="My Worksheet" name="UserDetailReport.xlsx">
                    Excel Report
                </JsonExcel>
            </div>
    </div> 
    <div class="page-content">
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
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                        <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
                    </div>
                </template>
            </Paginator>
            <DataTable
                responsiveLayout="scroll"
                v-model:filters="filters"
                :value="json_data"
                paginator
                :rows="10"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                showGridlines
                dataKey="id" 
                :loading="loading"
                :globalFilterFields="['fullName', 'districtName', 'password', 'mobile', 'email', 'loginEmail', 'entityName', 'role', 'departmentName', 'cadreName', 'designationName']"
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
import { ref, onMounted} from "vue";
import MQL from "@/plugins/mql.js";
import JsonExcel from "vue-json-excel3";
import { login } from "../../store/modules/login";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';



const loginStore = login();
let json_data = ref([]);
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
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fullName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    district: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    password: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    mobileNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    emailId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    entityName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    roles: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    branchDepartment: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    cadre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    designation: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

function UserExport() {
        new MQL()
                .useManagementServer()
                .setActivity("r.[UserDetailsReport]")
                .setData({entityId : loginStore.loginDetails.entityId})
                .fetch()
                .then(rs => {
                        let res = rs.getActivity("UserDetailsReport", true)
                        if (rs.isValid("UserDetailsReport")) {
                                json_data.value = res.result;
                        } else {
                                rs.showErrorToast("UserDetailsReport")
                        }
                })
}

onMounted(() => {
        UserExport();
});
// }

</script>

<style></style>
