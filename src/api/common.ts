import { useStorage } from '@vueuse/core'
import { useToast } from 'vue-toast-notification'

export interface RpcStatus {
  code: number
  message: string
  details: any[]
}

export const apiServer = useStorage('apiServer', '')
export const apiToken = useStorage('apiToken', '')

const OriginFetch = window.fetch

function resetToken() {
  apiToken.value = ''
  apiServer.value = ''
}

export function cfetch<T>(path: string, init?: RequestInit): Promise<T> {
  return new Promise((resolve, reject) => {
    if (apiToken.value === '') {
      reject(new Error('Unauthorized'))
      return
    }
    init = init || {}
    init.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiToken.value}`,
    }
    init.method = init.method || 'GET'
    // // only setup body when it is set in init before and not get or head
    // if (!init.method.match(/^(GET|HEAD)$/))
    //   init.body = JSON.stringify(init.body || {})

    OriginFetch(apiServer.value + path, init).then(
      resp => resp.json(),
    ).then((data) => {
      // it may be T or RpcStatus, else we consider is error and reject
      const e = data as RpcStatus
      if (e.code || e.message || e.details) {
        useToast().error(`Api Error: ${e.message}`)
        reject(e)
        return
      }
      const t = data as T
      resolve(t)
    }).catch((err) => {
      if (err.message === 'Unauthorized')
        resetToken()
      reject(err)
    })
  })
}

export function cfetchWithQuery<T>(path: string, query: any, init?: RequestInit): Promise<T> {
  return cfetch(`${path}?${new URLSearchParams(query)}`, init)
}
