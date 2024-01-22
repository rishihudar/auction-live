<template>
	<div class="toast toast-top toast-end">
		<div v-if="type==='info'" class="alert alert-info">
			<div>
				<span>New mail arrived.</span>
			</div>
		</div>
		<div v-if="type==='success'"  class="alert alert-success">
			<div>
				<span>Message sent successfully.</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
    name:"Toast",
    props:{
        type:String,
        data:String
    },
    data(){
        return {
            
        }
    }
}
</script>

