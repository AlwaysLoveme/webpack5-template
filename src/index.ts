import { createApp } from "vue";
import routes from "@/router";
import App from "@/entry/App.vue";
import Antd from "./shared/antd";
import "./styles/global.less";

const app = createApp(App);
app.use(Antd);
app.use(routes);
app.mount("#root");
