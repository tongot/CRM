<template>
  <div>
    <v-dialog width="500" v-model="modalStock" persistent>
      <v-card flat>
        <v-card-title>
          {{ itemName }}
          <v-spacer></v-spacer>
          <v-icon @click="modalStock = !modalStock">
            mdi-close
          </v-icon>
        </v-card-title>
        <Stock :data="id" />
      </v-card>
    </v-dialog>

    <v-container>
      <v-card flat>
        <v-card-title>Products</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3" sm="12" xs="12">
              <v-text-field label="Search string" v-model="search.name" outlined=""></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="12" xs="12">
              <v-text-field label="Code" v-model="search.code" outlined=""></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="12" xs="12">
              <v-select
                :items="get_Categories"
                item-value="id"
                :loading="get_loadCategory"
                v-model="search.categoryId"
                item-text="name"
                outlined
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="3" sm="12" xs="12">
              <v-select
                :items="get_Brands"
                item-value="id"
                :loading="get_loadBrand"
                v-model="search.brandId"
                item-text="name"
                outlined
              >
              </v-select>
            </v-col>
            <div class="ml-3 d-flex">
              <v-btn @click="filter()" depressed="" color="primary">
                <v-icon>mdi-filter-outline</v-icon>
                filter
              </v-btn>
              <v-btn @click="clearFilters()" depressed="">
                <v-icon>mdi-filter-remove-outline</v-icon>
                clear filter
              </v-btn>
            </div>
          </v-row>

          <v-data-table
            :loading="get_loadProduct"
            :headers="headers"
            :items="get_Products"
            hide-default-footer
            class="elevation-1 mt-3"
          >
            <template v-slot:item.actions="{ item }">
              <div class="d-flex">
                <v-btn :to="{ name: 'productDetail', params: { id: item.id } }" small icon="">
                  <v-icon small>
                    mdi-eye
                  </v-icon>
                </v-btn>

                <v-btn :to="{ name: 'editProduct', params: { id: item.id } }" small icon="">
                  <v-icon small>
                    mdi-pencil
                  </v-icon>
                </v-btn>

                <v-btn @click="addStock(item)" text="" small>
                  stock
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Stock from './AddStock';
export default {
  components: { Stock },
  data: () => ({
    modalStock: false,
    id: '',
    itemName: '',
    search: {
      name: '',
      code: '',
      brandId: '',
      categoryId: '',
      fromMount: false,
    },
    headers: [
      { text: 'name', value: 'name' },
      { text: 'code', value: 'code' },
      { text: 'Created on', value: 'createdOn' },
      { text: 'Discount', value: 'discount' },
      { text: 'Price', value: 'price' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  methods: {
    ...mapActions(['GetProducts', 'GetProductCategories', 'GetBrands', 'clearProducts']),
    filter() {
      this.btnFilter();
    },
    clearFilters() {
      this.search.name = '';
      this.search.code = '';
      this.search.brandId = '';
      this.search.categoryId = '';
      this.btnFilter();
    },
    addStock(item) {
      this.itemName = item.name;
      this.id = item.id;
      this.modalStock = !this.modalStock;
    },
    btnFilter() {
      this.search.fromMount = true;
      this.GetProducts(this.search).then(() => {
        this.search.fromMount = false;
      });
    },
  },
  computed: mapGetters([
    'get_Products',
    'get_loadProduct',
    'get_loadBrand',
    'get_Brands',
    'get_loadCategory',
    'get_Categories',
  ]),
  mounted() {
    const search = {
      text: '',
    };
    this.btnFilter();

    this.GetBrands(search);
    this.GetProductCategories(search);
  },
  beforeRouteLeave(to, from, next) {
    this.clearProducts();
    next();
  },
};
</script>

<style></style>
