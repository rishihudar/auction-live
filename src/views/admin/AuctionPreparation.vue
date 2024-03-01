  <template>
    <div class="card flex justify-content-center">
        <Stepper linear>
            <StepperPanel header="Header I" >
                <template #content="{ nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <Step1 :auctionId="auctionId"  @submit="setAuctionId" @nextTab="nextCallback()" />
                    </div>
                </template>
            </StepperPanel>
            <StepperPanel header="Header II">
                <template #content="{ prevCallback, nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <Step2 :auctionId="auctionId" @previousTab="prevCallback()" @nextTab="nextCallback()" />
                    </div>
                </template>
            </StepperPanel>
            <StepperPanel header="Header III">
                <template #content="{ prevCallback, nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <Step3 :auctionId="auctionId" @previousTab="prevCallback()" @nextTab="nextCallback()"  />
                    </div>
                </template>
            </StepperPanel>
            <StepperPanel header="Header IV">
                <template #content="{ prevCallback, nextCallback }">
                    <div class="flex flex-column h-12rem">
                        <Step4 :auctionId="auctionId" @previousTab="prevCallback()" @nextTab="nextCallback()" />
                    </div>
                </template>
            </StepperPanel> 
        </Stepper>
    </div>
</template>

<style scoped>
.p-stepper {
    flex-basis: 50rem;
}
</style>


  <script setup>
  import { ref } from 'vue';
  
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';

import Step1 from '@/views/admin/AuctionPreparation/Step1.vue';
import Step2 from '@/views/admin/AuctionPreparation/Step2.vue';
import Step3 from '@/views/admin/AuctionPreparation/Step3.vue';
import Step4 from '@/views/admin/AuctionPreparation/Step4.vue';


const auctionId = ref(null)

function setAuctionId(id) {
  console.log(id)
  auctionId.value = id
}

  </script>
  