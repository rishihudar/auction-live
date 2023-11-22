<template>
  <div id="i18" class="container-fluid">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Internationalization
    </h2>
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="data">
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
            <h2>
              <strong> *** {{ $t("home.homeTitle") }} *** </strong>
            </h2>
            <div class="data alt">
              <component1 class="my-3" />
              <component2 />
            </div>
          </div>
        </div>
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
