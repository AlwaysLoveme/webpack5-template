<template>
  <div>
    <button><router-link to="/about">TO ABOUT</router-link></button>
  </div>
  <img src="@/assets/beer-zone.png" alt="" width="100%" />
  <i class="fas fa-address-book"></i>
  <i class="fas fa-arrow-right"></i>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const md = ref();
    const textarea = ref();

    return {
      md,
      textarea,
    };
  },
});
</script>

<style scoped lang="less"></style>
