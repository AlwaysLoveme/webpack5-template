const Webpack = require("webpack");
const { resolve } = require("path");
const WebpackBar = require("webpackbar");
const tsImportPluginFactory = require("ts-import-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: resolve(__dirname, "../src/index.tsx"),
  output: {
    path: resolve(__dirname, "../dist"),
    clean: true,
  },
  resolve: {
    // Add ".ts" and ".tsx" as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": resolve(__dirname, "../src/"),
      react: resolve(
        __dirname,
        `../node_modules/react/umd/react.${
          process.env.NODE_ENV === "production"
            ? "production.min"
            : "development"
        }.js`,
      ),
      "react-dom": resolve(
        __dirname,
        `../node_modules/react-dom/umd/react-dom.${
          process.env.NODE_ENV === "production"
            ? "production.min"
            : "development"
        }.js`,
      ),
    },
    symlinks: false,
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    modules: [resolve(__dirname, "../node_modules")],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              // 只对src目录下的文件使用babel-loader处理，可以缩小命中范围
              include: resolve(__dirname, "../src"),
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: "antd",
                    libraryDirectory: "lib",
                    style: true,
                  }),
                ],
              }),
              compilerOptions: {
                module: "es2015",
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // 定义webpack变量
    new Webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      BASE_URL: JSON.stringify("/"),
    }),
    // webpack 进度条
    new WebpackBar(),
    // html
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../public/index.html"),
      filename: "index.html",
      title: "webpack5-react",
      hash: true, // 为CSS文件和JS文件引入时，添加唯一的hash，破环缓存非常有用
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
