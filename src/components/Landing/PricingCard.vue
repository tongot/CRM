<template>
  <v-card class="card" height="550">
    <heading :data="data.title" />
    <h1>{{ data.amount }}</h1>
    <div class="items">
      <p>features</p>
      <div class="item-feature">
        <v-list>
          <div v-for="feature in data.features" :key="feature.title">
            <v-list-item>
              <v-list-item-title>{{ feature.feature }}</v-list-item-title>
              <v-icon :color="feature.color">{{ feature.icon }}</v-icon>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list>
      </div>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="#df9ca8" depressed class="white--text">Request demo now</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import heading from './heading.vue';
export default {
  components: { heading },
  props: ['data']
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 10px;
  .items {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    padding-top: 30px;
    text-align: center;
    font-size: 40px;
    font-weight: 300;
  }
}
</style>
