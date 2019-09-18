import { ActionContext } from "vuex";

export const SET_LANG: string = "SET_LANG";

type i18nState = {
  locales: string[];
  locale: string;
};

const state = () => ({
  locales: ["en", "de"],
  locale: "de"
});

const getters = {
  locales: (state: i18nState) => state.locales,
  locale: (state: i18nState) => state.locale
};

const actions = {
  setLocale({ commit }: ActionContext<i18nState, any>, locale: string) {
    commit(SET_LANG, locale);
  }
};

const mutations = {
  [SET_LANG](state: i18nState, locale: string) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
