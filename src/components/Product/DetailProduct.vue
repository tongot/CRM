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
      <v-toolbar height="50" flat>
        <v-toolbar-title v-if="get_Product != null">
          <v-btn large :to="{ name: 'productDetail' }" text>
            {{ get_Product.name }}
          </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text="" :to="{ name: 'productStock' }" small>Stocks</v-btn>
        <v-btn text="" :to="{ name: 'productSales' }" small>Sales</v-btn>
        <v-btn text="" :to="{ name: 'productAnalysis' }" small>Analysis</v-btn>
        <v-divider vertical></v-divider>

        <v-card class="ml-2" outlined>
          <v-btn text="" @click="addStock(get_Product)" small>
            stocking
          </v-btn>
          <v-btn icon="" :to="{ name: 'editProduct' }" small>
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn icon="" :to="{ name: 'listProduct' }" small>
            <v-icon color="error">
              mdi-close
            </v-icon>
          </v-btn>
        </v-card>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card flat :loading="get_loadProduct">
        <v-card-text>
          <transition
            mode="out-in"
            enter-active-class="animate__animated animate__fadeIn animate__faster"
            leave-active-class="animate__animated animate__fadeOut animate__faster"
          >
            <router-view></router-view>
          </transition>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Stock from './AddStock';
export default {
  components: {
    Stock,
  },
  data: () => ({
    modalStock: false,
    id: null,
    itemName: '',
  }),
  methods: {
    ...mapActions(['GetProductById', 'GetCategoryById', 'GetBrandById']),
    addStock(item) {
      this.itemName = item.name;
      this.id = item.id;
      this.modalStock = !this.modalStock;
    },
  },
  computed: mapGetters(['get_Product', 'get_loadProduct', 'get_Brand', 'get_Category']),
  mounted() {
    this.GetProductById(this.$route.params.id).then(() => {
      this.GetCategoryById(this.get_Product.productCategoryId);
      this.GetBrandById(this.get_Product.productBrandId);
    });
  },
};
</script>

<style></style>
