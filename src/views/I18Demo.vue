<template>
  <div id="i18">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
      Internationalization
    </h2>
    <div class="box-login mx-auto p-8 rounded-xl bg-white shadow">
        <div class="flex item-center justify-between">
            <h3>Change Language (i18)</h3>
            <FormKit
                type="select"
                placeholder="Change Language"
                name="salutation"
                :options="langs"
                @change="changeLanguage(lang)"
                v-model="lang"
                value="lang"
            />
        </div>
        <h2 class="mb-5">
            <strong> *** {{ $t("home.homeTitle") }} *** </strong>
        </h2>
        <div class="grid gap-x-5 grid-cols-2">
            <component1 class="p-6 rounded-lg bg-slate-100" />
            <component2 class="p-6 rounded-lg bg-slate-100" />
        </div>
        </div>
  </div>
</template>

<script setup>
import component1 from "../components/i18Demo/Component1.vue";
import component2 from "../components/i18Demo/Component2.vue";
import { loadLanguageAsync, i18n } from "@/setup/i18n-setup.js";
import { onMounted, onUpdated, reactive } from "vue";

let langs = reactive([
  {
    label: "English",
    value: "en",
  },
  {
    label: "Hindi",
    value: "hi",
  },
  {
    label: "Marathi",
    value: "mr",
  },
]);

let lang = reactive({});

onMounted(() => {
  getLanguage();
});

onUpdated(() => {
  // getLanguage()
});

async function changeLanguage(lang) {
  if (Object.keys(lang).length > 0 && lang !== undefined) {
    i18n.locale = lang;
    i18n.fallbackLocale = lang;
    loadLanguageAsync(lang);
    console.log(lang);
  }
}

function getLanguage() {
  let obj = langs.find((el) => el.lang == i18n.global.locale.value);
  if (obj !== undefined) {
    if (lang === "hi") {
      obj.label = "Hindi";
      lang = obj.value;
    } else if (obj === "mr") {
      obj.label = "Marathi";
      lang = obj.value;
    } else if (obj === "en") {
      obj.label = "English";
      lang = obj.value;
    }
  }
}
</script>

<style></style>
