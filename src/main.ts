import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Aura from '@primeuix/themes/aura'

import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import '@/styles/global.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())

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
