<template>
    <div id="forgot-password" class="box-login-holder">
        <div class="card-login">
            <div class="box-top-holder">
                <div class="box-top box-top-left">
                    <router-link to="/">Back to Login</router-link>
                </div>
            </div>
            <div class="cl-header">
                <div class="cl-header-media">
                <img
                    src="../../assets/images/logo_dulb.webp"
                    alt="DULB logo"
                    width="956"
                    height="193"
                />
                </div>
                <h1 class="title">Forgot Password</h1>
            </div>
            <form class="form-login form-grid" v-if="show_verify">
                <div class="col-span-full">
                    <div class="fm-group">
                        <label class="fm-label" for="emailId">Username</label>
                        <Toast />
                        <InputGroup>
                            <div class="fm-inner">
                                <InputText v-model="emailId" placeholder="Enter your Username"  :disabled="emailchecked"/>
                            </div>
                            <Button
                                label="Verify Username"
                                @click="isEmailExist"
                                :disabled="!emailId ||emailchecked"
                            />
                            <!-- <div v-if="$v.emailId.$error" class="fm-error">
                                    {{ $v.emailId.$errors[0].$message }}
                                </div> 
                                <div v-if="OTPVerified" :style="{ color: 'green', fontSize: 'small' }">
                                    Email Verified 
                                </div>
                            </div> -->
                        </InputGroup>
                    </div>
                </div>
                <div class="col-span-full">
                    <div class="fm-group">
                        <label class="fm-label" for="mobileNumber"
                            >Enter Mobile Number</label
                        >
                        <div class="fm-input-group-holder">
                            <InputGroup>
                                <div class="fm-inner">
                                    <InputText
                                        v-model="mobileNumber"
                                        placeholder="xxx-xxx-xxxx"
                                        :disabled="isSmsOTPSent || !emailVerification || !emailchecked"
                                    />
                                    <fa-mobile-button class="fm-icon fm-prefix"></fa-mobile-button>
                                </div>
                                <Button
                                    label="Verify Mobile Number"
                                    severity="secondary"
                                    :disabled="!emailVerification || isSmsOTPSent"
                                    @click="verifyMobile"
                                />
                            </InputGroup>
                            <Button
                                label="Send OTP"
                                severity="secondary"
                                @click="sendOTPMobile"
                                :disabled="isSmsOTPSent || !checkMobileNumber"
                            />
                        </div>
                        <div v-if="$v.mobileNumber.$error" class="fm-error">
                            {{ $v.mobileNumber.$errors[0].$message }}
                        </div>
                        <div
                            v-if="OTPSmsVerified"
                            :style="{ color: 'green', fontSize: 'small' }"
                        >
                            Mobile Number verified
                        </div>
                    </div>
                </div>
                <div class="col-span-full">
                    <div class="fm-group" v-if="mobileOtpEnable">
                        <label class="fm-label" for="verifyMobileNumber"
                            >Enter OTP received on Mobile</label
                        >
                        <InputGroup>
                            <div class="fm-inner">
                                <InputText
                                    v-model="verifyMobileNumber"
                                    placeholder="xxx-xxx"
                                    :class="{ 'p-invalid': $v.verifyMobileNumber.$error }"
                                    :disabled="isSmsOTPVerified"
                                />
                                <fa-mobile-button
                                    class="fm-icon fm-prefix"
                                ></fa-mobile-button>
                            </div>
                            <Button
                                label="Verify OTP"
                                severity="secondary"
                                @click="verifyOTPMobile(), (resetButton = true)"
                                :disabled="isSmsOTPVerified"
                            />
                        </InputGroup>
                        <div id="username-help" class="fm-info">OTP is valid for 5 mins</div>
                        <div v-if="$v.verifyMobileNumber.$error" class="fm-error">
                            {{ $v.verifyMobileNumber.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="fm-action">
                    <Button
                        type="button"
                        @click="changePassword"
                        :disabled="!OTPSmsVerified"
                    >
                        Change Password</Button
                    >
                </div>
            </form>
            <form class="form-login form-grid" v-else>
                <div class="col-span-full">
                    <div class="fm-group">
                        <label class="fm-label" for="password">Reset Password</label>
                        <div class="fm-inner">
                            <Password v-model="password" toggleMask />
                            <fa-lock class="fm-icon fm-prefix"></fa-lock>
                        </div>
                        <div v-if="$v.password.$error" class="fm-error">
                            {{ $v.password.$errors[0].$message }}
                        </div>
                    </div>
                </div>
                <div class="col-span-full">
                    <div class="fm-group">
                        <label class="fm-label" for="confirmPassword"
                            >Confirm Reset Password</label
                        >
                        <div class="fm-inner">
                            <Password v-model="confirmPassword" toggleMask />
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
                        !isSmsOTPSent ||
                        password !== confirmPassword ||
                        !confirmPassword
                        "
                    >
                        Reset Password</Button
                    >
                </div>
            </form>
            <Footer name="box"></Footer>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import Password from "primevue/password";
import { useRouter } from 'vue-router';
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import MQL from "@/plugins/mql.js";
import { useVuelidate } from "@vuelidate/core";
import Footer from "@/components/common/Footer.vue";
import {
  required,
  minLength,
  maxLength,
  numeric,
  email,
  helpers,
} from "@vuelidate/validators";
import MQLCdn from "@/plugins/mqlCdn.js";
import faEmail from "../../assets/icons/envelope.svg";
import faMobileButton from "../../assets/icons/mobile-button.svg";
import faLock from "../../assets/icons/lock.svg";
import { useToast } from "primevue/usetoast";


const router = useRouter()
const toast = useToast();

const show_verify = ref(true);
const mobileNumber = ref("");
let isSmsOTPSent = ref(false);
const mobileOtpEnable = ref();
let OTPSmsVerified = ref(false);
let isSmsOTPVerified = ref(true);
const verifyMobileNumber = ref("");
const submitted = ref(false);
const emailId = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const emailVerification = ref();
const resetButton = ref(false);
const checkMobileNumber = ref(false);
const emailchecked=ref(false)
let countMobileNumberUser = ref("");

let rulesIndividual = computed(() => ({
  mobileNumber: {
    required,
    numeric,
    minLength: minLength(10),
    maxLength: maxLength(10),
  },
  verifyMobileNumber: {
    required,
  },
  password: {
    required,
  },
  confirmPassword: {
    required,
  },
}));
let rulesAll = computed(() => ({
  mobileNumber: {
    required,
    numeric,
    minLength: minLength(10),
    maxLength: maxLength(10),
  },
  verifyMobileNumber: {
    required,
  },
  password: {
    required,
  },
  confirmPassword: {
    required,
  },
}));
let rulesCompany = computed(() => ({
  mobileNumber: {
    required,
    numeric,
    minLength: minLength(10),
    maxLength: maxLength(10),
  },
  verifyMobileNumber: {
    required,
  },
  emailId: {
    required,
    email,
  },
  password: {
    required,
  },
  confirmPassword: {
    required,
  },
}));
let rules = ref("");
rules.value = rulesAll;
const $v = useVuelidate(rules, {
  mobileNumber,
  emailId,
  verifyMobileNumber,
  confirmPassword,
});


function changePassword() {
  show_verify.value = false
}

async function sendOTPMobile() {
  // console.log("$v.value.mobileNumber.$validate() is ",$v.value.mobileNumber.$invalid)

  await isMobileNumberExist();
  console.log("countMobileNumberUser is ", countMobileNumberUser.value);
  if (countMobileNumberUser.value === 1) {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Mobile Number already exist !!",
      life: 3000,
    });
    $v.value.mobileNumber.$validate();

    if (!$v.value.mobileNumber.$invalid) {
      // Automatically generated
      new MQL()
        .useCoreServer()
        .setActivity("o.[SendOTPSMS]")
        .setData({ mobileNumber: mobileNumber.value })
        // .setHeaders({})
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("SendOTPSMS", true);
          if (rs.isValid("SendOTPSMS")) {
            console.log("Received OTP ", res.result);

            isSmsOTPSent.value = true;
            isSmsOTPVerified.value = false;

            setTimeout(() => {
              // console.log("HI")
              if (OTPSmsVerified.value == true) {
                console.log("OTPSmsVerified t");

                isSmsOTPVerified.value = true;
                isSmsOTPSent.value = true;
              } else {
                isSmsOTPSent.value = false;
                verifyMobileNumber.value = "";
                // isSmsOTPVerified.value = true;
              }
            }, 30000);
          } else {
            toaster.error("");
          }
        });
    } else {
      toaster.error("Invalid Mobile Number");
    }
  }
}
function verifyOTPMobile() {
  // Automatically generated
  new MQL()
    .useCoreServer()
    .setActivity("o.[ValidateOTPSMS]")
    .setData({
      mobileNumber: mobileNumber.value,
      otp: verifyMobileNumber.value,
    })
    // .setHeaders({})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("ValidateOTPSMS", true);
      if (rs.isValid("ValidateOTPSMS")) {
        console.log("OTP status is ", res.result["otpValidationResult"]);

        if (res.result["otpValidationResult"] == "OTPFOUND") {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "SMS OTP verified!",
            life: 3000,
          });
          isSmsOTPVerified.value = true;
          isSmsOTPSent.value = true;
          OTPSmsVerified.value = true;
        } else {
          toast.add({
            severity: "error",
            summary: "ERROR",
            detail: "SMS OTP does not match!!",
            life: 3000,
          });
        }
      } else {
        rs.showErrorToast("ValidateOTPSMS");
      }
    });
}
// async function sendOTPEmail() {
//   await isEmailExist();
//   console.log("countEmailUsers is ", countEmailUsers.value);
//   if (countEmailUsers.value > 0) {
//     toaster.error("Email already exist");
//     return;
//   }

