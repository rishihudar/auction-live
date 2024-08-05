<template>
    <header id="header">
        <div class="navbar-brand">
            <img src="../../../assets/images/logo_dulb.webp" alt="DULB logo">
        </div>
        <div class="header-right">
            <button class="btn btn-sidebar-toggle" v-if="$route.meta.isSideBarVisible != false" @click="mainStore.toggleSidebar()">
                <fa-bars></fa-bars>
            </button>
            <div v-else></div>
            <div class="navbar-title">
                {{ entityData.entityName }}
            </div>
            <div class="dropdown dropdown-profile">
                <Button type="button" severity text class="btn-profile" @click="toggle" aria-haspopup="true"
                    aria-controls="ddmenu_profile">
                    <span class="dp-text">
                        <span class="dp-name">{{ loginStore.username }}</span>
                        <span class="dp-info">{{ loginStore.role?.roleName }}</span>
                    </span>
                    <span class="dp-media">
                        <img src="../../../assets/images/user.webp" width="100" height="100" alt="{{ fullName }}">
                    </span>
                </Button>
                <Menu ref="profilemenu" id="ddmenu_profile" class="w-full md:w-15rem" :model="items" :popup="true">
                    <template #item="{ item, props }">
                        <!-- <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <component :is="item.icon" />
                                <span class="di-text">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <a v-else :href="item.url" v-bind="props.action">
                            <component :is="item.icon" />
                            <span class="di-text">{{ item.label }}</span>
                        </a> -->
                        <div class="dropdown-item" @click="item.action">{{ item.label }}</div>
                    </template>
                </Menu>
            </div>
        </div>
    </header>
</template>

<script setup>
import { main } from "@/store/index"
import { login } from "../../store/modules/login"
import { useRouter } from "vue-router";
import { useAuctionPreparation } from "../../store/auctionPreparation";
// import faAddressCard from '../../../assets/icons/address-card.svg'
import faBars from '../../../assets/icons/bars.svg'
import { ref, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { or } from "@vuelidate/validators";
import MQL from '@/plugins/mql.js';
// import faGear from '../../../assets/icons/gear.svg'
// import faRightFromBracket from '../../../assets/icons/right-from-bracket.svg'
const AuctionStore = useAuctionPreparation()
const profilemenu = ref(null)

const router = useRouter()


const logout = () => {
    loginStore.AUTH_LOGOUT()
    AuctionStore.$reset()

}

const navigateToRoleSelect = () => {
    loginStore.SET_ROLE(null)
    router.push('/role-select')
}

const items = ref([
    {
        label: 'My Profile',
        icon: 'fa-address-card',
        action: () => {}
    },
    {
        label: 'Settings',
        icon: 'fa-gear',
        action: () => {}
    },
    {
        separator: true
    },
    {
        label: 'Change Role',
        icon: 'fa-right-from-bracket',
        route: '/role-select',
        action: navigateToRoleSelect

    },
    {
        label: 'Logout',
        icon: 'fa-right-from-bracket',
        route: '/',
        action: logout
    }
])
const mainStore = main();
const loginStore = login();
const {organizationId, entityId, loginId } = storeToRefs(loginStore);

const entityData = ref({})
const organizationData = ref({})

function toggle(event) {
    profilemenu.value.toggle(event);
}

function loadEntityAndOrganization() {	
    //console.log("loadEntityAndOrganization" , entityId.value, organizationId.value)
			new MQL()
            .useManagementServer()
			.setActivity("o.[FetchEntityAndOrganization]")
			.setData({
            "entityId": entityId.value,
            "organizationId": organizationId.value
            })
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchEntityAndOrganization",true)
			if (rs.isValid("FetchEntityAndOrganization")) {
                entityData.value = res.result?.entityData
                organizationData.value = res.result?.organizationData
			} else
			 { 
			rs.showErrorToast("FetchEntityAndOrganization")
			}
			})
			
}



onMounted (() => {
    loadEntityAndOrganization()
})
</script>

<style></style>
