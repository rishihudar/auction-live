<template>
    <div class="p-grid">
        <div class="p-col-4">
            <Card class="p-card p-mb-3 mb-3" v-for="(role, index) in loginStore.roles" :key="index">
                <template #title>{{ role.roleName }}</template>
                <template #content>
                    <p class="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores
                        earum nam nobis,
                        culpa ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                </template>
                <template #footer>
                    <Button class="p-button" raised @click="navigateToDashboard(role)">
                        {{ role.roleName }} Dashboard
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

function navigateToDashboard(role) {
    loginStore.SET_ROLE(role)
    router.push({ name: 'UserDashboard' })
}

</script>
  