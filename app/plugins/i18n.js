import Vue from 'vue';
import VueI18n from 'vue-i18n';

const FR = require('~/lang/fr.json');
const EN = require('~/lang/en.json');

Vue.use(VueI18n);

export default ({ app }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: 'fr',
    fallbackLocale: 'fr',
    messages: {
      en: EN,
      fr: FR,
    },
  });
};
