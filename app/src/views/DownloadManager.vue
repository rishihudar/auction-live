<template>
	<div id="downloadManger" class="container-fluid">
		<h2 class="title alt">
			<i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
			Download Manager
		</h2>
		<div class="row justify-content-center">
			<div class="tabs">
				<a class="tab tab-bordered" :class="active == 0 ? 'tab-active' : ''" @click.prevent="active = 0"
					>Download File</a
				>
				<a class="tab tab-bordered" :class="active == 1 ? 'tab-active' : ''" @click.prevent="active = 1"
					>Check Download Progress</a
				>
			</div>
		</div>
		<div class="mt-3">
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
