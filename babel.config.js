module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions"], // 最近 2 个版本的浏览器
        },
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties",
  ],
  env: {
    development: {
      plugins: ["dynamic-import-node", { noInterop: true }],
    },
  },
};
