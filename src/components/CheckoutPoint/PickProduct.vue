<template>
  <div>
    <v-card>
      <v-card-title
        >Pick Products
        <v-spacer></v-spacer>
        <v-chip large>{{ `P ${get_totalPrice}` }}</v-chip>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" sm="12" xs="12">
            <v-card-text>
              <v-card flat>
                <v-card-text>
                  <v-switch label="Use barcode" v-model="useBarcode"></v-switch>
                  <v-form ref="searchForm" @submit.prevent="getSearch()">
                    <v-text-field
                      v-model="search.name"
                      :rules="[required]"
                      append-icon="mdi-magnify"
                      placeholder="search appointment"
                      @input="getProductWithCode()"
                    >
                    </v-text-field>
                  </v-form>
                </v-card-text>
              </v-card>
              <v-list dense v-if="get_Products.length > 0">
                <v-list-item-group>
                  <v-list-item v-for="item in get_Products" @click="addToCheckoutProduct(item)" :key="item.id" two-line>
                    <v-list-item-content>
                      <v-list-item-title
                        >{{ item.name }}
                        <v-subheader small="">{{ item.quantity }}</v-subheader>
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ item.code }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action
                      ><v-chip small="" color="success"
                        >{{ `P ${item.price}` }}
                        <v-icon small>
                          mdi-arrow-right
                        </v-icon>
                      </v-chip></v-list-item-action
                    >
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <div class="d-flex justify-center" v-else-if="get_loadProduct">
                <v-icon>mdi-loading mdi-spin</v-icon>
              </div>
              <div class="d-flex justify-center">
                <span class="error--text">{{ result }}</span>
              </div>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="8" sm="12" xs="12">
            <saleItems />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import saleItems from './SaleProductList';
export default {
  components: {
    saleItems,
  },
  data: () => ({
    useBarcode: false,
    result: '',
    search: {
      name: '',
      code: '',
      brandId: '',
      categoryId: '',
      fromMount: true,
    },
    required: (v) => !!v || 'Enter search text',
  }),
  methods: {
    ...mapActions(['GetProducts', 'addToCheckoutProduct', 'GetProductByCode']),
    getSearch() {
      if (!this.$refs.searchForm.validate()) {
        return;
      }
      this.result = '';
      this.GetProducts(this.search).then(() => {
        if (this.get_Products.length < 1) {
          this.result = 'No records found';
        }
        this.search.name = '';
      });
    },
    getProductWithCode() {
      if (this.useBarcode) {
        this.GetProductByCode(this.search.name).then(() => {
          this.search.name = '';
        });
      }
    },
  },
  computed: mapGetters(['get_Products', 'get_loadProduct', 'get_CheckoutProducts', 'get_totalPrice']),
};
</script>

<style></style>
