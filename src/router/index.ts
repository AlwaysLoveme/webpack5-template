import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/pages/index.vue"),
  },
  {
    path: "/about",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/pages/about.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
