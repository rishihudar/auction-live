<template>
	<div class="box">
		<h1 class="title">GoLang FullStack</h1>
		<p class="desc">LIST OF CORE FUNCTIONALITIES</p>
		<div class="row align-items-center">
			<div class="col-3">
				<div class="bx-card">
					<div class="p-card p-component" @click="$router.push({ name: 'login' })">
						<div class="icon-holder">
							<i class="isax isax-bold-login"></i>
						</div>
						<div class="bx-card-name">
							Login
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3" @click="$router.push({ name: 'registration' })">
				<div class="bx-card">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-edit-2"></i>
						</div>
						<div class="bx-card-name">
							Registration
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'mqlRequestDemo' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-cloud-change"></i>
						</div>
						<div class="bx-card-name">
							Mql Request
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'i18Demo' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-translate"></i>
						</div>
						<div class="bx-card-name">
							i18
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'validator' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-tick-circle"></i>
						</div>
						<div class="bx-card-name">
							Validator
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'encryption' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-lock-1"></i>
						</div>
						<div class="bx-card-name">
							Encryption
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'cdnUpload' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-arrow-up"></i>
						</div>
						<div class="bx-card-name">
							CDN Upload
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'tableDemo' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-stickynote"></i>
						</div>
						<div class="bx-card-name">
							Table
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="vueMeta()">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-menu-board"></i>
						</div>
						<div class="bx-card-name">
							Vue Meta Example
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'MqlAssetFDBDemo' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-3d-cube-scan"></i>
						</div>
						<div class="bx-card-name">
							Mql Asset FDB
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'sessionmgr' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-check"></i>
						</div>
						<div class="bx-card-name">
							Session Manager
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'uploadmanager' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-document-upload"></i>
						</div>
						<div class="bx-card-name">
							Upload Manager
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'downloadmanager' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-document-download"></i>
						</div>
						<div class="bx-card-name">
							Download Manager
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'serversidepagination' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-element-3"></i>
						</div>
						<div class="bx-card-name">
							Server Side Pagination
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'keymapper' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-keyboard-open"></i>
						</div>
						<div class="bx-card-name">
							Key Mapper
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'excel' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-document-1"></i>
						</div>
						<div class="bx-card-name">
							Excel Plugin
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'lastinsertedId' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-note"></i>
						</div>
						<div class="bx-card-name">
							Last Insert ID
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'forloop' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-refresh"></i>
						</div>
						<div class="bx-card-name">
							For Loop
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'sendSms' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-sms-tracking"></i>
						</div>
						<div class="bx-card-name">
							Send SMS
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'sendEmail' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-directbox-send"></i>
						</div>
						<div class="bx-card-name">
							Send Email
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'sendOtp' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-notification-status"></i>
						</div>
						<div class="bx-card-name">
							Send OTP
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'autoBL' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-note-1"></i>
						</div>
						<div class="bx-card-name">
							Auto BL
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'updateUserDataUsingBL' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-refresh"></i>
						</div>
						<div class="bx-card-name">
							Update using BL
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'insertCustomMongoId' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-data"></i>
						</div>
						<div class="bx-card-name">
							Custom Mongo ID
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'classroom' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-profile-2user"></i>
						</div>
						<div class="bx-card-name">
							Classroom
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'clipboard' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-profile-2user"></i>
						</div>
						<div class="bx-card-name">
							Vue Clipboard
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'FormKitComposition' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-profile-2user"></i>
						</div>
						<div class="bx-card-name">
							FormKit Custom Components (CompositionAPI)
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'FormKitOption' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-profile-2user"></i>
						</div>
						<div class="bx-card-name">
							FormKit Custom Components (OptionAPI)
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="bx-card" @click="$router.push({ name: 'tailwindForm' })">
					<div class="p-card p-component">
						<div class="icon-holder">
							<i class="isax isax-bold-profile-2user"></i>
						</div>
						<div class="bx-card-name">
							Tailwind Testing
							<i class="isax isax-bold-arrow-right"></i>
						</div>
						<div class="bx-card-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, rerum.</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useRouter } from "vue-router"
	const router = useRouter()
	function vueMeta() {
		router.push({ name: "vueMetaExample", params: { title: "Live Demo" } })
	}
</script>

<style>
	.home {
		text-align: center;
	}
</style>
