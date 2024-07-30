<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Add Role Wise Menu</h2>
            </div>
        </div>
        <div class="box-grid">
            <div class="card col-span-6">
                <div class="form-grid">
                    <div class="col-span-full">
                        <div class="fm-group required">
                            <label class="fm-label" for="cardname">Menu Name</label>
                            <InputText id="cardname" v-model="menuName" placeholder="Enter Card Name"
                                :disabled="isAdding" @change="!menuNameAdded" />
                        </div>
                        <div class="fm-group required">
                            <label class="fm-label" for="role">
                                User Type
                            </label>
                            <div class="fm-inner">
                                <Dropdown v-model="selectedBidder" editable :options="bidderType" optionLabel="name"
                                    :disabled="isAdding" placeholder="Select Bidder Type" class="w-full md:w-14rem"
                                    @change="selectBidderType(selectedBidder)" />
                            </div>
                        </div>
                        <div class="fm-group">
                            <label class="fm-label" for="path">Add Routing Path</label>
                            <InputText id="path" v-model="path" placeholder="Enter Routing Path" :disabled="isAdding" />
                        </div>
                        <div class="fm-action">
                            <Button label="Add Menu" @click="addCard('W1'), (isAdding = true)"
                                :disabled="isAdding || !menuName || !selectedBidder" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="card col-span-6">
                <div class="col-span-full">
                    <div class="fm-group required">
                            <label class="fm-label" for="role">
                                User Type
                            </label>
                            <div class="fm-inner">
                                <Dropdown v-model="selectedBidder2" :options="bidderType" optionLabel="name"
                                    :disabled="isAdding" placeholder="Select Bidder Type" class="w-full md:w-14rem"
                                    @change="selectBidderType2(selectedBidder2)" />
                            </div>
                        </div>
                    <div class="fm-group required">
                        <label class="fm-label" for="cards">
                            Menus
                        </label>
                        <div class="fm-inner">
                            <Dropdown v-model="selectedMenuName" editable :options="selectedMenu" optionLabel="menuName"
                                placeholder="Select a Card" class="w-full md:w-14rem"
                                @change="selectMenu(selectedMenuName)" />
                        </div>
                    </div>
                    <div class="fm-group required">
                        <label class="fm-label" for="role">
                            Role Type
                        </label>
                        <div class="fm-inner">
                            <MultiSelect v-model="selectedRole" :options="roles" optionLabel="label"
                                placeholder="Select Roles" class="w-full md:w-20rem" />
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button label="Add Role To Menu" @click="addCard('W2')" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import MQL from '@/plugins/mql.js';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
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
const selectedMenuId = ref();
const selectedUserType = ref();
const selectedUserType2 = ref();
const selectedBidder = ref();
const selectedBidder2 = ref();
const countQuery = ref(null);

const menuName = ref("");
const path = ref(null);
const isAdding = ref(false);
const menuNameAdded = ref(true);
const upcomingFlag = ref(null)

function selectMenu(selectedMenu) {
    //console.log("selectedMenu", selectedMenu.menuName);
    //console.log("MenuId", selectedMenu.menuId);
    selectedMenuId.value = selectedMenu.menuId;
}



// function selectRole(selectedRole) {
//     for (let i = 0; i < selectedRole.length; i++) {
//         const element = selectedRole[i];
//         //console.log("element",element);
//         //console.log("Rolecode", selectedRole[i].roleName);
//         //console.log("roleId", selectedRole[i].roleId);
        
//     }
//     //console.log("selectedMenu.menuId",selectedMenu.menuId);
//     //selectedRoleId.value = selectedRole.roleId;
//     selectedRole.push({menuId:selectedMenuId.value})
//     selectBidderType()

// }
function selectBidderType(selectedBidder) {
    //console.log("Type", selectedBidder.name);
    //onsole.log("cardId", selectedBidder.bidderId);
    selectedUserType.value = selectedBidder.name;
}

function selectBidderType2(selectedBidder) {
    console.log("Type", selectedBidder.name);
    //onsole.log("cardId", selectedBidder.bidderId);
    selectedUserType2.value = selectedBidder.name;
    fetchRoles(selectedUserType2.value);
}
function sendData() {
    var data = [];
    roles.value.map((el) => {
        data.push({
            roleId: el.value,
            menuId: selectedMenuId.value
        });
    });
    return data
}


function selectMenu2(selectedMenuName) {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchRolesForAddingMenusInMenuMaster]")
        .setData({ userType: selectedMenuName })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchRolesForAddingMenusInMenuMaster", true)
            if (rs.isValid("FetchRolesForAddingMenusInMenuMaster")) {
                selectedMenu.value = res.result.fetchMenu
                roles.value = res.result.roles.map((el) => {
                    return {
                        label: el.roleName,
                        value: el.roleId
                    }
                })
            } else {
                rs.showErrorToast("FetchRolesForAddingMenusInMenuMaster")
            }
        })
}


function fetchRoles(userType) {
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchRolesForAddingMenusInMenuMaster]")
        .setData({ userType: userType })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchRolesForAddingMenusInMenuMaster", true)
            if (rs.isValid("FetchRolesForAddingMenusInMenuMaster")) {
                selectedMenu.value = res.result.fetchMenu
                roles.value = res.result.roles.map((el) => {
                    return {
                        label: el.roleName,
                        value: el.roleId
                    }
                })
            } else {
                rs.showErrorToast("FetchRolesForAddingMenusInMenuMaster")
            }
        })


}

function addCard(value) {
    // //console.log("Menu name", menuName.value);
    // //console.log("User Type", selectedUserType.value);
    // //console.log("Path", path.value);
    // //console.log(" selectedMenuId.value", selectedMenuId.value);
    // //console.log(" selectedRoleId.value", selectedRoleId.value);
    // fetchRoles()
    var data = sendData()
    new MQL()
        .useManagementServer()
        .setActivity("o.[InsertSidebarMenuDetails]")
        .setData({
            userType: selectedUserType.value,
            menuName: menuName.value,
            routingPath: path.value,
            roleId: selectedRoleId.value,
            menuId: selectedMenuId.value,
            flag: value,
            data: data,
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("InsertSidebarMenuDetails", true)
            if (rs.isValid("InsertSidebarMenuDetails")) {
                fetchRoles(selectedUserType.value)
                isAdding.value = false
            } else {
                rs.showErrorToast("InsertSidebarMenuDetails")
            }
        })


}

</script>
