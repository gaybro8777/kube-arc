import Vue from "vue";
import VueI18n from "vue-i18n";
import elementEnLocale from "element-ui/lib/locale/lang/en";
import elementDeLocale from "element-ui/lib/locale/lang/de";
/**
 * Created by n.vinayakan on 16.05.17.
 */
Vue.use(VueI18n);

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.i18n ? store.state.i18n.locale : "de",
    fallbackLocale: "en",
    silentTranslationWarn: true,
    messages: {
      en: {
        ...elementEnLocale
      },
      de: {
        ...elementDeLocale
      }
    }
  });
};
