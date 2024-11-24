import type { Node } from '~/api'

export function getNodeName(node: Node): string {
  if (node.name !== node.givenName) {
    return `${node.givenName} (${node.name})`
  }
  else {
    return node.name
  }
}
