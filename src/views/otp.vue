<template>
  <div>
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
      OTP
    </h2>
    <div class="grid gap-4 grid-cols-2">
        <div class="box-login mx-auto p-8 w-full flex gap-4 rounded-xl bg-white shadow cursor-pointer" @click.prevent="generated">
            <div class="icon-holder">
                <i class="isax isax-bold-message text-2xl"></i>
            </div>
            <div class="bx-login-name">
                Generate OTP Example
            </div>
        </div>
        <div class="box-login mx-auto p-8 w-full flex gap-4 rounded-xl bg-white shadow cursor-pointer" @click.prevent="verified">
            <div class="icon-holder">
                <i class="isax isax-bold-message-edit text-2xl"></i>
            </div>
            <div class="bx-login-name">
                Verify OTP Example
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
