import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import mqlOptions from './plugins/mqlOptions.js'
import { loadLanguageAsync, i18n } from './setup/i18n-setup.js'
import { createMetaManager } from "vue-meta";
import Toaster from '@meforma/vue-toaster'
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import { plugin, defaultConfig } from '@formkit/vue'
import formKitConfig from './formkit.config'
import primeVue from 'primevue/config'
import Alive from '../assets/presets/alive'
import Breadcrumb from 'primevue/breadcrumb'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import Steps from 'primevue/steps';
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import Column from 'primevue/column';

// import '../node_modules/primevue/resources/themes/lara-light-blue/theme.css'
// import '../assets/fonts/iconsax/style.css'
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
vm.use(ConfirmationService);
vm.use(ToastService);
vm.use(primeVue, { unstyled: true, pt: Alive })
vm.use(Breadcrumb)
vm.component('Breadcrumb', Breadcrumb)
vm.component('ConfirmDialog', ConfirmDialog);
vm.component('ConfirmPopup', ConfirmPopup);
vm.use(InputText)
vm.component('InputText', InputText)
vm.use(Password)
vm.component('Password', Password)
vm.use(Button)
vm.component('Button', Button)
vm.use(Menu)
vm.component('Menu', Menu)
vm.use(Accordion)
vm.component('Column', Column);
vm.component('Accordion', Accordion)
vm.use(AccordionTab)
vm.component('AccordionTab', AccordionTab)
vm.use(DataTable)
vm.component('DataTable', DataTable)
vm.use(Column)
vm.component('Column', Column)
vm.use(Paginator)
vm.component('Paginator', Paginator)
vm.component('simplebar', simplebar)
vm.use(Toast)
vm.component('Toast', Toast);
vm.component('Steps', Steps);
vm.use(plugin, defaultConfig(formKitConfig))
vm.use(defaultConfig)
vm.use(createMetaManager())
vm.use(Toaster, {
  position: "top-right",
  duration: 3000
})

var coreURL = '/core-server'
var loginURL = '/login-server'
var cdnBaseURL = '/cdn-server'
var bidderURL = '/bidder-server'
var managementURL = '/management-server'

vm.use(mqlOptions, {
  coreURL: coreURL,
  loginURL: loginURL,
  cdnBaseURL: cdnBaseURL,
  bidderURL: bidderURL,
  managementURL : managementURL,
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
