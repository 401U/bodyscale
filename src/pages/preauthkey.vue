<script lang="ts" setup>
import type { Ref } from 'vue'
import { computed, onUnmounted, ref } from 'vue'
import type { PreAuthKey } from '~/api'
import { httpApi } from '~/api'
import CreatePreAuthkeyDialog from '~/components/dialog/CreatePreAuthkeyDialog.vue'
import HeaderSelector from '~/components/menu/HeaderSelector.vue'
import { formatTimeToLocale } from '~/composable/time'

const emit = defineEmits(['updateTitle'])
emit('updateTitle', 'PreAuthKey')

function getApikeyCreateTime(item: any): string {
  const apiKey = item as PreAuthKey
  return formatTimeToLocale(apiKey.createdAt)
}

function getPreAuthKeyExpireTime(item: any): string {
  const apiKey = item as PreAuthKey
  return formatTimeToLocale(apiKey.expiration)
}

function getPreAuthKeyState(item: any): string[] {
  const apiKey = item as PreAuthKey
  const state = []
  if (apiKey.used) {
    state.push('Used')
  }
  if (apiKey.ephemeral) {
    state.push('Ephemeral')
  }
  if (apiKey.reusable) {
    state.push('Reusable')
  }
  return state
}

const allHeaders = ref([
  { title: 'ID', key: 'id' },
  { title: 'Key', key: 'key' },
  { title: 'User', key: 'user' },
  { title: 'Create Time', key: 'createdAt', value: getApikeyCreateTime },
  { title: 'Expiration', key: 'expiration', value: getPreAuthKeyExpireTime },
  { title: 'ACL Tags', key: 'aclTags' },
  { title: 'State', key: 'state', value: getPreAuthKeyState },
  { title: 'Actions', key: 'actions' },
])

const enabledHeaderKey = ref([
  'id',
  'key',
  'user',
  'createdAt',
  'expiration',
  'aclTags',
  'state',
])

const enabledHeaders = computed(() =>
  allHeaders.value.filter(header => enabledHeaderKey.value.includes(header.key)),
)

const preAuthKeyList: Ref<PreAuthKey[]> = ref([])

function refresh() {
  httpApi.preauthkey.list('').then((data) => {
    preAuthKeyList.value = data
  })
}

refresh()

const refreshInterval = setInterval(refresh, 10000)

onUnmounted(() => {
  clearInterval(refreshInterval)
})
</script>

<template>
  <v-data-table-virtual :headers="enabledHeaders" :items="preAuthKeyList">
    <template #top>
      <v-toolbar flat>
        <v-spacer />
        <CreatePreAuthkeyDialog />
        <HeaderSelector v-model:headers="allHeaders" v-model:enabled-headers="enabledHeaderKey" />
      </v-toolbar>
    </template>
  </v-data-table-virtual>
</template>
