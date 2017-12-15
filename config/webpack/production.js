const webpack = require('webpack');
const environment = require('./environment')

environment.plugins.set("UglifyJs", new webpack.optimize.UglifyJsPlugin({
  parallel:   true,
  sourceMap:  false,
  mangle:     false,
  uglifyOptions: {
    mangle:   false
  },
  compress: {
    warnings: false
  },
  output: {
    comments: false
  }
}))

const config = environment.toWebpackConfig()
config.devtool = 'eval';
module.exports = config