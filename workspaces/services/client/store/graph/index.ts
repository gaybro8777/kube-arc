import Vuex, { ActionContext } from 'vuex'

type PortState = {
  ports: Map<string, any>
}

const ADD_PORT: string = 'ADD_PORT'

export const state = () => ({
  ports: new Map<string, any>()
})

export const getters = {
  ports: (state: PortState) => state.ports
}

export const actions = {
  getPort({ state }: ActionContext<PortState, any>, portId: string): any {
    return state.ports.get(portId)
  },
  addPort({ commit }: ActionContext<PortState, any>, port: any): string {
    const portId =
      Math.random()
        .toString(36)
        .substring(2, 8) +
      Math.random()
        .toString(36)
        .substring(2, 8)
    commit(ADD_PORT, { portId, port })
    return portId
  }
}
export const mutations = {
  [ADD_PORT](state: PortState, { portId, port }: any) {
    state.ports.set(portId, port)
  }
}
