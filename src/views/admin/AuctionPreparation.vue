<!-- <template>
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
  </template> -->

  <template>
    <div class="card flex justify-content-center">
      <!-- <h1>Auction Preparation ID: {{ lastInsertedId }}</h1> -->
        <Stepper linear>
            <StepperPanel header="Header I" >
                <template #content="{ nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <!-- <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div> -->
                        <Step1  @submit="(i) => lastInsertedId=i" @nextTab="nextCallback()" ref="Step1Ref" />
                    </div>
                    <!-- <div class="flex pt-4 justify-content-end">
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="saveAndNext(), nextCallback()" ></Button>
                        v-if="lastInsertedId !=''" 
                    </div> -->
                </template>
            </StepperPanel>
            <StepperPanel header="Header II">
                <template #content="{ prevCallback, nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <!-- <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div> -->
                        <Step2 @previousTab1="prevCallback()" @nextTab1="nextCallback()" ref="Step2Ref" />
                    </div>
                    <!-- <div class="flex pt-4 justify-content-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
                    </div> -->
                </template>
            </StepperPanel>
            <StepperPanel header="Header III">
                <template #content="{ prevCallback, nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <!-- <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div> -->
                        <Step3 @previousTab2="prevCallback()" @nextTab2="nextCallback()"  ref="Step3Ref" />
                    </div>
                    <!-- <div class="flex pt-4 justify-content-start">
                      <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
                    </div> -->
                </template>
            </StepperPanel>
            <StepperPanel header="Header IV">
                <template #content="{ prevCallback, nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <!-- <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div> -->
                       <Step4 @previousTab3="prevCallback()" @nextTab3="nextCallback()" ref="Step4Ref" />
                    </div>
                    <!-- <div class="flex pt-4 justify-content-start">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                    </div> -->
                </template>
            </StepperPanel> 
            <!-- <StepperPanel header="Header IV">
                <template #content="{ prevCallback }">
                    <div class="flex flex-column h-12rem">
                        <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
                       <Step1 @previousTab4="prevCallback()"  ref="StepRef" />
                    </div>
                    <div class="flex pt-4 justify-content-start">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                    </div>
                </template>
            </StepperPanel> -->
        </Stepper>
    </div>
</template>

<style scoped>
.p-stepper {
    flex-basis: 50rem;
}
</style>


  <script setup>
  import { ref, computed } from 'vue';
  
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';
import Button from 'primevue/button';


import Step1 from '@/views/admin/AuctionPreparation/Step1.vue';
import Step2 from '@/views/admin/AuctionPreparation/Step2.vue';
import Step3 from '@/views/admin/AuctionPreparation/Step3.vue';
import Step4 from '@/views/admin/AuctionPreparation/Step4.vue';
  

const Step1Ref = ref(null);
const Step2Ref = ref(null);
const Step3Ref = ref(null);
const Step4Ref = ref(null);
//const child = ref(null);
//const Step1 = ref("");

//  function switchTab1 () {
//       return new Promise(async (resolve) => {
//         resolve(await this.$refs.step1.InsertAuctionTypeAndMethod)
//       })
//     }
// function saveAndNext() {
//   Step1Ref.value.InsertAuctionTypeAndMethod;

// }



// async function switchTab1() {
//       // if (step1.value && typeof step1.value.InsertAuctionTypeAndMethod === 'function') {
//         await Step1.value.InsertAuctionTypeAndMethod;
//       // }
//     }


//   const active = ref(0);
// const completed = ref(false);
// const products = ref();
// const name = ref();
// const email = ref();
// const password = ref();
// const option1 = ref(false);
// const option2 = ref(false);
// const option3 = ref(false);
// const option4 = ref(false);
// const option5 = ref(false);
// const option6 = ref(false);
// const option7 = ref(false);
// const option8 = ref(false);
// const option9 = ref(false);
// const option10 = ref(false);
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

  const lastInsertedId = ref('');

  //  const auctionPreparation = ref({
  //   auctionMethodId: 1,
  //   stepPosition: 0
  // });
  
  // const switchTab1 = async () => {
  //   return await refs.step1.saveAndNext();
  // };
  
  // const switchTab2 = async () => {
  //   let status = await refs.step2.saveAndNext();
  //   refs.step3.getAllDivisions();
  //   return status;
  // };
  
  // const switchTab3 = async () => {
  //   let status = await refs.step3.saveAndNext();
  //   if (showBiddersList.value) {
  //     refs.step4.getBidderForLimitedAuction();
  //   }
  //   return status;
  // };
  
  // const switchTab4 = async () => {
  //   return await refs.step4.saveAndNext();
  // };
  
  // const finishAuctionPreparation = () => {
  //   router.push({ name: 'adminDashboard' });
  // };
  
  // const showBiddersList = computed(() => {
  //   return auctionPreparation.value.auctionTypeArray.some(
  //     auctionType =>
  //       parseInt(auctionType.pklAuctionTypeId) ===
  //         auctionPreparation.value.auctionTypeId &&
  //       auctionType.vsAuctionTypeName === 'Limited'
  //   );
  // });
  
  // const refs = {
  //   step1: ref(null),
  //   step2: ref(null),
  //   step3: ref(null),
  //   step4: ref(null),
  //   formWizard: ref(null)
  // };

  </script>
  