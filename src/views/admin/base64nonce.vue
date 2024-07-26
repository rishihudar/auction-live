<template>
  <div>
    <p>Base64 Nonce Value: {{ base64Nonce }}</p>
     <h1>hello meenal !</h1>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { generateBase64UUID } from '../../plugins/uuidUtils'; // Adjust the path if needed

const base64Nonce = ref(generateBase64UUID());
</script>



