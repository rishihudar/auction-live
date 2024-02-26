<template>
    <div id="login" class="box-login-holder">
        <div class="card-login">
            <div class="cl-header">
                <div class="cl-header-media">
                    <img src="../../assets/images/logo_dulb.webp" alt="DULB logo" width="956" height="193">
                </div>
                <h1 class="title">
                    Login
                </h1>
            </div>
            <form class="form-login form-grid">
                <div class="col-span-full">
                    <div class="fm-group">
                        <label class="fm-label" for="username">Username</label>
                        <div class="fm-inner">
                            <InputText id="username" v-model="value" aria-describedby="username-help" placeholder="Enter Your Username" />
                        </div>
                        <div id="username-help" class="fm-info">Your username will be unique across the entire application and it will be used across the entire application.</div>
                    </div>
                </div>
                <div class="col-span-full">
                    <div class="fm-group">
                        <div class="fm-label-holder">
                            <label class="fm-label" for="password">Password</label>
                            <router-link to="/forgetPassword">Forgot Password?</router-link>
                        </div>
                        <div class="fm-inner">
                            <Password id="password" v-model="value" :feedback="false" toggleMask placeholder="Enter Your Password" unstyled />
                        </div>
                    </div>
                </div>
                <div class="fm-action">
                    <Button label="Login" @click="$router.push({ name: 'home' })" />
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
let username = ref("");
let password = ref("");
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
