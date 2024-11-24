<script setup lang="ts">
import type { Ref } from 'vue'
import { onUnmounted, ref } from 'vue'
import type { ApiKey } from '~/api'
import { httpApi } from '~/api'
import { formatTimeToLocale } from '~/composable/time'

const emit = defineEmits(['updateTitle'])
emit('updateTitle', 'ApiKey')

const apikeyList: Ref<ApiKey[]> = ref([])
function refresh() {
  httpApi.apikey.list().then((data) => {
    apikeyList.value = data
  })
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Prefix', key: 'prefix' },
  { title: 'Create Time', key: 'createdAt', value: getApikeyCreateTime },
  { title: 'Expiration', key: 'expiresAt', value: getApikeyExpireTime },
  { title: 'Last Seen', key: 'lastSeenAt', value: getApikeyLastSeenTime },
  { title: 'Actions', key: 'actions' },
]

function getApikeyCreateTime(item: any): string {
  const apiKey = item as ApiKey
  return formatTimeToLocale(apiKey.createdAt)
}

function getApikeyExpireTime(item: any): string {
  const apiKey = item as ApiKey
  return formatTimeToLocale(apiKey.expiration)
}

function getApikeyLastSeenTime(item: any): string {
  const apiKey = item as ApiKey
  return formatTimeToLocale(apiKey.lastSeen)
}

function expireApikey(prefix: string) {
  httpApi.apikey.expire(prefix).then(() => {
    refresh()
  })
}

function deleteApikey(prefix: string) {
  httpApi.apikey.delete(prefix).then(() => {
    refresh()
  })
}

const apikeyDialog = ref(false)
const apikeyExpirationInput: Ref<Date | null> = ref(null)

async function createApikey() {
  if (!apikeyExpirationInput.value) {
    return
  }
  await httpApi.apikey.create(apikeyExpirationInput.value)
  refresh()
  apikeyExpirationInput.value = null
  apikeyDialog.value = false
}

refresh()
const refreshInterval = setInterval(refresh, 10000)

onUnmounted(() => {
  clearInterval(refreshInterval)
})
</script>

<template>
  <v-data-table-virtual :headers="headers" :items="apikeyList">
    <template #top>
      <v-toolbar flat>
        <v-spacer />
        <v-dialog v-model="apikeyDialog" max-width="300px">
          <template #activator="{ props }">
            <v-btn variant="text" icon="mdi-plus" v-bind="props" />
          </template>
          <v-date-picker
            v-model="apikeyExpirationInput"
            :min="new Date().toISOString()"
            title="Set expiration time"
          >
            <template #actions>
              <v-spacer />

              <v-btn
                color="primary"
                variant="text"
                @click="createApikey"
              >
                Create
              </v-btn>
            </template>
          </v-date-picker>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
      <v-tooltip text="Set to expire">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="text"
            size="small"
            color="blue"
            icon="mdi-timer"
            @click="expireApikey(item.prefix)"
          />
        </template>
      </v-tooltip>
      <v-tooltip text="Delete">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="text"
            size="small"
            color="red"
            icon="mdi-delete"
            @click="deleteApikey(item.prefix)"
          />
        </template>
      </v-tooltip>
    </template>
  </v-data-table-virtual>
</template>
