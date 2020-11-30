<template>
  <div>
    <v-card :to="{ name: data.url, params: { id: data.item.id } }" outlined class="category-card" height="80">
      <v-sheet class="color-div" :color="getCol()"> </v-sheet>
      <div class="content">
        <h4 class="display-1">{{ data.item.name }}</h4>
        <v-subheader>{{ data.item.email }}</v-subheader>
      </div>
    </v-card>
  </div>
</template>

<script>
import { getColor } from '../../../SharedFunc';
export default {
  props: ['data'],
  methods: {
    getCol() {
      return getColor();
    },
  },
};
</script>

<style scoped lang="scss">
.color-div {
  height: 100%;
  width: 4px;
  position: absolute;
}
.category-card {
  position: relative;
  margin-top: 1px;
  &:hover {
    background-color: rgba(233, 233, 233, 0.253);
  }
}
.content {
  margin-left: 10px;
}
</style>
