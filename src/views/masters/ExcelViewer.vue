<!-- src/components/ExcelViewer.vue -->
<!-- <template>
  <div>
    <template v-if="flag===0"> -->
    <template>
      <div class="card">
          <Toast />
           <!-- <FileUpload
                name="excelFile"
                url="http://localhost:8000/api/upload"
                label="Choose Excel File"
                accept=".xlsx,"
                mode="basic"
                :auto="true"
                :custom-upload="true"
                @uploader="onChange"
              > -->
          <!-- <FileUpload 
              name="userDataSheet" 
              @upload="onAdvancedUpload($event)" 
              :multiple="true" 
              accept=".xls,.csv,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" 
              :maxFileSize="1000000">
              <template #empty>
                  <p>Drag and drop files to here to upload.</p>
              </template>
              
          </FileUpload> -->


          <!-- <FileUpload 
            v-model:files="userDataSheet" 
            @uploader="onAdvancedUpload" 
            multiple 
            accept=".xls,.csv,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" 
            :max-file-size="1000000">
            <template v-slot:empty>
              <p>Drag and drop files here to upload.</p>
            </template>
          </FileUpload> -->
          <FileUpload
            v-model="userDataSheet"
            accept=".xlsx,"
            :multiple="false"
            :max-file-size="200000" 
            :custom-upload="true" 
            @uploader="onAdvancedUpload" 
          />
      </div>


      <div>
        <DataTable :value="excelData"
        showGridlines
        :loading="loading"
        >
          <Column
            v-for="field in fields"
            :key="field"
            :field="field"
            :header="field"
          />
        </DataTable>
      </div>


      <div class="card flex justify-content-center">
        <Button label="Check Unadded Data" @click="visible = true" />
          <Dialog v-model:visible="visible" modal header="Edit Profile" >
              <template #header>
                  <div class="inline-flex align-items-center justify-content-center gap-2">
                    
                      <span class="font-bold white-space-nowrap">Note</span>
                  </div>
              </template>
              <span class="p-text-secondary block mb-5">The Following Users are already Available</span>
              <div class="card">
                  <DataTable :value="products" tableStyle="min-width: 50rem">
                      <Column field="username" header="Username"></Column>
                  </DataTable>
              </div>
              <span class="p-text-secondary block mb-5">Please check manually, and insert the record with Different Username</span>
              <template #footer>
                  <Button label="Ok" text severity="secondary" @click="visible = false, $router.push({ name: 'UserManagement' })" autofocus />              </template>
          </Dialog>
      </div> 
    </template>


    <!-- <template v-else-if="flag === 1">
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
                  <Button @click="changeFlag(0)" label="Add through Excel" icon="pi pi-trash" />
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
                 <span class="p-buttonset">
                    <Button  @click="deleteData(data), reloadPage()" label="Delete" icon="pi pi-trash" />
                </span>
            </template>
          </Column>

        </DataTable>
      </div>
    </template> -->
  
  
    <!-- <template v-else-if="flag === 3">
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
                    <Button @click="submitForm(userDetails), changeFlag(1), reloadPage()" icon="pi pi-check" label="Submit"></Button>
                </div>
            </div>
            <div class="w-1/2">
                <div class="fm-group">
                    <Button @click="changeFlag(1), reloadPage()" icon="pi pi-check" label="Cancel"></Button>
                </div>
            </div>
        </div>
    </div>
  </template> -->

  <!-- <template v-else-if="flag === 4">
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
  </template> -->
<!-- </div>
</template> -->


  <script setup>
import { ref, onMounted } from 'vue';
//import { FilterMatchMode } from 'primevue/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import FileUpload from 'primevue/fileupload';
import { useToast } from "primevue/usetoast";
//import MQL from '@/plugins/mql.js';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import * as XLSX from "xlsx";
import Dropdown from 'primevue/dropdown';

const userDataSheet = ref([]);
const products = ref([]); // Your products array
const visible = ref(false);
const excelData = ref([]);
const fields = ['Username', 'Password', 'Full Name', 'District', 'Entity Name', 'Entity Type', 'Role', 'Email ID', 'Mobile Number', 'Branch/Department', 'Designation', 'Cadre'];
const toast = useToast();
// const flag = ref(0)
const loading = ref(true);
// const userData = ref([]); // Your data array

