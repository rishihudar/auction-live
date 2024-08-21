<template>
    <div class="flex flex-column h-12rem">
        <p>workflow page 4</p>
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