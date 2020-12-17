<template>
  <v-card :loading="get_loadDash">
    <div v-if="get_CobResults != null">
      <v-subheader>Close of business as at {{ $route.params.date }}</v-subheader>
      <v-divider></v-divider>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col md="4" sm="12" xs="12" cols="12">
              <dashboad-card
                :data="{ icon: 'mdi-cash-usd', title: 'Total Sales', value: getTotalSales }"
              ></dashboad-card>
            </v-col>
            <v-col md="4" sm="12" xs="12" cols="12">
              <dashboad-card
                :data="{ icon: 'mdi-cash-usd', title: 'Total Income', value: getTotalIncome }"
              ></dashboad-card>
            </v-col>
            <v-col md="4" sm="12" xs="12" cols="12">
              <dashboad-card
                v-if="get_CobResults.tax > 0"
                :data="{ icon: 'mdi-cash-usd', title: 'Total Tax', value: get_CobResults.tax.toFixed(2) }"
              ></dashboad-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="mt-2">
        <v-card-title
          >Product sale
          <v-spacer> </v-spacer>
          <v-chip color="red" class="lighten-4"> P {{ products.revenue.toFixed(2) }} </v-chip>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col md="3" sm="12" cols="12">
              <v-data-table :headers="headersP" :items="get_CobResults.productSale" class="elevation-1 mt-3">
              </v-data-table>
            </v-col>
            <v-col md="9" sm="12" cols="12">
              <div>
                <column-chart :data="get_CobResults.productSale"></column-chart>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="mt-2">
        <v-card-title
          >Employee
          <v-spacer> </v-spacer>
          <v-chip color="red" class="lighten-4"> P {{ employeeTotal.toFixed(2) }} </v-chip>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col md="3" sm="12" cols="12">
              <v-data-table :headers="headersE" :items="get_CobResults.employeeRevenue" class="elevation-1 mt-3">
              </v-data-table>
            </v-col>
            <v-col md="9" sm="12" cols="12">
              <div>
                <pie-chart :data="get_CobResults.employeeRevenue"></pie-chart>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mt-2">
        <v-card-title
          >Services
          <v-spacer> </v-spacer>
          <v-chip color="red" class="lighten-4"> P {{ serviceTotal.toFixed(2) }} </v-chip>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col md="3" sm="12" cols="12">
              <v-data-table :headers="headersS" :items="get_CobResults.servicesCompleted" class="elevation-1 mt-3">
              </v-data-table>
            </v-col>
            <v-col md="9" sm="12" cols="12">
              <div>
                <column-chart :data="get_CobResults.servicesCompleted"></column-chart>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mt-2">
        <v-card-title
          >Stock returns
          <v-spacer> </v-spacer>
          <v-chip color="red" class="lighten-4"> P {{ returnsTotal.toFixed(2) }} </v-chip>
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="headersR" :items="get_CobResults.returns" class="elevation-1 mt-3"> </v-data-table>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
      No Data...
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DashboadCard from '../Dashboard/DashboadCard.vue';
export default {
  components: {
    DashboadCard,
  },
  data: () => ({
    products: {
      revenue: 0,
      volume: 0,
    },
    employeeTotal: 0,
    serviceTotal: 0,
    returnsTotal: 0,
    headersP: [
      { value: '[0]', text: 'Product' },
      { value: '[1]', text: 'Revenue (P)' },
    ],
    headersE: [
      { value: '[0]', text: 'Employee' },
      { value: '[1]', text: 'Revenue (P)' },
    ],
    headersS: [
      { value: '[0]', text: 'Service' },
      { value: '[1]', text: 'Revenue (P)' },
    ],
    headersR: [
      { value: '[0]', text: 'Supplier' },
      { value: '[2]', text: 'Quantity' },
      { value: '[1]', text: 'Revenue (P)' },
    ],
  }),
  methods: {
    ...mapActions(['GetCobResults']),
    totalProduct() {},
  },
  computed: {
    ...mapGetters(['get_CobResults', 'get_loadDash']),
    getTotalIncome() {
      return (this.products.revenue + this.serviceTotal + this.returnsTotal).toFixed(2);
    },
    getTotalSales() {
      return (this.products.revenue + this.serviceTotal).toFixed(2);
    },
  },
  mounted() {
    this.GetCobResults(this.$route.params.date).then(() => {
      if (this.get_CobResults != null) {
        //product
        this.get_CobResults.productSale.forEach((element) => {
          this.products.revenue += Number(element[1]);
        });
        //employee
        this.get_CobResults.employeeRevenue.forEach((element) => {
          this.employeeTotal += Number(element[1]);
        });
        //service
        this.get_CobResults.servicesCompleted.forEach((element) => {
          this.serviceTotal += Number(element[1]);
        });
        //Returs
        this.get_CobResults.returns.forEach((element) => {
          this.returnsTotal += Number(element[1]);
        });
      }
    });
  },
};
</script>

<style>
.products {
  width: 100px;
}
.product-container {
  overflow: auto;
}
</style>
