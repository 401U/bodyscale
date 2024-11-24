import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
// component
import ToastPlugin from 'vue-toast-notification'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import './styles/main.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const app = createApp(App)
app.use(createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
}))

app.use(ToastPlugin)
const router = createRouter({
  routes: setupLayouts(routes),
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.mount('#app')
