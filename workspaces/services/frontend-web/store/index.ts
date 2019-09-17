type RootState = {
  version: string;
  timestamp: string;
};

const state = () => ({
  version: process.env.APP_VERSION,
  timestamp: null
});

const getters = {};

const actions = {
  async nuxtServerInit() {}
};
const mutations = {};

export const syncPaths = ["i18n"];
export default {
  state,
  getters,
  actions,
  mutations
};
