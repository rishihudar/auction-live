

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
          v-if="userRole == card.roleId"
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
import { storeToRefs } from 'pinia';

const cardStore = useCardStore()
const { cardId } = storeToRefs(cardStore)

const loginStore = login();
const userRole = ref();
const cardsArray = ref([]);

function FetchUserRole() {
  console.log("Role-", loginStore.currentRole.roleId);
  userRole.value = loginStore.currentRole.roleId;
}

function navigateToAbout(card) {
  console.log("Card Clicked");
  console.log("card-", card.card);
  console.log("card url-", card.url);
  router.push({path:card.url});
}

function fetchChildCards(){
          new MQL()
			.setActivity("o.[FetchChildCardDetails]")
      .useManagementServer()
			.setData({parentId:cardId.value,})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchChildCardDetails",true)
			if (rs.isValid("FetchChildCardDetails")) {
        cardsArray.value = res.result.childCards;
        console.log("cards", cardsArray.value);
			} else
			 { 
			rs.showErrorToast("FetchChildCardDetails")
			}
			})		
}

onBeforeMount(() => {
  FetchUserRole();
  fetchChildCards();
});
</script>