
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
                        <template #body="{ data }">{{ data.districtName }}</template>
                    </Column>
                    <Column field="password" header="password">
                        <template #body="{ data }">{{ data.password }}</template>
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
                    <Column field="role" header="Role">
                        <template #body="{ data }">{{ data.role }}</template>
                    </Column>
                    <Column field="departmentId" header="Department">
                        <template #body="{ data }">{{ data.departmentName }}</template>
                    </Column>
                    <Column field="cadreId" header="Cadre">
                        <template #body="{ data }">{{ data.cadreName }}</template>
                    </Column>
                    <Column field="designationId" header="Designation">
                        <template #body="{ data }">{{ data.designationName }}</template>
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
                            <div v-if="$v.userDetails.loginEmail.$error" class="fm-error">
                            {{ $v.userDetails.loginEmail.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="password">Password</label>
                            <div class="fm-inner">
                                <InputText id="password" v-model="userDetails.password" type="password" />
                            </div>
                            <div id="password-help" class="fm-info">Enter your password</div>
                            <div v-if="$v.userDetails.password.$error" class="fm-error">
                            {{ $v.userDetails.password.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="fullName">Full Name</label>
                            <div class="fm-inner">
                                <InputText id="fullName" v-model="userDetails.fullName" />
                            </div>
                            <div id="fullName-help" class="fm-info">Enter your full name</div>
                            <div v-if="$v.userDetails.fullName.$error" class="fm-error">
                            {{ $v.userDetails.fullName.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="district">District</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.districtName" option-value="districtName" :options="districtMaster" optionLabel="districtName" placeholder="Select District" />
                            </div>
                            <div id="fullName-help" class="fm-info">Select your District</div>
                            <div v-if="$v.userDetails.districtName.$error" class="fm-error">
                            {{ $v.userDetails.districtName.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="entityName">Entity Name</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.entityId" option-value="entityId" :options="entityMaster" optionLabel="entityName" placeholder="Select Entity Name" />
                            </div>
                            <div id="fullName-help" class="fm-info">Select your Entity</div>
                            <div v-if="$v.userDetails.entityId.$error" class="fm-error">
                            {{ $v.userDetails.entityId.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <!-- <div class="fm-group">
                            <label class="fm-label" for="entityType">Entity Type</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.entityType" option-value="entityType" :options="entityTypeMaster" placeholder="Select Entity Type" />
                            </div>
                        </div> -->

                         <div class="fm-group">
                            <label class="fm-label" for="fullName">organization</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.organizationId" option-value="organizationId" :options="organizationMaster" optionLabel="organizationName" placeholder="Select Cadre"/>
                            </div>
                            <div id="fullName-help" class="fm-info">Select your organization</div>
                            <div v-if="$v.userDetails.organizationId.$error" class="fm-error">
                            {{ $v.userDetails.organizationId.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="role">Role</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.roleId" option-value="roleId" :options="roleMaster" optionLabel="roleName" placeholder="Select Role" />
                            </div>
                            <div id="fullName-help" class="fm-info">Select your Role</div>
                            <div v-if="$v.userDetails.roleId.$error" class="fm-error">
                            {{ $v.userDetails.roleId.$errors[0].$message }}
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
                            <div v-if="$v.userDetails.email.$error" class="fm-error">
                            {{ $v.userDetails.email.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="mobileNumber">Mobile Number</label>
                            <div class="fm-inner">
                                <InputText id="mobileNumber" v-model="userDetails.mobile" />
                            </div>
                            <div id="mobileNumber-help" class="fm-info">Enter your mobile number</div>
                            <div v-if="$v.userDetails.mobile.$error" class="fm-error">
                            {{ $v.userDetails.mobile.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="branch">Branch/Department</label>
                            <div class="fm-inner">
                                <!-- <InputText id="branch" v-model="userDetails.departmentId" /> -->
                                <Dropdown v-model="userDetails.departmentId" option-value="departmentId" :options="departmentMaster" optionLabel="departmentName" placeholder="Select Branch/Department"/>
                            </div>
                            <div id="branch-help" class="fm-info">Enter your branch/department</div>
                            <div v-if="$v.userDetails.departmentId.$error" class="fm-error">
                            {{ $v.userDetails.departmentId.$errors[0].$message }}
                              <!-- {{ $v }} -->
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="designation">Designation</label>
                            <div class="fm-inner">
                                <!-- <InputText id="designation" v-model="userDetails.designationId" /> -->
                                <Dropdown v-model="userDetails.designationId" option-value="designationId" :options="designationMaster" optionLabel="designationName" placeholder="Select Designation"/>
                            </div>
                            <div id="designation-help" class="fm-info">Enter your designation</div>
                            <div v-if="$v.userDetails.designationId.$error" class="fm-error">
                            {{ $v.userDetails.designationId.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="cadre">Cadre</label>
                            <div class="fm-inner">
                                <!-- <InputText id="cadre" v-model="userDetails.cadreId" /> -->
                                <Dropdown v-model="userDetails.cadreId" option-value="cadreId" :options="cadreMaster" optionLabel="cadreName" placeholder="Select Cadre" />
                            </div>
                            <div id="cadre-help" class="fm-info">Enter your cadre</div>
                            <div v-if="$v.userDetails.cadreId.$error" class="fm-error">
                            {{ $v.userDetails.cadreId.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button @click="InsertUserData" label="Submit"></Button>
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
                            <div v-if="$v.userDetails.loginEmail.$error" class="fm-error">
                            {{ $v.userDetails.loginEmail.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="password">Password</label>
                            <div class="fm-inner">
                                <InputText id="password" v-model="userDetails.password" type="password" readonly/>
                            </div>
                            <div id="password-help" class="fm-info">Enter your password</div>
                            <div v-if="$v.userDetails.password.$error" class="fm-error">
                            {{ $v.userDetails.password.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="fullName">Full Name</label>
                            <div class="fm-inner">
                                <InputText id="fullName" v-model="userDetails.fullName" />
                            </div>
                            <div id="fullName-help" class="fm-info">Enter your full name</div>
                            <div v-if="$v.userDetails.fullName.$error" class="fm-error">
                            {{ $v.userDetails.fullName.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="district">District</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.districtName" option-value="districtName" :options="districtMaster" optionLabel="districtName" placeholder="Select District" />
                            </div>
                            <div id="fullName-help" class="fm-info">Select your District</div>
                            <div v-if="$v.userDetails.districtName.$error" class="fm-error">
                            {{ $v.userDetails.districtName.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="entityName">Entity Name</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.entityId" option-value="entityId" :options="entityMaster" optionLabel="entityName" placeholder="Select Entity Name" />
                            </div>
                            <div id="fullName-help" class="fm-info">Select your Entity</div>
                            <div v-if="$v.userDetails.entityId.$error" class="fm-error">
                            {{ $v.userDetails.entityId.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <!-- <div class="fm-group">
                            <label class="fm-label" for="entityType">Entity Type</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.entityType" option-value="entityType" :options="entityTypeMaster" placeholder="Select Entity Type" />
                            </div>
                        </div> -->

                         <div class="fm-group">
                            <label class="fm-label" for="fullName">organization</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.organizationId" option-value="organizationId" :options="organizationMaster" optionLabel="organizationName" placeholder="Select Cadre"/>
                            </div>
                            <div id="fullName-help" class="fm-info">Select your organization</div>
                            <div v-if="$v.userDetails.organizationId.$error" class="fm-error">
                            {{ $v.userDetails.organizationId.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="role">Role</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.roleId" option-value="roleId" :options="roleMaster" optionLabel="roleName" placeholder="Select Role" />
                            </div>
                            <div id="fullName-help" class="fm-info">Select your Role</div>
                            <div v-if="$v.userDetails.roleId.$error" class="fm-error">
                            {{ $v.userDetails.roleId.$errors[0].$message }}
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
                            <div v-if="$v.userDetails.email.$error" class="fm-error">
                            {{ $v.userDetails.email.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="mobileNumber">Mobile Number</label>
                            <div class="fm-inner">
                                <InputText id="mobileNumber" v-model="userDetails.mobile" />
                            </div>
                            <div id="mobileNumber-help" class="fm-info">Enter your mobile number</div>
                            <div v-if="$v.userDetails.mobile.$error" class="fm-error">
                            {{ $v.userDetails.mobile.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="branch">Branch/Department</label>
                            <div class="fm-inner">
                                <!-- <InputText id="branch" v-model="userDetails.departmentId" /> -->
                                <Dropdown v-model="userDetails.departmentId" option-value="departmentId" :options="departmentMaster" optionLabel="departmentName" placeholder="Select Branch/Department"/>
                            </div>
                            <div id="branch-help" class="fm-info">Enter your branch/department</div>
                            <div v-if="$v.userDetails.departmentId.$error" class="fm-error">
                            {{ $v.userDetails.departmentId.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="designation">Designation</label>
                            <div class="fm-inner">
                                <!-- <InputText id="designation" v-model="userDetails.designationId" /> -->
                                <Dropdown v-model="userDetails.designationId" option-value="designationId" :options="designationMaster" optionLabel="designationName" placeholder="Select Designation"/>
                            </div>
                            <div id="designation-help" class="fm-info">Enter your designation</div>
                            <div v-if="$v.userDetails.designationId.$error" class="fm-error">
                            {{ $v.userDetails.designationId.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label class="fm-label" for="cadre">Cadre</label>
                            <div class="fm-inner">
                                <!-- <InputText id="cadre" v-model="userDetails.cadreId" /> -->
                                <Dropdown v-model="userDetails.cadreId" option-value="cadreId" :options="cadreMaster" optionLabel="cadreName" placeholder="Select Cadre" />
                            </div>
                            <div id="cadre-help" class="fm-info">Enter your cadre</div>
                            <div v-if="$v.userDetails.cadreId.$error" class="fm-error">
                            {{ $v.userDetails.cadreId.$errors[0].$message }}
                        </div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button @click="updateUserData" label="Submit"></Button>
                        <Button @click="changeFlag(0), reloadPage()" severity="danger" label="Cancel"></Button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue';
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
import { login } from "../../store/modules/login";
import { storeToRefs } from 'pinia'
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators'

const loginStore = login()
const { loginId } = storeToRefs(loginStore)

const districtMaster = ref([]);
const entityMaster = ref([]);
const roleMaster = ref([]);
const departmentMaster = ref([]);
const designationMaster = ref([]);
const cadreMaster = ref([]);
const organizationMaster = ref([]);
const flag = ref(0)
const loading = ref(true);
const userData = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  fullName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  districtName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  password: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  mobile: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  loginEmail: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  entityName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  role: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  departmentId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  cadreId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  designationId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
// const userDetails = ref({
//     loginEmail: '',
//     password: '',
//     fullName: '',
//     districtName: '',
//     districtId: 0, 
//     entityName: '',
//     entityId:0,
//     entityType: '',
//     role: '',
//     email: '',
//     mobile: '',
//     departmentId: '',
//     designationId: '',
//     cadreId: ''
// });


const userDetails = ref( {
        userId: '',
        cadreId: '',
        cadreName: '',
        departmentId: '',
        departmentName: '',
        designationId: '',
        designationName: '',
        districtName: '',
        email: '',
        entityId: '',
        entityName: '',
        entityType: '',
        fullName: '' ,
        loginEmail: '',
        mobile: '',
        password: '',
        role: '',
        roleId: '',
        organizationId: '',
        organizationName:''
    });

function reloadPage() {
        window.location.reload();
        }

function handleEditClick(rowData) {
      userDetails.value = {...rowData}
      // Switch to the edit mode

      //console.log("Printing rowData: ", rowData)
      //console.log("Printing userDetails: ", userDetails)
      changeFlag(4);
    }

function changeFlag(newValue){
  flag.value = newValue
}

function FetchOrganizationId(){  
		// Automatically generated
			new MQL()
            .useCoreServer()
			.setActivity("o.[FetchOrganizationDetails]")
			.setData()
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchOrganizationDetails",true)
			if (rs.isValid("FetchOrganizationDetails")) {
                organizationMaster.value = res.result
			} else
			 { 
			rs.showErrorToast("FetchOrganizationDetails")
			}
			})
			
}


const InsertUserData = async () => {
    const result = await $v.value.$validate();

    //This is added to set entityId and organizationId to 0 for role SUPER_ADMIN
    // if(userDetails.value.roleId == 2){
    //     console.log("EntityIdBefore: ", userDetails.value.entityId , "OrganizationIdBefore: ", userDetails.value.organizationId) 
    //     userDetails.value.entityId = 0
    //     userDetails.value.organizationId = 0
    //     console.log("EntityIdAfter: ", userDetails.value.entityId , "OrganizationIdAfter: ", userDetails.value.organizationId)
    // }

    if (result) {
	// Automatically generated
    console.log ("login id################: ", loginId.value, userDetails.value)
			new MQL()
            .useCoreServer()
			.setActivity("o.[InsertUserData]")
			.setData({"cadreId":userDetails.value.cadreId,"departmentId":userDetails.value.departmentId,
            "designationId":userDetails.value.designationId,"districtName":userDetails.value.districtName,
            "email":userDetails.value.email,"entityId":userDetails.value.entityId,"fullName": userDetails.value.fullName,
            "loginEmail": userDetails.value.loginEmail,"mobile": userDetails.value.mobile, "password":userDetails.value.password,
            "createdBy":loginId.value,"organizationId":userDetails.value.organizationId,"roleId":userDetails.value.roleId,"userId":userDetails.value.userId})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("InsertUserData",true)
			if (rs.isValid("InsertUserData")) {
                changeFlag(0)
                reloadPage()
			} else
			 { 
			rs.showErrorToast("InsertUserData")
			}
			})
        } else {
        //alert("error, form not submitted")
        // toast.add({ severity: 'error', summary: 'Drafted', detail: 'Please fill all fields', life: 3000 });
    }
			
}

const updateUserData = async () => {
    const result = await $v.value.$validate();

    if (result) {
	// Automatically generated
    console.log ("login id################: ", loginId.value, userDetails.value)
			new MQL()
            .useCoreServer()
			.setActivity("o.[UpdateUserData]")
			.setData({"cadreId":userDetails.value.cadreId,"departmentId":userDetails.value.departmentId,
            "designationId":userDetails.value.designationId,"districtName":userDetails.value.districtName,
            "email":userDetails.value.email,"entityId":userDetails.value.entityId,"fullName": userDetails.value.fullName,
            "loginEmail": userDetails.value.loginEmail,"mobile": userDetails.value.mobile, "password":userDetails.value.password,
            "modifiedBy":loginId.value,"organizationId":userDetails.value.organizationId,"roleId":userDetails.value.roleId,"userId":userDetails.value.userId})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("UpdateUserData",true)
			if (rs.isValid("UpdateUserData")) {
                changeFlag(0)
                reloadPage()
			} else
			 { 
			rs.showErrorToast("UpdateUserData")
			}
			})
        } else {
        //alert("error, form not submitted")
        // toast.add({ severity: 'error', summary: 'Drafted', detail: 'Please fill all fields', life: 3000 });
    }
			
}


function FetchCadreData(){
					// Automatically generated
			new MQL()
            .useCoreServer()
			.setActivity("o.[FetchCadreData]")
			.setData()
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchCadreData",true)
			if (rs.isValid("FetchCadreData")) {
                cadreMaster.value = res.result
			} else
			 { 
			rs.showErrorToast("FetchCadreData")
			}
			})
			
}

function FetchDesignationData(){
					// Automatically generated
			new MQL()
            .useCoreServer()
			.setActivity("o.[FetchDesignationData]")
			.setData()
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchDesignationData",true)
			if (rs.isValid("FetchDesignationData")) {
                designationMaster.value = res.result
			} else
			 { 
			rs.showErrorToast("FetchDesignationData")
			}
			})
			
}
function FetchAllDepartment(){
					// Automatically generated
			new MQL()
            .useCoreServer()
			.setActivity("o.[FetchAllDepartments]")
			.setData()
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchAllDepartments",true)
			if (rs.isValid("FetchAllDepartments")) {
                departmentMaster.value = res.result
			} else
			 { 
			rs.showErrorToast("FetchAllDepartments")
			}
			})
			
}
function FetchRoleData(){		
			new MQL()
            .useCoreServer()
			.setActivity("o.[FetchRoleData]")
			.setData()
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchRoleData",true)
			if (rs.isValid("FetchRoleData")) {
                roleMaster.value = res.result
                console.log("!!!!!!!!!!RoleMaster: ", roleMaster.value)
			} else
			 { 
			rs.showErrorToast("FetchRoleData")
			}
			})
			
}
function FetchEntityData() {
					// Automatically generated
			new MQL()
            .useCoreServer()
			.setActivity("o.[FetchEntityData]")
			.setData()
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchEntityData",true)
			if (rs.isValid("FetchEntityData")) {
                console.log (res.result)
                entityMaster.value = res.result
			} else
			 { 
			rs.showErrorToast("FetchEntityData")
			}
			})
			
}

function FetchDistrictName() {
    new MQL()
    .useCoreServer()
        .setActivity('o.[FetchAllDistrict]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllDistrict', true);
            if (rs.isValid('FetchAllDistrict')) {
                //console.log(res.result);
                districtMaster.value = res.result;

            } else {
                rs.showErrorToast('FetchAllDistrict');
            }
            // loading.value = false; // Move loading to here
        });
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
        //console.log("from the function", userData)
      } else {
        // rs.showErrorToast('FetchAllCountries');
      }
      loading.value = false; // Move loading to here
    });
}


const rules = computed(() => ({
    userDetails: {
        // referenceNo: {
        //     required: helpers.withMessage('Reference Number is required', required)
        // },
        loginEmail: {
            required: helpers.withMessage('Username is required', required)
        },
        password: {
            required: helpers.withMessage('Password is required', required)

        },
        fullName: {
            required: helpers.withMessage('Fullname is required', required)
        },
        districtName: {
            required: helpers.withMessage('District Name is required', required)
        },
        entityId: {
            required: helpers.withMessage('Entity Name is required', required)
        },
        roleId: {
            required: helpers.withMessage('Role is required', required)

        },
        email: {
            required: helpers.withMessage('Email Address is required', required)
        },
        mobile: {
            required: helpers.withMessage('Mobile Number is required', required)
        },
        departmentId: {
            required: helpers.withMessage('Department Name is required', required)
        },
        designationId: {
            required: helpers.withMessage('Designation Name is required', required)
        },
        cadreId: {
            required: helpers.withMessage('Cadre Name is required', required)
        },
        organizationId: {
            required: helpers.withMessage('Organization Name is required', required)
        }
    }
}));

const $v = useVuelidate(rules, { userDetails });

onMounted(async () => {
  try {
    // const response = await fetch('http://localhost:8000/ExcelViewer');
    // const data = await response.json();
    // excelData.value = data;
    // //console.log("printing excelData: ", excelData)
    // if (excelData.value.length > 0) {
    //   fields.value = Object.keys(excelData.value[0]);
    // }
    FetchOrganizationId()
    FetchCadreData()
    FetchDesignationData()
    FetchAllDepartment()
    FetchRoleData()
    FetchEntityData()
    fetchAllUsers()
    FetchDistrictName()
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})
</script>
