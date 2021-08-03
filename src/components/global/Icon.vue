<template>
  <i class="fas" :class="[icon]" :style="{ fontSize: `${size}px` }"></i>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "16",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
