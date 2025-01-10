<template>
  <div
    id="login"
    class="box-login-holder"
    :class="{ 'box-login-captcha': captachrequired }"
  >
    <div class="card-login">
      <div class="cl-header">
        <div class="cl-header-media">
          <img
            src="../../assets/images/logo_dulb.webp"
            alt="DULB logo"
            width="956"
            height="193"
          />
        </div>
        <h1 class="title">Login</h1>
      </div>
      <form class="form-login form-grid">
        <div class="col-span-full">
          <div v-if="isForceLogout" class="error-message">
            <span v-if="linkVisible"
              >You are already logged in on another device/tab/browser. You will
              need to logout the current session.
              <a @click.prevent="forceLogout(user.username)"
                >Click here to Logout</a
              ></span
            >
          </div>
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
              <fa-user class="fm-icon fm-prefix"></fa-user>
            </div>
            <!-- <div id="username-help" class="fm-info">Your username will be unique across the entire
                            application and it will be used across the entire application.</div> -->
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
              <Password
                id="password"
                v-model="user.password"
                :feedback="false"
                toggleMask
                placeholder="Enter Your Password"
                unstyled
                autocomplete="off"
              />
              <fa-lock class="fm-icon fm-prefix"></fa-lock>
            </div>
            <div class="fm-error" v-if="submitted && $v.user.password.$error">
              {{ $v.user.password.$errors[0].$message }}
            </div>
          </div>
        </div>
        <div class="col-span-full md:col-span-6" v-if="captachrequired">
          <div class="fm-group fm-captcha">
            <label class="fm-label">{{ $t("Captcha") }}</label>
            <div class="fm-inner">
              <InputText
                v-model="generatedCaptcha"
                :placeholder="$t('Captcha')"
                @dragover.prevent
                @dragenter.prevent
                @cut.prevent
                @copy.prevent
                @paste.prevent
                disabled
              />
              <button
                type="button"
                id="btnrefresh"
                value="Refresh"
                class="btn-refresh fm-suffix fm-icon-action"
                @click="generateCaptcha()"
              >
                <fa-rotate></fa-rotate>
              </button>
            </div>
          </div>
        </div>
        <div class="col-span-full md:col-span-6" v-if="captachrequired">
          <div class="fm-group">
            <label class="fm-label">{{ $t("Enter Captcha") }}</label>
            <div class="fm-inner" for="Entercaptcha">
              <InputText
                v-model="user.enteredCaptcha"
                name="Captcha Code"
                autocomplete="off"
                @dragover.prevent
                @dragenter.prevent
                @cut.prevent
                @copy.prevent
                @paste.prevent
                maxlength="10"
                class="form-control enter-captcha-input"
                :placeholder="$t('Enter Captcha')"
                v-validate="'required|max:10'"
              />
              <fa-shield-check class="fm-icon fm-prefix"></fa-shield-check>
            </div>
            <div
              class="fm-error"
              v-if="submitted && $v.user.enteredCaptcha.$error"
            >
              {{ $v.user.enteredCaptcha.$errors[0].$message }}
            </div>
          </div>
        </div>
        <div class="fm-action">
          <Button label="Login" @click="authenticate" :isFormValid />
        </div>
        <!-- <div class="fm-action-link">
                    <router-link to="/registration">New User? Register here</router-link>
                </div> -->
      </form>
      <Footer name="box"></Footer>
      <p>
        Last updated on <b>{{ versionDate }}</b> Version: <b>{{ version }}</b>
      </p>
      <!-- </div> -->
      <Dialog v-model:visible="visible">
        Oops! Make sure you're logging into the correct portal.<a :href="link"
          >click here</a
        >
        to be redirected to <strong>bidder portal</strong> or If issues persist,
        contact our support team. Thank you!
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import Captcha from "@/plugins/captcha.js";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { login } from "../store/modules/login.js";
import Dialog from "primevue/dialog";
import { createToaster } from "@meforma/vue-toaster";
import Footer from "@/components/common/Footer.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import MQL from "@/plugins/mql.js";
import { Input } from "postcss";

import faLock from "../../assets/icons/lock.svg";
import faRotate from "../../assets/icons/rotate.svg";
import faShieldCheck from "../../assets/icons/shield-check.svg";
import faUser from "../../assets/icons/user.svg";
let isForceLogout = ref(false);
let version = ref(__APP_VERSION__);
let versionDate = ref(__APP_VERSION_DATE__);

const toaster = createToaster({ position: "top-right", duration: 3000 });
const loginStore = login();
let submitted = ref(false);
const visible = ref(false);
const router = useRouter();
const link = ref(null);
let generatedCaptcha = ref("");

