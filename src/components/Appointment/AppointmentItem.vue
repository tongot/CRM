<template>
  <v-list-item>
    <v-list-item-avatar class="white--text" :color="getCol(data.status)">
      <v-icon color="white">mdi-clock</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ data.name }}</v-list-item-title>
      <v-list-item-subtitle>
        <v-chip> {{ data.start | moment('ddd DD, MMM, h:mm a') }} to {{ data.end | moment('h:mm a') }} </v-chip>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { getStateColor } from '../../../SharedFunc';

export default {
  props: ['data'],
  methods: {
    getCol(state) {
      return getStateColor(state);
    },
  },
};
</script>

<style></style>
