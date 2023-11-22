<template>
	<div id="masterAxios" class="container-fluid">
		<h2 class="title alt">
			<i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
			MQL Request
		</h2>
		<div class="row justify-content-center">
			<div class="col-6">
				<div class="box-login">
					<div class="data">
						<h3>MQL Data</h3>
						<FormKit type="button" prefix-icon="check" @click="GetAllPosts"> MQL Request </FormKit>
					</div>
					<div class="json-wrapper">
						<json-viewer :value="result" boxed :expanded="true"></json-viewer>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import MQL from "@/plugins/mql.js"
	import { ref } from "vue"
	import jsonViewer from "vue-json-viewer"
	import { createToaster } from "@meforma/vue-toaster"
	const toaster = createToaster({ position: "top-right", duration: 3000 })
	let result = ref([])
	function GetAllPosts() {
		new MQL()
			.showConfirmDialog(true)
			.setActivity("o.[query_1QPikbRCETCu32Dj13qzRKNBraC]")
			.setData({})
			.setHeader({ "my-header": "It is Ok" })
			.fetch("mqlData")
			.then((rs) => {
				let res = rs.getActivity("query_1QPikbRCETCu32Dj13qzRKNBraC", true)
				if (rs.isValid("query_1QPikbRCETCu32Dj13qzRKNBraC")) {
					toaster.success("Data Loaded Successfully")
					result.value = res
				} else {
					rs.showErrorToast("query_1QPikbRCETCu32Dj13qzRKNBraC")
				}
			})
	}
</script>

<style></style>
