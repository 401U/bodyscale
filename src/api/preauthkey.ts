import type { PreAuthKey } from './types'
import { cfetch, cfetchWithQuery } from './common'

interface PreAuthKeyListResp {
  preAuthKeys: PreAuthKey[]
}

function listPreAuthKeys(user: string): Promise<PreAuthKey[]> {
  return new Promise((resolve, reject) => {
    if (!user) {
      cfetch<PreAuthKeyListResp>('/api/v1/preauthkey')
        .then(resp => resolve(resp.preAuthKeys))
        .catch(err => reject(err))
    }
    else {
      cfetchWithQuery<PreAuthKeyListResp>('/api/v1/preauthkey', {
        user,
      }).then(resp => resolve(resp.preAuthKeys))
        .catch(err => reject(err))
    }
  })
}

interface PreAuthKeyReq {
  user: string
  reusable: boolean
  ephemeral: boolean
  expiration: Date
  aclTags: string[]
}

interface OnePreAuthKeyResp {
  preAuthKey: PreAuthKey
}

function createPreAuthKey(init: PreAuthKeyReq): Promise<PreAuthKey> {
  return new Promise((resolve, reject) => {
    cfetch<OnePreAuthKeyResp>('/api/v1/preauthkey', {
      method: 'POST',
      body: JSON.stringify(init),
    }).then(resp => resolve(resp.preAuthKey))
      .catch(err => reject(err))
  })
}

function expirePreAuthKey(user: string, key: string): Promise<any> {
  return cfetch('/api/v1/preauthkey/expire', {
    method: 'POST',
    body: JSON.stringify({
      user,
      key,
    }),
  })
}

export const preauthkeyApi = {
  list: listPreAuthKeys,
  create: createPreAuthKey,
  expire: expirePreAuthKey,
}
