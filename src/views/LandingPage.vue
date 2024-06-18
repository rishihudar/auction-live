<template>
    <div>
        <div class="page-header pb-4 justify-center">
            <div class="ph-text text-center">
                <h2 class="title">Select Your Role</h2>
                <!-- <div class="subtitle">Click on the card to login to the specific Role</div> -->
            </div>
        </div>
        <div class="card-role-holder">
            <div class="card-role" v-for="(role, index) in loginStore.roles" :key="index"
                @click="navigateToDashboard(role)">
                <div class="cr-content">
                    <div class="cr-icon">
                        <fa-paper-plane></fa-paper-plane>
                    </div>
                    <div class="cr-title">
                        {{ role.roleName }}
                    </div>
                    <div class="cr-text">
                        {{ role.roleDescription }}
                    </div>
                    <div class="cr-action">
                        <Button>
                            {{ role.roleName }}<!-- Dashboard -->
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import faPaperPlane from '../../assets/icons/paper-plane.svg';
import faUser from '../../assets/icons/user.svg';
import { useRouter } from 'vue-router';
import { login } from "../store/modules/login";


const loginStore = login()
const router = useRouter()

function navigateToDashboard(role) {
    loginStore.SET_ROLE(role)
    router.push({ name: 'UserDashboard' })
}

</script>
