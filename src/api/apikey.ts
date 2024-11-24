import type { ApiKey } from './types'
import { cfetch } from './common'

interface ApiKeyListResp {
  apiKeys: ApiKey[]
}
function listApiKey(): Promise<ApiKey[]> {
  return new Promise((resolve, reject) => {
    cfetch<ApiKeyListResp>('/api/v1/apikey')
      .then(resp => resolve(resp.apiKeys))
      .catch(err => reject(err))
  })
}

interface NewApiKey {
  apiKey: string
}

// default expiration set to 7 days
function createApiKey(expiration: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)): Promise<string> {
  return new Promise((resolve, reject) => {
    cfetch<NewApiKey>('/api/v1/apikey', {
      method: 'POST',
      body: JSON.stringify({
        expiration: expiration.toISOString(),
      }),
    }).then(resp => resolve(resp.apiKey))
      .catch(err => reject(err))
  })
}

function expireApiKey(prefix: string): Promise<any> {
  return cfetch('/api/v1/apikey/expire', {
    method: 'POST',
    body: JSON.stringify({
      prefix,
    }),
  })
}
function deleteApiKey(prefix: string): Promise<any> {
  return cfetch(`/api/v1/apikey/${prefix}`, {
    method: 'DELETE',
  })
}

export const apiKeyApi = {
  list: listApiKey,
  create: createApiKey,
  expire: expireApiKey,
  delete: deleteApiKey,
}
