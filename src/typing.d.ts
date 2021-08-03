declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >;
  export default component;
}
declare module "*.less";
declare module "*.css";
declare module "*.png" {
  const content: any;
  export default content;
}
declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "ninecat-ui";
