import { clearInterval } from 'node:timers'
import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { type ApiKey, type Node, type PreAuthKey, type Route, type User, httpApi } from '~/api'

const nodes: Ref<Node[]> = useLocalStorage('nodes', [])
const users: Ref<User[]> = useLocalStorage('users', [])
const apikeys: Ref<ApiKey[]> = useLocalStorage('apikeys', [])
const preauthkeys: Ref<PreAuthKey[]> = useLocalStorage('preauthkeys', [])
const routes: Ref<Route[]> = useLocalStorage('routes', [])
const policy: Ref<string> = useLocalStorage('policy', '')
const policyTime: Ref<string> = useLocalStorage('policyTime', '')
const updateTime: Ref<number> = useLocalStorage('updateTime', 0)

export const dataset = computed(() => ({
  nodes,
  users,
  apikeys,
  preauthkeys,
  routes,
  policy,
  policyTime,
  updateTime,
}))

const subscribeMap = new Map<string, number>()

function fetch() {
  subscribeMap.forEach((v, k) => {
    if (v <= 0)
      return
    switch (k) {
      case 'nodes':
        httpApi.nodes.list('').then((r) => {
          nodes.value = r
        })
        break
      case 'users':
        httpApi.user.list().then((r) => {
          users.value = r
        })
        break
      case 'apikeys':
        httpApi.apikey.list().then((r) => {
          apikeys.value = r
        })
        break
      case 'preauthkeys':
        httpApi.preauthkey.list('').then((r) => {
          preauthkeys.value = r
        })
        break
      case 'routes':
        httpApi.routes.list().then((r) => {
          routes.value = r
        })
        break
      case 'policy':
        httpApi.policy.get().then((r) => {
          policy.value = r.policy
          policyTime.value = r.updatedAt
        })
        break
    }
    updateTime.value = Date.now()
  })
}

let fetchInterval = setInterval(fetch, 10000)

export function editSubscribe(key: string, type: boolean) {
  const prev = subscribeMap.get(key) || 0
  if (type) {
    subscribeMap.set(key, prev + 1)
    clearInterval(fetchInterval)
    fetch()
    fetchInterval = setInterval(fetch, 10000)
  }
  else {
    subscribeMap.set(key, prev - 1)
  }
}

export function editSubscribes(keys: string[], type: boolean) {
  keys.forEach((k) => {
    const prev = subscribeMap.get(k) || 0
    if (type)
      subscribeMap.set(k, prev + 1)
    else
      subscribeMap.set(k, prev - 1)
  })
  if (type) {
    clearInterval(fetchInterval)
    fetch()
    fetchInterval = setInterval(fetch, 10000)
  }
}