//   $v.value.fullName.$validate();
//   $v.value.emailId.$validate();
//   // $v.emailId.$validate()
//   // Automatically generated

//   if (!$v.value.emailId.$invalid && !$v.value.fullName.$invalid) {
//     new MQL()
//       .useCoreServer()
//       .setActivity("o.[SendOTPEmail]")
//       .setData({
//         from: "test@mkcl.org",
//         to: emailId.value,
//         fullName: fullName.value,
//       })
//       // .setHeaders({})
//       .fetch()
//       .then((rs) => {
//         let res = rs.getActivity("SendOTPEmail", true);
//         // if (rs.isValid("SendOTPEmail") && res.result == "SUCCESS") {
//         if (rs.isValid("SendOTPEmail")) {
//           console.log("Sending OTP to email", res.result);

//           isEmailOTPSent.value = true;
//           isEmailOTPVerified.value = false;

//           setTimeout(() => {
//             if (OTPVerified.value == true) {
//               isEmailOTPVerified.value = true;
//               isEmailOTPSent.value = true;
//             } else {
//               isEmailOTPSent.value = false;

//               emailOTP.value = "";
//               // isEmailOTPVerified.value = true;
//             }
//           }, 30000);
//         } else {
//           // rs.showErrorToast("SendOTPEmail")
//         }
//       });
//   } else {
//     toaster.error("Invalid Details");
//   }
// }

