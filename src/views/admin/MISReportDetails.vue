
   <template>
    <Card class="clickable-card registration-card" @click="$router.push('/registration-feeReport')">
      <template #title>Registration Fees Report</template>
    </Card>
    <Card class="clickable-card processing-card" @click="$router.push('/processing-feeReport')">
      <template #title>Processing Fees Report</template>
    </Card>
  </template>
  
  <script setup>
  import Card from 'primevue/card';
  </script>
  
  <style scoped>
  .clickable-card {
    cursor: pointer;
  }
  
  .registration-card {
    background-color: #f0f0f0; /* Example background color for registration card */
    border: 1px solid #ccc; /* Example border style for registration card */
  }
  
  .processing-card {
    background-color: #e6f7ff; /* Example background color for processing card */
    border: 1px solid #99d6ff; /* Example border style for processing card */
  }
  </style>
  