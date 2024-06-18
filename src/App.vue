<template>
	<div id="main">
		<metainfo>
			<template v-slot:title="{ content }">{{
				content ? `${content}` : ""
			}}</template>
		</metainfo>
		<div id="app-loader" v-if="mainStore.isPageBlocked">
			<div class="fixed z-50 bg-gray-200 bg-opacity-70 w-full min-h-screen flex justify-center items-center">
				<div class="flex min-h-screen w-full items-center justify-center">
					<div class="spinner"></div>
					<!-- <div class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
						<div class="h-9 w-9 rounded-full bg-gray-200"></div>
					</div> -->
				</div>
			</div>
		</div>
		<div
			class="fixed top-1/2 right-0 z-50 p-2.5 hidden flex flex-col gap-1 border rounded-md bg-white -translate-y-1/2">
			<span data-theme="one" class="w-8 h-8 flex flex-col *:grow cursor-pointer" @click="changeTheme('one')">
				<span class="bg-[var(--sidebar-bg)]"></span>
				<span class="bg-primary-400"></span>
			</span>
			<span data-theme="two" class="w-8 h-8 flex flex-col *:grow cursor-pointer" @click="changeTheme('two')">
				<span class="bg-[var(--sidebar-bg)]"></span>
				<span class="bg-primary-400"></span>
			</span>
			<span data-theme="three" class="w-8 h-8 flex flex-col *:grow cursor-pointer" @click="changeTheme('three')">
				<span class="bg-[var(--sidebar-bg)]"></span>
				<span class="bg-primary-400"></span>
			</span>
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
const changeTheme = (theme) => {
	document.documentElement.setAttribute("data-theme", theme);
};
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
