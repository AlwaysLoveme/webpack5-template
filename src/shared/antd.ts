import { App } from "vue";
import {
  Form,
  Input,
  Button,
  Cascader,
  Checkbox,
  Slider,
  Select,
} from "ant-design-vue";

const AntdPlugin = {
  install(app: App): App {
    const components = [
      Form,
      Input,
      Button,
      Cascader,
      Checkbox,
      Slider,
      Select,
    ];
    components.forEach((component) => app.use(component));
    return app;
  },
};

export default AntdPlugin;