function verifyOTPEmail() {
  // Automatically generated
  new MQL()
    .useCoreServer()
    .setActivity("o.[ValidateOTPEmail]")
    .setData({ otp: emailOTP.value, to: emailId.value })
    // .setHeaders({})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("ValidateOTPEmail", true);
      if (rs.isValid("ValidateOTPEmail")) {
        console.log(res.result["OTPValidStatus"]);

        if (res.result["OTPValidStatus"] == "OTPFOUND") {
          toaster.success("Email OTP verified");
          isEmailOTPVerified.value = true;
          isEmailOTPSent.value = true;
          OTPVerified.value = true;
        } else {
          toaster.error("Email OTP did not match");
        }
      } else {
        rs.showErrorToast("ValidateOTPEmail");
      }
    });
}
function isEmailExist() {
  new MQL()
    .useLoginServer()
    .setActivity("o.[ForgetPasswordService]")
    .setData({
      userEmail: emailId.value,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("ForgetPasswordService", true);
      console.log("res", res.result.email_count);
      emailVerification.value = res.result.email_count;
      if (emailVerification.value == 1) {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Username Verified !!!",
          life: 5000,
        });
        emailchecked.value=true
      } else {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Username does'nt exist,please kindly check your Username!!!",
          life: 7000,
        });
        emailchecked.value=false
      }
      if (rs.isValid("ForgetPasswordService")) {
      } else {
        rs.showErrorToast("ForgetPasswordService");
      }
    });
}

