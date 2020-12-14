<template>
  <div>
    <!-- modal set tax -->
    <v-dialog width="500" v-model="modalTax" persistent>
      <v-card flat>
        <v-card-title>
          Select tax for {{ selectedProduct.name }}
          <v-spacer></v-spacer>
          <v-icon @click="modalTax = !modalTax">
            mdi-close
          </v-icon>
        </v-card-title>
        <add-tax-to-product :data="selectedProduct" />
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

                <v-btn @click="getTax(item)" text="" small>
                  Tax
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="" v-if="canLaodMore" @click="loadMore()" :loading="get_loadProduct" outlined depressed=""
            >load more</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AddTaxToProduct from './AddTaxToProduct.vue';
export default {
  components: { AddTaxToProduct },
  data: () => ({
    productsLoaded: 0,
    canLaodMore: true,
    modalTax: false,
    selectedProduct: {},
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
      { text: 'Discount(%)', value: 'discount' },
      { text: 'Price', value: 'price' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  methods: {
    ...mapActions(['GetProducts', 'GetProductCategories', 'GetBrands', 'clearProducts', 'GetTaxForProduct']),
    filter() {
      this.btnFilter();
    },
    clearFilters() {
      this.canLaodMore = true;
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
    getTax(item) {
      this.GetTaxForProduct(item.id).then(() => {
        this.modalTax = !this.modalTax;
        this.selectedProduct = item;
      });
    },
    loadMore() {
      this.productsLoaded = this.get_Products.length;
      this.GetProducts(this.search).then(() => {
        this.search.fromMount = false;
        if (this.productsLoaded === this.get_Products.length) {
          this.canLaodMore = false;
        }
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
