<script setup lang="ts" generic="T extends any, O extends any">
import { computed, onUnmounted, ref } from 'vue'
import { httpApi } from '~/api'

defineOptions({
  name: 'IndexPage',
})
const emit = defineEmits(['updateTitle'])
emit('updateTitle', 'Dashboard')

const nodesNum = ref(0)
const onlineNodesNum = ref(0)
const userNum = ref(0)
const apikeyNum = ref(0)
const preauthkeyNum = ref(0)
const routeNum = ref(0)

const cards = computed(() => [
  {
    title: 'Nodes',
    icon: 'mdi-server-network',
    content: `${onlineNodesNum.value} / ${nodesNum.value}`,
    target: '/node',
  },
  {
    title: 'Users',
    icon: 'mdi-account-multiple',
    content: userNum.value.toString(),
    target: '/user',
  },
  {
    title: 'ApiKey',
    icon: 'mdi-cloud-key-outline',
    content: apikeyNum.value.toString(),
    target: '/apikey',
  },
  {
    title: 'PreAuthKey',
    icon: 'mdi-shield-key',
    content: preauthkeyNum.value.toString(),
    target: '/preauthkey',
  },
  {
    title: 'Routes',
    icon: 'mdi-routes',
    content: routeNum.value.toString(),
    target: '/route',
  },
])
function updateState() {
  httpApi.nodes.list('').then((data) => {
    nodesNum.value = data.length
    onlineNodesNum.value = data.filter(node => node.online).length
  })
  httpApi.user.list().then((data) => {
    userNum.value = data.length
  })
  httpApi.apikey.list().then((data) => {
    apikeyNum.value = data.length
  })
  httpApi.preauthkey.list('').then((data) => {
    preauthkeyNum.value = data.length
  })
  httpApi.routes.list().then((data) => {
    routeNum.value = data.length
  })
}
updateState()
const refreshInterval = setInterval(() => {
  updateState()
}, 10000)

onUnmounted(() => {
  clearInterval(refreshInterval)
})
</script>

<template>
  <v-container class="d-flex flex-wrap gap-4">
    <v-row>
      <v-col v-for="card in cards" :key="card.title" cols="4">
        <v-card :title="card.title" :prepend-icon="card.icon" :to="card.target">
          <v-card-text class="text-h5 d-flex align-center justify-center py-10">
            {{ card.content }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
