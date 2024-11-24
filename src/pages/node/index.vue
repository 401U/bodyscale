<script lang="ts" setup>
import type { Ref } from 'vue'
import { computed, onUnmounted, ref } from 'vue'
import type { Node } from '~/api'
import { httpApi } from '~/api'
import RegisterNodeDialog from '~/components/dialog/RegisterNodeDialog.vue'
import HeaderSelector from '~/components/menu/HeaderSelector.vue'
import { getNodeName } from '~/composable/node'

const emit = defineEmits(['updateTitle'])

function getNodeNameValue(item: any): string {
  const node = item as Node
  return getNodeName(node)
}

function getNodeTags(item: any): string[] {
  const node = item as Node
  return node.forcedTags.concat(node.validTags)
}

const allHeaders = ref([
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'displayName', value: getNodeNameValue },
  { title: 'User', key: 'user.name' },
  { title: 'IP', key: 'ipAddresses' },
  { title: 'Tags', key: 'alltags', value: getNodeTags },
  { title: 'Status', key: 'online' },
])

const enabledHeaderKey = ref([
  'id',
  'displayName',
  'user.name',
  'ipAddresses',
  'alltags',
  'online',
])

const enabledHeader = computed(() =>
  allHeaders.value.filter(header => enabledHeaderKey.value.includes(header.key)),
)

emit('updateTitle', 'Node')

const nodes: Ref<Node[]> = ref([])
function refresh() {
  httpApi.nodes.list('').then((data) => {
    // repeat the data for test
    nodes.value = data
  })
}

refresh()

const refreshInterval = setInterval(refresh, 10000)

onUnmounted(() => {
  clearInterval(refreshInterval)
})
</script>

<template>
  <v-data-table-virtual
    :headers="enabledHeader"
    :items="nodes"
    fixed-header
  >
    <template #top>
      <v-toolbar flat>
        <v-spacer />
        <RegisterNodeDialog />
        <HeaderSelector v-model:headers="allHeaders" v-model:enabled-headers="enabledHeaderKey" />
      </v-toolbar>
    </template>
    <template #item.ipAddresses="{ item }">
      <div v-for="ip in item.ipAddresses" :key="ip" color="pink">
        {{ ip }}
      </div>
    </template>
    <template #item.alltags="{ value }: { value: string[] }">
      <v-chip v-for="tag in value" :key="tag" color="pink">
        {{ tag }}
      </v-chip>
    </template>
    <template #item.online="{ item }">
      <v-chip :color="item.online ? 'green' : 'red'" variant="outlined" label>
        {{ item.online ? 'Online' : 'Offline' }}
      </v-chip>
    </template>
  </v-data-table-virtual>
</template>
