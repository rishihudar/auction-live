<template>
	<div id="updateUsingBl" class="container-fluid">
		<h2 class="title alt">
			<i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
			Update Data using BL
		</h2>
		<div class="row justify-content-center">
			<div class="tabs">
				<a class="tab tab-bordered" :class="active == 0 ? 'tab-active' : ''" @click.prevent="active = 0">
					Update user data</a
				>
				<a class="tab tab-bordered" :class="active == 1 ? 'tab-active' : ''" @click.prevent="active = 1"
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
