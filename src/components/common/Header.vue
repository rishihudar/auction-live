<template>
    <header id="header">
        <router-link to="/" class="navbar-brand">
            <img src="../../../assets/images/logo_dulb.webp" alt="DULB logo">
        </router-link>
        <div class="header-right">
            <button class="btn btn-sidebar-toggle" @click="mainStore.toggleSidebar()">
                <fa-bars></fa-bars>
            </button>
            <div class="dropdown dropdown-profile">
                <Button type="button" severity text class="btn-profile" @click="toggle" aria-haspopup="true"
                    aria-controls="ddmenu_profile">
                    <span class="dp-text">
                        <span class="dp-name">{{ loginStore.username }}</span>
                        <span class="dp-info">{{ loginStore.role }}</span>
                    </span>
                    <span class="dp-media">
                        <img src="../../../assets/images/user.webp" width="100" height="100" alt="{{ fullName }}">
                    </span>
                </Button>
                <Menu ref="profilemenu" id="ddmenu_profile" class="w-full md:w-15rem" :model="items" :popup="true">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <component :is="item.icon" />
                                <span class="di-text">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <a v-else :href="item.url" v-bind="props.action">
                            <component :is="item.icon" />
                            <span class="di-text">{{ item.label }}</span>
                        </a>
                    </template>
                </Menu>
            </div>
        </div>
    </header>
</template>

<script setup>
import { main } from "@/store/index"
import { login } from "../../store/modules/login"
// import faAddressCard from '../../../assets/icons/address-card.svg'
import faBars from '../../../assets/icons/bars.svg'
import { ref } from "vue";
// import faGear from '../../../assets/icons/gear.svg'
// import faRightFromBracket from '../../../assets/icons/right-from-bracket.svg'

const profilemenu = ref(null)

const items = ref([
    {
        label: 'My Profile',
        icon: 'fa-address-card'
    },
    {
        label: 'Settings',
        icon: 'fa-gear'
    },
    {
        separator: true
    },
    {
        label: 'Change Role',
        icon: 'fa-right-from-bracket',
        route: '/role-select'
    },
    {
        label: 'Logout',
        icon: 'fa-right-from-bracket',
        route: '/'
    }
])
const mainStore = main();
const loginStore = login();
function toggle(event) {
    profilemenu.value.toggle(event);
}
</script>

<style></style>
