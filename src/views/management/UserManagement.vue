<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Users</h2>
            </div>
            <div class="ph-action">
                <Button @click="$router.push({ name: 'ExcelViewer' })" class="btn btn-primary btn-add">
                    <fa-plus></fa-plus>
                    Add through Excel
                </Button>
                <Button @click="changeFlag(3)" class="btn btn-primary btn-add">
                    <fa-plus></fa-plus>
                    Add
                </Button>
            </div>
        </div>
        <template v-if="flag === 0">
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
                    :value="userData"
                    paginator
                    :rows="10"
                    :rowsPerPageOptions="[5, 10, 20, 50]"
                    showGridlines
                    dataKey="id" 
                    :loading="loading"
                    :globalFilterFields="['fullName', 'districtName', 'PASSWORD', 'mobile', 'email', 'loginEmail', 'entityName', 'entityType', 'departmentId', 'cadreId', 'designationId']"
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
                        <template #body="{ data }">{{ data.districtName }}</template>
                    </Column>
                    <Column field="PASSWORD" header="PASSWORD">
                        <template #body="{ data }">{{ data.PASSWORD }}</template>
                    </Column>
                    <Column field="mobile" header="Mobile">
                        <template #body="{ data }">{{ data.mobile }}</template>
                    </Column>
                    <Column field="email" header="Email">
                        <template #body="{ data }">{{ data.email }}</template>
                    </Column>
                    <Column field="loginEmail" header="Login Email">
                        <template #body="{ data }">{{ data.loginEmail }}</template>
                    </Column>
                    <Column field="entityName" header="Entity Name">
                        <template #body="{ data }">{{ data.entityName }}</template>
                    </Column>
                    <Column field="entityType" header="Entity Type">
                        <template #body="{ data }">{{ data.entityType }}</template>
                    </Column>
                    <Column field="departmentId" header="Department">
                        <template #body="{ data }">{{ data.departmentId }}</template>
                    </Column>
                    <Column field="cadreId" header="Cadre">
                        <template #body="{ data }">{{ data.cadreId }}</template>
                    </Column>
                    <Column field="designationId" header="Designation">
                        <template #body="{ data }">{{ data.designationId }}</template>
                    </Column>
                    <Column header="Actions">
                        <template #body="{ data }">
                            <Button @click="handleEditClick(data)" severity="secondary" class="btn-sm">
                                <fa-pen-to-square></fa-pen-to-square>Edit
                            </Button>
                            <!-- <span class="p-buttonset">
                                <Button  @click="deleteData(data), reloadPage()" label="Delete" icon="pi pi-trash" />
                            </span> -->
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
        </template>

        <template v-else-if="flag === 3">
            <div class="card">
                <div class="card-header">
                    <div class="ch-title">Add</div>
                </div>
                <div class="form-grid">
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="loginEmail">Username</label>
                            <div class="fm-inner">
                                <InputText id="loginEmail" v-model="userDetails.loginEmail" />
                            </div>
                            <div id="loginEmail-help" class="fm-info">Enter your loginEmail</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="PASSWORD">Password</label>
                            <div class="fm-inner">
                                <InputText id="PASSWORD" v-model="userDetails.PASSWORD" type="PASSWORD" />
                            </div>
                            <div id="PASSWORD-help" class="fm-info">Enter your PASSWORD</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="fullName">Full Name</label>
                            <div class="fm-inner">
                                <InputText id="fullName" v-model="userDetails.fullName" />
                            </div>
                            <div id="fullName-help" class="fm-info">Enter your full name</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="district">District</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.district" option-value="districtId" :options="districtMaster" placeholder="Select District" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="entityName">Entity Name</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.entityName" option-value="entityName" :options="entityMaster" placeholder="Select Entity Name" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="entityType">Entity Type</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.entityType" option-value="entityType" :options="entityTypeMaster" placeholder="Select Entity Type" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="role">Role</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.role" option-value="role" :options="roleMaster" placeholder="Select Role" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="email">Email ID</label>
                            <div class="fm-inner">
                                <InputText id="email" v-model="userDetails.email" />
                            </div>
                            <div id="email-help" class="fm-info">Enter your email address</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="mobileNumber">Mobile Number</label>
                            <div class="fm-inner">
                                <InputText id="mobileNumber" v-model="userDetails.mobile" />
                            </div>
                            <div id="mobileNumber-help" class="fm-info">Enter your mobile number</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="branch">Branch/Department</label>
                            <div class="fm-inner">
                                <InputText id="branch" v-model="userDetails.departmentId" />
                            </div>
                            <div id="branch-help" class="fm-info">Enter your branch/department</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="designation">Designation</label>
                            <div class="fm-inner">
                                <InputText id="designation" v-model="userDetails.designationId" />
                            </div>
                            <div id="designation-help" class="fm-info">Enter your designation</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="cadre">Cadre</label>
                            <div class="fm-inner">
                                <InputText id="cadre" v-model="userDetails.cadreId" />
                            </div>
                            <div id="cadre-help" class="fm-info">Enter your cadre</div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button @click="submitForm(userDetails), changeFlag(0), reloadPage()" label="Submit"></Button>
                        <Button @click="changeFlag(0), reloadPage()" severity="danger" label="Cancel"></Button>
                    </div>
                </div>
            </div>
        </template>

        <template v-else-if="flag === 4">
            <div class="card">
                <div class="card-header">
                    <div class="ch-title">Edit</div>
                </div>
                <div class="form-grid">
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="loginEmail">Username</label>
                            <div class="fm-inner">
                                <InputText id="loginEmail" v-model="userDetails.loginEmail" />
                            </div>
                            <div id="loginEmail-help" class="fm-info">Enter your loginEmail</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="PASSWORD">Password</label>
                            <div class="fm-inner">
                                <InputText id="PASSWORD" v-model="userDetails.PASSWORD" type="PASSWORD" />
                            </div>
                            <div id="PASSWORD-help" class="fm-info">Enter your PASSWORD</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="fullName">Full Name</label>
                            <div class="fm-inner">
                                <InputText id="fullName" v-model="userDetails.fullName" />
                            </div>
                            <div id="fullName-help" class="fm-info">Enter your full name</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="district">District</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.district" option-value="districtId" :options="districtMaster" placeholder="Select District" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="entityName">Entity Name</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.entityName" option-value="entityName" :options="entityMaster" placeholder="Select Entity Name" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="entityType">Entity Type</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.entityType" option-value="entityType" :options="entityTypeMaster" placeholder="Select Entity Type" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="role">Role</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.role" option-value="role" :options="roleMaster" placeholder="Select Role" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="email">Email ID</label>
                            <div class="fm-inner">
                                <InputText id="email" v-model="userDetails.email" />
                            </div>
                            <div id="email-help" class="fm-info">Enter your email address</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="mobileNumber">Mobile Number</label>
                            <div class="fm-inner">
                                <InputText id="mobileNumber" v-model="userDetails.mobile" />
                            </div>
                            <div id="mobileNumber-help" class="fm-info">Enter your mobile number</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="branch">Branch/Department</label>
                            <div class="fm-inner">
                                <InputText id="branch" v-model="userDetails.departmentId" />
                            </div>
                            <div id="branch-help" class="fm-info">Enter your branch/department</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="designation">Designation</label>
                            <div class="fm-inner">
                                <InputText id="designation" v-model="userDetails.designationId" />
                            </div>
                            <div id="designation-help" class="fm-info">Enter your designation</div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="cadre">Cadre</label>
                            <div class="fm-inner">
                                <InputText id="cadre" v-model="userDetails.cadreId" />
                            </div>
                            <div id="cadre-help" class="fm-info">Enter your cadre</div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button @click="submitForm(userDetails), changeFlag(0), reloadPage()" label="Submit"></Button>
                        <Button @click="changeFlag(0), reloadPage()" severity="danger" label="Cancel"></Button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import FileUpload from 'primevue/fileupload';
