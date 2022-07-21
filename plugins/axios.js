export default ({ $axios, store, env }) => {
  $axios.onRequest(config => {
    // store.dispatch("setLoading", true);
    config.headers.common['x-api-key'] = env.WORKSHOP_API_KEY;
  });
  $axios.onResponse(() => {
    // store.dispatch("setLoading", false);
  });
  $axios.onError(() => {
    // store.dispatch("setLoading", false);
  });
};
