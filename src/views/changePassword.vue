<template>
  <div id="forgot-password" class="box-login-holder">
    <div class="card-login">
      <div class="cl-header">
        <!-- <div class="cl-header-media">
                <img
                    src="../../assets/images/logo_dulb.webp"
                    alt="DULB logo"
                    width="956"
                    height="193"
                />
                </div> -->
        <h1 class="title">Reset Password</h1>
      </div>

      <form class="form-login form-grid">
        <div class="col-span-full">
          <div class="fm-group">
            <label class="fm-label" for="password1">Enter Old Password</label>
            <div class="fm-inner">
              <Password v-model="oldPassword" :feedback="false" toggleMask  @input="verifyOldPassword"/>
              <fa-lock class="fm-icon fm-prefix"></fa-lock>
              
            </div>
            <div v-if="passwordExist" class="fm-error">
                Old Password is not correct.
              </div>
            <div v-if="$v.oldPassword.$error" class="fm-error">
              {{ $v.oldPassword.$errors[0].$message }}
            </div>
            <!-- <div v-if="!oldPassword" class="fm-error">
                            Old Password is required
                        </div> -->
          </div>
        </div>
        <div class="col-span-full">
          <div class="fm-group">
            <label class="fm-label" for="password">Enter New Password</label>
            <div class="fm-inner">
              <Password v-model="password" :feedback="false" toggleMask />
              <fa-lock class="fm-icon fm-prefix"></fa-lock>
            </div>
            <div v-if="$v.password.$error" class="fm-error">
              {{ $v.password.$errors[0].$message }}
            </div>
            <div
              v-if="!$v.password.passwordValidation.$response"
              class="fm-error"
            >
              Alphanumeric with at least one uppercase and one lower case letter
              and at least one special character. Length: min 8 max 12.
            </div>
          </div>
        </div>
        <div class="col-span-full">
          <div class="fm-group">
            <label class="fm-label" for="confirmPassword"
              >Re-Enter New Password</label
            >
            <div class="fm-inner">
              <Password
                v-model="confirmPassword"
                :feedback="false"
                toggleMask
              />
              <fa-lock class="fm-icon fm-prefix"></fa-lock>
            </div>
            <div v-if="$v.confirmPassword.$error" class="fm-error">
              {{ $v.confirmPassword.$errors[0].$message }}
            </div>
            <div v-if="password != confirmPassword" class="fm-error">
              Password does not match
            </div>
          </div>
        </div>
        <div class="fm-action">
          <Button
            type="button"
            @click="resetPassword"
            :disabled="
              password !== confirmPassword || !confirmPassword || !oldPassword
            "
          >
            Change Password</Button
          >
        </div>
      </form>
      <Footer name="box"></Footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Password from "primevue/password";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import MQL from "@/plugins/mql.js";
import { useVuelidate } from "@vuelidate/core";
import Footer from "@/components/common/Footer.vue";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import { createToaster } from "@meforma/vue-toaster";

import { login } from "../store/modules/login.js";
import faLock from "../../assets/icons/lock.svg";
import { useToast } from "primevue/usetoast";
const toaster = createToaster({ position: "top-right", duration: 3000 });
const oldPassword = ref(null);
const router = useRouter();
const toast = useToast();
const password = ref(null);
const confirmPassword = ref(null);
const loginStore = login();
let rulesAll = computed(() => ({
  password: {
    passwordValidation: helpers.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,12}$/
    ),
    minLength: minLength(8),
    maxLength: maxLength(12),
  },
  confirmPassword: {
    required,
  },
  oldPassword: {
    required,
  },
}));

let rules = ref("");
rules.value = rulesAll;
const $v = useVuelidate(rules, {
  confirmPassword,
  oldPassword,
  password,
});
function ChangePasswordWithHashing() {
  new MQL()
    .useLoginServer()
    .setActivity("o.[ChangePasswordWithHashing]")
    .setData({
      password: password.value,
      userEmail: loginStore.loginDetails.username,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("ChangePasswordWithHashing", true);
      //console.log("res", res.result);
      if (rs.isValid("ChangePasswordWithHashing")) {
      } else {
        rs.showErrorToast("ChangePasswordWithHashing");
      }
    });
}

 async function resetPassword() {
  //console.log("Email:", loginStore.loginDetails.username);
  //console.log("password:", password.value);
  //console.log("confirmPassword:", confirmPassword.value);
  ChangePasswordWithHashing();

// Check passwordCount and call appropriate function
const passwordCount = await FetchPasswordCount();
if (passwordCount === 0) {
    UpdatePasswordChangedCount();
  } else {
    UpdatePasswordExpiryDate();
  }

  toaster.success("Password reset successfully");
  router.push({ path: "/" });
}
function UpdatePasswordChangedCount() {
    console.log("UpdatePasswordChangedCount", loginStore.loginDetails.username);
  new MQL()
    .useLoginServer()
    .setActivity("o.[UpdatePasswordChangedCount]")
    .setData({ userEmail: loginStore.loginDetails.username })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("UpdatePasswordChangedCount", true);
      if (rs.isValid("UpdatePasswordChangedCount")) {
      } else {
        rs.showErrorToast("UpdatePasswordChangedCount");
      }
    });
}
function UpdatePasswordExpiryDate() {
  // Automatically generated
  console.log("UpdatePasswordExpiryDate", loginStore.loginDetails.username);
  new MQL()
    .useLoginServer()
    .setActivity("o.[UpdatePasswordExpiryDate]")
    .setData({ userEmail: loginStore.loginDetails.username })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("UpdatePasswordExpiryDate", true);
      if (rs.isValid("UpdatePasswordExpiryDate")) {
      } else {
        rs.showErrorToast("UpdatePasswordExpiryDate");
      }
    });
}
const passwordExist = ref("");
const verifyOldPassword = async () => {
  const rs = await new MQL()
    .useLoginServer()
    .setActivity("o.[VerifyPassword]")
    .setData({
      password: oldPassword.value,
      userEmail: loginStore.loginDetails.username,
    })
    .enablePageLoader(false)
    .fetch();
  const res = rs.getActivity("VerifyPassword", true);
  if (rs.isValid("VerifyPassword")) {
    console.log("Password exist", res.result.entriesPresent);
    if (res.result.entriesPresent!== 1) {
      passwordExist.value = true;
    } else {
      passwordExist.value = false;
    }
    console.log("Password exist", passwordExist.value);
  } else {
    rs.showErrorToast("VerifyPassword");
   
  }
};

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
</script>
