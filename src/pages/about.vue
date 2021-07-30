<template>
  <div>about</div>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    _.join([123, 123, 123], "/");
    return {};
  },
});
</script>

<style scoped lang="less">
div {
  text-align: center;
  padding: 10%;
}
</style>
