<script setup>
import { ref, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const props = defineProps({
  context: Object,
});
function handleInput(e) {
  props.context.node.input(e);
}
const selectedDate = [
  new Date(),
  new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000),
];
const date = ref();
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});
</script>

<template>
  <VueDatePicker
    v-model="date"
    @update:model-value="handleInput"
    range
    multi-calendars
  ></VueDatePicker>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
