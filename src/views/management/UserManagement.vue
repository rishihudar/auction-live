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
            <div class="gap-2 box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label class="fm-label" for="loginEmail">Username</label>
                            <div class="fm-inner">
                                <InputText id="loginEmail" v-model="userDetails.loginEmail" />
                            </div>
                            <div id="loginEmail-help" class="fm-info">Enter your loginEmail</div>
                        </div>
                        <div v-if="$v.userDetails.loginEmail.$error" class="fm-error">
                            {{ $v.userDetails.loginEmail.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <label for="PASSWORD">Password</label>
                            <InputText id="PASSWORD" v-model="userDetails.PASSWORD" type="PASSWORD" />
                            <small id="PASSWORD-help">Enter your PASSWORD</small>
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
                        <div v-if="$v.userDetails.fullName.$error" class="fm-error">
                            {{ $v.userDetails.fullName.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="userDetails.district" option-value="districtId" :options="districtMaster" placeholder="Select District" class="w-full md:w-14rem" />
                            </div>
                        </div>
                        <div v-if="$v.userDetails.districtName.$error" class="fm-error">
                            {{ $v.userDetails.districtName.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="userDetails.entityName" option-value="entityName" :options="entityMaster" placeholder="Select Entity Name" class="w-full md:w-14rem" />
                            </div>
                        </div>
                        <div v-if="$v.userDetails.entityId.$error" class="fm-error">
                            {{ $v.userDetails.entityId.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label class="fm-label" for="entityType">Entity Type</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.entityType" option-value="entityType" :options="entityTypeMaster" placeholder="Select Entity Type" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="userDetails.role" option-value="role" :options="roleMaster" placeholder="Select Role" class="w-full md:w-14rem" />
                            </div>
                        </div>
                        <div v-if="$v.userDetails.roleId.$error" class="fm-error">
                            {{ $v.userDetails.roleId.$errors[0].$message }}
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
                        <div v-if="$v.userDetails.email.$error" class="fm-error">
                            {{ $v.userDetails.email.$errors[0].$message }}
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
                        <div v-if="$v.userDetails.mobile.$error" class="fm-error">
                            {{ $v.userDetails.mobile.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="card flex justify-content-center">
                            <label for="fullName">Branch/Department </label>
                            <Dropdown v-model="userDetails.departmentId" option-value="departmentId" :options="departmentMaster" optionLabel="departmentName" placeholder="Select Branch/Department" class="w-full md:w-14rem" />
                            <small id="email-help">Select your Branch/Department</small>
                        </div>
                        <div v-if="$v.userDetails.departmentName.$error" class="fm-error">
                            {{ $v.userDetails.departmentName.$errors[0].$message }}
                        </div>
                    </div>
                </div>

                <div class="fm-row">
                    <div class="w-1/3">
                        <div class="card flex justify-content-center">
                            <label for="fullName">Designation </label>
                            <Dropdown v-model="userDetails.designationId" option-value="designationId" :options="designationMaster" optionLabel="designationName" placeholder="Select Designation" class="w-full md:w-14rem" />
                            <small id="email-help">Select your Designation</small>
                        </div>
                        <div v-if="$v.userDetails.designationName.$error" class="fm-error">
                            {{ $v.userDetails.designationName.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="w-1/3">
                        <div class="card flex justify-content-center">
                            <label for="fullName">Cadre </label>
                            <Dropdown v-model="userDetails.cadreId" option-value="cadreId" :options="cadreMaster" optionLabel="cadreName" placeholder="Select Cadre" class="w-full md:w-14rem" />
                            <small id="email-help">Select your Cadre</small>
                        </div>
                        <div v-if="$v.userDetails.cadreName.$error" class="fm-error">
                            {{ $v.userDetails.cadreName.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="w-1/3">
                        <div class="card flex justify-content-center">
                            <label for="fullName">organization </label>
                            <Dropdown v-model="userDetails.organizationId" option-value="organizationId" :options="organizationMaster" optionLabel="organizationName" placeholder="Select Cadre" class="w-full md:w-14rem" />
                            <small id="email-help">Select your organization</small>
                          
                        </div>
                        <div v-if="$v.userDetails.organizationId.$error" class="fm-error">
                            {{ $v.userDetails.organizationId.$errors[0].$message }}
                        </div>
                    </div>
                </div>

                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <Button @click="InsertUserData" icon="pi pi-check" label="Submit"></Button>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="fm-group">
                            <Button @click="changeFlag(0)" icon="pi pi-check" label="Cancel"></Button>
                        </div>
                    </div>
                </div>
            </div>


        </template>

        <template v-else-if="flag === 4">
            <!-- ************Upadate Data************** -->
            <div class="gap-2 box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="loginEmail">Username</label>
                            <InputText id="loginEmail" v-model="userDetails.loginEmail" />
                            <small id="loginEmail-help">Enter your loginEmail</small>
                        </div>
                        <div v-if="$v.userDetails.loginEmail.$error" class="fm-error">
                            {{ $v.userDetails.loginEmail.$errors[0].$message }}
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="password">Password</label>
                            <InputText id="password" v-model="userDetails.password" type="password" />
                            <small id="password-help">Enter your password</small>
                        </div>
                        <div v-if="$v.userDetails.password.$error" class="fm-error">
                            {{ $v.userDetails.password.$errors[0].$message }}
                            <label class="fm-label" for="PASSWORD">Password</label>
                            <div class="fm-inner">
                                <InputText id="PASSWORD" v-model="userDetails.PASSWORD" type="PASSWORD" />
                            </div>
                            <div id="PASSWORD-help" class="fm-info">Enter your PASSWORD</div>
                        </div>
                    </div>
                </div>

                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="fullName">Full Name</label>
                            <InputText id="fullName" v-model="userDetails.fullName" />
                            <small id="fullName-help">Enter your full name</small>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label class="fm-label" for="district">District</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.district" option-value="districtId" :options="districtMaster" placeholder="Select District" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label class="fm-label" for="entityName">Entity Name</label>
                            <div class="fm-inner">
                                <Dropdown v-model="userDetails.entityName" option-value="entityName" :options="entityMaster" placeholder="Select Entity Name" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="fm-group">
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="userDetails.entityType" option-value="entityType" :options="entityTypeMaster" placeholder="Select Entity Type" class="w-full md:w-14rem" />
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
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="email">Email ID</label>
                            <InputText id="email" v-model="userDetails.email" />
                            <small id="email-help">Enter your email address</small>
                        </div>
                    </div>
                </div>

                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="mobileNumber">Mobile Number</label>
                            <InputText id="mobileNumber" v-model="userDetails.mobile" />
                            <small id="mobileNumber-help">Enter your mobile number</small>
                        </div>
                    </div>
                    <div class="w-1/2">
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
import { useVuelidate } from '@vuelidate/core';

import { login } from "../../store/modules/login";
import { storeToRefs } from 'pinia'

import { helpers, required } from '@vuelidate/validators'

import faPlus from "../../../assets/icons/plus.svg";
import faPenToSquare from "../../../assets/icons/pen-to-square.svg";

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
        userId: 0,
        cadreId: 0,
        cadreName: '',
        departmentId: 0,
        departmentName: '',
        designationId: 0,
        designationName: '',
        districtName: '',
        email: '',
        entityId: 0,
        entityName: '',
        entityType: '',
        fullName: '' ,
        loginEmail: '',
        mobile: 0,
        password: 0,
        role: '',
        roleId: 0,
        organizationId: 0,
        organizationName:''
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

const UpdateUserData = async () => {
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
                console.log(res.result);
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
        console.log("from the function", userData)
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
        departmentName: {
            required: helpers.withMessage('Department Name is required', required)
        },
        designationName: {
            required: helpers.withMessage('Designation Name is required', required)
        },
        cadreName: {
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
    // console.log("printing excelData: ", excelData)
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
