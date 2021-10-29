import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ app }) => {
  const getGDPR = localStorage.getItem('cookies:accepted');

  Vue.use(
    VueGtag,
    {
      config: { id: 'G-748GVTX9HY' },
      bootstrap: getGDPR === 'true',
      enabled: getGDPR === 'true',
      pageTrackerScreenviewEnabled: true,
    },
    app.router,
  );
};
