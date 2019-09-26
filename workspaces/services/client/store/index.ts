type RootState = {
  version: string
  timestamp: string
}

export const state = () => ({
  version: process.env.APP_VERSION,
  timestamp: null
})

export const getters = {
  version: (state: RootState) => state.version
}

export const actions = {}
export const mutations = {}

// export {
//   state,
//   getters,
//   actions,
//   mutations
// }
