<template>
  <div>
    <a-button type="primary"
      ><router-link to="/about">TO ABOUT</router-link></a-button
    >
  </div>
  <!-- <a-input type="text" placeholder="Basic usage"></a-input> -->
  <a-slider range v-model:value="checked" :disabled="disabled" />
  <!-- <img src="@/assets/beer-zone.png" alt="" width="100%" /> -->
  <i class="fas fa-address-book"></i>
  <i class="fas fa-arrow-right"></i>
</template>

<script lang="ts">
import join from "lodash/join";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const md = ref();
    const checked = ref();
    const textarea = ref();

    const newarray = join([123, 123, 123], "/");

    console.log(newarray);

    return {
      md,
      checked,
      newarray,
      textarea,
    };
  },
});
</script>

<style scoped lang="less"></style>
