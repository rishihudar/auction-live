<template>
	<div id="main">
		<metainfo>
			<template v-slot:title="{ content }">{{
				content ? `${content}` : ""
			}}</template>
		</metainfo>
		<div id="app-loader" v-if="mainStore.isPageBlocked" class="pointer-events-none fixed z-[1500] bg-gray-200 bg-opacity-70 w-full min-h-screen flex justify-center items-center group-[.p-overflow-hidden]/body:bg-opacity-0">
            <div class="flex min-h-screen w-full items-center justify-center">
                <div class="spinner"></div>
            </div>
		</div>
		<div class="main-wrapper" :class="[
			mainStore.sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-open',
			{ 'main-wrapper-full': !(isHeaderVisible) },
            { 'sidebar-hidden': !(isSideBarVisible && isHeaderVisible) }
		]">
			<Header v-if="isHeaderVisible"></Header>
			<main class="main-content">
				<Sidebar v-if="isSideBarVisible"></Sidebar>
				<div class="content-wrapper">
                    <Transition name="fade">
                        <div class="backdrop" v-if="!mainStore.sidebarCollapsed" @click="mainStore.toggleSidebar()"></div>
                    </Transition>
					<router-view class="content-holder" :key="$route.fullPath" />
					<Footer v-if="isHeaderVisible"></Footer>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
// import { useMeta } from "vue-meta";
import Header from "./components/common/Header.vue";
import Sidebar from "./components/common/Sidebar.vue";
import Footer from "./components/common/Footer.vue";
import { main } from "./store/index";
import { ref,watch } from "vue";
import { useRoute } from "vue-router";

const theme = ref("");
const isSideBarVisible = ref(true);
const isHeaderVisible = ref(true);
const route = useRoute();

// useMeta({
// 	title: "Home",
// 	htmlAttrs: { lang: "en", amp: true },
// });
const mainStore = main();
watch(route,(() => {
	if (route.meta.isSideBarVisible == undefined) {
		isSideBarVisible.value = true
		isHeaderVisible.value = true
	} else {
		isSideBarVisible.value = route.meta.isSideBarVisible
		isHeaderVisible.value = route.meta.isHeaderVisible
		
	}
}))
const metaInfo = ref({
	meta: [
		{
			vmid: "description",
			name: "description",
			content: "Test title",
			template: (chunk) => `${chunk} - FullStack`,
		},
	],
});
</script>

<style lang="scss"></style>
