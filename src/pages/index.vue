<template>
  <div>
    <router-link to="/about">
      <a-button type="primary">About</a-button>
    </router-link>
  </div>
  <a-select style="width: 200px">
    <a-select-option value="123">123</a-select-option>
  </a-select>
  <Icon icon="fa-address-book"></Icon>
  <Icon icon="fa-arrow-right"></Icon>
  <a-input type="text" placeholder="Basic 123"></a-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less"></style>
