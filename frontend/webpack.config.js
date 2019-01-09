const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production'
const rootDir = path.resolve(__dirname, ".");
const srcDir = path.resolve(rootDir, "src");
const outputPath = path.resolve(rootDir, "dist");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: [
    "@babel/polyfill",
    path.resolve(rootDir, `${srcDir}/javascript/index.js`),
  ],
  output: {
    filename: "bundle.js",
    path: outputPath
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(rootDir, srcDir)],
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(rootDir, srcDir),
      "node_modules",
    ],
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, "statics/index.html"),
      favicon: path.resolve(rootDir, "statics/favicon.ico"),
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.GA_TRACKING_CODE": JSON.stringify(process.env.GA_TRACKING_CODE),
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://api:8080',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": ""
        },
      },
    },
    contentBase: outputPath,
    historyApiFallback: true,
    disableHostCheck: true,
  },
};

if (process.env.NODE_ENV !== 'production') {
  module.exports.devtool = 'inline-source-map';
}
