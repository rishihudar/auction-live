<template>
	<div class="container-fluid" id="keyMapper">
		<h2 class="text-xl font-bold flex gap-2 items-center">
			<i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
			Key Mappers
		</h2>
		<div class="mt-5 mx-auto">
			<div class="flex gap-2 justify-center">
				<a class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white" :class="active == 0 ? 'tab-active' : ''" @click.prevent="active = 0">Hash Data</a>
				<a class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white" :class="active == 1 ? 'tab-active' : ''" @click.prevent="active = 1">Hash Salt</a
				><a class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white" :class="active == 2 ? 'tab-active' : ''" @click.prevent="active = 2">Encryption</a>
				<a class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white" :class="active == 3 ? 'tab-active' : ''" @click.prevent="active = 3">Decryption</a>
			</div>
		</div>
		<div class="mt-8">
			<hash-data v-if="active == 0"></hash-data>
			<hash-salt v-if="active == 1"></hash-salt>
			<encrypt-data v-if="active == 2"></encrypt-data>
			<decrypt-data v-if="active == 3"></decrypt-data>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue"
	import hashData from "../components/keymappers/hashData.vue"
	import hashSalt from "../components/keymappers/hashSalt.vue"
	import encryptData from "../components/keymappers/encryptData.vue"
	import decryptData from "../components/keymappers/decryptData.vue"

	const active = ref(0)
	const items = ref([
		{
			label: "Hash Data",
		},
		{
			label: "Hash Salt",
		},
		{
			label: "Encryption",
		},
		{
			label: "Decryption",
		},
	])
</script>
<style></style>
