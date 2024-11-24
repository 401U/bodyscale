import { apiKeyApi } from './apikey'
import { nodeApi } from './node'
import { policyApi } from './policy'
import { preauthkeyApi } from './preauthkey'
import { routesApi } from './routes'
import { userApi } from './user'

export * from './types'

export const httpApi = {
  apikey: apiKeyApi,
  nodes: nodeApi,
  preauthkey: preauthkeyApi,
  routes: routesApi,
  user: userApi,
  policy: policyApi,
}
