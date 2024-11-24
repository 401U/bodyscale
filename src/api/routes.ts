import type { Route } from './types'
import { cfetch } from './common'

interface RouteListResp {
  routes: Route[]
}

function listRoutes(): Promise<Route[]> {
  return new Promise((resolve, reject) => {
    cfetch<RouteListResp>('/api/v1/routes')
      .then(resp => resolve(resp.routes))
      .catch(err => reject(err))
  })
}

function deleteRoute(id: number): Promise<any> {
  return cfetch(`/api/v1/routes/${id}`, {
    method: 'DELETE',
  })
}

function disableRoute(id: number): Promise<any> {
  return cfetch(`/api/v1/routes/${id}/disable`, {
    method: 'POST',
  })
}

function enableRoute(id: number): Promise<any> {
  return cfetch(`/api/v1/routes/${id}/enable`, {
    method: 'POST',
  })
}

export const routesApi = {
  list: listRoutes,
  delete: deleteRoute,
  disable: disableRoute,
  enable: enableRoute,
}
