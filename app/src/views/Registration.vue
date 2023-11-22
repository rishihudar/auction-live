<template>
  <div id="registration" class="container-fluid reg">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Registration Form
    </h2>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-6">
          <div class="box-login e">
            <div class="p-card p-component">
              <FormKit
                type="form"
                id="registration-example"
                :form-class="submitted ? 'hide' : 'show'"
                submit-label="Register"
                @submit="saveData(value)"
                :actions="false"
                #default="{ value }"
              >
                <FormKit
                  type="text"
                  name="loginId"
                  label="loginId"
                  v-model="loginId"
                  placeholder="Login ID"
                  help="Enter Login ID"
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
                    placeholder="Your password"
                    help="Choose a password"
                  />
                  <FormKit
                    type="password"
                    name="password_confirm"
                    label="Confirm password"
                    placeholder="Confirm password"
                    validation="required|confirm"
                    help="Confirm your password"
                  />
                  <FormKit
                    type="file"
                    label="Your files"
                    help="This input starts with files already “attached”."
                    multiple="true"
                    :value="file_2"
                    v-model="file"
                    validation="required"
                  />
                </div>

                <FormKit
                  type="checkbox"
                  label="Terms and Conditions"
                  help="Do you agree to our terms of service?"
                  name="terms"
                  :value="true"
                  validation="accepted|required"
                  validation-visibility="dirty"
                />

                <FormKit
                  type="color"
                  value="#00FF00"
                  label="Select a color"
                  help="Select your favorite color."
                  validation="required"
                />

                <FormKit
                  type="date"
                  value="2011-01-01"
                  label="Birthday"
                  help="Enter your birth day"
                  validation="required|date_before:2010-01-01"
                  validation-visibility="live"
                />

                <FormKit
                  type="datetime-local"
                  value="2020-03-13T18:22"
                  label="End of the world"
                  help="When will the end of the world take place?"
                  validation="required|date_after"
                  validation-visibility="live"
                />

                <FormKit
                  type="email"
                  label="Student email address"
                  help="Please enter your student email address."
                  validation="required|email|ends_with:.com"
                  validation-visibility="live"
                  placeholder="vikas@school.com"
                />

                <FormKit name="user_id" type="hidden" value="user_32135" />

                <FormKit v-model="list" type="list">
                  <p>Please provide a list of emails.</p>
                  <FormKit label="Email address" validation="required|email" />
                  <FormKit label="Email address" validation="required|email" />
                  <FormKit label="Email address" validation="required|email" />
                </FormKit>

                <FormKit
                  type="month"
                  help="What month were you born?"
                  label="Birth month"
                  name="birth_month"
                  value="1965-09"
                  validation="required"
                />
                <FormKit
                  type="number"
                  help="What temperature should the house be?"
                  label="Thermostat"
                  name="temperature"
                  value="25"
                  step="1"
                  validation="required"
                />

                <FormKit
                  v-model="value1"
                  type="radio"
                  label="Preferred transportation"
                  :options="[
                    'E-Bike',
                    'E-Scooter',
                    'Electric car',
                    'Walking',
                    'Space tube',
                  ]"
                  help="How do you like to get around?"
                  validation="required"
                />

                <FormKit
                  v-model="value2"
                  type="range"
                  label="Volume"
                  min="0"
                  max="11"
                  help="Select your volume level."
                  validation="required"
                />
                <pre wrap>{{ value2 }}</pre>

                <FormKit
                  type="search"
                  placeholder="Search..."
                  label="Search"
                  value="Apple Cider"
                  validation="required"
                />
                <FormKit
                  type="select"
                  label="Which country is the smallest?"
                  name="small_country"
                  :options="['Monaco', 'Vatican City', 'Maldives', 'Tuvalu']"
                  validation="required"
                />

                <FormKit
                  type="tel"
                  label="Phone number"
                  placeholder="xxx-xxx-xxxx"
                  validation="required|matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                  :validation-messages="{
                    matches: 'Phone number must be in the format xxx-xxx-xxxx',
                  }"
                  validation-visibility="dirty"
                />

                <FormKit
                  type="textarea"
                  label="Your Essay"
                  rows="10"
                  placeholder="Remember to write in complete sentences."
                  help="I'll know if you didn't read the book!"
                  validation="required"
                />
                <FormKit
                  type="time"
                  label="Time"
                  value="15:50"
                  help="What time will go home today?"
                  validation="required"
                />
                <FormKit
                  label="Vacation"
                  type="week"
                  help="What week will you travel to Fiji?"
                  value="2025-W02"
                  validation="required"
                />
                <FormKit
                  type="url"
                  label="Favorite website"
                  placeholder="https://www.example.com..."
                  validation="required|url"
                  help="What is your favorite website?"
                />
                <FormKit type="submit" label="Register" />

                <pre wrap>{{ value }}</pre>
              </FormKit>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MQLCdn from "@/plugins/mqlCdn.js";
import { createToaster } from "@meforma/vue-toaster";
const toast = createToaster({ position: "top-right", duration: 3000 });
let loginId = ref("");
let file = ref(null);
let value = ref("");
let value1 = ref("");
let value2 = ref("");
let submitted = ref(false);
let file_2 = ref("");
let list = ref("");
function cdnProfileUpload() {
  let formData = new FormData();
  formData.append("file", this.file[0].file); // append your file as 'file' in formdata.
  new MQLCdn()
    .enablePageLoader(true)
    // FIXED: change this to directory path
    .setDirectoryPath("/demoFolder") // (optional field) if you want to save  file to specific directory path
    .setFormData(formData) // (required) sets file data
    .setFileName(this.inputFileName) // (optional field) if you want to set name to file that is being uploaded
    // FIXED: pass buckeyKey instead of name
    .setBucketKey("1TxYD2KhMcczFlxXntsueOYN46J") // (required) valid bucket key need to set in which file will be uploaded.
    .setPurposeId("1TxY9TS4uzp8Ivyo0eKPpo1g2Og") // (required) valid purposeId need to set in which file will be uploaded.
    .setClientId("1TxY9TS4uzp8Ivyo0eKPpo1g2Og") // (required) valid purposeId need to set in which file will be uploaded.
    .uploadFile("uploadtBtn")
    .then((res) => {
      // (required) this will upload file takes element id (optional param) which will be blocked while file upload..
      if (res.isValid()) {
        this.uploadedFilePath = res.uploadedFileURL(); // returns uploaded file url..
        toast.success("File uploaded successfully");
      } else {
        res.showErrorToast();
      }
    });
}
function saveData(value) {
  cdnProfileUpload();
  const form = new FormData();
  form.set("enctype", "multipart/form-data");
  form.append(
    "fileUrl",
    this.uploadedFilePath.cdnServer + this.uploadedFilePath.filePath
  );
  form.append("loginId", this.loginId);
  form.append("password", this.password);
}
</script>

<style></style>
