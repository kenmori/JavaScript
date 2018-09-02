const environment = require('./environment')
const webpack = require('webpack')

environment.plugins.append('DefinePlugin', new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.GA_TRACKING_CODE': JSON.stringify('UA-111410984-3'),
}))

const config = environment.toWebpackConfig()
config.devtool = 'eval'
module.exports = config
