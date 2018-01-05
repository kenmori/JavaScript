const environment = require('./environment');
const devConfig = environment.toWebpackConfig();
devConfig.devServer.watchOptions = {
  ignored: /node_modules/,
  aggregateTimeout: 300,
  poll: 500,
};
module.exports = devConfig;