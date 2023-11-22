<template>
	<div class="container-fluid" id="excel">
		<h2 class="title alt">
			<i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
			Excel Plugins
		</h2>
		<div class="row justify-content-center">
			<div class="tabs">
				<a class="tab tab-bordered" :class="active == 0 ? 'tab-active' : ''" @click.prevent="active = 0">Client Data</a>
				<a class="tab tab-bordered" :class="active == 1 ? 'tab-active' : ''" @click.prevent="active = 1">Update Data</a>
				<a class="tab tab-bordered" :class="active == 2 ? 'tab-active' : ''" @click.prevent="active = 2"
					>Save with Activity</a
				>
			</div>
			<div class="mt-3">
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
