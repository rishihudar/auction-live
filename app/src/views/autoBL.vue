<template>
	<div class="container-fluid" id="autoBL">
		<h2 class="title alt">
			<i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
			Auto BL
		</h2>
		<div class="subtext">To check positive condition write "CoreStudio" string in input box</div>
		<div class="row justify-content-center">
			<div class="col-auto">
				<div class="box-login">
					<div class="p-card p-component">
						<div class="field">
							<div class="p-float-label">
								<input
									type="text"
									v-model="autobl.name"
									:class="autobl.name ? 'p-filled' : ''"
									id="bl"
									class="p-inputtext p-component"
								/>
								<label for="bl">Enter string</label>
							</div>
						</div>
						<div class="btn-wrapper">
							<button class="btn btn-submit" @click.prevent="autoblDemo">
								<i class="isax isax-bold-tick-circle"></i>
								Test
							</button>
						</div>
						<div class="field mt-4">
							<h3>Result</h3>
							<json-viewer :value="autoblResult" boxed :expanded="true"></json-viewer>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import MQL from "@/plugins/mql.js"
	import jsonViewer from "vue-json-viewer"
	import { ref } from "vue"

	let autobl = ref({})
	let autoblResult = ref({})

	function autoblDemo() {
		new MQL()
			.setActivity("o.[AutoBLDemo]")
			.setData(autobl.value)
			.fetch()
			.then((rs) => {
				let res = rs.getActivity("AutoBLDemo", true)
				if (rs.isValid("AutoBLDemo")) {
					autobl.value = {}
					autoblResult.value = res.result
				} else {
					rs.showErrorToast("AutoBLDemo")
				}
			})
	}
</script>

<style lang="scss" scoped>
	.subtext {
		margin-left: 3rem;
		margin-top: 0.75rem;
	}
</style>
