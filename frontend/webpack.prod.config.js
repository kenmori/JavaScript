const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

const rootDir = path.resolve(__dirname, ".");
const srcDir = path.resolve(rootDir, "src");
const outputPath = path.resolve(rootDir, "dist");

module.exports = {
  mode: "production",
  entry: [
    "@babel/polyfill",
    path.resolve(rootDir, `${srcDir}/javascript/index.js`),
  ],
  output: {
    filename: "bundle.js",
    path: outputPath,
    publicPath: "/",
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
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(rootDir, srcDir), "node_modules"],
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
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.GA_TRACKING_CODE": JSON.stringify(process.env.GA_TRACKING_CODE),
      "process.env.MIXPANEL_TOKEN": JSON.stringify(process.env.MIXPANEL_TOKEN),
      "process.env.ADD_TO_SLACK_URL": JSON.stringify(process.env.ADD_TO_SLACK_URL),
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$/,
      threshold: 1024,
      minRatio: 0.8,
    }),
  ],
};
``
