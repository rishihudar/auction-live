<template>
	<div id="main">
		<metainfo>
			<template v-slot:title="{ content }">{{ content ? `${content}` : "" }}</template>
		</metainfo>
		<div id="app-loader" v-if="mainStore.isPageBlocked">
			<div class="fixed z-50 bg-gray-200 bg-opacity-70 w-full min-h-screen flex justify-center items-center">
				<div class="flex min-h-screen w-full items-center justify-center">
                    <div class="spinner"></div>
				</div>
			</div>
		</div>
        <div class="main-wrapper" :class="[ (mainStore.sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-open'), ({'main-wrapper-full': routes.includes($route.fullPath)}) ]">
            <Header v-if="!routes.includes($route.fullPath)"></Header>
            <main class="main-content">
                <Sidebar v-if="!routes.includes($route.fullPath)"></Sidebar>
                <div class="content-wrapper">
                    <router-view class="content-holder" :key="$route.fullPath" />
                    <Footer v-if="!routes.includes($route.fullPath)"></Footer>
                </div>
            </main>
        </div>
	</div>
</template>

<script>
	import { useMeta } from "vue-meta"
	import Header from "./components/common/Header.vue"
    import Sidebar from "./components/common/Sidebar.vue"
	import Footer from "./components/common/Footer.vue"
	import { main } from "./store/index"

	export default {
		name: "App",
		components: {
			Header,
            Sidebar,
			Footer
		},
		data() {
			return {
                routes: ['/', '/registration', '/forgot-password','/payment']
            }
		},
		setup() {
			useMeta({
				title: "Home",
				htmlAttrs: { lang: "en", amp: true },
			})
			const mainStore = main()
			return { mainStore }
		},
		metaInfo: {
			meta: [
				{
					vmid: "description",
					name: "description",
					content: "Test title",
					template: (chunk) => `${chunk} - FullStack`,
				},
			],
		},
	}
</script>

<style lang="scss">
</style>
