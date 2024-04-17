<template>
    <div class="wizard-content">
        <div class="wc-item">
            <div class="wc-header">
                <div class="wc-title">Add Role Wise Dashboard Cards :</div>

            </div>
        </div>
        <div class="form-grid">
            <div class="col-span-full md:col-span-6">
                <div class="fm-group required">
                    <label class="fm-label" for="cardname">Card Name</label>
                    <InputText id="cardname" v-model="cardName" placeholder="Enter Card Name" :disabled="isAdding" />
                </div>
                <div class="fm-group required">
                    <label class="fm-label" for="path">Upcoming Card</label>
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="upcomingFlag" inputId="flag" name="yes" value="0"
                                :disabled="isAdding" />
                            <label for="ingredient1" class="ml-2">Yes</label>

                        </div>
                        <div class="flex align-items-center">
                            <RadioButton v-model="upcomingFlag" inputId="flag1" name="no" value="1"
                                :disabled="isAdding" />
                            <label for="ingredient1" class="ml-2">No</label>
                        </div>
                    </div>
                </div>
                <div class="fm-group" v-if="upcomingFlag == 1">
                    <label class="fm-label" for="path">Count Query</label>
                    <Textarea id="query" v-model="countQuery" rows="5" cols="30" :disabled="isAdding" />
                </div>
                <div class="fm-group required">
                    <label class="fm-label" for="role">
                        User Type
                    </label>
                    <div class="fm-inner">
                        <Dropdown v-model="selectedBidder" editable :options="bidderType" optionLabel="name" :disabled="isAdding"
                            placeholder="Select Bidder Type" class="w-full md:w-14rem"
                            @change="selectBidderType(selectedBidder),fetchRoles()" />
                    </div>
                </div>
                <div class="fm-group">
                    <label class="fm-label" for="path">Routing Path</label>
                    <InputText id="path" v-model="path" placeholder="Enter Routing Path" :disabled="isAdding" />
                </div>
                <Button label="Add Card" @click="addCard('W1')"
                    :disabled="isAdding || !cardName || !upcomingFlag || !selectedBidder" />
            </div>
            <div class="col-span-full md:col-span-6" v-if="isAdding">
                <div class="fm-group required">
                    <label class="fm-label" for="cards">
                        Cards
                    </label>
                    <div class="fm-inner">
                        <Dropdown v-model="selectedCard" editable :options="cards" optionLabel="cardName"
                            placeholder="Select a Card" class="w-full md:w-14rem" @change="selectCard(selectedCard)" />
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
                <Button label="Add Role To Card" @click="addCard('W2')" />
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



const roles = ref([]);
const cards = ref([]);
const selectedRole = ref([]);
const selectedCard = ref([]);
const bidderType = ref([
    { name: 'USER', code: 'user' },
    { name: 'BIDDER', code: 'bidder' }]);

const selectedRoleId = ref();
const selectedCardId = ref();
const selectedUserType = ref();
const selectedBidder = ref();
const countQuery = ref(null);

const cardName = ref("");
const path = ref(null);
const isAdding = ref(false);
const upcomingFlag = ref(null)

function selectRole(selectedRole) {
    console.log("Rolecode", selectedRole.roleName);
    console.log("roleId", selectedRole.roleId);
    selectedRoleId.value = selectedRole.roleId;

}
function selectCard(selectedCard) {
    console.log("Rolecode", selectedCard.cardName);
    console.log("cardId", selectedCard.cardId);
    selectedCardId.value = selectedCard.cardId;
}
function selectBidderType(selectedBidder) {
    console.log("Type", selectedBidder.name);
    //onsole.log("cardId", selectedBidder.bidderId);
    selectedUserType.value = selectedBidder.name;
}

function fetchRoles() {

    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchRolesForDashboardUI]")
        .setData({
            userType:selectedUserType.value
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchRolesForDashboardUI", true)
            if (rs.isValid("FetchRolesForDashboardUI")) {
                console.log("result", res.result.roles);
                roles.value = res.result.roles;
                cards.value = res.result.cards;
                //bidderType.value = res.result.bidderType;
                console.log("bidderType", bidderType.value);
            } else {
                rs.showErrorToast("FetchRolesForDashboardUI")
            }
        })
}

function addCard(value) {
    new MQL()
        .useManagementServer()
        .setActivity("o.[InsertDashboardCard]")
        .setData({
            cardName: cardName.value,
            countQuery: countQuery.value,
            urlPath: path.value,
            roleId: selectedRoleId.value,
            cardId: selectedCardId.value,
            userType: selectedUserType.value,
            flag: value,
            upcomingFlag: upcomingFlag.value
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("InsertDashboardCard", true)
            if (rs.isValid("InsertDashboardCard")) {
                console.log(cardName.value);
                console.log(path.value);
                fetchRoles();
                isAdding.value = true;
            } else {
                rs.showErrorToast("InsertDashboardCard")
            }
        })

}

</script>