// <-----Validations---->
let user = ref({
  username: "",
  password: "",
  enteredCaptcha: "",
  isCaptchaValid: false,
});
const captachrequired = ref();
let rules = computed(() => ({
  user: {
    username: { required },
    password: { required },
    enteredCaptcha: captachrequired.value === "yes" ? { required } : {},
  },
}));
const count = ref([]);
const $v = useVuelidate(rules, { user });

const isFormValid = computed(() => {
  console.log("isFormValid", $v.value.$pending);
  return (
    $v.value.$pending === false &&
    !($v.value.user.username.$error || $v.value.user.password.$error) &&
    user.value.username !== "" &&
    user.value.password !== "" &&
    user.value.enteredCaptcha !== ""
  );
});
let linkVisible = ref(true);

function forceLogout(username) {
  linkVisible.value = false; // Hide the link after it's clicked

  console.log("forceLogout username", username);
  new MQL()
    .useLoginServer()
    .setActivity("o.[ForceLogout]")
    .setData({ userId: username })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("ForceLogout", true);
      if (rs.isValid("ForceLogout")) {
      } else {
        rs.showErrorToast("ForceLogout");
      }
    });
}

// <----Functions---->
function authenticate() {
  submitted.value = true;
  const result = $v.value.$validate();
  // Check if captcha is required and validate the captcha
  if (
    captachrequired.value &&
    user.value.enteredCaptcha !== generatedCaptcha.value.replaceAll(" ", "")
  ) {
    toaster.error("Please enter correct captcha");
    return;
  }

  if (!$v.value.user.$error) {
    loginStore
      .userLogin({
        userName: user.value.username,
        password: user.value.password,
        enteredCaptcha: user.value.enteredCaptcha,
        enabled: 1,
      })
      .then(async (res) => {
        // Check if res is boolean and handle force logout
        if (typeof res === "boolean") {
          isForceLogout.value = res; // Update isForceLogout based on login result

          if (isForceLogout.value === true) {
            console.log("isForceLogout", isForceLogout.value);
            // toaster.error("You have been logged out. Please login again.");
            return;
          }
        }
        // isForceLogout.value =res; // Update isForceLogout based on login result

        // if (isForceLogout.value == true) {
        //   console.log("isForceLogout", isForceLogout.value);
        //   //toaster.error("You have been logged out. Please login again.");
        //   return;
        // }
        let roles = loginStore.roleNames;

        toaster.success("Login Successfully");
        const passwordCount = await FetchPasswordCount();
        if (passwordCount == 0) {
          router.push("/changePassword");
        } else {
          router.push("/role-select");
        }
      })
      .catch((err) => {
        if (err && err.errorCode) {
          // Handle the error based on errorCode
          console.log(err.errorCode);
        } else {
          console.error("An error occurred, but errorCode is undefined");
        }
        //console.log(err);
        if (err.error == "BIDDER_LOGIN") {
          //console.log(window);
          visible.value = true;
          link.value = window.origin + "/applicant";
        }
        toaster.error;
      });
  } else {
    //console.log("InValid Details");
    toaster.error("Please fill all details");
  }
}

function generateCaptcha() {
  user.value.enteredCaptcha = "";
  var captchaResult = Captcha.generateCaptcha();
  if (captchaResult) {
    generatedCaptcha.value = captchaResult;
  } else {
    Swal.fire({
      title: "Something went wrong! Please contact support.-CAPTCHA01",
      icon: "error",
    });
  }
}

function FetchPasswordCount() {
  return new Promise((resolve, reject) => {
    new MQL()
      .useLoginServer()
      .setActivity("o.[FetchPasswordCount]")
      .setData({ userId: loginStore.loginDetails.loginId })
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("FetchPasswordCount", true);
        if (rs.isValid("FetchPasswordCount")) {
          // count.value=res.result.passwordCount;
          //console.log("count.value", count.value)
          //console.log("count", res.result.passwordCount)
          resolve(res.result.passwordCount);
        } else {
          rs.showErrorToast("FetchPasswordCount");
        }
      });
  });
}
function fetchCaptchaCustomParam() {
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchCustomValueByKey]")
    .setData({ key: "CAPTCHA_REQUIRED" })
    // .setHeaders({})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchCustomValueByKey", true);
      if (rs.isValid("FetchCustomValueByKey")) {
        if (res.result.vsCustomParamValue.toLowerCase() === "yes") {
          captachrequired.value = true;
        } else {
          captachrequired.value = false;
        }
      } else {
        rs.showErrorToast("FetchCustomValueByKey");
      }
    });
}

onMounted(() => {
  fetchCaptchaCustomParam();
  FetchPasswordCount();
  generateCaptcha();
});
</script>

