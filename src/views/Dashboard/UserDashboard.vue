<template>
  <div>
    <div class="stat-area stat-area-alt">
      <div
        class="card-wrapper"
        v-for="(card, index) in cardsArray"
        :key="index"
        @click="navigateToAbout(card)"
      >
        <div
          class="card card-stat card-stat-alt"
          v-if="userRole == card.roleId &&card.parentId==0"
        >
          <div class="card-body">
            <h4 class="card-value">{{ card.countQuery }}</h4>
            <div class="card-name-holder">
              <b class="fw-medium card-name">{{ card.card }}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { login } from "../../store/modules/login";
import MQL from "@/plugins/mql.js";
import router from "../../router";
import { useCardStore } from "../../store/cards";

// const cardStore = cards()
// const { cardId } = storeToRefs(cardStore)
const cardst = useCardStore()

const loginStore = login();
const userRole = ref();
const cardsArray = ref([]);
const parentCardId=ref();

function FetchUserRole() {
  console.log("Role-", loginStore.currentRole.roleId);
  userRole.value = loginStore.currentRole.roleId;
}

function navigateToAbout(card) {
  console.log("Card Clicked");
  console.log("card-", card.card);
  console.log("card url-", card.url);
  parentCardId.value=card.cardId;
  console.log("card id",parentCardId.value);
  router.push({path:card.url});
  cardst.setCardId(parentCardId.value)
}

function fetchDashboardDetails() {
  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchDashboardAndRoleDetails]")
    .setData({
      userRoleId: userRole.value,
      entityId: loginStore.entityId,
      organizationId: loginStore.organizationId,
      userId: loginStore.loginId,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchDashboardAndRoleDetails", true);
      if (rs.isValid("FetchDashboardAndRoleDetails")) {
        cardsArray.value = res.result.dashboardDetails;
        console.log("cards", cardsArray.value);
      } else {
        rs.showErrorToast("FetchDashboardAndRoleDetails");
      }
    });
}

onBeforeMount(() => {
  FetchUserRole();
  fetchDashboardDetails();
});
</script>