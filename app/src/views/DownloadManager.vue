<template>
	<div id="downloadManger">
		<h2 class="text-xl font-bold flex gap-2 items-center">
			<i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
			Download Manager
		</h2>
		<div class="mt-5 mx-auto">
			<div class="flex gap-2 justify-center">
				<a class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white" :class="active == 0 ? 'tab-active' : ''" @click.prevent="active = 0"
					>Download File</a
				>
				<a class="tab tab-bordered px-5 py-2 h-auto rounded bg-white [&.tab-active]:bg-blue-600 [&.tab-active]:text-white" :class="active == 1 ? 'tab-active' : ''" @click.prevent="active = 1"
					>Check Download Progress</a
				>
			</div>
		</div>
		<div class="mt-8">
			<download-file v-if="active == 0"></download-file>
			<download-progress v-if="active == 1"></download-progress>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue"
	import downloadFile from "../components/download-manager/downloadFile.vue"
	import downloadProgress from "../components/download-manager/downloadProgress.vue"

	const active = ref(0)
</script>
