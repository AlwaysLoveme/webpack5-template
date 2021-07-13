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

<style scoped lang="less">
.home {
  width: 100%;
  height: 300px;
  nav {
    width: 100%;
  }
}
</style>
