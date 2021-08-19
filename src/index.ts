import { createApp } from "vue";
import routes from "@/router";
import App from "@/entry/App.vue";
import Antd from "./shared/antd";
import Components from "@/components";
import "./styles/global.less";

import VConsole from "vconsole";
new VConsole();

const app = createApp(App);
app.use(Antd);
app.use(routes);
app.use(Components);
app.mount("#root");
