<template>
  <a-button type="primary" @click="back">BACK</a-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {},

  setup() {
    const router = useRouter();
    const back = () => router.back();

    return {
      back,
    };
  },
});
</script>

<style scoped lang="less">
div {
  text-align: center;
  padding: 10%;
}
</style>
