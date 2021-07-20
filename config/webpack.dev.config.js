const Webpack = require("webpack");
const baseConfig = require("./webpack.base.config");
const { merge: webpackMerge } = require("webpack-merge");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin({ disable: true });

const cssLoaders = [
  "style-loader",
  {
    loader: "css-loader",
    options: {
      importLoaders: 2,
    },
  },
  "postcss-loader"];

const webpackDevConfig = webpackMerge(baseConfig, {
  mode: "development",
  target: "web",
  output: {
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js",
    pathinfo: "verbose",
  },
  devtool: "eval-cheap-module-source-map",
  // 使用webpack-dev-server时配置
  devServer: {
    historyApiFallback: true,
    host: "0.0.0.0",
    bonjour: true,
    quiet: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    port: 9527,
    hot: true,
    stats: "errors-only",
    useLocalIp: true,
    clientLogLevel: "silent",
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          ...cssLoaders,
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
        type: "asset/inline",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()],
});

module.exports = smp.wrap(webpackDevConfig);
