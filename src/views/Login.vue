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
                <div class="col-span-full">
                    <div class="fm-group">
                        <label class="fm-label" for="username">Username</label>
                        <div class="fm-inner">
                            <InputText
                                id="username"
                                v-model="user.username"
                                aria-describedby="username-help"
                                placeholder="Enter Your Username"
                                :class="{ 'p-invalid': submitted && $v.user.username.$error }"
                            />
                        </div>
                        <small id="username-help">Your username will be unique across the entire application and it will be used across the entire application.</small>
                        <div class="text-danger" v-if="submitted && $v.user.username.$error">
                            {{ $v.user.username.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="col-span-full">
                    <div class="fm-group">
                        <label class="fm-label" for="password">Password</label>
                        <div class="fm-inner">
                            <Password
                                id="password"
                                v-model="user.password"
                                :feedback="false"
                                toggleMask
                                placeholder="Enter Your Password"
                                unstyled
                            />
                            <div class="text-danger" v-if="submitted && $v.user.password.$error">
                                {{ $v.user.password.$errors[0].$message }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fm-action">
                    <Button label="Login" @click="authenticate" />
                </div>
                <div class="fm-action-link">
                    <router-link to="/registration">New User? Register here</router-link>
                </div>
                <div class="fm-action-link">
                    <router-link to="/forgetPassword">Forget Password? Click here</router-link>
                </div>
            </form>
            <Footer name="box"></Footer>
            <!-- <FormKit
                type="form"
                id="login-example"
                :form-class="submitted ? 'hide' : 'show'"
                submit-label="Register"
                @submit="authenticate"
                :actions="false"
                #default="{ value }"
            >
                <FormKit
                    type="text"
                    name="username"
                    label="User Name"
                    v-model="username"
                    placeholder="User Name"
                    help="Enter User Name"
                    validation="required"
                />
                <div class="double">
                    <FormKit
                        type="password"
                        name="password"
                        label="Password"
                        validation="required|length:6|matches:/[^a-zA-Z]/"
                        :validation-messages="{
                        matches: 'Please include at least one symbol',
                        }"
                        v-model="password"
                        placeholder="Your password"
                        help="Choose a password"
                    />
                </div>
                <FormKit type="submit" label="Login" />
            </FormKit>-->
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
import { ref, computed } from "vue";
import { login } from "../store/modules/login.js";
import { createToaster } from "@meforma/vue-toaster";
import Footer from "@/components/common/Footer.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
const toaster = createToaster({ position: "top-right", duration: 3000 });
const loginStore = login();
let submitted = ref(false);

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
  console.log("if any error", $v.value.user.$error);
  if (!$v.value.user.$error) {
    console.log("Valid Details", user.value.username);
    loginStore
      .userLogin({
        userName: user.value.username,
        password: user.value.password,
        enabled : 1
      })
      .then((res) => {
        //console.log(res)
        let roles = login().roleNames;
        console.log("Roles from store", roles);
        // if (roles === "ROLE_BIDDER") {
        //   console.log("push to bidder dashboard");
        //   router.push({ path: "/bidder/bidderDashboard" });
        //  } 
        // //else if (roles === "ROLE_SUPERADMIN") {
        // //   router.push({ name: "SuperAdminDashboard" });
        // // } else if (roles === "ROLE_ORGANIZATION_ADMIN") {
        // //   router.push({ name: "OrganizationAdminDashboard" });
        // // }
        // else if (roles === "ROLE_MAKER"){
        //   router.push({ path: "/users/makerDashboard" });
        // }
        toaster.success("Login Successfully");
        // console.log('Store Data',login().loginDetails)
        //console.log('Role Data', login().roleNames)
      })
      .catch((err) => {
        toaster.error;
      });
    // loginStore
    // .AUTH_REQUEST({ loginId: username.value, password: password.value })
    // .then((res) => {
    //   toaster.success("Login Successfully");
    // })
    // .catch((err) => {
    //   toaster.error(err);
    // });
  } else {
    console.log("InValid Details");
  }
}
</script>
