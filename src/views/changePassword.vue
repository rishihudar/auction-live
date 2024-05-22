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
                <h1 class="title">Change Password</h1>
            </div>

            <form class="form-login form-grid">
                <div class="col-span-full">
                    <div class="fm-group">
                        <label class="fm-label" for="password1">Enter Old Password</label>
                        <div class="fm-inner">
                            <Password v-model="oldPassword" :feedback="false" toggleMask />
                            <fa-lock class="fm-icon fm-prefix"></fa-lock>
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
                        <div v-if="!$v.password.passwordValidation.$response" class="fm-error">
                            Alphanumeric with at least one uppercase and one lower case letter and at least one special
                            character. Length: min 8 max 12.
                        </div>
                    </div>
                </div>
                <div class="col-span-full">
                    <div class="fm-group">
                        <label class="fm-label" for="confirmPassword">Re-Enter New Password</label>
                        <div class="fm-inner">
                            <Password v-model="confirmPassword" :feedback="false" toggleMask />
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
                    <Button type="button" @click="resetPassword" :disabled="password !== confirmPassword ||
                                !confirmPassword || !oldPassword
                                ">
                        Change Password</Button>
                </div>
            </form>
            <Footer name="box"></Footer>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Password from "primevue/password";
import { useRouter } from 'vue-router';
import Button from "primevue/button";
import MQL from "@/plugins/mql.js";
import { useVuelidate } from "@vuelidate/core";
import Footer from "@/components/common/Footer.vue";
import {
    required,
    minLength,
    maxLength,
    helpers,
} from "@vuelidate/validators";
import { login } from "../store/modules/login.js";
import faLock from "../../assets/icons/lock.svg";
import { useToast } from "primevue/usetoast";
const oldPassword = ref(null);
const router = useRouter()
const toast = useToast();
const password = ref(null);
const confirmPassword = ref(null);
const loginStore = login();
let rulesAll = computed(() => ({
    password: {
        passwordValidation: helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,12}$/)
        ,
        minLength: minLength(8),
        maxLength: maxLength(12)
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
    confirmPassword, oldPassword, password
});
function ChangePasswordWithHashing() {
    new MQL()
        .useLoginServer()
        .setActivity("o.[ChangePasswordWithHashing]")
        .setData({
            password: password.value,
            userEmail: loginStore.loginDetails.username
        })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity("ChangePasswordWithHashing", true);
            console.log("res", res.result);
            if (rs.isValid("ChangePasswordWithHashing")) {
            } else {
                rs.showErrorToast("ChangePasswordWithHashing");
            }
        });
}
function resetPassword() {
    console.log("Email:", loginStore.loginDetails.username);
    console.log("password:", password.value);
    console.log("confirmPassword:", confirmPassword.value);
    ChangePasswordWithHashing();
    toast.add({
        severity: "success",
        summary: "Success",
        detail: "Password changed has been successful !",
        life: 3000,
    });
    UpdatePasswordChangedCount();
    router.push({ path: '/' })
}
function UpdatePasswordChangedCount() {
    new MQL()
        .useLoginServer()
        .setActivity("o.[UpdatePasswordChangedCount]")
        .setData( { userEmail: loginStore.loginDetails.username})
        .fetch()
        .then(rs => {
            let res = rs.getActivity("UpdatePasswordChangedCount", true)
            if (rs.isValid("UpdatePasswordChangedCount")) {
            } else {
                rs.showErrorToast("UpdatePasswordChangedCount")
            }
        })
}
</script>
