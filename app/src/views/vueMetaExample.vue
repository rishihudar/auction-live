<template>
	<div id="vueMeta">
		<h2 class="text-xl font-bold flex gap-2 items-center">
			<i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
			Vue-Meta
		</h2>
		<div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
            <h3>
                {{ response.name }}
            </h3>
            <p>
                {{ response.description }}
            </p>
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
