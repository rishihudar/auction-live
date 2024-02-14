<template>
    <div>
        <template v-if="flag === 0">
            <div class="card">
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
                <template #header>
                    <div class="flex justify-content-between">
                    <div class="mr-auto">
                        <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                        </span>
                    </div>

                    <div class="flex flex-wrap align-items-center justify-content-center">
                        <span class="flex align-items-center">
                        <h1 class="mr-2">Users</h1>
                        </span>
                    </div>

                    <div class="ml-auto">
                        <span class="p-buttonset">
                        <Button @click="$router.push({ name: 'ExcelViewer' })" label="Add through Excel" icon="pi pi-trash" />
                        </span>
                    </div>

                    <div class="ml-auto">
                        <span class="p-buttonset">
                        <Button @click="changeFlag(3)" label="Add" icon="pi pi-trash" />
                        </span>
                    </div>
                    </div>
                </template>

                <template #empty>No users found.</template>

                <template #loading>Loading users data. Please wait.</template>

                

                <!-- Additional columns -->
                <Column field="fullName" header="Full Name" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.fullName }}</template>
                </Column>
                <Column field="districtName" header="District Name" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.districtName }}</template>
                </Column>
                <Column field="PASSWORD" header="PASSWORD" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.PASSWORD }}</template>
                </Column>
                <Column field="mobile" header="Mobile" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.mobile }}</template>
                </Column>
                <Column field="email" header="Email" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.email }}</template>
                </Column>
                <Column field="loginEmail" header="Login Email" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.loginEmail }}</template>
                </Column>
                <Column field="entityName" header="Entity Name" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.entityName }}</template>
                </Column>
                <Column field="entityType" header="Entity Type" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.entityType }}</template>
                </Column>
                <Column field="departmentId" header="Department ID" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.departmentId }}</template>
                </Column>
                <Column field="cadreId" header="Cadre ID" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.cadreId }}</template>
                </Column>
                <Column field="designationId" header="Designation ID" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.designationId }}</template>
                </Column>
                <Column header="Actions"  style="min-width:5rem">
                    <template #body="{ data }">
                        <span class="p-buttonset">
                            <Button @click="handleEditClick(data)" label="Edit" icon="pi pi-trash" />
                        </span>
                        <!-- <span class="p-buttonset">
                            <Button  @click="deleteData(data), reloadPage()" label="Delete" icon="pi pi-trash" />
                        </span> -->
                    </template>
                </Column>

                </DataTable>
            </div>
        </template>
  
  
        <template v-else-if="flag === 3">
            <div class="gap-2 box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="loginEmail">Username</label>
                            <InputText id="loginEmail" v-model="userDetails.loginEmail" />
                            <small id="loginEmail-help">Enter your loginEmail</small>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="PASSWORD">Password</label>
                            <InputText id="PASSWORD" v-model="userDetails.PASSWORD" type="PASSWORD" />
                            <small id="PASSWORD-help">Enter your PASSWORD</small>
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
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="userDetails.district" option-value="districtId" :options="districtMaster" placeholder="Select District" class="w-full md:w-14rem" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="userDetails.entityName" option-value="entityName" :options="entityMaster" placeholder="Select Entity Name" class="w-full md:w-14rem" />
                            </div>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="fm-group">
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="userDetails.entityType" option-value="entityType" :options="entityTypeMaster" placeholder="Select Entity Type" class="w-full md:w-14rem" />
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
                            <label for="branch">Branch/Department</label>
                            <InputText id="branch" v-model="userDetails.departmentId" />
                            <small id="branch-help">Enter your branch/department</small>
                        </div>
                    </div>
                </div>

                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="designation">Designation</label>
                            <InputText id="designation" v-model="userDetails.designationId" />
                            <small id="designation-help">Enter your designation</small>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="cadre">Cadre</label>
                            <InputText id="cadre" v-model="userDetails.cadreId" />
                            <small id="cadre-help">Enter your cadre</small>
                        </div>
                    </div>
                </div>

                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <Button @click="submitForm(userDetails), changeFlag(0), reloadPage()" icon="pi pi-check" label="Submit"></Button>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="fm-group">
                            <Button @click="changeFlag(0), reloadPage()" icon="pi pi-check" label="Cancel"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-else-if="flag === 4">
            <div class="gap-2 box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="loginEmail">Username</label>
                            <InputText id="loginEmail" v-model="userDetails.loginEmail" />
                            <small id="loginEmail-help">Enter your loginEmail</small>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="PASSWORD">Password</label>
                            <InputText id="PASSWORD" v-model="userDetails.PASSWORD" type="PASSWORD" />
                            <small id="PASSWORD-help">Enter your PASSWORD</small>
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
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="userDetails.district" option-value="districtId" :options="districtMaster" placeholder="Select District" class="w-full md:w-14rem" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="userDetails.entityName" option-value="entityName" :options="entityMaster" placeholder="Select Entity Name" class="w-full md:w-14rem" />
                            </div>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="fm-group">
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="userDetails.entityType" option-value="entityType" :options="entityTypeMaster" placeholder="Select Entity Type" class="w-full md:w-14rem" />
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
                            <label for="branch">Branch/Department</label>
                            <InputText id="branch" v-model="userDetails.departmentId" />
                            <small id="branch-help">Enter your branch/department</small>
                        </div>
                    </div>
                </div>

                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="designation">Designation</label>
                            <InputText id="designation" v-model="userDetails.designationId" />
                            <small id="designation-help">Enter your designation</small>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="fm-group">
                            <label for="cadre">Cadre</label>
                            <InputText id="cadre" v-model="userDetails.cadreId" />
                            <small id="cadre-help">Enter your cadre</small>
                        </div>
                    </div>
                </div>

                <div class="fm-row">
                    <div class="w-1/2">
                        <div class="fm-group">
                            <Button @click="submitForm(userDetails), changeFlag(0), reloadPage()" icon="pi pi-check" label="Submit"></Button>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="fm-group">
                            <Button @click="changeFlag(0), reloadPage()" icon="pi pi-check" label="Cancel"></Button>
                        </div>
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