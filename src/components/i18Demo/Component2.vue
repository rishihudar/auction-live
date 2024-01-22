<template>
    <div>
        <h2>Component 2</h2>
        <h4 class="mt-2 mb-3">
            <b>{{ $t('component2.title') }}</b>
        </h4>
        <div class="flex gap-2 flex-wrap">
            <button class="btn btn-primary" @click="changeLanguage('en')">English</button>
            <button class="btn btn-secondary" @click="changeLanguage('hi')">Hindi</button>
            <button class="btn btn-warning" @click="changeLanguage('mr')" >Marathi</button>
        </div>
    </div>
</template>

<script>
import { createI18n } from 'vue-i18n'
export default {
  i18n: createI18n({ // `i18n` option, setup locale info for component
    locale: 'mr'
  }),
  mounted () {
    this.loadMessagesFromFile()
  },
  methods: {
    changeLanguage (lang) {
      this.$i18n.locale = lang
      this.loadMessagesFromFile()
    },
    loadMessagesFromFile () {
      return new Promise((resolve) => {
        return import(`../../lang/${this.$i18n.locale}.json`).then(res => {
          this.$i18n.setLocaleMessage(this.$i18n.locale, res.default)
          resolve(true)
        })
      })
    }
  }
}
</script>

<style>
</style>
