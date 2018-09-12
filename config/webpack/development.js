const environment = require('./environment')
const webpack = require('webpack')

environment.plugins.append('DefinePlugin', new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development'),
  'process.env.GA_TRACKING_CODE': JSON.stringify(process.env.GA_TRACKING_CODE),
}))
const config = environment.toWebpackConfig()

config.devtool = 'eval-source-map'
module.exports = config
