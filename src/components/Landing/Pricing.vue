<template>
  <div class="pricing">
    <heading :data="'All payments are monthly'" />
    <div class="pricing-data">
      <v-row>
        <v-col v-for="item in items" :key="item.title" md="4" sm="12" xs="12">
          <pricing-card :data="item" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Heading from './heading.vue';
import PricingCard from './PricingCard.vue';
export default {
  components: { PricingCard, Heading },
  data: () => ({
    items: [
      {
        title: 'Basic',
        amount: 'BWP500.00',
        features: [
          { color: 'success', feature: 'Maintenance', icon: 'mdi-check' },
          { color: 'success', feature: 'Continueous upgrading', icon: 'mdi-check' },
          { color: 'success', feature: 'Cloud based', icon: 'mdi-check' },
          { color: 'error', feature: 'Text Messages/Whats app Intr', icon: 'mdi-close' },
          { color: 'error', feature: 'Customisation', icon: 'mdi-close' }
        ]
      },
      {
        title: 'Premium',
        amount: 'BWP700.00+',
        features: [
          { color: 'success', feature: 'Maintenance', icon: 'mdi-check' },
          { color: 'success', feature: 'Continueous upgrading', icon: 'mdi-check' },
          { color: 'success', feature: 'Cloud based', icon: 'mdi-check' },
          { color: 'success', feature: 'Text Messages/Whats app Intr', icon: 'mdi-check' },
          { color: 'error', feature: 'Customisation', icon: 'mdi-close' }
        ]
      },
      {
        title: 'Executive',
        amount: 'BWP1000.00+',
        features: [
          { color: 'success', feature: 'Maintenance', icon: 'mdi-check' },
          { color: 'success', feature: 'Continueous upgrading', icon: 'mdi-check' },
          { color: 'success', feature: 'Cloud based', icon: 'mdi-check' },
          { color: 'success', feature: 'Text Messages/Whats app Intr', icon: 'mdi-check' },
          { color: 'success', feature: 'Customisation', icon: 'mdi-check' }
        ]
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
.pricing {
  margin-top: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .pricing-data {
    margin-top: 80px;
    width: 70%;
  }
}
</style>
