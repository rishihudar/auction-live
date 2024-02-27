<template>
    <div class="p-grid">
        <div class="p-col-4">
            <Card class="p-card p-mb-3 mb-3" v-for="(name, index) in loginStore.roles" :key="index">
                <template #title>{{ formatRoleString(name) }}</template>
                <template #content>
                    <p class="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores
                        earum nam nobis,
                        culpa ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                </template>
                <template #footer>
                    <Button class="p-button" raised @click="navigateToDashboard(name)">
                        {{ formatRoleString(name) }} Dashboard
                    </Button>
                </template>
            </Card>
        </div>
    </div>
</template>
  
<script setup>
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { login } from "../store/modules/login";


const loginStore = login()
const router = useRouter()

function navigateToDashboard(name) {
    loginStore.SET_ROLE(name)
    router.push({name})
}

function formatRoleString(inputString) {
  // Split the input string by underscore
  let words = inputString.split('_');

  // Capitalize the first letter of each word
  let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  // Join the words with a space
  let formattedString = capitalizedWords.join(' ');

  return formattedString;
}
</script>
  