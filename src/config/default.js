/* istanbul ignore file */
module.exports = {
  graphql: {
    endpoint: window._env_ ? window._env_.GRAPHQL_ENDPOINT : "http://127.0.0.1:4000",
  },
};
