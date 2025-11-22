import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Vue3Mask from 'vue-3-mask'
import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'

import 'primeicons/primeicons.css'
import '@/styles/global.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(Vue3Mask)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: false,
    },
    ripple: true,
  },
})

app.mount('#app')
