<script lang="ts" setup>
import type { Ref } from 'vue'
import { computed, onUnmounted, ref } from 'vue'
import type { Route } from '~/api'
import { httpApi } from '~/api'
import HeaderSelector from '~/components/menu/HeaderSelector.vue'

const emit = defineEmits(['updateTitle'])
emit('updateTitle', 'Route')

function getNodeName(item: any): string {
  const route = item as Route
  if (route.node.name !== route.node.givenName) {
    return `${route.node.givenName} (${route.node.name})`
  }
  return route.node.name
}

function getRouteCreateTime(item: any): string {
  const route = item as Route
  return new Date(route.createdAt).toLocaleString()
}

function getRouteUpdateTime(item: any): string {
  const route = item as Route
  return new Date(route.updatedAt).toLocaleString()
}

const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Node', key: 'node', value: getNodeName },
  { title: 'Prefix', key: 'prefix' },
  { title: 'CreatedTime', key: 'createdAt', value: getRouteCreateTime },
  { title: 'UpdateTime', key: 'updatedAt', value: getRouteUpdateTime },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions' },
])

const enabledHeaderKey = ref(['id', 'node', 'prefix', 'status', 'createdAt', 'updatedAt', 'actions'])

const enabledHeaders = computed(() =>
  headers.value.filter(header => enabledHeaderKey.value.includes(header.key)),
)

const routeList: Ref<Route[]> = ref([])
function refresh() {
  httpApi.routes.list().then((data) => {
    routeList.value = data
  })
}

refresh()
const refreshInterval = setInterval(refresh, 10000)

onUnmounted(() => {
  clearInterval(refreshInterval)
})

function setEnable(id: number, current: boolean) {
  if (current) {
    httpApi.routes.disable(id).then(() => {
      refresh()
    })
  }
  else {
    httpApi.routes.enable(id).then(() => {
      refresh()
    })
  }
}

function deleteRoute(id: number) {
  httpApi.routes.delete(id).then(() => {
    refresh()
  })
}
</script>

<template>
  <v-data-table-virtual :items="routeList" :headers="enabledHeaders">
    <template #top>
      <v-toolbar flat>
        <v-spacer />
        <HeaderSelector v-model:headers="headers" v-model:enabled-headers="enabledHeaderKey" />
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
      <v-tooltip :text="item.enabled ? 'Disable' : 'Enable'">
        <template #activator="{ props }">
          <v-btn
            variant="text"
            size="small"
            :color="item.enabled ? 'red' : 'green'"
            :icon="item.enabled ? 'mdi-close' : 'mdi-check'"
            v-bind="props"
            @click="setEnable(item.id, item.enabled)"
          />
        </template>
      </v-tooltip>

      <v-tooltip text="Delete">
        <template #activator="{ props }">
          <v-btn
            variant="text"
            size="small"
            color="red"
            icon="mdi-delete"
            v-bind="props"
            @click="deleteRoute(item.id)"
          />
        </template>
      </v-tooltip>
    </template>
    <template #item.status="{ item }">
      <v-chip v-if="item.isPrimary" color="green">
        Primary
      </v-chip>
      <v-chip v-if="item.advertised" color="blue">
        Advertised
      </v-chip>
      <v-chip v-if="item.enabled" color="green">
        Enabled
      </v-chip>
    </template>
  </v-data-table-virtual>
</template>
