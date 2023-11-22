<script setup>
import Multiselect from "@vueform/multiselect";
import { ref, onMounted } from "vue";
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
const options = ["Batman", "Robin", "Joker"];
const value = [];
const date = ref();
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});
</script>

<template>
  <Multiselect
    @change="handleInput"
    mode="multiple"
    v-model="value"
    :options="['Batman', 'Robin', 'Joker']"
  />
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