function verifyMobile() {
  // Automatically generated
  new MQL()
    .useLoginServer()
    .setActivity("o.[VerifyMobileNumber]")
    .setData({
      userEmail: emailId.value,
      userMobile: mobileNumber.value,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("VerifyMobileNumber", true);
      if (rs.isValid("VerifyMobileNumber")) {
        console.log("resVerifyMobile", res.result.mobileVerify);
        if (res.result.mobileVerify == 0) {
          
          toast.add({
            severity: "error",
            summary: "ERROR",
            detail:
              "Verification Failed !Mobile number entered does not match with email!!",
            life: 7000,
          });
        } else {
          checkMobileNumber.value=true
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Mobile Number Verified !!",
            life: 5000,
          });
        }
      } else {
        rs.showErrorToast("VerifyMobileNumber");
      }
    });
}
function mobileOtpRequired() {
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchCustomValueByKey]")
    .setData({ key: "OTPMOBILE" })
    // .setHeaders({})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchCustomValueByKey", true);
      if (rs.isValid("FetchCustomValueByKey")) {
        console.log("value is ", res.result.vsCustomParamValue);

        if (res.result.vsCustomParamValue == "YES") {
          mobileOtpEnable.value = true;
        } else {
          mobileOtpEnable.value = false;
        }
      } else {
        rs.showErrorToast("FetchCustomValueByKey");
      }
    });
}
function isMobileNumberExist() {
  return new Promise((resolve, reject) => {
    new MQL()
      .useCoreServer()
      .setActivity("o.[VerifyMobileUserDetails]")
      .setData({ mobileNumber: mobileNumber.value })
      // .setHeaders({})
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("VerifyMobileUserDetails", true);
        if (rs.isValid("VerifyMobileUserDetails")) {
          console.log("res.result.countUsers", res.result.countUsers);
          countMobileNumberUser.value = res.result.countUsers;

          resolve();

          // submitForm();
        } else {
          rs.showErrorToast("VerifyMobileUserDetails");
        }
      });
  });
}
function resetPasswordWithHashing() {
  // Automatically generated
  new MQL()
    .useLoginServer()
    .setActivity("o.[ResetPasswordWithHashing]")
    .setData({
      password: password.value,
      userEmail: emailId.value,
      userMobile: mobileNumber.value,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("ResetPasswordWithHashing", true);
      console.log("res", res.result);
      if (rs.isValid("ResetPasswordWithHashing")) {
      } else {
        rs.showErrorToast("ResetPasswordWithHashing");
      }
    });
}
function resetPassword() {
  console.log("resetButton.value=true", resetButton.value);
  if (resetButton.value) {
    //console.log(emailId.value !== null && mobileNumber.value !== null);
    console.log("Email:", emailId.value);
    console.log("Mobile:", mobileNumber.value);
    console.log("password:", password.value);
    console.log("confirmPassword:", confirmPassword.value);
    resetPasswordWithHashing();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Password reset has been successful !",
      life: 3000,
    });
    router.push({path:'/'})
  } else {
    toast.add({
      severity: "error",
      summary: "ERROR",
      detail: "SMS OTP verification is mandatory !!",
      life: 3000,
    });
  }
}

onBeforeMount(() => {
  mobileOtpRequired();
});
</script>
