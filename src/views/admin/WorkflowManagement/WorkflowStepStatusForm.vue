<template>
    <div class="flex flex-column h-12rem">
        <p>workflow page 3</p>
    </div>
    <div class="flex justify-between">
        <Button @click="prevCallback" class="btn btn-secondary">
            Previous
        </Button>
        <Button @click="nextCallback" class="btn btn-success">
            Save & Next
        </Button>
    </div>
</template>

<script setup>

const fetchWorkflowStatus = () => {
    // Automatically generated
    new MQL()
        .useManagementServer()
        .setActivity("r.[query_2kPbBHDnmaKIrVAKCanyftGm7lj]")
        .setData({})
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2kPbBHDnmaKIrVAKCanyftGm7lj", true)
            if (rs.isValid("query_2kPbBHDnmaKIrVAKCanyftGm7lj")) {
            } else {
                rs.showErrorToast("query_2kPbBHDnmaKIrVAKCanyftGm7lj")
            }
        })
}

</script>