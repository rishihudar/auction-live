<template>
    <div>
        <Toast />
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Add Role Wise Dashboard Cards</h2>
            </div>
        </div>
        <div class="box-grid">
            <div class="card col-span-6">
                <div class="form-grid">
                    <div class="col-span-full">
                        <div class="fm-group required">
                            <label class="fm-label" for="role">
                                User Type
                            </label>
                            <div class="fm-inner">
                                <Dropdown v-model="selectedBidder" editable :options="bidderType" optionLabel="name" option-value="name"
                                    placeholder="Select Bidder Type"
                                    @change="selectBidderType(selectedBidder), fetchRoles(selectedBidder)" />
                            </div>
                        </div>
                        <div class="fm-group required">
                            <label class="fm-label" for="childcard">Is Child Card</label>
                            <div class="fm-check-holder">
                                <div class="fm-radiobox">
                                    <RadioButton v-model="isParent" inputId="flag" name="yes" value="1" />
                                    <label for="ingredient1">Yes</label>
                                </div>
                                <div class="fm-radiobox">
                                    <RadioButton v-model="isParent" inputId="flag1" name="no" value="0" />
                                    <label for="ingredient1">No</label>
                                </div>
                            </div>
                        </div>
                        <div class="fm-group required" v-if="isParent==1">
                            <label class="fm-label" for="role">
                                Parent Cards
                            </label>
                            <div class="fm-inner">
                                <Dropdown v-model="selectedParentCard" editable :options="parentCards" optionLabel="cardName"
                                    placeholder="Select Bidder Type"
                                    @change="selectParentCard(selectedParentCard)" />
                            </div>
                        </div>
                        <div class="fm-group required">
                            <label class="fm-label" for="cardname">Card Name</label>
                            <div class="fm-inner">
                                <InputText id="cardname" v-model="cardName" placeholder="Enter Card Name" />
                            </div>
                        </div>
                        <div class="fm-group required" v-if="isParent==0">
                            <label class="fm-label" for="path">Upcoming Card</label>
                            <div class="fm-check-holder">
                                <div class="fm-radiobox">
                                    <RadioButton v-model="upcomingFlag" inputId="flag" name="yes" value="0"
                                         />
                                    <label for="ingredient1">Yes</label>
                                </div>
                                <div class="fm-radiobox">
                                    <RadioButton v-model="upcomingFlag" inputId="flag1" name="no" value="1"
                                         />
                                    <label for="ingredient1">No</label>
                                </div>
                            </div>
                        </div>
                        <div class="fm-group" v-if="upcomingFlag == 1 && isParent==0">
                            <label class="fm-label" for="path">Count Query</label>
                            <div class="fm-inner">
                                <Textarea id="query" v-model="countQuery" rows="5" cols="30"  />
                            </div>
                        </div>
                        <div class="fm-group">
                            <label class="fm-label" for="path">Routing Path</label>
                            <div class="fm-inner">
                                <InputText id="path" v-model="path" placeholder="Enter Routing Path" />
                            </div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button label="Add Card" @click="addCard('W1',selectedBidder)"
                            :disabled="!cardName || !selectedBidder" />
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
                                <Dropdown v-model="selectedBidder2" editable :options="bidderType" optionLabel="name" option-value="name"
                                    placeholder="Select Bidder Type"
                                    @change="selectBidderType(selectedBidder2), fetchRoles(selectedBidder2)" />
                            </div>
                        </div>
                        <div class="fm-group required">
                            <label class="fm-label" for="cards">
                                Cards
                            </label>
                            <div class="fm-inner">
                                <Dropdown v-model="selectedCard" editable :options="cards" optionLabel="cardName"
                                    placeholder="Select a Card" @change="selectCard(selectedCard)" />
                            </div>
                        </div>
                        <div class="fm-group required">
                            <label class="fm-label" for="role">
                                Role Type
                            </label>
                            <div class="fm-inner">
                                <Dropdown v-model="selectedRole" editable :options="roles" optionLabel="roleName"
                                    placeholder="Select a Role" @change="selectRole(selectedRole)" />
                            </div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <Button label="Add Role To Card" @click="addCard('W2',selectedBidder2)" />
                    </div>
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
import Textarea from 'primevue/textarea';
import RadioButton from 'primevue/radiobutton';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
const toast = useToast();


const isParent = ref(null);
const isChild = ref(null);
const roles = ref([]);
const cards = ref([]);
const selectedRole = ref([]);
const selectedCard = ref([]);
const bidderType = ref([
    { name: 'USER', code: 'user' },
    { name: 'BIDDER', code: 'bidder' },
    { name: 'ADMIN', code: 'admin' }]);

const selectedRoleId = ref();
const selectedCardId = ref();
const selectedUserType = ref();
const selectedParentId=ref();
const selectedBidder = ref();
const selectedBidder2 = ref();
const selectedParentCard = ref();
const countQuery = ref(null);
const parentCards = ref([]);
const cardName = ref("");
const path = ref(null);
const upcomingFlag = ref(0)


const selectedOption = ref(null);

function selectRole(selectedRole) {
    //console.log("Rolecode", selectedRole.roleName);
    //console.log("roleId", selectedRole.roleId);
    selectedRoleId.value = selectedRole.roleId;

}
function selectCard(selectedCard) {
    //console.log("Rolecode", selectedCard.cardName);
    //console.log("cardId", selectedCard.cardId);
    selectedCardId.value = selectedCard.cardId;
}
function selectBidderType(selectedBidder) {
    //console.log("Type", selectedBidder.name);
    //onsole.log("cardId", selectedBidder.bidderId);
    selectedUserType.value = selectedBidder.name;
}

function selectParentCard(selectedParentCard) {
    //console.log("Type", selectedParentCard.cardName);
    //onsole.log("cardId", selectedBidder.bidderId);
    selectedParentId.value = selectedParentCard.cardId;
    //console.log("CardId",selectedParentCard.cardId);
}

function fetchRoles(userType) {

    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchRolesForDashboardUI]")
        .setData({
            userType: userType
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchRolesForDashboardUI", true)
            if (rs.isValid("FetchRolesForDashboardUI")) {
                //console.log("result", res.result.roles);
                roles.value = res.result.roles;
                cards.value = res.result.cards;
                parentCards.value = res.result.parentCards;

                //bidderType.value = res.result.bidderType;
                //console.log("bidderType", bidderType.value);
            } else {
                rs.showErrorToast("FetchRolesForDashboardUI")
            }
        })
}

function addCard(value,userType) {
    if(isParent.value==0){
        isParent.value=0
        //console.log("inside if ",isParent.value);
    }else{
        isParent.value=selectedParentId.value
        //console.log("inside else ",isParent.value);
    }
    new MQL()
        .useManagementServer()
        .setActivity("o.[InsertDashboardCard]")
        .setData({
            cardName: cardName.value,
            countQuery: countQuery.value,
            urlPath: path.value,
            roleId: selectedRoleId.value,
            cardId: selectedCardId.value,
            userType: userType,
            flag: value,
            upcomingFlag: upcomingFlag.value,
            bParent: isParent.value // Include isParent value
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("InsertDashboardCard", true)
            if (rs.isValid("InsertDashboardCard")) {
                //console.log(cardName.value);
                //console.log(path.value);
                fetchRoles(userType);
                toast.add({ severity: 'success', summary: 'Success', detail: 'Data added successfully', life: 3000 });
            } else {
                rs.showErrorToast("InsertDashboardCard")
                toast.add({ severity: 'error', summary: 'Error', detail: 'Error while adding data ', life: 3000 });
            }
        })

}

</script>
