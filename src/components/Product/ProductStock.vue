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
      <v-card-title>Stock track </v-card-title>
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
export default {
  data: () => ({
    modalDetail: false,
    stockDetail: {},
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
  },
  computed: mapGetters(['get_StocksForProd', 'get_loadProduct', 'get_Appointer', 'get_loadAppointment']),
  mounted() {
    this.GetStockForProduct(this.$route.params.id);
  },
};
</script>

<style></style>
