<template>
  <FormKit
    type="form"
    #default="{ value }"
    :actions="false"
  >
   <FormKit
      type="dropdown"
      name="framework"
      label="Choose a frontend framework"
      placeholder="Example placeholder"
      :options="frameworks"
    >
      <!--OPTION SLOT-->
      <template #option="{ option }">
        <div class="formkit-option">
          <img
            :src="option.asset"
            alt="optionAvatar"
          />
          <span>
            {{ option.label }}
          </span>
        </div>
      </template>
      <!---->
    </FormKit>
    <pre wrap>{{ value }}</pre>
  </FormKit>
</template>

<script setup>
const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' }
]
</script>

<style>
/*
vanilla CSS can go here. If you are using
Tailwind you can also use @apply rules.
*/
</style>