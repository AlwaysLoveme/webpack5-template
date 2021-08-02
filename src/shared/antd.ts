import { App } from "vue";
import {
  Form,
  Input,
  Button,
  Cascader,
  Checkbox,
  Slider,
} from "ant-design-vue";

const AntdPlugin = {
  install(app: App): App {
    const components = [Form, Input, Button, Cascader, Checkbox, Slider];
    components.forEach((component) => app.use(component));
    return app;
  },
};

export default AntdPlugin;
