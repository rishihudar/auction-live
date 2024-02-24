<template>
  <div>
    <label for="username">Username:</label>
    <input id="username" v-model="username" />
    <p v-if="!$v.username.required">Username is required.</p>

    <label for="password">Password:</label>
    <input id="password" v-model="password" />
    <p v-if="!$v.password.required">Password is required.</p>

    <button @click="submitForm">Submit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

const username = ref('');
const password = ref('');

const rules = {
  username: { required },
  password: { required },
};

const $v = useVuelidate(rules);

function submitForm() {
  if (!$v.$invalid) {
    // Perform form submission logic here
    console.log('Form submitted successfully');
  }
}
</script>
