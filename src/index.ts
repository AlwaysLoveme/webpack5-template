import { createApp } from "vue";
import routes from "@/router";
import App from "@/entry/App.vue";

import "./styles/global.less";

const app = createApp(App);
app.use(routes);
app.mount("#root");
