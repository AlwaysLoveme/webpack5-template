module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions", "Firefox ESR", "> 1%", "not ie 11"], // 最近 2 个版本的浏览器
        },
      },
    ],
    [
      "@babel/preset-typescript", // 引用Typescript插件
      {
        allExtensions: true, // 支持所有文件扩展
      },
    ],
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "lib",
        style: true,
      },
      "ant-design-vue",
    ],
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-transform-object-assign",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
  ],
};
