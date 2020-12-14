<template>
  <div>
    <v-card class="mb-2" :loading="get_loadDash">
      <v-card-title>
        <v-icon>
          mdi-test-tube
        </v-icon>
        Estimated usage rate</v-card-title
      >
      <v-card-text>
        <v-row v-if="get_ProductUsage">
          <v-col cols="12" md="4" sm="12" xs="12">
            <dashboad-card
              :data="{ icon: 'mdi-glass-mug', title: 'Current Volume', value: get_ProductUsage.currentVolume }"
            />
          </v-col>
          <v-col cols="12" md="4" sm="12" xs="12">
            <dashboad-card :data="{ icon: 'mdi-scale ', title: 'Avarage usage', value: get_ProductUsage.avarage }" />
          </v-col>
          <v-col cols="12" md="4" sm="12" xs="12">
            <dashboad-card
              :data="{ icon: 'mdi-timer', title: 'Usage count left', value: get_ProductUsage.estimateUsageTimes }"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card :loading="get_loadDash">
      <div v-if="get_ProdAnalysis != null">
        <v-card-title
          >Purchases and sales
          <v-spacer></v-spacer>

          <v-chip>Units sold: {{ get_ProdAnalysis.unitsSold }}</v-chip>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3" sm="12" xs="12">
              <dashboad-card
                :data="{
                  icon: 'mdi-cash',
                  title: 'Avarage Buying Price',
                  value: get_ProdAnalysis.avarageBuyingPriceS,
                }"
              />
            </v-col>
            <v-col cols="12" md="3" sm="12" xs="12">
              <dashboad-card
                :data="{
                  icon: 'mdi-currency-usd',
                  title: 'Avarage Selling Price',
                  value: get_ProdAnalysis.avarageSellingPriceS,
                }"
              />
            </v-col>
            <v-col cols="12" md="3" sm="12" xs="12">
              <dashboad-card
                :data="{
                  icon: 'mdi-cash-multiple',
                  title: 'Avarage Profit/Unit',
                  value: get_ProdAnalysis.avarageProfitPerUnitS,
                }"
              />
            </v-col>
            <v-col cols="12" md="3" sm="12" xs="12">
              <dashboad-card
                :data="{ icon: 'mdi-cash-usd', title: 'Total Revenue', value: get_ProdAnalysis.totalRevenueS }"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DashboadCard from '../Dashboard/DashboadCard.vue';
export default {
  components: {
    DashboadCard,
  },
  methods: {
    ...mapActions(['GetProductUsage', 'GetProductSaleAnalysis']),
  },
  computed: mapGetters(['get_ProductUsage', 'get_loadDash', 'get_ProdAnalysis']),
  mounted() {
    let id = this.$route.params.id;
    this.GetProductUsage(id);
    this.GetProductSaleAnalysis(id);
  },
};
</script>

<style></style>
