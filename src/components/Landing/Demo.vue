<template>
  <div class="demo">
    <v-card width="500px">
      <heading :data="'Request Demo'" />
      <v-card-text>
        <v-text-field outlined label="Email"></v-text-field>
        <v-text-field outlined label="Phone"></v-text-field>
        <v-text-field outlined label="Name"></v-text-field>
        <v-text-field outlined label="Surname"></v-text-field>
        <v-text-field outlined label="Co. Name"></v-text-field>

        <v-textarea outlined label="Message"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed="">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Heading from './heading.vue';
export default {
  components: { Heading }
};
</script>

<style lang="scss" scoped>
.demo {
  margin-top: 80px;
  display: flex;
  justify-content: center;
}
</style>
