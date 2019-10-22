const getParam = (param, defaultValue = "") => {
  return process.env[param] ? process.env[param] : defaultValue;
};

module.exports = {
  graphql: {
    endpoint: getParam("GRAPHQL_ENDPOINT", "http://192.168.18.103:4000"),
  },
};
