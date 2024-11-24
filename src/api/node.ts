import { cfetch, cfetchWithQuery } from './common'
import type { Node, Route } from './types'

interface ListNodeResp {
  nodes: Node[]
}
function listNodes(user: string): Promise<Node[]> {
  return new Promise((resolve, reject) => {
    cfetchWithQuery<ListNodeResp>('/api/v1/node', {
      user,
    }).then(resp => resolve(resp.nodes))
      .catch(err => reject(err))
  })
}

interface ChangesResp {
  changes: string[]
}
function backfillips(confirmed: boolean): Promise<string[]> {
  return new Promise((resolve, reject) => {
    cfetchWithQuery<ChangesResp>('/api/v1/node/backfillips', { confirmed }, { method: 'POST' })
      .then(resp => resolve(resp.changes))
      .catch(err => reject(err))
  })
}

interface OneNodeResp {
  node: Node
}

function registerNode(user: string, key: string): Promise<Node> {
  return new Promise((resolve, reject) => {
    cfetchWithQuery<OneNodeResp>('/api/v1/node/register', { user, key }, { method: 'POST' })
      .then(resp => resolve(resp.node))
      .catch(err => reject(err))
  })
}

function getNode(id: number): Promise<Node> {
  return new Promise((resolve, reject) => {
    cfetch<OneNodeResp>(`/api/v1/node/${id}`)
      .then(resp => resolve(resp.node))
      .catch(err => reject(err))
  })
}

function deleteNode(id: number): Promise<any> {
  return cfetch(`/api/v1/node/${id}`, {
    method: 'DELETE',
  })
}

function expireNode(id: number): Promise<Node> {
  return new Promise((resolve, reject) => {
    cfetch<OneNodeResp>(`/api/v1/node/${id}/expire`, { method: 'POST' })
      .then(resp => resolve(resp.node))
      .catch(err => reject(err))
  })
}

function renameNode(id: number, newName: string): Promise<Node> {
  return new Promise((resolve, reject) => {
    cfetch<OneNodeResp>(`/api/v1/node/${id}/rename/${newName}`, { method: 'POST' })
      .then(resp => resolve(resp.node))
      .catch(err => reject(err))
  })
}

interface RouteListResp {
  routes: Route[]
}
function listRoutes(id: number): Promise<Route[]> {
  return new Promise((resolve, reject) => {
    cfetch<RouteListResp>(`/api/v1/node/${id}/routes`)
      .then(resp => resolve(resp.routes))
      .catch(err => reject(err))
  })
}

function setTags(id: number, tags: string[]): Promise<Node> {
  return new Promise((resolve, reject) => {
    cfetch<OneNodeResp>(`/api/v1/node/${id}/tags`, { method: 'POST', body: JSON.stringify({ tags }) })
      .then(resp => resolve(resp.node))
      .catch(err => reject(err))
  })
}

function setUser(id: number, user: string): Promise<Node> {
  return new Promise((resolve, reject) => {
    cfetchWithQuery<OneNodeResp>(`/api/v1/node/${id}/user`, { user }, { method: 'POST' })
      .then(resp => resolve(resp.node))
      .catch(err => reject(err))
  })
}

export const nodeApi = {
  list: listNodes,
  backfillips,
  register: registerNode,
  get: getNode,
  delete: deleteNode,
  expire: expireNode,
  rename: renameNode,
  routesOf: listRoutes,
  setTags,
  setUser,
}
