import { ActionContext } from 'vuex'
import { randomId } from '~/components/common/utils'

type GraphState = {
  ports: Map<string, any>
  connections: Map<string, any>
  // connections: any[]
}

const ADD_PORT: string = 'ADD_PORT'
const ADD_CONNECTION: string = 'ADD_CONNECTION'
const REMOVE_CONNECTION: string = 'REMOVE_CONNECTION'
const UPDATE_CONNECTION: string = 'UPDATE_CONNECTION'

export const state = () => ({
  ports: new Map<string, any>(),
  connections: new Map<string, any>()
  // connections: []
})

export const getters = {
  ports: (state: GraphState) => state.ports,
  connections: (state: GraphState) => state.connections
}

export const actions = {
  getPort({ state }: ActionContext<GraphState, any>, portId: string): any {
    return state.ports.get(portId)
  },
  addPort({ commit }: ActionContext<GraphState, any>, port: any): string {
    const portId = randomId()
    commit(ADD_PORT, { portId, port })
    return portId
  },
  getConnection(
    { state }: ActionContext<GraphState, any>,
    connectionId: string
  ): any {
    return state.connections.get(connectionId)
    // return state.connections.find((c) => c.id === connectionId)
  },
  addConnection(
    { commit }: ActionContext<GraphState, any>,
    connection: any
  ): string {
    commit(ADD_CONNECTION, { connection })
    return connection.id
  },
  removeConnection(
    { state, commit }: ActionContext<GraphState, any>,
    connectionId: string
  ): void {
    commit(REMOVE_CONNECTION, { connectionId })
  }
}
export const mutations = {
  [ADD_PORT](state: GraphState, { portId, port }: any) {
    state.ports.set(portId, port)
  },
  [ADD_CONNECTION](state: GraphState, { connection }: any) {
    state.connections.set(connection.id, connection)
    // console.log('state.connections:', state.connections.length)
    // state.connections = [...state.connections, connection]
  },
  [REMOVE_CONNECTION](state: GraphState, { connectionId }: any) {
    state.connections.delete(connectionId)
    // const connection = state.connections.find((c) => c.id === connectionId)
    // const index = state.connections.indexOf(connection)
    // if (index) {
    //   state.connections.splice(index, 1)
    // }
  }
}
