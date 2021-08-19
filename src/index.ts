import { createApp } from "vue";
import routes from "@/router";
import App from "@/entry/App.vue";
import Antd from "./shared/antd";
import Components from "@/components";
import Directives from "@/directives";
import "./styles/global.less";

const app = createApp(App);
app.use(Antd);
app.use(routes);
app.use(Components);
app.use(Directives);
app.mount("#root");
