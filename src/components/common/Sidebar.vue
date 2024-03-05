<template>
    <aside id="left-sidebar">
        <simplebar class="sidebar-holder">
            <div class="cm-wrapper">
                <div v-for="(item, index) in computedMenu" :key="index" class="collapse-menu">
                    <Menu
                        v-bind="{
                            level: 0,
                            title: item.menuName,
                            to: item.menuRoute
                        }"
                    />
                </div>
            </div>
        </simplebar>
    </aside>
</template>

<script setup>
import Menu from '@/components/common/Menu.vue';
// import { ref } from 'vue';
import { login } from "../../store/modules/login";
import { computed } from 'vue';
const loginStore = login()
const  computedMenu = computed(() => {
    if (loginStore.menu && loginStore.role) {
        return loginStore.menu.filter((m) => m.roleName == loginStore.role.roleCode)
    } else {
        return false
    }
})

            // const menu = ref([
            //     {
            //         title: 'Portal',
            //         icon: 'fa-airplay',
            //         children: [
            //             {
            //                 title: 'Inner Portal',
            //                 icon: 'fa-house',
            //                 to: '/',
            //             },
            //             {
            //                 title: 'Manage Portal',
            //                 children: [
            //                     {
            //                         title: 'Users',
            //                         to: '/registration',
            //                     },
            //                     {
            //                         title: 'Accounts',
            //                         to: '/registration',
            //                     }
            //                 ],
            //             },
            //             {
            //                 title: 'Outer Portal',
            //                 to: '/',
            //             },
            //             {
            //                 title: 'Parent Portal',
            //                 to: '/',
            //             },
            //             {
            //                 title: 'Child Portal',
            //                 to: '/forgot-password',
            //             },
            //         ],
            //     },
            //     {
            //         title: 'Invoices is the menu with a long text',
            //         icon: 'fa-tags',
            //         to: '/',
            //     },
            //     {
            //         title: 'User Profile',
            //         icon: 'fa-address-card',
            //         to: '/home'
            //     },
            //     {
            //         title: 'Members also comes with a long text',
            //         icon: 'fa-user-group',
            //         children: [
            //             {
            //                 title: 'Profile',
            //             },
            //             {
            //                 title: 'Account',
            //             },
            //             {
            //                 title: 'List',
            //             }
            //         ],
            //     },
            //     {
            //         title: 'Settings',
            //         icon: 'fa-shield-check',
            //         to: '/user/profile'
            //     },
            //     {
            //         title: 'Masters',
            //         icon: 'fa-block-brick',
            //         to: '/login'
            //     },
            // ])

</script>

<style>
</style>
