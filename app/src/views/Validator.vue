<template>
  <div id="validator">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Validator
    </h2>
    <div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
        <FormKit
            type="form"
            id="validator-example"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Register"
            :actions="false"
        >
            <FormKit
            type="select"
            label="Select Salutation"
            placeholder="Select Salutation"
            name="salutation"
            :options="['MR', 'MISS']"
            validation="required"
            />
            <FormKit
            type="text"
            name="firstName"
            label="firstName"
            v-model="firstName"
            placeholder="First Name"
            help="Enter First Name"
            validation="required"
            />
            <FormKit
            type="text"
            name="lastName"
            label="lastName"
            v-model="lastName"
            placeholder="Last Name"
            help="Enter Last Name"
            validation="required"
            />
            <FormKit
            type="date"
            value="2011-01-01"
            label="Birthday"
            help="Enter your birth day"
            validation="required|date_before:2010-01-01"
            validation-visibility="live"
            /><FormKit
            type="email"
            name="email"
            label="email"
            v-model="email"
            placeholder="Email"
            help="Enter Email"
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
                type="checkbox"
                label="Terms and Conditions"
                help="Do you agree to our terms of service?"
                name="terms"
                :value="true"
                validation="accepted"
                validation-visibility="dirty"
            />
            </div>
            <FormKit type="submit" label="Register" />
            <!-- <pre wrap>{{ value }}</pre> -->
        </FormKit>
    </div>
  </div>
</template>

<script>
export default {
  name: "Validator",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      submitted: false,
    };
  },
  methods: {
    submit() {
      this.submitted = true;
      this.$nextTick(() => {
        this.submitted = false;
      });
    },
  },
};
</script>

<style></style>
