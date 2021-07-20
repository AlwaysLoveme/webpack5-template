<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
html {
  overflow: hidden;
}
body {
  overflow: auto;
}
</style>
