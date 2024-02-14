<template>
    <div id="registration" class="box-login-holder box-regi-holder">
      <div class="card-login">
        <div class="page-header">
          <div class="ph-media">
            <img
              src="../../assets/images/logo_dulb.webp"
              alt="DULB logo"
              width="956"
              height="193"
            />
          </div>
          <h1 class="title">Registration Form</h1>
        </div>
  
        <!-- <h2 class="text-xl font-bold flex gap-2 items-center">
          <i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
         
          </h2> -->
        <div class="form-login form-grid">
          <form @submit.prevent="submitForm">
               <!--Full Name & Father Name-->
              <div class="fm-row">
                  <div class="w-1/2">
                      <div class="fm-group">
                          <label for="fullName">Enter Full Name</label>
                          <InputText
                              id="fullName"
                              v-model="fullName"
                              placeholder="Enter Full Name"
                              :class="{ 'p-invalid': $v.fullName.$error }"
                          />
                          <div v-if="$v.fullName.$error" class="p-error">
                              {{ $v.fullName.$errors[0].$message }}
                          </div>
                      </div>
                  </div>
                  <div class="w-1/2">
                      <div class="fm-group">
                          <label for="fatherHusbandFullName"
                          >Enter Father/Husband Full Name</label
                      >
                      <InputText
                          id="fatherHusbandFullName"
                          v-model="fatherHusbandFullName"
                          placeholder="Enter Father/Husband Full Name"
                          :class="{ 'p-invalid': $v.fatherHusbandFullName.$error }"
                      />
                      <div v-if="$v.fatherHusbandFullName.$error" class="p-error">
                          {{ $v.fatherHusbandFullName.$errors[0].$message }}
                      </div>
  
                      </div>
                  </div>
              </div>
  
              <!--Mobile Number-->
              <div class="fm-row">
                  <div class="w-1/2">
                      <div class="fm-group">
                          <label for="mobileNumber">Enter Mobile Number</label>
                          <div class="fm-input-group">
                              <InputText
                              v-model="mobileNumber"
                              placeholder="xxx-xxx-xxxx"
                              :class="{ 'p-invalid': $v.mobileNumber.$error }"
                              />
                              <Button v-if="mobileOtpEnable" label="Send OTP" @click="sendOTPMobile" />
                          </div>
                          
                          <div v-if="$v.mobileNumber.$error" class="p-error">
                          {{ $v.mobileNumber.$errors[0].$message }}
                          </div>
                      </div>
                  </div>
                  <div class="w-1/2">
                      <div class="fm-group" v-if="mobileOtpEnable"> 
                          <label for="verifyMobileNumber">Enter Mobile Number</label>
                          <div class="fm-input-group">
                              <InputText
                                  v-model="verifyMobileNumber"
                                  placeholder="xxx-xxx-xxxx"
                                  :class="{ 'p-invalid': $v.verifyMobileNumber.$error }"
                              />
                              <Button label="Verify OTP" @click="verifyOTPMobile" />
                          </div>
                          <div v-if="$v.verifyMobileNumber.$error" class="p-error">
                              {{ $v.verifyMobileNumber.$errors[0].$message }}
                          </div>
                      </div>
                  </div>
              </div>
  
              <!--Email ID-->
              <div class="fm-row">
                  <div class="w-1/2">
                      <div class="fm-group">
                          <label for="emailId">Enter Email ID</label>
                          <div class="fm-input-group">
                              <InputText
                              v-model="emailId"
                              placeholder="a@mail.com"
                              :class="{ 'p-invalid': $v.emailId.$error }"
                              :disabled="isEmailOTPSent"
                              />
                              <Button
                              v-if="emailOtpEnable"
                              label="Send OTP"
                              @click="sendOTPEmail"
                              :disabled="isEmailOTPSent"
                              />
                          </div>
                          <div v-if="$v.emailId.$error" class="p-error">
                          {{ $v.emailId.$errors[0].$message }}
                          </div>
                      </div>
                  </div>
                  <div class="w-1/2">
                      <div class="fm-group" v-if="emailOtpEnable">                        
                          <Button
                          label="Send OTP"
                          @click="sendOTPEmail"
                          :disabled="isEmailOTPSent"
                          />                        
                          <label for="verifyEmailId">Enter OTP received on Email ID</label>
                          <div class="fm-input-group">
                              <InputText
                                  v-model="emailOTP"
                                  placeholder="a@mail.com"
                                  :class="{ 'p-invalid': $v.emailOTP.$error }"
                                  :disabled="isEmailOTPVerified"
                              />
                              <Button
                                  label="Verify OTP"
                                  @click="verifyOTPEmail"
                                  :disabled="isEmailOTPVerified"
                              />
                          </div>
                          
                          <div v-if="$v.emailOTP.$error" class="p-error">
                              {{ $v.emailOTP.$errors[0].$message }}
                          </div>
                             
                      </div>
                      <div v-if="emailOtpEnable">
                          <Button
                          label="Send OTP"
                          @click="sendOTPEmail"
                          :disabled="isEmailOTPSent"
                          />
  
                          <div>
                          <label for="verifyEmailId">Enter OTP received on Email ID</label>
                          <InputText
                              v-model="emailOTP"
                              placeholder="a@mail.com"
                              :class="{ 'p-invalid': $v.emailOTP.$error }"
                              :disabled="isEmailOTPVerified"
                          />
                          <div v-if="$v.emailOTP.$error" class="p-error">
                              {{ $v.emailOTP.$errors[0].$message }}
                          </div>
                          <Button
                              label="Verify OTP"
                              @click="verifyOTPEmail"
                              :disabled="isEmailOTPVerified"
                          />
                          </div>
                      </div>
                  </div>
              </div>
              
              <!--Password-->
              <div class="fm-row">
                  <div class="w-1/2">
                      <div class="fm-group">
                          <label for="password">Password</label>
                          <Password v-model="password" toggleMask class="w-full md:w-14rem" />
                          <div v-if="$v.password.$error" class="p-error">
                              {{ $v.password.$errors[0].$message }}
                          </div>
                      </div>
                  </div>
                  <div class="w-1/2">
                      <div class="fm-group">
                          <label for="confirmPassword">Confirm Password</label>
                          <Password
                              v-model="confirmPassword"
                              toggleMask
                              class="w-full md:w-14rem"
                          />
                          <div v-if="$v.confirmPassword.$error" class="p-error">
                              {{ $v.confirmPassword.$errors[0].$message }}
                          </div>
                          <div v-if="password != confirmPassword" class="p-error">
                              Password does not match
                          </div>
                      </div>
                  </div>
              </div>
  
              <!--Bidder Type & Photo Upload-->
              <div class="fm-row">
                  <div class="w-1/2">
                      <div class="fm-group">
                          <label for="fileUploadPhoto">Upload Photo</label>
                          <FileUpload
                              v-model="fileUploadPhoto"
                              mode="basic"
                              name="fileUploadPhoto"
                              :auto="true"
                              :maxFileSize="1000000"
                              :custom-upload="true"
                              @uploader="cdnProfileUpload"
                              class="custom-file-upload"
                          />
                          <div v-if="$v.fileUploadPhoto.$error" class="p-error">
                              {{ $v.fileUploadPhoto.$errors[0].$message }}
                          </div>
                      </div>
                  </div>
                  <div class="w-1/2">
                      <div class="fm-group">
                          <label for="selectedBidderType">Bidder Type:</label>
                          <Dropdown
                          v-model="selectedBidderType"
                          :options="bidderTypes"
                          optionLabel="vsBidderTypeName"
                          placeholder="Select bidder"
                          class="custom-dropdown md:w-full"
                          />
                          <div v-if="$v.selectedBidderType.$error" class="p-error">
                          {{ $v.selectedBidderType.$errors[0].$message }}
                          </div>
                      </div>
                  </div>
              </div>
  
              <!-- Aadhar Card, Pan card, gender, marital status, DOB --> <!-- -->
              <div class="fm-row-group" v-if="selectedBidderType.vsBidderTypeName == 'Individual'">
                  <div class="fm-row">
                      <div class="w-1/2">
                          <div class="fm-group">
                              <label for="aadharNumber">Enter Aadhar Number</label>
                              <InputText
                                  v-model="aadharNumber"
                                  placeholder="xxx-xxx-xxxx"
                                  :class="{ 'p-invalid': $v.aadharNumber.$error }"
                              />
                              <div v-if="$v.aadharNumber.$error" class="p-error">
                                  {{ $v.aadharNumber.$errors[0].$message }}
                              </div>
                          </div>
                      </div>
                      <div class="w-1/2">
                          <div class="fm-group">
                              <label for="fileUploadAadhar">Upload Aadhar Card</label>
                              <FileUpload
                                  v-model="fileUploadAadhar"
                                  mode="basic"
                                  name="fileUploadAadhar"
                                  :auto="true"
                                  :maxFileSize="1000000"
                                  :custom-upload="true"
                                  @uploader="cdnProfileUpload"
                                  class="custom-file-upload"
                              />
                              <div v-if="$v.fileUploadAadhar.$error" class="p-error">
                                  {{ $v.fileUploadAadhar.$errors[0].$message }}
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="fm-row">
                      <div class="w-1/2">
                          <div class="fm-group">
                              <label for="panNumber">Enter PAN Number</label>
                              <InputText
                                  v-model="panNumber"
                                  placeholder="ABCDE1233F"
                                  :class="{ 'p-invalid': $v.panNumber.$error }"
                              />
                              <div v-if="$v.panNumber.$error" class="p-error">
                                  {{ $v.panNumber.$errors[0].$message }}
                              </div>
                              <div
                                  v-if="!$v.panNumber.panNumberValidation.$response"
                                  class="p-error"
                              >
                                  INVALID PAN
                              </div>
                          </div>
                      </div>
                      <div class="w-1/2">
                          <div class="fm-group">
                              <label for="fileUploadPAN">Upload PAN</label>
                              <FileUpload
                                  v-model="fileUploadPAN"
                                  mode="basic"
                                  name="fileUploadPAN"
                                  :auto="true"
                                  :maxFileSize="1000000"
                                  :custom-upload="true"
                                  @uploader="cdnProfileUpload"
                                  class="custom-file-upload"
                              />
                              <div v-if="$v.fileUploadPAN.$error" class="p-error">
                                  {{ $v.fileUploadPAN.$errors[0].$message }}
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="fm-row">
                      <div class="w-1/3">
                          <div class="fm-group">
                              <label for="selectedGender">Select Gender:</label>
                              <Dropdown
                                  v-model="selectedGender"
                                  :options="genderTypes"
                                  optionLabel="vsGenderName"
                                  placeholder="Select----"
                                  class="custom-dropdown md:w-full"
                              />
                              <div v-if="$v.selectedGender.$error" class="p-error">
                                  {{ $v.selectedGender.$errors[0].$message }}
                              </div>
                          </div>
                      </div>
                      <div class="w-1/3">
                          <div class="fm-group">
                              <label for="maritalStatus">Select Marital Status:</label>
                              <Dropdown
                                  v-model="maritalStatus"
                                  :options="maritalStatusTypes"
                                  optionLabel="vsMaritalStatusName"
                                  placeholder="Select----"
                                  class="custom-dropdown md:w-full"
                              />
                              <div v-if="$v.maritalStatus.$error" class="p-error">
                                  {{ $v.maritalStatus.$errors[0].$message }}
                              </div>
                          </div>
                      </div>
                      <div class="w-1/3">
                          <div class="fm-group">
                              <label for="dateOfBirth">Enter DOB</label>
                              <InputText
                                  type="date"
                                  v-model="dateOfBirth"
                                  :class="{ 'p-invalid': $v.dateOfBirth.$error }"
                              />
                              <div v-if="$v.dateOfBirth.$error" class="p-error">
                                  {{ $v.dateOfBirth.$errors[0].$message }}
                              </div> 
                          </div>
                      </div>
                  </div>
              </div>
              
              <!-- Company Name, Company Pan card, Legal Status, Designation, GST Number, Incorporation Certificate -->
              <div class="fm-row-group" v-else-if="selectedBidderType.vsBidderTypeName === 'Company'">   <!--   -->
                  <div class="fm-row">
                      <div class="w-1/3">
                          <div class="fm-group">
                              <label for="companyName">Enter Company Name</label>
                              <InputText
                                  id="companyName"
                                  v-model="companyName"
                                  placeholder="Enter Company Name"
                                  :class="{ 'p-invalid': $v.companyName.$error }"
                              />
                              <div v-if="$v.companyName.$error" class="p-error">
                                  {{ $v.companyName.$errors[0].$message }}
                              </div>
                          </div>
                      </div>
                      <div class="w-1/3">
                          <div class="fm-group">
                              <label for="companyPanNumber">Enter Company PAN Number</label>
                              <InputText
                                  v-model="companyPanNumber"
                                  placeholder="ABCDE1233F"
                                  :class="{ 'p-invalid': $v.companyPanNumber.$error }"
                              />
                              <div v-if="$v.companyPanNumber.$error" class="p-error">
                                  {{ $v.companyPanNumber.$errors[0].$message }}
                              </div>
                              <div
                                  v-if="!$v.companyPanNumber.panNumberValidation.$response"
                                  class="p-error"
                              >
                                  Invalid Company pan
                              </div>
                          </div>
                      </div>
                      <div class="w-1/3">
                          <div class="fm-group">
                              <label for="fileUploadCompanyPAN">Upload Company PAN</label>
                              <FileUpload
                                  v-model="fileUploadCompanyPAN"
                                  mode="basic"
                                  name="fileUploadCompanyPAN"
                                  :auto="true"
                                  :maxFileSize="1000000"
                                  :custom-upload="true"
                                  @uploader="cdnProfileUpload"
                                  class="custom-file-upload"
                              />
                              <div v-if="$v.fileUploadCompanyPAN.$error" class="p-error">
                                  {{ $v.fileUploadCompanyPAN.$errors[0].$message }}
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="fm-row">
                      <div class="w-1/2">
                          <div class="fm-group">                        
                              <label for="legalStatus">Legal Status:</label>
                              <Dropdown
                                  v-model="legalStatus"
                                  :options="legalStatusTypes"
                                  optionLabel="vsLegalStatusName"
                                  placeholder="Select----"
                                  class="custom-dropdown md:w-full"
                              />
                              <div v-if="$v.legalStatus.$error" class="p-error">
                                  {{ $v.legalStatus.$errors[0].$message }}
                              </div>
                          </div>
                      </div>
                      <div class="w-1/2">
                          <div class="fm-group">
                              <label for="designation">Designation:</label>
                              <Dropdown
                                  v-model="designation"
                                  :options="designationTypes"
                                  optionLabel="vsDesignationName"
                                  placeholder="Select----"
                                  class="custom-dropdown md:w-full"
                              />
                              <div v-if="$v.designation.$error" class="p-error">
                                  {{ $v.designation.$errors[0].$message }}
                              </div>  
                          </div>
                      </div>
                  </div>
                  <div class="fm-row">
                      <div class="w-1/2">
                          <div class="fm-group">                        
                              <label for="gstNumber">Enter GST Number</label>
                              <InputText
                                  v-model="gstNumber"
                                  placeholder="ABCDE1233F"
                                  :class="{ 'p-invalid': $v.gstNumber.$error }"
                              />
                              <div v-if="$v.gstNumber.$error" class="p-error">
                                  {{ $v.gstNumber.$errors[0].$message }}
                              </div>
                              <div
                                  v-if="!$v.gstNumber.gstNumberValidation.$response"
                                  class="p-error"
                              >
                                  Invalid GST Number
                              </div>
                          </div>
                      </div>
                      <div class="w-1/2">
                          <div class="fm-group">                        
                              <label for="fileUploadIncorporationCertificate"
                                  >Upload Incorporation Certificate</label
                              >
                              <FileUpload
                                  v-model="file"
                                  mode="basic"
                                  name="file"
                                  :auto="true"
                                  :maxFileSize="1000000"
                                  :custom-upload="true"
                                  @uploader="cdnProfileUpload"
                                  class="custom-file-upload"
                              />
                              <div
                                  v-if="$v.fileUploadIncorporationCertificate.$error"
                                  class="p-error"
                              >
                                  {{ $v.fileUploadIncorporationCertificate.$errors[0].$message }}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
  
              <!-- Text Area -->
              <div class="fm-row">
                  <div class="w-full">
                      <div class="fm-group">
                          <label>Correspondence address</label>
                          <Textarea class="fm-control" v-model="value" rows="5" ws="30" />
                      </div>
                  </div>
              </div>
              
              <!-- Dropdowns -->
              <div class="fm-row">
                  <div class="w-1/4">
                      <div class="fm-group">
                          <label for="selectedCountry">Select Country:</label>
                          <Dropdown
                          v-model="selectedCountry"
                          :options="countryList"
                          optionLabel="vsCountryName"
                          placeholder="Select----"
                          class="custom-dropdown md:w-full"
                          @change="fetchStateListByCountryId(selectedCountry.pklCountryId)"
                          />
                          <div v-if="$v.selectedCountry.$error" class="p-error">
                          {{ $v.selectedCountry.$errors[0].$message }}
                          </div>
                      </div>
                  </div>
                  <div class="w-1/4">
                      <div class="fm-group">
                          <label for="selectedState">Select State:</label>
                          <Dropdown
                          v-model="selectedState"
                          :disabled="!selectedCountry"
                          :options="stateList"
                          optionLabel="vsStateName"
                          @change="fetchDistrictListByStateId(selectedState.pklStateId)"
                          placeholder="Select----"
                          class="custom-dropdown md:w-full"
                          />
                          <div v-if="$v.selectedState.$error" class="p-error">
                          {{ $v.selectedState.$errors[0].$message }}
                          </div>
                      </div>
                  </div>
                  <div class="w-1/4">
                      <div class="fm-group">
  
                          <label for="selectedDistrict">Select District:</label>
                          <Dropdown
                          v-model="selectedDistrict"
                          :disabled="!selectedState"
                          :options="districtList"
                          optionLabel="vsDistrictName"
                          @change="
                              fetchTalukaListByDistrictId(selectedDistrict.pklDistrictId)
                          "
                          placeholder="Select----"
                          class="custom-dropdown md:w-full"
                          />
                          <div v-if="$v.selectedDistrict.$error" class="p-error">
                          {{ $v.selectedDistrict.$errors[0].$message }}
                          </div>
                      </div>
                  </div>
                  <div class="w-1/4">
                      <div class="fm-group">
                          <label for="selectedTaluka">Select Taluka:</label>
                          <Dropdown
                          v-model="selectedTaluka"
                          :disabled="!selectedDistrict"
                          :options="talukaList"
                          optionLabel="vsTalukaName"
                          placeholder="Select----"
                          class="custom-dropdown md:w-full"
                          />
                          <div v-if="$v.selectedTaluka.$error" class="p-error">
                          {{ $v.selectedTaluka.$errors[0].$message }}
                          </div>
                      </div>
                  </div>
              </div>
  
  
            <div class="fm-custom-controller">
              <div class="flex items-center">
                  <Checkbox v-model="checked" :binary="true" inputId="declaration" />
                  <label for="declaration" class="ml-2"> {{ declaration }} </label>
              </div>
            </div>
            <div class="fm-action">            
              <Button type="submit" class="p-button p-button-primary"
                  >Submit</Button
              >
            </div>
          </form>
          <Footer name="box"></Footer>
        </div>
        <!-- <div class="">
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
          </div> -->
      </div>
    </div>
  </template>
  
  <script setup>
    
    import { ref, computed, reactive, onMounted,onBeforeMount } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    
    import { required, minLength,maxLength, numeric, email,helpers } from '@vuelidate/validators'
    
    import Password from 'primevue/password';
    import Checkbox from 'primevue/checkbox';
    import Dropdown from 'primevue/dropdown';
    import FileUpload from 'primevue/fileupload'; 
    import Footer from "@/components/common/Footer.vue"
    import MQL from "@/plugins/mql.js"
    import Button from 'primevue/button';
    import Textarea from 'primevue/textarea';
    import MQLCdn from "@/plugins/mqlCdn.js";
    
    import { createToaster } from "@meforma/vue-toaster"
    const toaster = createToaster({ position: "top-right", duration: 3000 })
    
    
    let selectedBidderType = ref('');
    let bidderTypes = ref([]);
    
    let selectedGender = ref('')
    let genderTypes = ref([])
    
    let maritalStatus = ref('') 
    let maritalStatusTypes = ref([])
    let fileUploadIncorporationCertificate=ref('')
    
    let isEmailOTPSent = ref(false)
    let isEmailOTPVerified = ref(true)
    
    const fullName = ref('')
    const fatherHusbandFullName = ref('')
    const mobileNumber = ref('')
    const verifyMobileNumber = ref('')
    const emailId = ref('')
    const password = ref(null)
    const confirmPassword = ref(null)
    const aadharNumber = ref('')
    const fileUploadAadhar = ref('')
    const panNumber=ref('')
    const dateOfBirth=ref('')
    
    const companyName = ref('')
    const companyPanNumber = ref('')  
    
    let legalStatus = ref('')
    let legalStatusTypes = ref([])
    
    let designation = ref('')
    let designationTypes = ref([])
    
    const gstNumber = ref('')
    
    let countryList = ref([])
    let stateList = ref([])
    let districtList = ref([])
    let talukaList = ref([])
    let selectedCountry=ref('')
    let selectedState=ref('')
    let selectedDistrict=ref('')
    let selectedTaluka=ref('')
    
    const checked = ref('')
    const declaration=ref('I hereby declare that the information furnished above is true, complete and correct to the best of my knowledge and belief.')
    
    const emailOTP = ref('')
    let companyIncorporationCertificateDocumentPath=ref('')
    
    let fileUploadCompanyPAN = ref('')
    // let fileUploadAadhar = ref('')
    let fileUploadPAN = ref('')
    let fileUploadPhoto = ref('')
    
    const file=ref(null)
    // let MQLRequestData = {
    //   "fullName": fullName,
    //   "fatherOrHusbandName": fatherHusbandFullName,
    //   "password": password,
    //   "mobile": mobileNumber,
    //   "email": email,
    //   "loginEmail": email,
    //   "bidderTypeId": selectedBidderType.pklBidderTypeId,  
    //   "genderId": selectedGender,      
    //   "maritalStatusId": maritalStatus.pklGenderId, 
    //   "dateOfBirth": dateOfBirth,
    //   "companyName": companyName,
    //   "legalStatusId": legalStatus.pklLegalStatusId,  
    //   "designationId": designation.pklDesignationId, 
    //   "aadharDocumentTypeId": 1,
    //   "aadharDocumentPath": aadharDocumentPath,
    //   "aadharDocumentNumber":aadharDocumentNumber,
    //   "companyIncorporationCertificateDocumentTypeId": 3,
    //   "companyIncorporationCertificateDocumentPath": companyIncorporationCertificateDocumentPath,
    //   "companyIncorporationCertificateDocumentNumber":companyIncorporationCertificateDocumentNumber,
    //   "passportPhotoDocumentTypeId": 5,
    //   "passportPhotoDocumentPath": passportPhotoDocumentPath,
    //   "version": "1.0",
    //   "comment": "Initial version",
    //   "createdBy": "admin",     
    //   "countryId": 1,      
    //   "stateId": 1,        
    //   "districtId": 1,     
    //   "talukaId": 1,       
    //   "address": "123 Main St, City",
    //   "createdBy": "admin"
    // };
    
    const rules =computed(() => (
    {
      fullName: {
        required
      },
      fatherHusbandFullName: {
          required
      },
      mobileNumber: {
          required,
          numeric,
          minLength:minLength(10),
          maxLength:maxLength(10)
      },
      verifyMobileNumber: {
        required
      },
      emailId: {
          required,email
      },
      password: {
          required
      },
      confirmPassword: {
          required
      },
      selectedBidderType: {
          required
      },
      aadharNumber: {
          required,
          numeric,
          minLength:minLength(12),
          maxLength:maxLength(12)
    
      },
      fileUploadAadhar: {
          required
      },
      panNumber: {
          required,
          panNumberValidation: helpers.regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    
      },
      selectedGender: {
          required
      },
      maritalStatus: {
          required
      },
      dateOfBirth: {
          required
      },
      companyName: {
          required
      },
      companyPanNumber: {
          required,
          panNumberValidation: helpers.regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    
      },
      legalStatus: {
          required
      },
      designation: {
          required
      },
      gstNumber: {
          required,
          gstNumberValidation: helpers.regex(/^[0-9]{2}[A-Z0-9]{10}[0-9]{1}[Z]{1}[A-Z]{1}$/)
    
      },
      selectedCountry: {
          required
      },
      selectedState: {
        required
      },
      selectedDistrict: {
        required
      },
      selectedTaluka: {
        required
      },
      
      fileUploadIncorporationCertificate: {
          required
      },
      checked: {
        required
      },
      emailOTP: {
        required
      },
      fileUploadCompanyPAN: {
        required
      },
      fileUploadPAN: {
        required
      },
      fileUploadPhoto: {
        
      }
    
    }
    ));
    
    const $v = useVuelidate(rules,{fullName,fatherHusbandFullName,mobileNumber,
      emailId,password,confirmPassword,selectedBidderType,aadharNumber,
      fileUploadAadhar,panNumber,selectedGender,maritalStatus,dateOfBirth,companyName,companyPanNumber,
      legalStatus,designation,gstNumber,selectedCountry,selectedState,selectedDistrict,selectedTaluka,
      fileUploadIncorporationCertificate,checked,emailOTP,verifyMobileNumber
    });
    
    
    
    console.log($v);
    const submitForm = () => {
    const result = $v.value.$validate();
    result.then((res) => {
      if(res) {
        alert('Form submitted.');
      }
    }).catch((err) => {
      console.log(err);
    })
    
    };
    
    
    function fetchStateListByCountryId(countryId) {
    
      districtList.value=null;
    talukaList.value=null;
    
    console.log("id hai ",countryId)
    
    
            // Automatically generated
            new MQL()
        .setActivity("o.[FetchStateByCountryId]")
        .setData({"fklCountryId":countryId})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("FetchStateByCountryId",true)
        if (rs.isValid("FetchStateByCountryId")) {
    
          stateList.value = res.result
          // console.log('stateList',stateList)
    
        } else
         { 
        rs.showErrorToast("FetchStateByCountryId")
        }
        })
        
    
    }
    
    function fetchDistrictListByStateId(stateId) {
    
      talukaList.value=null;
            // Automatically generated
        new MQL()
        .setActivity("o.[FetchDistrictByStateId]")
        .setData({"fklStateId":stateId})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("FetchDistrictByStateId",true)
        if (rs.isValid("FetchDistrictByStateId")) {
    
          districtList.value = res.result
          console.log(res.result)
        } else
         { 
        rs.showErrorToast("FetchDistrictByStateId")
        }
        })
        
      
    }
    
    function fetchTalukaListByDistrictId(districtId) {
    
      console.log("districtId is",districtId)
     
            // Automatically generated
            new MQL()
        .setActivity("o.[FetchTalukaByDistrictId]")
        .setData({"fklDistrictId":districtId})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("FetchTalukaByDistrictId",true)
        if (rs.isValid("FetchTalukaByDistrictId")) {
          console.log("taluka hai",res.result)
          talukaList.value=res.result
        } else
         { 
        rs.showErrorToast("FetchTalukaByDistrictId")
        }
        })
        
    
    }
    
    function sendOTPEmail() {
      $v.value.fullName.$validate();
      $v.value.emailId.$validate();
      // $v.emailId.$validate()
            // Automatically generated
        new MQL()
        .setActivity("o.[SendOTPEmail]")
        .setData({"from":"amity@mkcl.org","to":emailId.value,"fullName":fullName.value})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("SendOTPEmail",true)
        if (rs.isValid("SendOTPEmail") && res.result == "SUCCESS") {
    
        console.log('Sending OTP to', res.result);
    
        isEmailOTPSent.value = true;
        isEmailOTPVerified.value = false;
    
        setTimeout(() => {
          if(OTPVerified==true) {
    
            isEmailOTPVerified.value=true
            isEmailOTPSent.value=true 
    
          } else {
            isEmailOTPSent.value = false;
          }
          
        }, 30000);
    
        } else
         { 
        // rs.showErrorToast("SendOTPEmail")
        }
        })
        
    } 
    
    let OTPVerified=ref(false)
    
    function verifyOTPEmail() {
    
      
            // Automatically generated
        new MQL()
        .setActivity("o.[ValidateOTPEmail]")
        .setData({"otp":emailOTP.value,"to":emailId.value})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("ValidateOTPEmail",true)
        if (rs.isValid("ValidateOTPEmail")) {
          console.log(res.result['OTPValidStatus'])
    
          if( res.result['OTPValidStatus'] == "OTPFOUND") {
    
            toaster.success("Email OTP verified")
            isEmailOTPVerified.value=true
            isEmailOTPSent.value=true 
            OTPVerified=true
    
          } else {
    
            toaster.error("Email OTP did not match")
    
          }
    
          
        } else
         { 
        rs.showErrorToast("ValidateOTPEmail")
        }
        })
        
    
    }
    
    function sendOTPMobile() {
    
      $v.value.mobileNumber.$validate();
    
    }
    
    function verifyOTPMobile() {
    
    }
    
    function FetchAllCountries() {
    new MQL()
        .setActivity("o.[FetchAllCountries]")
        // .setData({})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("FetchAllCountries",true)
        if (rs.isValid("FetchAllCountries")) {
                  
                  countryList = res.result
                  // percountryList = res.result
                  // console.log('countra',countryList)
        } else
         { 
        rs.showErrorToast("FetchAllCountries")
        }
        })
    
    }
    
    function FetchAllBidders() { 
    
            new MQL()
        .setActivity("o.[FetchAllBidderTypes]")
        .setData({})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("FetchAllBidderTypes",true)
        if (rs.isValid("FetchAllBidderTypes")) {
          bidderTypes = res.result;
        } else
         { 
        rs.showErrorToast("FetchAllBidderTypes")
        }
        })
        
    } 
    
    function FetchAllGenderTypes() {
    
            new MQL()
        .setActivity("o.[FetchAllGender]")
        .setData({})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("FetchAllGender",true)
        if (rs.isValid("FetchAllGender")) {
          genderTypes = res.result;
        } else
         { 
        rs.showErrorToast("FetchAllGender")
        }
        })
        
    
    }
    
    function FectAllMaritalStatusTypes() {
    
            new MQL()
        .setActivity("o.[FetchAllMaritalStatus]")
        .setData({})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("FetchAllMaritalStatus",true)
        if (rs.isValid("FetchAllMaritalStatus")) {
          maritalStatusTypes = res.result
        } else
         { 
        rs.showErrorToast("FetchAllMaritalStatus")
        }
        })
        
    }
    
    function DesignationTypes() {
    
    
            // Automatically generated
            new MQL()
        .setActivity("o.[FetchAllDesignation]")
        .setData({})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("FetchAllDesignation",true)
        if (rs.isValid("FetchAllDesignation")) {
          designationTypes = res.result
        } else
         { 
        rs.showErrorToast("FetchAllDesignation")
        }
        })
        
    
    
    }
    
    function LegalStatusTypes() {
    
            // Automatically generated
            new MQL()
        .setActivity("o.[FetchAllLegalStatus]")
        .setData({})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("FetchAllLegalStatus",true)
        if (rs.isValid("FetchAllLegalStatus")) {
          legalStatusTypes = res.result
        } else
         { 
        rs.showErrorToast("FetchAllLegalStatus")
        }
        })
        
    }
    
    onMounted( () => {   
    FetchAllCountries();
    FetchAllBidders();
    FetchAllGenderTypes();
    FectAllMaritalStatusTypes();
    DesignationTypes();
    LegalStatusTypes();
    })
    
    const mobileOtpEnable=ref()
    
    function mobileOtpRequired() {
    new MQL()
        .setActivity("o.[FetchCustomValueByKey]")
        .setData({"key":"OTPMOBILE"})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("FetchCustomValueByKey",true)
        if (rs.isValid("FetchCustomValueByKey")) {
    
          console.log("value is ",res.result[0].vsCustomParamValue)
    
          if(res.result[0].vsCustomParamValue=="YES") {
            mobileOtpEnable.value=true
          } else {
            mobileOtpEnable.value=false
          }
          
        } else
         { 
        rs.showErrorToast("FetchCustomValueByKey")
        }
        })
    }
    
    const emailOtpEnable=ref()
    
    function emailOtpRequired() {
    new MQL()
        .setActivity("o.[FetchCustomValueByKey]")
        .setData({"key":"OTPEMAIL"})
        // .setHeaders({})
        .fetch()
         .then(rs => {
        let res = rs.getActivity("FetchCustomValueByKey",true)
        if (rs.isValid("FetchCustomValueByKey")) {
    
          console.log("value is ",res.result[0].vsCustomParamValue)
    
          if(res.result[0].vsCustomParamValue=="YES") {
            emailOtpEnable.value=true
          } else {
            emailOtpEnable.value=false
          }
          
        } else
         { 
        rs.showErrorToast("FetchCustomValueByKey")
        }
        })
    }
    
    onBeforeMount(() => {
    
    mobileOtpRequired();
    emailOtpRequired();
    
        })
    
    
        function cdnProfileUpload(event) {
    let formData = new FormData();
    // console.log(event.files.Target)
    // console.log(event.files.Target[0])
    console.log(event.files[0])
    
    formData.append("file", event.files[0]); // append your file as 'file' in formdata.
    new MQLCdn()
      .enablePageLoader(true)
      // FIXED: change this to directory path
      .setDirectoryPath("/RegBidder") // (optional field) if you want to save  file to specific directory path
      .setFormData(formData) // (required) sets file data
      .setFileName("Aadhar") // (optional field) if you want to set name to file that is being uploaded
      // FIXED: pass buckeyKey instead of name
      .setBucketKey("2bOhMnAMfk3pwzGcDE6Ib9exWD1") // (required) valid bucket key need to set in which file will be uploaded.
      .setPurposeId("2bOhHmVulxJSFo04xgLSZGmtvOw") // (required) valid purposeId need to set in which file will be uploaded.
      .setClientId("2ZnbEg2SCTvOZwAFylfCVFdMOlz") // (required) valid purposeId need to set in which file will be uploaded.
      
      .uploadFile("uploadtBtn")
      .then((res) => {
        // (required) this will upload file takes element id (optional param) which will be blocked while file upload..
        if (res.isValid()) {
           // returns uploaded file url..
          console.log("hiiii", res.uploadedFileURL())
          toaster.success("file uploaded.");
        } else {
          res.showErrorToast();
        }
      });
    }
        
    
    </script>
  
  <style></style>
  