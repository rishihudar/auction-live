<template>
	<div id="masterAxios">
		<h2 class="text-xl font-bold flex gap-2 items-center">
			<i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
			MQL Request
		</h2>
        <div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
            <div class="data">
                <h3>MQL Data</h3>
                <FormKit type="button" prefix-icon="check" @click="GetAllPosts"> MQL Request </FormKit>
            </div>
            <div class="json-wrapper">
                <json-viewer :value="result" boxed :expanded="true"></json-viewer>
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
