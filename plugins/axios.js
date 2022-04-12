export default ({ $axios, env }) => {
  $axios.onRequest(config => {
    config.headers.common['x-api-key'] = env.WORKSHOP_API_KEY;
  });
};
