<template>
	<div id="app">
		<metainfo>
			<template v-slot:title="{ content }">{{ content ? `${content}` : "" }}</template>
		</metainfo>
		<div id="app-loader" v-if="mainStore.isPageBlocked">
			<div class="bg-gray-200 w-full min-h-screen flex justify-center items-center">
				<div class="flex min-h-screen w-full items-center justify-center bg-gray-200">
					<div
						class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin"
					>
						<div class="h-9 w-9 rounded-full bg-gray-200"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="wrapper p-10 flex flex-col overflow-y-auto">
			<router-view :key="$route.fullPath" />
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	import { useMeta } from "vue-meta"
	import Footer from "./components/common/Footer.vue"
	import { main } from "./store/index"

	export default {
		name: "App",
		components: {
			Footer,
		},
		data() {
			return {}
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
	#app-loader {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(255, 255, 255, 0.8);
		z-index: 2000;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
