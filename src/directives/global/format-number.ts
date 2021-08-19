import { ObjectDirective } from "vue";

const formatNumber: ObjectDirective = {
  mounted(el, binding) {
    console.log(el, binding);
  },
  unmounted(el) {
    console.log(el);
  },
};

export default formatNumber;
