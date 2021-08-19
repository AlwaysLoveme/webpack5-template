import { ObjectDirective } from "vue";

const Async: ObjectDirective = {
  mounted(el, binding) {
    console.log(el, binding);
  },
  unmounted(el) {
    console.log(el);
  },
};

export default Async;
