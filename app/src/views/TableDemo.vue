<template>
  <div id="tableDemo" class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Table
    </h2>
    <m-table
      id-table="tblPlaces"
      restriction="o"
      activity="query_1el1NAwh6nMeZl1PhbzhP1TyQLf"
      msg="Table Component"
    />
  </div>
</template>

<script setup>
import MTable from '@/components/MTable.vue'

</script>

<style lang="scss">

</style>
