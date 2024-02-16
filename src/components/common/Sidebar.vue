<template>
    <aside id="left-sidebar">
        <simplebar class="sidebar-holder">
            <div class="cm-wrapper">
                <div v-for="(item, index) in menu" :key="index" class="collapse-menu">
                    <Menu
                        v-bind="{
                            level: 0,
                            icon: item.icon,
                            title: item.title,
                            children: item.children,
                            to: item.to
                        }"
                    />
                </div>
            </div>
        </simplebar>
    </aside>
</template>

<script>
import Menu from '@/components/common/Menu.vue';

export default {
    components: {
        Menu
    },
    data() {
        return {
            menu: [
                {
                    title: 'Portal',
                    icon: 'fa-airplay',
                    children: [
                        {
                            title: 'Inner Portal',
                            icon: 'fa-house',
                            to: '/',
                        },
                        {
                            title: 'Manage Portal',
                            children: [
                                {
                                    title: 'Users',
                                    to: '/registration',
                                },
                                {
                                    title: 'Accounts',
                                    to: '/registration',
                                }
                            ],
                        },
                        {
                            title: 'Outer Portal',
                            to: '/',
                        },
                        {
                            title: 'Parent Portal',
                            to: '/',
                        },
                        {
                            title: 'Child Portal',
                            to: '/forgot-password',
                        },
                    ],
                },
                {
                    title: 'Invoices is the menu with a long text',
                    icon: 'fa-tags',
                    to: '/',
                },
                {
                    title: 'User Profile',
                    icon: 'fa-address-card',
                    to: '/home'
                },
                {
                    title: 'Members also comes with a long text',
                    icon: 'fa-user-group',
                    children: [
                        {
                            title: 'Profile',
                        },
                        {
                            title: 'Account',
                        },
                        {
                            title: 'List',
                        }
                    ],
                },
                {
                    title: 'Settings',
                    icon: 'fa-shield-check',
                    to: '/user/profile'
                },
                {
                    title: 'Masters',
                    icon: 'fa-block-brick',
                    to: '/login'
                },
            ]
        }
    }
}
</script>

<style>
</style>
