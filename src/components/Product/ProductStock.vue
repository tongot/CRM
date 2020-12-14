<template>
  <div>
    <v-dialog v-model="modalDetail" width="500">
      <v-card flat>
        <v-card-title
          >{{ stockDetail.supplierName }}
          <v-spacer></v-spacer>
          <v-chip small>
            {{ stockDetail.comment }}
          </v-chip>
        </v-card-title>
        <div class="ma-4">
          <v-subheader>Quantity</v-subheader>
          <p class="ml-4">{{ stockDetail.quantity }}</p>
          <v-subheader>Price</v-subheader>
          <p class="ml-4">{{ stockDetail.price }}</p>
          <v-subheader>Date</v-subheader>
          <p class="ml-4">{{ stockDetail.date }}</p>
          <div v-if="get_Appointer != null">
            <v-subheader>Created By</v-subheader>
            <p class="ml-4">
              {{ get_Appointer.name + ' ' + get_Appointer.surname }}
            </p>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-card :loading="get_loadProduct" flat="">
      <v-card-title
        >Stock track<v-spacer></v-spacer>
        <v-card flat class="white--text pa-1 mr-1" color="warning">
          {{ `Intenal:${get_StockTrack.InternalTrans}` }}
        </v-card>
        <v-card flat class="white--text pa-1 mr-1" color="error">
          {{ `Return:${get_StockTrack.ReturnStock}` }}
        </v-card>
        <v-card flat class="white--text pa-1" color="success">
          {{ `In:${get_StockTrack.NewStock}` }}
        </v-card>
      </v-card-title>
      {{ get_StockTrack }}
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
        :items="get_StocksForProd"
        hide-default-footer
        class="elevation-1 mt-3"
        item-key=""
      >
        <template v-slot:item.quantity="{ item }">
          <div class="d-flex">
            <span :class="Math.sign(item.quantity) == -1 ? 'error--text' : ''">
              {{ item.quantity }}
            </span>
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="d-flex">
            <v-btn :loading="get_loadAppointment" @click="getDetail(item)" small icon="">
              <v-icon small>
                mdi-eye
              </v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
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
    modalDetail: false,
    stockDetail: {},
    search: {
      startDate: '',
      endDate: '',
      id: '',
    },
    headers: [
      { text: 'Stock Id', value: 'id' },
      { text: 'Supplier', value: 'supplierName' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Purchase Price', value: 'price' },
      { text: 'Date', value: 'date' },
      { text: 'Action', value: 'comment' },
      { text: '', value: 'actions' },
    ],
  }),
  methods: {
    ...mapActions(['GetStockForProduct', 'GetAppointerById']),
    getDetail(item) {
      this.GetAppointerById(item.createdBy).then(() => {
        this.modalDetail = true;
        this.stockDetail = item;
      });
    },
    clearFilter() {
      let date = moment(new Date(Date.now())).format('YYYY-MM-DD');
      let date2 = moment(new Date(Date.now()));

      this.search.startDate = date;
      this.search.endDate = date2.add(1, 'days').format('YYYY-MM-DD');
      this.search.id = this.$route.params.id;
      this.GetStockForProduct(this.search);
    },
    filter() {
      if (this.$refs.getForm.validate()) {
        this.GetStockForProduct(this.search);
      }
    },
    getDateS(event) {
      this.search.startDate = event;
    },
    getDateE(event) {
      this.search.endDate = event;
    },
  },
  computed: mapGetters([
    'get_StocksForProd',
    'get_loadProduct',
    'get_Appointer',
    'get_loadAppointment',
    'get_StockTrack',
  ]),
  mounted() {
    this.clearFilter();
  },
};
</script>

<style></style>
