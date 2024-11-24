<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const theme = useTheme()
function toggleDark() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const router = useRouter()

const isInLoginPage = computed(() => router.currentRoute.value.path === '/login')
const apiToken = useStorage('apiToken', '')
const apiServer = useStorage('apiServer', '')
function logout() {
  apiToken.value = ''
  apiServer.value = ''
  router.push('/login')
}
const hasToken = computed(() => apiToken.value !== '')
const shouldJumpToLogin = computed(() => !hasToken.value && !isInLoginPage.value)

onMounted(() => {
  if (shouldJumpToLogin.value)
    router.push('/login')
})

const selectedNav = ref([''])
// listen if selected is not empty and doesn't equal to current path, redirect
watch(selectedNav, (newSelect) => {
  const newSelected = newSelect[0] || ''
  if (newSelected && router.currentRoute.value.path !== newSelected) {
    router.push(newSelected)
  }
})

const navList = [
  { title: 'Nodes', path: '/node', icon: 'mdi-server-network' },
  { title: 'Users', path: '/user', icon: 'mdi-account-multiple' },
  { title: 'ApiKey', path: '/apikey', icon: 'mdi-cloud-key-outline' },
  { title: 'PreAuthKey', path: '/preauthkey', icon: 'mdi-shield-key' },
  { title: 'Routes', icon: 'mdi-routes', path: '/route' },
  { title: 'Policy', path: '/policy', icon: 'mdi-security' },
]

const title = ref('BodyScale')
function updateTitle(newTitle: string) {
  title.value = newTitle
}
</script>

<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    theme="dark"
    permanent
  >
    <v-list>
      <v-list-item
        prepend-icon="mdi-shield-crown"
        title="BodyScale"
        @click="router.push('/')"
      />
    </v-list>

    <v-divider />

    <v-list v-if="hasToken" v-model:selected="selectedNav" density="compact" nav>
      <v-list-item
        v-for="item in navList"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.path"
        link
      />
    </v-list>
    <v-spacer />

    <template #append>
      <v-list>
        <v-list-item prepend-icon="mdi-theme-light-dark" subtitle="Theme" @click="toggleDark()" />
        <v-list-item v-if="hasToken" prepend-icon="mdi-exit-to-app" subtitle="Logout" @click="logout()" />
      </v-list>
    </template>
  </v-navigation-drawer>
  <v-app-bar :elevation="1">
    <template #prepend />

    <v-app-bar-title>
      {{ title }}
    </v-app-bar-title>
  </v-app-bar>
  <v-main>
    <RouterView @update-title="updateTitle" />
  </v-main>
</template>
