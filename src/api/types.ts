export interface ApiKey {
  id: string
  prefix: string
  expiration: string
  createdAt: string
  lastSeen?: string
}

export interface Node {
  id: number
  name: string
  user: User
  givenName: string
  online: boolean
  ipAddresses: string[]
  expiry: string
  nodeKey: string
  discoKey: string
  machineKey: string
  preAuthKey: PreAuthKey
  createdAt: string
  lastSeen: string
  registerMethod: string
  forcedTags: string[]
  validTags: string[]
  invalidTags: string[]
}

export interface Route {
  id: number
  node: Node
  prefix: string
  advertised: boolean
  enabled: boolean
  isPrimary: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface PreAuthKey {
  id: string
  user: string
  key: string
  reusable: boolean
  ephemeral: boolean
  used: boolean
  expiration: string
  createdAt: string
  aclTags: string[]
}

export interface User {
  id: string
  name: string
  createdAt: string
}
