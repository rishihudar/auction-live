<template>
	<div id="excel">
		<h2 class="text-xl font-bold flex gap-2 items-center">
			<i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
			Excel Plugins
		</h2>
		<div class="mt-5 mx-auto">
			<div class="flex gap-2 justify-center">
				<a class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white" :class="active == 0 ? 'tab-active' : ''" @click.prevent="active = 0">Client Data</a>
				<a class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white" :class="active == 1 ? 'tab-active' : ''" @click.prevent="active = 1">Update Data</a>
				<a class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white" :class="active == 2 ? 'tab-active' : ''" @click.prevent="active = 2"
					>Save with Activity</a
				>
			</div>
			<div class="mt-8">
				<client-data v-if="active == 0"></client-data>
				<update-data v-if="active == 1"></update-data>
				<save-w-activity v-if="active == 2"></save-w-activity>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue"
	import clientData from "../components/excel/clientData.vue"
	import updateData from "../components/excel/updateData.vue"
	import saveWActivity from "../components/excel/saveWActivity.vue"

	const active = ref(0)
	const items = ref([
		{
			label: "Save Client Data",
		},
		{
			label: "Update Data",
		},
		{
			label: "Save excel data",
		},
	])
</script>
