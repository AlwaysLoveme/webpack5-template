const Webpack = require("webpack");
const baseConfig = require("./webpack.base.config");
const { merge: webpackMerge } = require("webpack-merge");

const cssLoaders = ["style-loader", "css-loader", "postcss-loader"];
module.exports = webpackMerge(baseConfig, {
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
    quiet: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    port: 9527,
    hot: true,
    stats: "errors-only",
    useLocalIp: true,
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
  plugins: [new Webpack.HotModuleReplacementPlugin()],
});
