<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const emit = defineEmits(['updateTitle'])
emit('updateTitle', 'Login')

const apiServerInput = ref('')
const apiTokenInput = ref('')
const apiToken = useStorage('apiToken', '')
const apiServer = useStorage('apiServer', '')

const loading = ref(false)
const router = useRouter()
function login() {
  if (!apiTokenInput.value) {
    useToast().error('Api Token is required')
    return
  }
  loading.value = true
  apiServer.value = apiServerInput.value
  apiToken.value = apiTokenInput.value
  router.push('/')
}
const showToken = ref(false)
</script>

<template>
  <v-card
    class="mx-auto my-16 pa-12 pb-8"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
    <div class="text-subtitle-1 text-medium-emphasis">
      Api Server
    </div>

    <v-text-field
      v-model="apiServerInput"
      density="compact"
      placeholder="empty for current"
      prepend-inner-icon="mdi-server"
      variant="outlined"
    />

    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      Api Token
    </div>

    <v-text-field
      v-model="apiTokenInput"
      :append-inner-icon="showToken ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showToken ? 'text' : 'password'"
      density="compact"
      placeholder="Enter api token"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="showToken = !showToken"
    />

    <v-card
      class="mb-12"
      color="surface-variant"
      variant="tonal"
    >
      <v-card-text class="text-medium-emphasis text-caption">
        Warning: Ensure CORS is enabled if custom server is used.
      </v-card-text>
    </v-card>

    <v-btn
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      block
      @click="login()"
    >
      Log In
    </v-btn>
  </v-card>
</template>