import { useToast } from "primevue/usetoast";
import MQL from '@/plugins/mql.js';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import * as XLSX from "xlsx";
import Dropdown from 'primevue/dropdown';

import faPlus from "../../../assets/icons/plus.svg";
import faPenToSquare from "../../../assets/icons/pen-to-square.svg";

const flag = ref(0)
const loading = ref(true);
const userData = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  fullName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  districtName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  PASSWORD: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  mobile: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  loginEmail: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  entityName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  entityType: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  departmentId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  cadreId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  designationId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
const userDetails = ref({
    loginEmail: '',
    PASSWORD: '',
    fullName: '',
    district: '',
    entityName: '',
    entityType: '',
    role: '',
    email: '',
    mobile: '',
    departmentId: '',
    designationId: '',
    cadreId: ''
});

function reloadPage() {
        window.location.reload();
        }

function handleEditClick(rowData) {
      userDetails.value = {...rowData}
      // Switch to the edit mode

      console.log("Printing rowData: ", rowData)
      console.log("Printing userDetails: ", userDetails)
      changeFlag(4);
    }

function changeFlag(newValue){
  flag.value = newValue
}

function fetchAllUsers(){
  new MQL()
    .useCoreServer()
    .setActivity('o.[FetchAllUsers]')
    .setData()
    .fetch()
    .then((rs) => {
      let res = rs.getActivity('FetchAllUsers', true);
      if (rs.isValid('FetchAllUsers')) {
        userData.value = res.result;
        console.log("from the function", userData)
      } else {
        // rs.showErrorToast('FetchAllCountries');
      }
      loading.value = false; // Move loading to here
    });
}

onMounted(async () => {
  try {
    // const response = await fetch('http://localhost:8000/ExcelViewer');
    // const data = await response.json();
    // excelData.value = data;
    // console.log("printing excelData: ", excelData)
    // if (excelData.value.length > 0) {
    //   fields.value = Object.keys(excelData.value[0]);
    // }
    fetchAllUsers()
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})
</script>
