<template>
    
    <div class="card">
        <div class="card-header">
            <div class="ch-title">User Role Management</div>
        </div>
        <div class="form-grid">
            <div class="col-span-4">
                <div class="fm-group">
                    <div class="fm-inner">
                        <Dropdown
                            v-model="selectedUser" 
                            variant="filled" :options="userData" optionLabel="userEmail"
                            placeholder="Select User" 
                            @change="onChange"
                            />
                    </div>
                    <div v-if="$v.selectedUser.$error" class="fm-error">
                        {{ $v.selectedUser.$errors[0].$message }}
                    </div>
                </div>
            </div>
            <div class="col-span-4">
                <div class="fm-group">
                    <!-- <label class="fm-label" for="role">Bidders</label> -->
                    <div class="fm-inner">
                        <MultiSelect v-model="selectedRole" :options="roleMaster" optionLabel="label"
                            placeholder="Select Roles" class="w-full md:w-20rem" />
                    </div>
                    <!-- <div id="fullName-help" class="fm-info">Select Bidders</div> -->
                    <div v-if="$v.selectedRole.$error" class="fm-error">
                        {{ $v.selectedRole.$errors[0].$message }}
                    </div>
                </div>
            </div>
            <div class="col-span-4">
                <!-- <label class="fm-label" for="role">.</label> -->
                <div class="fm-group">
                    <Button @click="openModal()" label="Save"></Button>
                </div>
            </div>
        </div>
    </div>
    <Toast />
    <div>
        <Dialog v-model:visible="visible" modal header="Confirm Role Mapping" :style="{ width: '50rem' }">

            <div>
                <span>Are you sure you want to assign selected roles {{ labelsArray }} to the selected User [{{ lableUser }}] ?</span>
            </div>

            <div class="fm-action  fm-action-center">
                <Button severity="danger" @click="visible = false" label="Close"></Button>
                <Button @click="SaveRoleMapping" label="Save"></Button>
            </div>

        </Dialog>
    </div>
    <div class="table-custom" v-if="showTable">
        <DataTable :value="userRoleData" resizableColumns
            columnResizeMode="fit" showGridlines tableStyle="min-width: 50rem">
            <Column field="userName" header="User"></Column>
            <Column field="roleName" header="Role Mapped"></Column>
            <Column field="enableStatus" header="Status"></Column>
            <Column field="action" header="Action">
                <template #body="slotProps">
                    <Button severity="danger" v-if="slotProps.data.enableStatus == 'Active'"  class="btn-sm" @click="openRoleDesablingModal(slotProps.data)">
                        Disable
                    </Button>
                    <Button severity="success" v-if="slotProps.data.enableStatus == 'Inactive'" class="btn-sm" @click="openRoleEnablingModal(slotProps.data)">
                        Enable
                    </Button>
                </template>
            </Column>
        </DataTable>
    </div>
    <div>
        <Dialog v-model:visible="visible1" modal header="Confirm Role Disabling" :style="{ width: '50rem' }">

            <div>
                <span>Are you sure you want to Disable selected role [{{ labelRole }}] to the selected User [{{ lableUser }}] ?</span>
            </div>

            <div class="fm-action  fm-action-center">
                <Button severity="danger" @click="visible1 = false" label="Close"></Button>
                <Button @click="disableRole(selectedRoleData)" label="Save"></Button>
            </div>

        </Dialog>
    </div>
    <div>
        <Dialog v-model:visible="visible2" modal header="Confirm Role Enabling" :style="{ width: '50rem' }">

            <div>
                <span>Are you sure you want to Enable selected role [{{ labelRole }}] to the selected User [{{ lableUser }}] ?</span>
            </div>

            <div class="fm-action  fm-action-center">
                <Button severity="danger" @click="visible2 = false" label="Close"></Button>
                <Button @click="enableRole(selectedRoleData)" label="Save"></Button>
            </div>

        </Dialog>
    </div>

</template>


<script setup>
import { useVuelidate } from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import MQL from '@/plugins/mql.js';
import Button from 'primevue/button';
import { login } from "../../store/modules/login";
import { helpers, required } from '@vuelidate/validators';
import MultiSelect from 'primevue/multiselect';
import { useToast } from "primevue/usetoast";
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';


// variables 
const selectedRole = ref([]);
const roleMaster = ref([]);
const loginStore = login()
const { loginId } = storeToRefs(loginStore)
const toast = useToast();
const visible = ref(false)
const userData = ref([])
const selectedUser = ref({})
var data = []
var labelsArray = ref([])
var lableUser = ref('')
var labelRole = ref('')
const visible1 = ref(false)
const visible2 = ref(false)
const showTable = ref(false)
const userRoleData = ref([{
    userName: '',
    userId: '',
    roleName: '',
    roleId: '',
    enableStatus: ''
}])
const selectedRoleData = ref({})



 // Functions

 // Function to handle change event of the dropdown and fetch the user role details
 const onChange = (event) => {
    console.log("selectedUser", selectedUser.value)
    fetchUserRoleDetails()
    };

    
// Function to send data to the API
function sendData() {
    var data = [];
    selectedRole.value.map((el) => {
        data.push({
            roleId: el.value,
            createdBy: loginId.value,
            userId: selectedUser.value.userId
        });
    });
    return data
}

