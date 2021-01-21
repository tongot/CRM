<template>
  <div class="feature-container">
    <div class="features">
      <heading :data="'It comes with for all plans'" />
      <v-list>
        <v-card outlined width="300">
          <v-card-text>
            <p><v-icon color="success"> mdi-check</v-icon>Included</p>
            <p><v-icon color="error"> mdi-close</v-icon>Might require extra charges</p>
          </v-card-text>
        </v-card>

        <div v-for="feature in features" :key="feature.title">
          <v-list-item color="blue">
            <v-list-item-title>{{ feature.title }}</v-list-item-title>
            <v-list-item-action>
              <v-icon :color="feature.color">{{ feature.icon }}</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </div>
  </div>
</template>

<script>
import heading from './heading.vue';
export default {
  components: { heading },
  data: () => ({
    features: [
      { color: 'success', icon: 'mdi-check', title: 'Contact manager', message: 'Managing customers' },
      { color: 'success', icon: 'mdi-check', title: 'Stock manager', message: 'Managing stocks' },
      { color: 'success', icon: 'mdi-check', title: 'Invoicing', message: 'Quick invoicing' },
      { color: 'success', icon: 'mdi-check', title: 'Check out', message: 'Provides POS online' },
      {
        color: 'success',
        icon: 'mdi-check',
        title: 'Employee portal',
        message: 'Employees can manage day to day events'
      },
      { color: 'success', icon: 'mdi-check', title: 'Calendar manager', message: 'Make appointments' },
      { color: 'success', icon: 'mdi-check', title: 'Material usage manager', message: 'Track you raw material usage' },
      { color: 'success', icon: 'mdi-check', title: 'Material usage manager', message: 'Track you raw material usage' },
      { color: 'success', icon: 'mdi-check', title: 'Cloud Based CRM', message: 'Track you raw material usage' },
      { color: 'success', icon: 'mdi-check', title: 'API + Intergrations', message: 'Track you raw material usage' },
      {
        color: 'success',
        icon: 'mdi-check',
        title: 'Close of business analysis',
        message: 'Track you raw material usage'
      },
      { color: 'success', icon: 'mdi-check', title: 'Security + maintenance', message: 'Track you raw material usage' },
      { color: 'success', icon: 'mdi-check', title: 'Continues upgrading', message: 'Track you raw material usage' },
      {
        color: 'error',
        icon: 'mdi-close',
        title: 'Text massage/ whats app intergration',
        message: 'Track you raw material usage'
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
.feature-container {
  margin-top: 70px;
  display: flex;
  justify-content: center;
  .features {
    background-color: white;
    width: 70%;
    border-radius: 10px;
    padding: 5px;
  }
}
</style>
