<template>
    <div class="content-area">
      <div class="title-wrapper">
        <h3 class="page-title">
          Auction Preparation {{ lastInsertedId }}
        </h3>
      </div>
      <div class="card">
        <div class="card-body">
          <form-wizard
            :class="{
              'normalAuc': auctionPreparation.auctionMethodId === 1
            }"
            :ref="formWizard"
            title=""
            subtitle=""
            color="#137fbf"
            class="card-boxed-wizard"
            :hide-buttons="false"
            :start-index="auctionPreparation.stepPosition"
            @on-complete="finishAuctionPreparation"
          >
            <tab-content
              title="Step 1"
              icon="mdi mdi-gavel"
              :before-change="switchTab1"
            >
              <Step1  @submit="(i) => lastInsertedId=i" :ref="step1" />
            </tab-content>
            <tab-content
              title="Step 2"
              icon="mdi mdi-gavel"
              :before-change="switchTab2"
            >
              <Step2 :ref="step2" />
            </tab-content>
            <tab-content
              title="Step 3"
              icon="mdi mdi-gavel"
              :before-change="switchTab3"
            >
              <Step3 :ref="step3" />
            </tab-content>
  
            <tab-content
              icon="mdi mdi-publish"
              title="Step 4 Auction Publishing"
              :before-change="switchTab4"
            >
              <Step4 :ref="step4" />
            </tab-content>
          </form-wizard>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, computed } from 'vue';
  import Step1 from '@/views/admin/AuctionPreparation/Step1.vue';
  import Step2 from '@/views/admin/AuctionPreparation/Step2.vue';
  import Step3 from '@/views/admin/AuctionPreparation/Step3.vue';
  import Step4 from '@/views/admin/AuctionPreparation/Step4.vue';
  
 
//   const items = ref([
//     {
//         label: 'Personal Info'
//     },
//     {
//         label: 'Reservation'
//     },
//     {
//         label: 'Review'
//     }
// ]);

  const lastInsertedId = ref(0);

   const auctionPreparation = ref({
    auctionMethodId: 1,
    stepPosition: 0
  });
  
  const switchTab1 = async () => {
    return await refs.step1.saveAndNext();
  };
  
  const switchTab2 = async () => {
    let status = await refs.step2.saveAndNext();
    refs.step3.getAllDivisions();
    return status;
  };
  
  const switchTab3 = async () => {
    let status = await refs.step3.saveAndNext();
    if (showBiddersList.value) {
      refs.step4.getBidderForLimitedAuction();
    }
    return status;
  };
  
  const switchTab4 = async () => {
    return await refs.step4.saveAndNext();
  };
  
  const finishAuctionPreparation = () => {
    router.push({ name: 'adminDashboard' });
  };
  
  const showBiddersList = computed(() => {
    return auctionPreparation.value.auctionTypeArray.some(
      auctionType =>
        parseInt(auctionType.pklAuctionTypeId) ===
          auctionPreparation.value.auctionTypeId &&
        auctionType.vsAuctionTypeName === 'Limited'
    );
  });
  
  const refs = {
    step1: ref(null),
    step2: ref(null),
    step3: ref(null),
    step4: ref(null),
    formWizard: ref(null)
  };

  </script>
  