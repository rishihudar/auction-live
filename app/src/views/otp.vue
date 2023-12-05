<template>
  <div class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      OTP
    </h2>
    <div class="row justify-content-center">
        <div class="col-6">
            <div class="box-login clickable" @click.prevent="generated">
                <div class="p-card p-component">
                    <div class="icon-holder">
                      <i class="isax isax-bold-message"></i>
                    </div>
                    <div class="bx-login-name">
                      Generate OTP Example
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="box-login clickable" @click.prevent="verified">
                <div class="p-card p-component">
                    <div class="icon-holder">
                      <i class="isax isax-bold-message-edit"></i>
                    </div>
                    <div class="bx-login-name">
                      Verify OTP Example
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'

    const router = useRouter()

    function generated () {
      router.push('/generateOTP')
    }
    function verified () {
      router.push('/validateOTP')
    }

</script>
