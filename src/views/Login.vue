<template>
    <div id="login" class="box-login-holder">
        <div class="card-login">
            <div class="page-header">
                <div class="ph-media">
                    <img src="../../assets/images/logo_dulb.webp" alt="DULB logo" width="956" height="193">
                </div>
                <h1 class="title">
                    Login
                </h1>
            </div>
            <form class="form-login form-grid">
                <div class="fm-group">
                    <label for="username">Username</label>
                    <InputText id="username" v-model="user.username" aria-describedby="username-help" placeholder="Enter Your Username" />
                    <small id="username-help">Your username will be unique across the entire application and it will be used across the entire application.</small>
                </div>
                <div class="fm-group">
                    <label for="password">Password</label>
                    <Password id="password" v-model="user.password" :feedback="false" toggleMask placeholder="Enter Your Password" unstyled>
                        <!-- <template #hideicon>
                            test
                        </template>
                        <template #showicon>
                            test
                        </template> -->
                    </Password>
                </div>
                <div class="fm-action">
                    <Button label="Login" @click="authenticate" />
                </div>
                <div class="fm-action-link">
                    <router-link to="/registration">New User? Register here</router-link>
                </div>
            </form>
            <Footer name="box"></Footer>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { login } from "../store/modules/login.js";
import { createToaster } from "@meforma/vue-toaster";
import Footer from "@/components/common/Footer.vue"
const toaster = createToaster({ position: "top-right", duration: 3000 });
const loginStore = login();
let user = ref({
  username: "",
  password: "",
  recaptchaVerified: false,
});
let submitted = ref(false);

function authenticate() {
  loginStore
    .AUTH_REQUEST({ loginId: username.value, password: password.value })
    .then((res) => {
      toaster.success("Login Successfully");
    })
    .catch((err) => {
      toaster.error(err);
    });
}
</script>
