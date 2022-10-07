export default ({ $axios, store, env }) => {
  $axios.onRequest(config => {
    config.headers.common['x-api-key'] = env.APP_KEY;
  });
  $axios.onResponse(() => {
  });
  $axios.onError(() => {
  });
};
