/**
 * global 文件夹下的组件均会被自动注册到全局
 * shared 文件夹下的组件则需要手动注册
 */
import { App, ObjectDirective } from "vue";

const ctx = require.context("./global/", false, /\.ts$/);
const componentList: Record<string, ObjectDirective> = {};
for (const key of ctx.keys()) {
  const fileKey = key.replace(/\.\/|\.ts/g, "");
  componentList[fileKey] = ctx(key).default;
}

const install = (app: App): App => {
  // 注册自定义指令
  Object.keys(componentList).forEach((item) => {
    app.directive(item, componentList[item]);
  });
  return app;
};
export default { install };
