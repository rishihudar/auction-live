<template>
	<div id="updateUsingBl">
		<h2 class="text-xl font-bold flex gap-2 items-center">
			<i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
			Update Data using BL
		</h2>
		<div class="mt-5 mx-auto">
			<div class="flex gap-2 justify-center">
				<a class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white" :class="active == 0 ? 'tab-active' : ''" @click.prevent="active = 0">
					Update user data</a
				>
				<a class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white" :class="active == 1 ? 'tab-active' : ''" @click.prevent="active = 1"
					>Updated and Save to Database</a
				>
			</div>
			<div class="mt-3">
				<update-user v-if="active == 0"></update-user>
				<update-db-save v-if="active == 1"></update-db-save>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { ref } from "vue"
	import updateUser from "../components/BL/updateUser.vue"
	import updateDbSave from "../components/BL/updateDbSave.vue"
	const active = ref(0)
	const items = ref([
		{
			label: "Update User",
		},
		{
			label: "Update and Save in Database",
		},
	])
</script>
