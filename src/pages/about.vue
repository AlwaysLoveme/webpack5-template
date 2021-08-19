<template>
  <a-button type="primary" @click="back">BACK</a-button>
  <p>{{ location }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {},

  setup() {
    alert(JSON.stringify(window.location));
    const router = useRouter();
    const back = () => router.back();

    return {
      back,
      location: window.location,
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
