<template>
	<div>
		<h3>Save Student</h3>
		Student Name: <input v-model="student.name" required /> <br />
		Student Age: <input v-model.number="student.age" required /> <br />
		Student address: <input v-model="student.address" required /><br />
		<button @click="saveStudentData">Save</button>
		<br /><br />
		<h3>Update Student</h3>
		Student Name: <input v-model="uname" required /> <br />
		<button @click="updateStudentData">Update</button>
		<div>{{ updatedRes }}</div>
		<br /><br />
		<h3>Fetch All Student</h3>
		<button @click="fetchAllStudent">FetchAllStudent</button>
		<div>{{ AllStudent }}</div>
		<br /><br />
		<h3>Delete Student</h3>
		Student Name: <input v-model="dstudent" required /> <br />
		<button @click="deleteStudentData">Delete</button>
	</div>
</template>

<script setup>
	import MQL from "@/plugins/mql.js"
	import { ref } from "vue"

	let student = ref({})
	let uname = ref("")
	let dstudent = ref("")
	let updatedRes = ref({})
	let AllStudent = ref([])

	function saveStudentData() {
		new MQL()
			.setActivity("o.[SaveStudentData]")
			.setData(student.value)
			.fetch()
			.then((rs) => {
				let res = rs.getActivity("SaveStudentData", true)
				if (rs.isValid("SaveStudentData")) {
					alert(JSON.stringify(res))
					alert("student saved successfully")
					student.value = {}
				} else {
					rs.showErrorToast("SaveStudentData")
				}
			})
	}
	function updateStudentData() {
		new MQL()
			.setActivity("o.[UpdateStudentData]")
			.setData({ name: uname.value })
			.fetch()
			.then((rs) => {
				let res = rs.getActivity("UpdateStudentData", true)
				if (rs.isValid("UpdateStudentData")) {
					updatedRes.value = res.result
					uname.value = ""
				} else {
					rs.showErrorToast("UpdateStudentData")
				}
			})
	}
	function deleteStudentData() {
		new MQL()
			.setActivity("o.[DeleteStudentData]")
			.setData({ name: dstudent.value })
			.fetch()
			.then((rs) => {
				rs.getActivity("DeleteStudentData", true)
				if (rs.isValid("DeleteStudentData")) {
					alert("Student deleted successfully")
					dstudent.value = ""
				} else {
					rs.showErrorToast("DeleteStudentData")
				}
			})
	}
	function fetchAllStudent() {
		new MQL()
			.setActivity("o.[query_1tvgHmekn2RX1jUoViq5E0vDPh9]")
			.fetch()
			.then((rs) => {
				let res = rs.getActivity("query_1tvgHmekn2RX1jUoViq5E0vDPh9", true)
				if (rs.isValid("query_1tvgHmekn2RX1jUoViq5E0vDPh9")) {
					AllStudent.value = res
				} else {
					rs.showErrorToast("query_1tvgHmekn2RX1jUoViq5E0vDPh9")
				}
			})
	}
</script>
<style></style>
