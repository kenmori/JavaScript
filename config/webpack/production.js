const environment = require('./environment')
const webpack = require('webpack')

environment.plugins.append('DefinePlugin', new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.GA_TRACKING_CODE': JSON.stringify(process.env.GA_TRACKING_CODE),
}))

module.exports = environment.toWebpackConfig()
