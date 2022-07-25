export default ({ $axios, store, env }) => {
  $axios.onRequest(config => {
    config.headers.common['x-api-key'] = env.WORKSHOP_API_KEY;
  });
  $axios.onResponse(() => {
  });
  $axios.onError(() => {
  });
};
