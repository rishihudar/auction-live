<template>
    <div>
        <div class="w-subtitle">
      Step 1 Details
    </div>
        <div class="fm-row">
            <div class="w-1/4">
                <div class="fm-group">
                    <label for="step1">Auction Type</label>

                    <Dropdown v-model="selectedCity" variant="filled" :options="auctionType" optionLabel="name"
                        placeholder="Select Auction Type" class="w-full md:w-14rem" />


                </div>
            </div>
         
        </div>
        <div class="fm-row">
            <div class="w-1/4">
                <div class="fm-group">
                    <label for="step2">Auction Method</label>

                    <Dropdown v-model="selectedCity" variant="filled" :options="auctionMethod" optionLabel="name"
                        placeholder="Select Auction Method" class="w-full md:w-14rem" />


                </div>
            </div>
         
        </div>
    
    </div>
      
       

  
</template>
<script setup>
import { ref } from "vue";

import Dropdown from 'primevue/dropdown';

const selectedCity = ref();
const auctionType = ref([
   
]);
const auctionMethod= ref([]);
</script> 
