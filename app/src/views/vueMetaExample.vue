<template>
	<div class="container-fluid" id="vueMeta">
		<h2 class="title alt">
			<i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
			Vue-Meta
		</h2>
		<div class="row justify-content-center">
			<div class="col-4">
				<div class="box-login">
					<div class="p-card p-component">
						<h3>
							{{ response.name }}
						</h3>
						<p>
							{{ response.description }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import MQL from "@/plugins/mql.js"
	import { onMounted, ref } from "vue"
	import { useMeta } from "vue-meta"
	import { useRoute } from "vue-router"

	const route = useRoute()

	let description = ref("I am Data")
	let result = ref(route.params.title)
	let response = ref({})

	useMeta({
		title: route.params.title,
		htmlAttrs: { lang: "en", amp: true },
		meta: [
			{
				vmid: "description",
				name: "description",
				content: response.description,
			},
		],
	})

	onMounted(() => {
		// sample activity present in playground project
		if (result) {
			let data = {
				name: result.value,
			}
			new MQL()
				.setActivity("o.[GetClassRoomName]")
				.setData(data)
				.fetch()
				.then((rs) => {
					let res = rs.getActivity("GetClassRoomName", true)
					if (rs.isValid("GetClassRoomName")) {
						response.value = res.result[0]
					} else {
						rs.showErrorToast("GetClassRoomName")
					}
				})
		}
	})
</script>
