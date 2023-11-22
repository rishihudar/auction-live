<template>
  <div>
    <h2>Component 1</h2>
    <h4 class="mt-2 mb-3">
      <b>{{ $t("demo.demoHeading") }}</b>
    </h4>
    <button class="btn btn-primary" @click="changeLanguage('en')">
      English
    </button>
    <button class="btn btn-secondary" @click="changeLanguage('hi')">
      Hindi
    </button>
    <button class="btn btn-warning" @click="changeLanguage('mr')">
      Marathi
    </button>
  </div>
</template>

<script>
import { loadLanguageAsync } from "@/setup/i18n-setup.js";

export default {
  mounted() {
    this.$i18n.locale = "hi";
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      this.$i18n.locale = lang;
      this.$i18n.fallbackLocale = lang;
      loadLanguageAsync(lang);
      console.log(lang);
    },
  },
};
</script>

<style></style>
