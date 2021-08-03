const Webpack = require("webpack");
const { resolve } = require("path");
const baseConfig = require("./webpack.base.config");
const { merge: webpackMerge } = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");

const cssLoaders = ["style-loader", "css-loader", "postcss-loader"];

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
  resolve: {
    alias: {
      vue: resolve(__dirname, "../node_modules/vue/dist/vue.esm-browser.js"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...cssLoaders],
      },
      {
        test: /\.less$/,
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
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilerSuccessInfo: {
        messages: ["You application is running here http://localhost:3000"],
        notes: ["成功编译后显示的一些附加说明"],
      },
    }),
  ],
});

module.exports = webpackDevConfig;
