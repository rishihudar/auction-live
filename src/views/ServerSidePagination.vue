<template>
	<div id="serverSidePagination">
		<h2 class="text-xl font-bold flex gap-2 items-center">
			<i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
			Server Side Pagination
		</h2>
		<div class="subtext">This report shows per page 3 documents</div>
		<div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
            <table class="table w-full" v-if="items && items.length > 0">
                <thead>
                    <tr>
                        <th>addcategory</th>
                        <th>fname</th>
                        <th>name</th>
                        <th>sname</th>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in items" v-bind:key="index">
                    <tr>
                        <th>{{ item.addcategory }}</th>
                        <th>{{ item.fname }}</th>
                        <th>{{ item.name }}</th>
                        <td>{{ item.sname }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="empty-state" v-else>Records Not Found</div>
            <div class="btn-wrapper mt-5 flex justify-between">
                <FormKit type="submit" label="Prev" v-if="pageNo > 1" @click="prevClick" />
                <FormKit
                    type="submit"
                    label="Next"
                    v-if="items && items.length > 0"
                    :disabled="items == undefined || items.length == 0"
                    @click="nextClick"
                    outer-class="$reset ml-auto"
                />
            </div>
		</div>
	</div>
</template>

<script setup>
	import MQL from "@/plugins/mql.js"
	import { onMounted, ref } from "vue"
	import { createToaster } from "@meforma/vue-toaster"
	const toaster = createToaster({ position: "top-right", duration: 3000 })

	let items = ref([])
	let pageNo = ref(1)

	onMounted(() => {
		fetchPaginationData()
	})

	function prevClick() {
		if (pageNo.value > 1) {
			pageNo.value--
		} else {
			pageNo.value = 1
		}
		fetchPaginationData()
	}
	function nextClick() {
		pageNo.value++
		fetchPaginationData()
	}
	function fetchPaginationData() {
		new MQL()
			.setActivity("o.[GetPaginationData]")
			.setData({ pageNo: pageNo.value })
			.fetch()
			.then((rs) => {
				let res = rs.getActivity("GetPaginationData", true)
				if (rs.isValid("GetPaginationData")) {
					items.value = res.result
					toaster.success("Get Pagination Data")
				} else {
					items.value = []
					rs.showErrorToast("GetPaginationData")
				}
			})
	}
</script>

<style lang="scss" scoped>
</style>