// Function to open the modal and validate the form
const openModal = async () => {
    const result = await $v.value.$validate();
    // Extract only the labels into a new array
    labelsArray = ref(selectedRole.value.map(item => item.label));
    console.log("labelsArray", labelsArray.value)
    lableUser = selectedUser.value.userEmail
    console.log("selectedUser.value", selectedUser.value)
    if (selectedRole.value.length == 0 || !result) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please select at least one User and role', life: 3000 });
    } else {
        console.log("selectedRole.value", selectedRole.value)
        data = sendData()
        console.log("data", data)
        visible.value = true
    }
}


// Function to open the modal for disabling the role for the user
const openRoleDesablingModal = async (data) => {
    console.log("data", data)
    labelRole = data.roleName
    lableUser = data.userName
    selectedRoleData.value = data
    visible1.value = true
}

// Function to open the modal for enabling the role for the user
const openRoleEnablingModal = async (data) => {
    console.log("data", data)
    labelRole = data.roleName
    lableUser = data.userName
    selectedRoleData.value = data
    visible2.value = true
}

// Function to save the role mapping 
function SaveRoleMapping() {
    new MQL()
        .useCoreServer()
        .setActivity("r.[InserUserRoleMapping]")
        .setData({ "data": data })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("InserUserRoleMapping", true)
            if (rs.isValid("InserUserRoleMapping")) {
                toast.add({ severity: 'success', summary: 'Success', detail: 'User Role Mapping Successfully', life: 3000 });
                visible.value = false
                showTable.value = true
                fetchUserRoleDetails()
                FetchRoleData()
                fetchUserDetails()
            } else {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Error in User Role Mapping, please try again', life: 3000 });
                visible.value = false
                // rs.showErrorToast("InserUserRoleMapping")
            }
        })
}

// Function to fetch the user role details 
function fetchUserRoleDetails () {
    new MQL()
        .useCoreServer()
        .setActivity("r.[FetchUserRoleDetails]")
        .setData(
            {
                "userId": selectedUser.value.userId
            }
        )
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchUserRoleDetails", true)
            if (rs.isValid("FetchUserRoleDetails")) {
                userRoleData.value = res.result
                console.log("userRoleData.value", userRoleData.value)
                if (userRoleData.value.length > 0) {
                    console.log("userRoleData.value.length from If", userRoleData.value.length)
                    showTable.value = true
                } else {
                    console.log("userRoleData.value.length from else", userRoleData.value.length)
                    showTable.value = false
                }
              //  resetForm() // Reset the form
            } else {
                rs.showErrorToast("FetchUserRoleDetails")
            }
        })
}


// Function to fetch the user details 
function fetchUserDetails() {
    new MQL()
        .useCoreServer()
        .setActivity("r.[FetchUserDetails]")
        .setData()
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchUserDetails", true)
            if (rs.isValid("FetchUserDetails")) {
                userData.value = res.result
                console.log("userData.value", userData.value)
            } else {
                rs.showErrorToast("FetchUserDetails")
            }
        })
}


// Function to fetch the role details
function FetchRoleData() {
    new MQL()
        .useCoreServer()
        .setActivity("r.[FetchRoleDetails]")
        .setData()
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchRoleDetails", true)
            if (rs.isValid("FetchRoleDetails")) {
                // roleMaster.value = res.result
                roleMaster.value = res.result.map((el) => {
                    return {
                        label: el.roleName,
                        value: el.roleId
                    }
                })
                console.log("roleMaster.value", roleMaster.value)
            } else {
                rs.showErrorToast("FetchRoleDetails")
            }
        })

}

// Function to disable the role for the user
function disableRole(data) {
    console.log("data", data)   
    new MQL()
        .useCoreServer()
        .setActivity("r.[UpdateUserRoleMappingStatus]")
        .setData({ 
            "statusToUpdate" : 0,
            "userId": data.userId,
            "roleId": data.roleId,
            "modifiedBy": loginId.value
         })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("UpdateUserRoleMappingStatus", true)
            if (rs.isValid("UpdateUserRoleMappingStatus")) {
                toast.add({ severity: 'success', summary: 'Success', detail: 'User Role Disabled Successfully', life: 3000 });
                visible1.value = false
                fetchUserRoleDetails()
            } else {
                rs.showErrorToast("UpdateUserRoleMappingStatus")
            }
        })
}

// Function to enable the role for the user
function enableRole(data) {
    console.log("data", data)
    new MQL()
        .useCoreServer()
        .setActivity("r.[UpdateUserRoleMappingStatus]")
        .setData({ 
            "statusToUpdate" : 1,
            "userId": data.userId,
            "roleId": data.roleId,
            "modifiedBy": loginId.value
         })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("UpdateUserRoleMappingStatus", true)
            if (rs.isValid("UpdateUserRoleMappingStatus")) {
                toast.add({ severity: 'success', summary: 'Success', detail: 'User Role Enabled Successfully', life: 3000 });
                visible2.value = false
                fetchUserRoleDetails()
            } else {
                rs.showErrorToast("UpdateUserRoleMappingStatus")
            }
        })
}   

// Function to reset the form
const resetForm = () => {
    console.log("resetForm")
    selectedRole.value = '';
    selectedUser.value = '';
      $v.value.$reset(); // Reset the validation state
    };


// Validation rules
const rules = {
    selectedRole: {
        required: helpers.withMessage('Bidder Selection is required', required)
    },
    selectedUser: {
        required: helpers.withMessage('User Selection is required', required)
    }
};
const $v = useVuelidate(rules, { selectedRole, selectedUser });

// Lifecycle hooks 
onMounted(() => {
    FetchRoleData()
    fetchUserDetails()
});
</script>