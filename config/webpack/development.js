const environment = require('./environment')
const webpack = require('webpack')

environment.plugins.set('Define', new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development'),
  'process.env.GA_TRACKING_CODE': JSON.stringify('UA-111410984-4'),
}))

const devConfig = environment.toWebpackConfig()
devConfig.devServer.watchOptions = {
  ignored: /node_modules/,
  aggregateTimeout: 300,
  poll: 500,
}

module.exports = devConfig
