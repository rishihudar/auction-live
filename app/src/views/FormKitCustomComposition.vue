<script setup>
	// Formkit with composition API

	import { ref } from "vue"
	import { createInput } from "@formkit/vue"
	import Multiselect from "@/components/multiselect.vue"
	import dateRangePickr from "@/components/date-range-pickr.vue"

	const multiselect = createInput(Multiselect)
	const dateRangePickrC = createInput(dateRangePickr)
	const values = ref({})
</script>
<template>
	<div id="masterAxios" class="container-fluid">
		<h2 class="text-xl font-bold flex gap-2 items-center">
			<i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
			Dashboard
		</h2>
		<div class="row justify-content-center">
			<div class="col-6">
				<div class="box-login">
					<FormKit type="form" v-model="values">
						<FormKit
							:type="multiselect"
							label="Multiple Data Select"
							validation="required"
							validation-visibility="live"
						></FormKit>
						<FormKit
							:type="dateRangePickrC"
							label="Date Range Select"
							validation="required"
							validation-visibility="live"
						></FormKit>
						{{ values }}
					</FormKit>
				</div>
			</div>
		</div>
	</div>
</template>
