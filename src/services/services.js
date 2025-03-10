/* eslint-disable complexity */
import { get, post } from './network'
import URL from 'constants/Network'

export async function apiSignOut() {
  return get(URL.signOut)
}

export async function apiAgentList() {
  return get(URL.agentList)
}

export async function apiCreateClient(clientName) {
  return post(URL.createClient, clientName)
}

export async function apiAttachAgentToClient({ clientId, agentId }) {
  console.log(clientId, agentId, 'clientId, agentIdasdftyu')
  return post(
    URL.attachAgentToClient
      .replace('{clientId}', clientId)
      .replace('{agentId}', agentId)
  )
}
