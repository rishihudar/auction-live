<template>
  <div id="login" class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Login Form
    </h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <div class="p-card p-component">
            <FormKit
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
              <pre wrap>{{ value }}</pre>
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login } from "../store/modules/login.js";
import { createToaster } from "@meforma/vue-toaster";
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
