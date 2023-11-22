<template>
	<div class="container-fluid" id="downloadFIleProgress">
		<h2 class="title alt">
			Check Progress
		</h2>
		<div class="row justify-content-center">
			<div class="col-6">
				<div class="box-login">
					<div class="p-card p-component">
						<FormKit
							type="text"
							label="Enter Download Id"
							help="Enter Download Id”."
							placeholder="Enter Download Id"
							validation="required"
							v-model="downloadId"
						/>
						<div class="btn-wrapper">
							<FormKit type="submit" label="Check Progress" @click="checkDownloadProgress" />
						</div>
						<div class="field mt-4">
							<h3>Result</h3>
							<div class="json-wrapper">
								<json-viewer :value="progressResult" boxed :expanded="true"></json-viewer>
							</div>
						</div>
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

	let downloadId = ref("")
	let progressResult = ref({})
	function checkDownloadProgress() {
		new MQL()
			.setActivity("o.[CheckDownloadedFileProgress]")
			.setData({ downloadFileId: downloadId.value })
			.fetch()
			.then((rs) => {
				let res = rs.getActivity("CheckDownloadedFileProgress", true)
				if (rs.isValid("CheckDownloadedFileProgress")) {
					if (res && res.result) {
						progressResult.value = res.result
						downloadId.value = ""
					} else {
						toaster.error("Progress Check Failed")
					}
				} else {
					rs.showErrorToast("CheckDownloadedFileProgress")
				}
			})
	}
</script>