// const userDetails = ref({
//     loginEmail: '',
//     PASSWORD: '',
//     fullName: '',
//     district: '',
//     entityName: '',
//     entityType: '',
//     role: '',
//     email: '',
//     mobile: '',
//     departmentId: '',
//     designationId: '',
//     cadreId: ''
// });

// const filters = ref({
//   global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//   fullName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//   districtName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//   PASSWORD: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//   mobile: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//   email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//   loginEmail: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//   entityName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//   entityType: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//   departmentId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//   cadreId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//   designationId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
// });


function reloadPage() {
        window.location.reload();
        }

// function handleEditClick(rowData) {
//       userDetails.value = {...rowData}
//       // Switch to the edit mode

//       console.log("Printing rowData: ", rowData)
//       console.log("Printing userDetails: ", userDetails)
//       changeFlag(4);
//     }

// function changeFlag(newValue){
//   flag.value = newValue
// }

// function fetchAllUsers(){
//   new MQL()
//     .setActivity('o.[FetchAllUsers]')
//     .setData()
//     .fetch()
//     .then((rs) => {
//       let res = rs.getActivity('FetchAllUsers', true);
//       if (rs.isValid('FetchAllUsers')) {
//         userData.value = res.result;
//         console.log("from the function", userData)
//       } else {
//         // rs.showErrorToast('FetchAllCountries');
//       }
//       loading.value = false; // Move loading to here
//     });
// }

  onMounted(async () => {
//   try {
//     // const response = await fetch('http://localhost:8000/ExcelViewer');
//     // const data = await response.json();
//     // excelData.value = data;
//     // console.log("printing excelData: ", excelData)
//     // if (excelData.value.length > 0) {
//     //   fields.value = Object.keys(excelData.value[0]);
//     // }
//     fetchAllUsers()
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
  })

// async function onAdvancedUpload(event) {
//   const files = event.target.files;
//   const formData = new FormData();

//   for (let i = 0; i < files.length; i++) {
//     formData.append('files', files[i]);
//   }

//   try {
//     const response = await fetch('http://localhost:8000/api/upload', {
//       method: 'POST',
//       body: formData
//     });

//     if (response.ok) {
//       console.log('Files uploaded successfully');
//       // You can perform additional actions upon successful upload
//     } else {
//       console.error('Failed to upload files');
//       // Handle error cases
//     }
//   } catch (error) {
//     console.error('Error uploading files:', error);
//   }
// }

const onAdvancedUpload = async (event) => {
  try {
    const formData = new FormData();
    userDataSheet.value.push(...event.files);
    // Check if there are any selected files
    if (userDataSheet.value.length === 0) {
      console.error('No files selected', userDataSheet);
      return;
    }

  try {
    const files = event.files;

    if (files.length === 0) {
      console.error('No files selected');
      return;
    }

    const newExcelDataArray = [];

    for (const file of files) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
        const headerRow = jsonData[0];

        const formattedData = jsonData.slice(1).map((row) => {
          const rowData = {};
          headerRow.forEach((column, index) => {
            rowData[column] = row[index];
          });
          return rowData;
        });

        newExcelDataArray.push(...formattedData);
        excelData.value = [...newExcelDataArray]; // Ensure reactivity by creating a new array
        console.log("Printing excelData: ", excelData)
      };

      reader.readAsArrayBuffer(file);
      loading.value = false; // Move loading to here
    }
  } catch (error) {
    console.error('Error processing files:', error);
  }


    // Append each selected file to the FormData object
    userDataSheet.value.forEach(file => {
      formData.append('userDataSheet', file);
    });

    // Send the FormData object to the backend
    const response = await fetch('http://localhost:8000/api/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('Files uploaded successfully', response);
      // Handle the response and set the products variable
      const data = await response.json();
      products.value = data;
      console.log("Pringing the response ", products.value)
      //products.value = response.result
      //changeFlag(2)
    } else {
      // Handle non-200 response status
      console.error('Failed to upload files');
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      // Handle user-aborted request
      console.log('Request aborted by the user');
    } else {
      // Handle other types of errors
      console.error('Error uploading files:', error);
    }
  }
}




</script>



  <style scoped>
  /* Add your styles if needed */
  .custom-file-upload {
    @apply flex items-center h-[var(--fm-height)] gap-3;
}
  </style>
  