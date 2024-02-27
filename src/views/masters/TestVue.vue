<!-- <template>
  <div>
      <label for="username">Username:</label>
      <input id="username" v-model="username" :class="{ 'p-invalid': $v.username.$error }"/>
      <div v-if="$v.username.$error" class="p-error">
          {{ $v.username.$errors[0].$message }}
      </div>


      <button @click="submitForm">Submit</button>
    
  </div>
              
</template> -->

<!-- <template>
  <div>
    <label for="username">Username:</label>
    <input id="username" v-model="username"/>
    <div v-if="$v.username.$error" class="p-error">
      {{ $v.username.$errors[0].$message }}
    </div>

    <span v-for ="error in $v.username.$errors" :key="error">{{error.$message}}</span>
    <button @click="submitForm">Submit</button>
  </div>
</template> 


<script setup>
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed } from 'vue';
import { createToaster } from "@meforma/vue-toaster";

const username = reactive('');
const toaster = createToaster({ position: "top-right", duration: 3000 })

let rules = computed(() => ({
  username: { required }
}));

const $v = useVuelidate(rules,{
  username
});

console.log("printing..............", $v);
function submitForm() {
  if (!$v.value.username.$invalid) {
    // Perform form submission logic here
    console.log('Form submitted successfully');
  }else {

toaster.error("Invalid Details")

}
}
</script> -->

<!-- <template>
  <div>
    <div>
      <form @submit.prevent="submitForm" class="p-fluid">
        
        Username: {{forData.username}}
        <input v-model="forData.username" type="Username" />
        Email: {{forData.email}}
        <input v-model="forData.email" type="email" />
        Password: {{forData.password}}
        <input v-model="forData.password" type="password" />
        Confirm Password: {{forData.confirmPassword}}
        <input v-model="forData.confirmPassword" type="password" />

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
    <div>
      <p class="text-red-500">Errors: </p>
      <span v-for="error in $v.$errors" :key="error.$uid">
        {{error.$property }} - {{ error.$message }},
      </span>
    </div>
  </div>
</template> -->

<script setup>
import { computed, reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';

const darkMode = ref(false);
const forData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const rules = computed(() => {
  return{
    username: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: { required, sameAs: sameAs(forData.password) }
  } 
});

const $v = useVuelidate(rules, forData);
console.log("printing..............", $v);


const submitForm = async () => {
  // Your form submission logic here
  const result = await $v.value.$validate();
  if(result) {
    alert("success, form submitted");
  } else {
    alert("error, form not submitted");
  }
};

function toggleMode() {
  darkMode.value = !darkMode.value;
}
</script>      


<template>
  <div :class="{'dark': darkMode}" class="px-4 py-8">
    <div class="flex justify-end mb-4">
      <button @click="toggleMode" class="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">
        {{ darkMode ? 'Day Mode' : 'Night Mode' }}
      </button>
    </div>
    <div>
      <form @submit.prevent="submitForm" class="p-fluid">
        <div class="mb-4">
          <label for="username">Username:</label>
          <input id="username" v-model="forData.username" type="text" class="input" />
          <span v-if="$v.username.$error" class="text-red-500">{{ $v.username.$errors[0].$message }}</span>
        </div>
        <div class="mb-4">
          <label for="email">Email:</label>
          <input id="email" v-model="forData.email" type="email" class="input" />
          <span v-if="$v.email.$error" class="text-red-500">{{ $v.email.$errors[0].$message }}</span>
        </div>
        <div class="mb-4">
          <label for="password">Password:</label>
          <input id="password" v-model="forData.password" type="password" class="input" />
          <span v-if="$v.password.$error" class="text-red-500">{{ $v.password.$errors[0].$message }}</span>
        </div>
        <div class="mb-4">
          <label for="confirmPassword">Confirm Password:</label>
          <input id="confirmPassword" v-model="forData.confirmPassword" type="password" class="input" />
          <span v-if="$v.confirmPassword.$error" class="text-red-500">{{ $v.confirmPassword.$errors[0].$message }}</span>
        </div>

        <button type="submit" class="btn">
          Submit
        </button>
      </form>
    </div>
    <div>
      <p class="text-red-500">Errors: </p>
      <span v-for="error in $v.$errors" :key="error.$uid">
        {{error.$property }} - {{ error.$message }},
      </span>
    </div>
  </div>
</template>

<!-- <script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';

const forData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const rules = {
  forData: {
    username: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: { required, sameAs: sameAs(forData.password) }
  }
};

const $v = useVuelidate(rules, forData);

const darkMode = ref(false);

function submitForm() {
  if (!$v.$invalid) {
    // Perform form submission logic here
    console.log('Form submitted successfully');
  }
}

function toggleMode() {
  darkMode.value = !darkMode.value;
}
</script> -->

<style scoped>
/* Day Mode */
.light {
  background-color: #f5f5f5;
  color: #333;
}

/* Night Mode */
.dark {
  background-color: #333;
  color: #f5f5f5;
}

.input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.btn:focus {
  outline: none;
}
</style>
