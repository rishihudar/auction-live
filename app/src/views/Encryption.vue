<template>
	<div id="encryption">
		<h2 class="text-xl font-bold flex gap-2 items-center">
			<i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
			Encryption
		</h2>
        <div class="grid gap-4 grid-cols-2">
            <div class="box-login mx-auto p-8 w-full rounded-xl bg-white shadow">
                <div class="flex flex-col w-full lg:flex-row">
                    <div class="grid flex-grow h-50 card bg-slate-200 rounded-box place-items-center">
                        <h3 class="text-center mt-5 mb-4 text-lg font-bold">Plain Text Encryption / Decryption</h3>
                        <div class="flex flex-col w-full">
                            <div class="grid h-50 card bg-slate-200 rounded-box place-items-center">
                                <FormKit
                                    type="text"
                                    name="encryptInputText"
                                    label="Encrypt Input Text"
                                    v-model="encryptInputText"
                                    placeho
                                    lder="Enter text for encryption"
                                    help="Enter text for encryption"
                                    validation="required"
                                />
                                <FormKit type="button" @click="encryptText" label="Encrypt" />
                                {{ encryptOutputText }}
                            </div>
                            <div class="divider"></div>
                            <div class="grid h-50 card bg-slate-200 rounded-box place-items-center">
                                <FormKit
                                    type="text"
                                    name="decryptionInputText"
                                    label="Decrypt Input Text"
                                    v-model="decryptInputText"
                                    placeho
                                    lder="Enter text for decryption"
                                    help="Enter text for decryption"
                                    validation="required"
                                />
                                <FormKit type="button" @click="decryptText" label="Decrypt Text" />
                                {{ decryptOutputText }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-login mx-auto p-8 w-full rounded-xl bg-white shadow">
                <div class="grid flex-grow h-50 card bg-slate-200 rounded-box place-items-center">
                    <h3 class="text-center mt-5 mb-4 text-lg font-bold">Object encryption/decryption</h3>
                    <div class="flex flex-col w-full">
                        <div class="grid h-50 card bg-slate-200 rounded-box place-items-center">
                            <FormKit
                                type="text"
                                name="decryptionInputText"
                                label="Encrypt Input Text"
                                v-model="encryptInputObject"
                                placeho
                                lder="Enter object for encryption"
                                help="Enter object for encryption"
                                validation="required"
                            />
                            <FormKit type="button" @click="encryptObj" label="Encrypt Object" />
                            {{ encryptOutputObject }}
                        </div>
                        <div class="divider"></div>
                        <div class="grid h-50 card bg-slate-200 rounded-box place-items-center">
                            <FormKit
                                type="text"
                                name="decryptionInputText"
                                label="Decrypt Input Text"
                                v-model="decryptInputObject"
                                placeho
                                lder="Enter object for decryption"
                                help="Enter object for decryption"
                                validation="required"
                            />
                            <FormKit type="button" @click="decryptObj" label="Decrypt Object" />
                            {{ decryptOutputObject }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>
<script setup>
	import CryptoJS from "crypto-js"
	import { ref } from "vue"

	let encryptInputText = ref("")
	let encryptOutputText = ref("")
	let decryptInputText = ref("")
	let decryptOutputText = ref("")
	let encryptInputObject = ref({})
	let encryptOutputObject = ref({})
	let decryptInputObject = ref({})
	let decryptOutputObject = ref({})
	let key = ref("SECRETKEY")

	function encryptText() {
		var op = CryptoJS.AES.encrypt(encryptInputText.value, key.value)
		encryptOutputText.value = op.toString()
	}
	function decryptText() {
		var bytes = CryptoJS.AES.decrypt(encryptOutputText.value, key.value)
		var plaintext = bytes.toString(CryptoJS.enc.Utf8)
		decryptOutputText.value = plaintext
	}
	function encryptObj() {
		var ip = encryptInputObject.value
		var op = CryptoJS.AES.encrypt(JSON.stringify(ip), key.value)
		encryptOutputObject.value = op.toString()
	}
	function decryptObj() {
		var bytes = CryptoJS.AES.decrypt(encryptOutputObject.value, key.value)
		decryptOutputObject.value = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
	}
</script>

<style></style>
