const Webpack = require("webpack");
const baseConfig = require("./webpack.base.config");
const TerserPlugin = require("terser-webpack-plugin");
const { merge: webpackMerge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const cssLoaders = [
  MiniCssExtractPlugin.loader, // 抽离css到单独的文件中
  {
    loader: "css-loader",
    options: {
      importLoaders: 2,
    },
  },
  "postcss-loader",
];

const webpackProdConfig = webpackMerge(baseConfig, {
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
    new Webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true, // 可省略，默认最优配置：生产环境，压缩 true。开发环境，不压缩 false
    minimizer: [
      // js 压缩
      new TerserPlugin({
        parallel: true, // 可省略，默认开启并行
        //删除注释
        extractComments: true,
        terserOptions: {
          toplevel: true, // 最高级别，删除无用代码
          ie8: true,
          safari10: true,
          compress: {
            // 生产环境去除console
            drop_console: true,
            drop_debugger: true,
            unused: true,
          },
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
    splitChunks: {
      // 分割所有类型的 chunk
      chunks: "all",
      // 缓存分组
      cacheGroups: {
        // 第三方模块
        moment: {
          name: "moment", // chunk 名称
          chunks: "all",
          priority: -10, // 权限更高，优先抽离（例如第三方模块同时也作为公共模块在多处引用时，按第三方模块的规则进行抽离）
          test: /[\\/]node_modules[\\/]moment[\\/]/, // 检查模块是否位于 node_modules/ 目录下
          minSize: 30000, // 大小限制（Byte），太小的不用抽离
          minChunks: 1, // 最少复用过几次（第三方模块只要引用过一次就抽取出来）
        },
        antd: {
          chunks: "all",
          name: "antd", // chunk 名称
          priority: -20, // 权限更高，优先抽离（例如第三方模块同时也作为公共模块在多处引用时，按第三方模块的规则进行抽离）
          test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/, // 检查模块是否位于 node_modules/ 目录下
          minSize: 30000, // 大小限制（Byte），太小的不用抽离
          minChunks: 1, // 最少复用过几次（第三方模块只要引用过一次就抽取出来）
        },
        vendors: {
          name: "vendors",
          chunks: "all",
          test: /[\\/]node_modules[\\/](vue|@vue|vue-router|vuex)[\\/]/,
          priority: -10,
        },

        // 公共的模块
        common: {
          chunks: "all",
          name: "common", // chunk 名称
          priority: 0, // 优先级
          minSize: 50000, // 公共模块的大小限制（此处设置 50KB）
          minChunks: 2, // 公共模块最少复用过几次
        },
      },
    },
  },
});

module.exports = webpackProdConfig;
