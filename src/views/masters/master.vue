<template>
  <Fieldset :toggleable="true">
    <template #legend>
      <div class="flex align-items-center gap-2 px-2">
        <!-- <Avatar image="/images/avatar/amyelsner.png" shape="circle" /> -->

        <span class="font-bold">MASTERS</span>

      </div>
    </template>
    <div class="p-d-flex custom-card-container">
      <Card class="custom-card p-m-2" @click="$router.push({ name: 'CountryMaster' })">
        <template #title> Country Master </template>
        <template #content>
          <p class="m-0">To Add, Update and Delete the Country Details</p>
        </template>
      </Card>

      <Card class="custom-card p-m-2" @click="$router.push({ name: 'StateMaster' })">
        <template #title> State Master </template>
        <template #content>
          <p class="m-0">To Add, Update and Delete the State Details</p>
        </template>
      </Card>

      <Card class="custom-card p-m-2" @click="$router.push({ name: 'DistrictMaster' })">
        <template #title> District Master </template>
        <template #content>
          <p class="m-0">To Add, Update and Delete the District Details</p>
        </template>
      </Card>

      <Card class="custom-card p-m-2" @click="$router.push({ name: 'TalukaMaster' })">
        <template #title> Taluka Master </template>
        <template #content>
          <p class="m-0">To Add, Update and Delete the Taluka Details</p>
        </template>
      </Card>
    </div>
  </Fieldset>
  <!-- <Fieldset :toggleable="true">
    <template #legend>
      <div class="flex align-items-center gap-2 px-2">
        <span class="font-bold">ITEM MASTERS</span>
      </div>
    </template>
    <div class="p-d-flex custom-card-container">
      <Card class="custom-card p-m-2" @click="$router.push({ name: '' })">
        <template #title> Country Master </template>
        <template #content>
          <p class="m-0">To Add, Update and Delete the Country Details</p>
        </template>
      </Card>

      <Card class="custom-card p-m-2" @click="$router.push({ name: '' })">
        <template #title> State Master </template>
        <template #content>
          <p class="m-0">To Add, Update and Delete the State Details</p>
        </template>
      </Card>

      <Card class="custom-card p-m-2" @click="$router.push({ name: '' })">
        <template #title> District Master </template>
        <template #content>
          <p class="m-0">To Add, Update and Delete the District Details</p>
        </template>
      </Card>

      <Card class="custom-card p-m-2" @click="$router.push({ name: '' })">
        <template #title> Taluka Master </template>
        <template #content>
          <p class="m-0">To Add, Update and Delete the Taluka Details</p>
        </template>
      </Card>
    </div>
  </Fieldset> -->
</template>

<script setup>

import Card from "primevue/card";

import Fieldset from 'primevue/fieldset';

import { ref } from 'vue';

</script>


<style>
.custom-card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  /* Adjust the gap as needed for spacing */
}

.custom-card {
  flex: 1 1 calc(25% - 20px);
  /* Adjust the width as needed */
  max-width: calc(25% - 20px);
  /* Adjust the max-width as needed */
}</style>
