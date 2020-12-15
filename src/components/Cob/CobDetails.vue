<template>
  <div>
    <column-chart :data="get_CobResults.productSale"></column-chart>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    Test: [
      ['tongoona', '60'],
      ['takudzwa', '100'],
    ],
  }),
  methods: {
    ...mapActions(['GetCobResults']),
  },
  computed: mapGetters(['get_CobResults']),
  mounted() {
    this.GetCobResults(this.$route.params.date);
  },
};
</script>

<style></style>
