<template>
    <div class="box-footer" v-if="name == 'box'">
        <slot name="text"></slot>
        &copy; {{ new Date().getFullYear() }} Haryana Knowledge Corporation Limited. All Rights Reserved.
    </div>
    <footer id="footer" v-else>
        <div class="ft-copyright">
            <img src="../../../assets/images/logo_hkcl.webp" alt="HKCL logo">
            <div class="ft-copyright-text">
                <p>&copy; {{ new Date().getFullYear() }} Haryana Knowledge Corporation Limited.</p>
                <p>All Rights Reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    }
};
</script>

<style>
</style>
