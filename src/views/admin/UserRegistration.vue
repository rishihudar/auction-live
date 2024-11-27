<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Add User</h2>
            </div>
        </div>
        <div class="card">
            <!-- <div class="card-header">
                <div class="ch-title">Add</div>
            </div> -->
            <Toast/>
            <div class="form-grid">
                <div class="col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="loginEmail">Username</label>
                        <div class="fm-inner">
                            <InputText id="loginEmail" v-model="userDetails.loginEmail" />
                        </div>
                        <div id="loginEmail-help" class="fm-info">Enter your Username</div>
                        <div v-if="$v.userDetails.loginEmail.$error" class="fm-error">
                        {{ $v.userDetails.loginEmail.$errors[0].$message }}
                    </div>
                    </div>
                </div>
                <div class="col-span-6">
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
                <div class="col-span-6">
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
                <!-- <div class="col-span-4">
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
                </div> -->
                <!-- <div class="col-span-4"> -
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
                </div> -->
                <div class="col-span-6">
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
                <div class="col-span-6">
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
                <div class="col-span-6">
                    <div class="fm-group">
                        <label class="fm-label" for="role">Role</label>
                        <div class="fm-inner">
                            <!-- <Dropdown v-model="userDetails.roleId" option-value="roleId" :options="roleMaster" optionLabel="roleName" placeholder="Select Role" /> -->
                            <MultiSelect v-model="selectedRoles" :options="roleMaster" optionLabel="label"
                            placeholder="Select Roles" class="w-full md:w-20rem"/>
                        </div>
                        <div id="fullName-help" class="fm-info">Select your Role</div>
                        <div v-if="$v.userDetails.roleId.$error" class="fm-error">
                        {{ $v.userDetails.roleId.$errors[0].$message }}
                    </div>
                    </div>
                </div>
                <div class="col-span-6">
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
                <div class="col-span-6">
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
                <div class="col-span-6">
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
                <div class="col-span-6">
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
                <!-- <div class="fm-action"> -->
                    <div class="col-span-6">
                        <div class="fm-group">
                            <Button @click="InsertUserData" label="Submit"></Button>
                        </div>
                    </div>
                    <div class="col-span-6">
                        <div class="fm-group">
                            <Button @click="navigateToAddUser" severity="danger" label="Cancel"></Button>
                        </div>
                    </div>
                    <!-- <Button @click="changeFlag(0), reloadPage()" severity="danger" label="Cancel"></Button> -->
                <!-- </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed } from 'vue';
import MQL from '@/plugins/mql.js';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { login } from "../../store/modules/login";
import { helpers, required } from '@vuelidate/validators';
import MultiSelect from 'primevue/multiselect';
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const router = useRouter();

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
const userId = ref('');
const loginStore = login()
const { loginId } = storeToRefs(loginStore)
const selectedRoles = ref([]);
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
const toast = useToast();



function orgnizationIdAndEntityId(){
    console.log("organizationId: ", userDetails.value.organizationId, "entityId: ", userDetails.value.entityId)
    userDetails.value.organizationId = loginStore.loginDetails.organizationId
    userDetails.value.entityId = loginStore.loginDetails.entityId
    userDetails.value.roleId = selectedRoles.value[0].value
    console.log("organizationId: ", userDetails.value.organizationId, "entityId: ", userDetails.value.entityId)
}

function sendData(userId) {
  var data = [];
  selectedRoles.value.map((el) => {
      data.push({
        roleId: el.value,
        userId: userId,
        createdBy: loginId.value
      });
    });
    return data
}

function navigateToAddUser() {
    router.push({ name: "UserExport" });
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

function reloadPage() {
    window.location.reload();
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
			.setActivity("o.[FetchRole]")
			.setData({"userType":"User"})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchRole",true)
			if (rs.isValid("FetchRole")) {
                // roleMaster.value = res.result
                roleMaster.value = res.result.map((el)=>{
                  return{
                    label:el.roleName,
                    value:el.roleId
                  }
                })
			} else
			 { 
			rs.showErrorToast("FetchRole")
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

const InsertUserData = async () => {
    console.log("########userDetails: ", userDetails.value)
    orgnizationIdAndEntityId()
    console.log("########selectedRoleId: ", selectedRoles.value)
    const result = await $v.value.$validate();

    if (result) {
	// Automatically generated
    console.log ("login id################: ", loginId.value, userDetails.value)
			new MQL()
            .useCoreServer()
			.setActivity("o.[InsertUser]")
			.setData({"cadreId":userDetails.value.cadreId,"departmentId":userDetails.value.departmentId,
            "designationId":userDetails.value.designationId,"districtName":userDetails.value.districtName,
            "email":userDetails.value.email,"entityId":userDetails.value.entityId,"fullName": userDetails.value.fullName,
            "loginEmail": userDetails.value.loginEmail,"mobile": userDetails.value.mobile, "password":userDetails.value.password,
            "createdBy":loginId.value,"organizationId":userDetails.value.organizationId,"roleId":userDetails.value.roleId, "userId":userDetails.value.userId})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("InsertUser",true)
			if (rs.isValid("InsertUser")) {
                console.log("User Inserted for auctionId: ", res.result.objectId)
                userId.value = res.result.objectId
                var data=sendData(userId.value)
                console.log("########data: ", data)
                UserRoleMapping(data)
                console.log("User role mapping completed")
			} else
			 { 
			// rs.showErrorToast("InsertUser")
            toast.add({ severity: 'error', summary: 'Drafted', detail: 'Username Aready Present, Please try with different Username', life: 3000 });
			}
			})
        } else {
        //alert("error, form not submitted")
        // toast.add({ severity: 'error', summary: 'Drafted', detail: 'Please fill all fields', life: 3000 });
    }
			
}

function UserRoleMapping(data){
    console.log("########data: ", data)
    new MQL()
    .useCoreServer()
    .setActivity("o.[UserRoleMapping]")
    .setData({"data":data})
    .fetch()
    .then(rs => {
        let res = rs.getActivity("UserRoleMapping",true)
        if (rs.isValid("UserRoleMapping")) {
            console.log("UserRoleMapping", res.result)
            toast.add({ severity: 'success', summary: 'Success', detail: 'User Added Successfully', life: 3000 });
        } else
         { 
        rs.showErrorToast("UserRoleMapping")
        }
    })
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
    // fetchAllUsers()
    FetchDistrictName()
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})

</script>
