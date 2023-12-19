<script>
	// Formkit with Option API
	import { ref } from "vue"
	import { createInput } from "@formkit/vue"
	import Multiselect from "@/components/multiselect.vue"
	import dateRangePickr from "@/components/date-range-pickr.vue"
	export default {
		data() {
			return {
				multiselect: createInput(Multiselect),
				dateRangePickrC: createInput(dateRangePickr),
				values: "",
			}
		},
	}
</script>
<template>
	<div id="masterAxios">
		<h2 class="text-xl font-bold flex gap-2 items-center">
			<i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
			FormKit Options API
		</h2>
		<div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
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
</template>
