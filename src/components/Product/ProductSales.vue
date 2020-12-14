<template>
  <div>
    <v-card flat>
      <v-card-title
        >Sales History <v-spacer></v-spacer
        ><v-card class="white--text pa-1" flat color="success"> P {{ getTotalRevenue.toFixed(2) }}</v-card>
      </v-card-title>
      <v-card-text>
        <v-form ref="getForm" @submit.prevent="filter()">
          <v-row>
            <v-col md="3" sm="12" cols="12" xs="12">
              <datePicker @date="getDateS" :data="{ date: search.startDate, label: 'Start date', required: true }" />
            </v-col>
            <v-col md="3" sm="12" cols="12" xs="12">
              <datePicker @date="getDateE" :data="{ date: search.endDate, label: 'End date', required: true }" />
            </v-col>
            <v-col md="6" sm="12" cols="12" xs="12">
              <v-btn @click="filter()" depressed="" color="primary">
                <v-icon>mdi-filter-outline</v-icon>
                filter
              </v-btn>
              <v-btn @click="clearFilter()" depressed="">
                <v-icon>mdi-filter-remove-outline</v-icon>
                clear filter
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <v-data-table
          :loading="get_loadProduct"
          :headers="headers"
          :items="get_SalesForProduct"
          hide-default-footer
          class="elevation-1 mt-3"
        >
          <template v-slot:item.actions="{ item }">
            <div class="d-flex">
              <v-btn :to="{ name: 'Invoice', params: { id: item.invoiceId } }" depressed small>
                show invoice
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import datePicker from '../../components/Shared/DatePicker';
const moment = require('moment');
export default {
  components: {
    datePicker,
  },
  data: () => ({
    search: {
      startDate: '',
      endDate: '',
      id: '',
    },
    headers: [
      { text: 'Date', value: 'date' },
      { text: 'Unit Price', value: 'unitPrice' },
      { text: 'Discount(%)', value: 'discount' },
      { text: 'Salling Price', value: 'actualAmountPaid' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Revenue', value: 'totalPrice' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  methods: {
    ...mapActions(['GetSalesForProduct']),
    getDateS(event) {
      this.search.startDate = event;
    },
    getDateE(event) {
      this.search.endDate = event;
    },
    filter() {
      if (this.$refs.getForm.validate()) {
        this.GetSalesForProduct(this.search);
      }
    },
    clearFilter() {
      let date = moment(new Date(Date.now())).format('YYYY-MM-DD');
      let date2 = moment(new Date(Date.now()));

      this.search.startDate = date;
      this.search.endDate = date2.add(1, 'days').format('YYYY-MM-DD');
      this.search.id = this.$route.params.id;
      this.GetSalesForProduct(this.search);
    },
  },
  computed: {
    ...mapGetters(['get_SalesForProduct', 'get_loadProduct']),
    getTotalRevenue() {
      let total = 0;
      this.get_SalesForProduct.forEach((element) => {
        total += element.totalPrice;
      });
      return total;
    },
  },
  mounted() {
    this.clearFilter();
  },
};
</script>

<style></style>
