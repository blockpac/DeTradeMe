module.exports = {
  webpack: function (config, env) {
    return config;
  },
  jest: function (config) {
    return config;
  },
  devServer: function (configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

                config.headers = {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
                    "Access-Control-Allow-Headers": "Content-Type"
                }

      return config;
    };
  }
}
