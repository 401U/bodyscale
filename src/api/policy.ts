import { cfetch } from './common'

interface PolicyResp {
  policy: string
  updatedAt: string
}

function getPolicy(): Promise<PolicyResp> {
  return cfetch('/api/v1/policy')
}

function setPolicy(policy: string): Promise<PolicyResp> {
  return cfetch('/api/v1/policy', {
    method: 'POST',
    body: JSON.stringify({ policy }),
  })
}

export const policyApi = {
  get: getPolicy,
  set: setPolicy,
}
