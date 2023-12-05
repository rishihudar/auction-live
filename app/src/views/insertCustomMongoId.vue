<template>
	<div id="customMongoID" class="container-fluid">
		<h2 class="text-xl font-bold flex gap-2 items-center">
			<i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
			Insert Any Custom MongoDB ID
		</h2>
		<div class="row justify-content-center">
			<div class="tabs">
				<a class="tab tab-bordered" :class="active == 0 ? 'tab-active' : ''" @click.prevent="active = 0">
					Custom ID Example</a
				>
				<a class="tab tab-bordered" :class="active == 1 ? 'tab-active' : ''" @click.prevent="active = 1">
					Hex ID Example</a
				>
			</div>
		</div>
		<div class="mt-3">
			<customID v-if="active == 0"></customID>
			<hexID v-if="active == 1"></hexID>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue"
	import customID from "../components/mongodbID/customID.vue"
	import hexID from "../components/mongodbID/hexID.vue"

	const active = ref(0)
	const items = ref([
		{
			label: "Custom ID Example",
		},
		{
			label: "Hex ID Example",
		},
	])
</script>
