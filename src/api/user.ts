import type { User } from './types'
import { cfetch } from './common'

interface UserListResp {
  users: User[]
}

function listUser(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    cfetch<UserListResp>('/api/v1/user')
      .then(resp => resolve(resp.users))
      .catch(err => reject(err))
  })
}

function createUser(name: string): Promise<User> {
  return cfetch('/api/v1/user', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })
}

interface OneUserResp {
  user: User
}

function getUser(name: string): Promise<User> {
  return new Promise((resolve, reject) => {
    cfetch<OneUserResp>(`/api/v1/user/${name}`)
      .then(resp => resolve(resp.user))
      .catch(err => reject(err))
  })
}

function deleteUser(name: string): Promise<any> {
  return cfetch(`/api/v1/user/${name}`, { method: 'DELETE' })
}

function renameUser(name: string, newName: string): Promise<User> {
  return new Promise((resolve, reject) => {
    cfetch<OneUserResp>(`/api/v1/user/${name}/rename/${newName}`, { method: 'POST' })
      .then(resp => resolve(resp.user))
      .catch(err => reject(err))
  })
}

export const userApi = {
  list: listUser,
  create: createUser,
  get: getUser,
  delete: deleteUser,
  rename: renameUser,
}
