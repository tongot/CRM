<template>
  <div class="works">
    <heading :data="'How it works'" />
  </div>
</template>

<script>
import Heading from './heading.vue';
export default {
  components: { Heading }
};
</script>

<style lang="scss" scoped>
.works {
  margin-top: 80px;
}
</style>
