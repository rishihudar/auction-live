import { createApp, h } from 'vue'
import App from './App.vue'
import Button from 'primevue/button';
import Card from 'primevue/card';
import router from './router'
import mqlOptions from './plugins/mqlOptions.js'
import { loadLanguageAsync, i18n } from './setup/i18n-setup.js'
import { createMetaManager } from "vue-meta";
import Toaster from '@meforma/vue-toaster'
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
// import 'primevue/resources/themes/saga-blue/theme.css'; // Choose your preferred theme
// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';
import { plugin, defaultConfig } from '@formkit/vue'
import formKitConfig from './formkit.config'
import primeVue from 'primevue/config'
import InputText from 'primevue/inputtext';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import Dialog from 'primevue/dialog';
import DialogService from 'primevue/dialogservice'
// import '../node_modules/primevue/resources/themes/lara-light-blue/theme.css'
import '../assets/fonts/iconsax/style.css'
import '../assets/css/template.scss'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const piniaStore = createPinia()
const isProduction = process.env.NODE_ENV === 'production'
piniaStore.use(piniaPluginPersistedstate)

var vm = createApp({
  render: () => h(App),
})
window.app = vm
vm.use(piniaStore)
vm.use(i18n)
vm.use(router)
vm.use(DialogService);
vm.use(ConfirmationService);
vm.component('Button', Button);
vm.component('Card', Card);
vm.component('Toast', Toast);
vm.use(ToastService); // Add this line to enable toast service
vm.use(primeVue)
vm.use(InputText)
vm.component('ConfirmDialog', ConfirmDialog);
vm.component('ConfirmPopup', ConfirmPopup);
vm.component('Dialog', Dialog);
vm.component('InputText', InputText)
vm.use(Accordion)
vm.component('Accordion', Accordion)
vm.use(AccordionTab)
vm.component('AccordionTab', AccordionTab)
vm.use(plugin, defaultConfig(formKitConfig))
vm.use(defaultConfig)
vm.use(createMetaManager())
vm.use(Toaster, {
  position: "top-right",
  duration: 3000
})
var baseURL = '/server'
var cdnBaseURL = '/cdnserver'

vm.use(mqlOptions, {
  baseURL: baseURL,
  cdnBaseURL: cdnBaseURL,
  cdnConfig: [],
})

router.beforeEach((to, from, next) => {

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title)
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags)

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) => el.parentNode.removeChild(el))

  if (!nearestWithMeta) return loadLanguageAsync(to.meta.lang).then(() => next())
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement('meta')
      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key])
      })
      tag.setAttribute('data-vue-router-controlled', '')
      return tag
    })
    .forEach((tag) => document.head.appendChild(tag))
  next()
})
vm.mount('#app')
