<template>
  <div>
    <v-card flat :color="getColor()">
      <v-card-subtitle class="white--text">
        <v-icon class="mr-3" color="white">
          {{ data.icon }}
        </v-icon>
        {{ data.title }}</v-card-subtitle
      >
      <v-card-text class="white--text">
        <span class="display-1">{{ data.value }}</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { getColor } from '../../../SharedFunc';
export default {
  props: ['data'],
  methods: {
    getColor() {
      return getColor();
    },
  },
};
</script>

<style></style>
