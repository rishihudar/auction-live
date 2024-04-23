<template>
    <div class="wizard-content">
        <div class="wc-item">
            <div class="wc-header">
                <div class="wc-title">Add Role Wise Menu:</div>

            </div>
        </div>
        <div class="form-grid">
            <div class="col-span-full md:col-span-6">
                <div class="fm-group required">
                    <label class="fm-label" for="cardname">Menu Name</label>
                    <InputText id="cardname" v-model="menuName" placeholder="Enter Card Name" :disabled="isAdding" @change="!menuNameAdded"/>
                </div>
                <div class="fm-group required">
                    <label class="fm-label" for="role">
                        User Type
                    </label>
                    <div class="fm-inner">
                        <Dropdown v-model="selectedBidder" editable :options="bidderType" optionLabel="name" :disabled="isAdding "
                            placeholder="Select Bidder Type" class="w-full md:w-14rem"
                            @change="selectBidderType(selectedBidder)" />
                    </div>
                </div>
                <div class="fm-group">
                    <label class="fm-label" for="path">Add Routing Path</label>
                    <InputText id="path" v-model="path" placeholder="Enter Routing Path" :disabled="isAdding" />
                </div>
                <Button label="Add Menu" @click="addCard('W1'),(isAdding=true)"
                    :disabled="isAdding || !menuName || !selectedBidder" />
            </div>
            <div class="col-span-full md:col-span-6" v-if="isAdding">
                <div class="fm-group required">
                    <label class="fm-label" for="cards">
                        Menus
                    </label>
                    <div class="fm-inner">
                        <Dropdown v-model="selectedMenuName" editable :options="selectedMenu" optionLabel="menuName"
                            placeholder="Select a Card" class="w-full md:w-14rem" @change="selectMenu(selectedMenuName)" />
                    </div>
                </div>
                <div class="fm-group required">
                    <label class="fm-label" for="role">
                        Role Type
                    </label>
                    <div class="fm-inner">
                        <Dropdown v-model="selectedRole" editable :options="roles" optionLabel="roleName"
                            placeholder="Select a Role" class="w-full md:w-14rem" @change="selectRole(selectedRole)" />
                    </div>
                </div>
                <Button label="Add Role To Menu" @click="addCard('W2')" />
            </div>
        </div>
    </div>


</template>

<script setup>
import { onMounted, ref } from "vue";
import MQL from '@/plugins/mql.js';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';




const roles = ref([]);
const selectedRole = ref('');
const selectedMenu = ref([]);
const bidderType = ref([
    { name: 'USER', code: 'user' },
    { name: 'BIDDER', code: 'bidder' },
    { name: 'ADMIN', code: 'admin' },]);

const selectedRoleId = ref();
const selectedMenuName = ref();
const selectedMenuId=ref();
const selectedUserType = ref();
const selectedBidder = ref();
const countQuery = ref(null);

const menuName = ref("");
const path = ref(null);
const isAdding = ref(false);
const menuNameAdded = ref(true);
const upcomingFlag = ref(null)

function selectRole(selectedRole) {
    console.log("Rolecode", selectedRole.roleName);
    console.log("roleId", selectedRole.roleId);
    selectedRoleId.value = selectedRole.roleId;

}
function selectMenu(selectedMenu) {
    console.log("selectedMenu", selectedMenu.menuName);
    console.log("MenuId", selectedMenu.menuId);
    selectedMenuId.value = selectedMenu.menuId;
}
function selectBidderType(selectedBidder) {
    console.log("Type", selectedBidder.name);
    //onsole.log("cardId", selectedBidder.bidderId);
    selectedUserType.value = selectedBidder.name;
}

function fetchRoles() {
			new MQL()
            .useManagementServer()
			.setActivity("o.[FetchRolesForAddingMenusInMenuMaster]")
			.setData({userType: selectedUserType.value})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchRolesForAddingMenusInMenuMaster",true)
			if (rs.isValid("FetchRolesForAddingMenusInMenuMaster")) {
                selectedMenu.value=res.result.fetchMenu
                roles.value=res.result.roles
			} else
			 { 
			rs.showErrorToast("FetchRolesForAddingMenusInMenuMaster")
			}
			})
			
			
}

function addCard(value) {
    console.log("Menu name",menuName.value);
    console.log("User Type",selectedUserType.value);
    console.log("Path",path.value);
    console.log(" selectedMenuId.value", selectedMenuId.value);
    console.log(" selectedRoleId.value", selectedRoleId.value);
 
			new MQL()
            .useManagementServer()
			.setActivity("o.[InsertSidebarMenuDetails]")
			.setData({
                userType: selectedUserType.value,
                menuName:menuName.value,
                routingPath:path.value,
                roleId: selectedRoleId.value,
                menuId: selectedMenuId.value,
                flag:value,
            })
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("InsertSidebarMenuDetails",true)
			if (rs.isValid("InsertSidebarMenuDetails")) {
                fetchRoles()
			} else
			 { 
			rs.showErrorToast("InsertSidebarMenuDetails")
			}
			})
			

}

onMounted(()=>{
    
})

</script>