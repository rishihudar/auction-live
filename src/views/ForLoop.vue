<template>
	<div>
		<h2 class="text-xl font-bold flex gap-2 items-center">
			<i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
			Save client data
		</h2>
		<div class="subtext">
			This client data is saved in "Employee" collection of "cs playground" database using for loop plugin
		</div>
		<div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
            <table class="table w-full" v-if="empList && empList.length > 0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>age</th>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in empList" v-bind:key="index">
                    <tr>
                        <th>{{ item.name }}</th>
                        <th>{{ item.address }}</th>
                        <td>{{ item.age }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="empty-state" v-else>Records not found</div>
            <div class="btn-wrapper mt-4">
                <FormKit @click="saveClientDataUsingForLoop" type="submit" label="Save" />
            </div>
		</div>
	</div>
</template>

<script setup>
	import MQL from "@/plugins/mql.js"
	import { ref } from "vue"
	import { createToaster } from "@meforma/vue-toaster"
	const toaster = createToaster({ position: "top-right", duration: 3000 })
	let empList = ref([
		{ name: "somnathg", age: 26, address: "pune" },
		{ name: "prajwalp", age: 28, address: "pune" },
		{ name: "reshmab", age: 29, address: "pune" },
	])
	function saveClientDataUsingForLoop() {
		new MQL()
			.setActivity("o.[SaveClientDataUsingForLoop]")
			.setData(empList.value)
			.fetch()
			.then((rs) => {
				rs.getActivity("SaveClientDataUsingForLoop", true)
				if (rs.isValid("SaveClientDataUsingForLoop")) {
					toaster.success("Employees data saved successfully.")
				} else {
					rs.showErrorToast("SaveClientDataUsingForLoop")
				}
			})
	}
</script>

<style lang="scss" scoped>
</style>
