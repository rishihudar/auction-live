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
                            <InputText id="username" v-model="user.username" aria-describedby="username-help"
                                placeholder="Enter Your Username"
                                :class="{ 'p-invalid': submitted && $v.user.username.$error }" />
                        </div>
                        <div id="username-help" class="fm-info">Your username will be unique across the entire
                            application and it will be used across the entire application.</div>
                        <div class="fm-error" v-if="submitted && $v.user.username.$error">
                            {{ $v.user.username.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="col-span-full">
                    <div class="fm-group">
                        <div class="fm-label-holder">
                            <label class="fm-label" for="password">Password</label>
                            <router-link to="/forgetPassword">Forget Password?</router-link>
                        </div>
                        <div class="fm-inner">
                            <Password id="password" v-model="user.password" :feedback="false" toggleMask
                                placeholder="Enter Your Password" unstyled />
                        </div>
                        <div class="fm-error" v-if="submitted && $v.user.password.$error">
                            {{ $v.user.password.$errors[0].$message }}
                        </div>
                    </div>
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
        <Dialog v-model:visible="visible">
            Oops! Make sure you're logging into the correct portal.<a :href="link">click here</a> to be redirected to <strong>bidder</strong> or If issues persist, contact our support team. Thank you!
        </Dialog>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { login } from "../store/modules/login.js";
import Dialog from "primevue/dialog";
import { createToaster } from "@meforma/vue-toaster";
import Footer from "@/components/common/Footer.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";



const toaster = createToaster({ position: "top-right", duration: 3000 });
const loginStore = login();
let submitted = ref(false);
const visible = ref(false)
const router = useRouter();
const link = ref(null)


// <-----Validations---->
let user = ref({
    username: "",
    password: "",
    recaptchaVerified: false,
});

let rules = computed(() => ({
    user: {
        username: { required, email },
        password: { required },
    },
}));

const $v = useVuelidate(rules, { user });

// <----Functions---->
function authenticate() {
    submitted.value = true;
    const result = $v.value.$validate();
    if (!$v.value.user.$error) {
        loginStore
            .userLogin({
                userName: user.value.username,
                password: user.value.password,
                enabled: 1
            })
            .then((res) => {
                let roles = loginStore.roleNames;
                toaster.success("Login Successfully");
                router.push('/role-select')

            })
            .catch((err) => {
                console.log(err);
                if (err.error == 'BIDDER_LOGIN') {
                    console.log(window);
                    visible.value = true
                    link.value = window.origin + '/applicant'
                }
                toaster.error;
            });
    } else {
        console.log("InValid Details");
        toaster.error("Invalid Details")
    }
}
</script>
