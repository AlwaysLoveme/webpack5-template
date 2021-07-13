const baseConfig = require("./webpack.base.config");
const TerserPlugin = require("terser-webpack-plugin");
const { merge: webpackMerge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const cssLoaders = [
  MiniCssExtractPlugin.loader, // 抽离css到单独的文件中
  "css-loader",
  "postcss-loader",
];

module.exports = webpackMerge(baseConfig, {
  mode: "production",
  target: "browserslist",
  output: {
    pathinfo: false,
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "js/[name].[chunkhash].js",
  },
  devtool: "nosources-source-map",
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
        type: "asset",
        generator: {
          filename: "assets/[name].[hash:10][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash:10][ext][query]",
        },
      },
    ],
  },
  plugins: [
    // css代码单独抽离
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].chunk.css",
    }),
  ],
  optimization: {
    minimize: true, // 可省略，默认最优配置：生产环境，压缩 true。开发环境，不压缩 false
    minimizer: [
      // js 压缩
      new TerserPlugin({
        parallel: true, // 可省略，默认开启并行
        terserOptions: {
          toplevel: true, // 最高级别，删除无用代码
          ie8: true,
          safari10: true,
        },
      }),
      // 压缩css
      new CssMinimizerPlugin({
        parallel: true, // 可省略，默认开启并行
        minimizerOptions: {
          preset: "advanced", // 需额外安装 cssnano-preset-advanced 移除未使用CSS
        },
      }),
    ],
  },
});
