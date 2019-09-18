type RootState = {
  version: string
  timestamp: string
}

const state = () => ({
  version: process.env.APP_VERSION,
  timestamp: null
})

const getters = {
  version: (state: RootState) => state.version
}

const actions = {
  async nuxtServerInit() {}
}
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
