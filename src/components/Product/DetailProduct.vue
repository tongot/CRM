<template>
  <div v-if="get_Product != null">
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

    <v-dialog width="500" v-model="modalDelete" persistent>
      <v-card flat>
        <v-card-title> Delete Product( {{ get_Product.name }}) </v-card-title>
        <v-card-text>
          <v-alert outlined type="error" prominent border="left">
            All history associated with this product will be deleted. Press delete to proceed or cancel to go back
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn deperessed="" :loading="get_loadProduct" @click="Delete()" color="error">
            <v-icon>
              mdi-delete
            </v-icon>
            delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn deperessed="" @click="modalDelete = !modalDelete" color="success">
            <v-icon>
              mdi-cancel
            </v-icon>
            cancel</v-btn
          >
        </v-card-actions>
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
          <v-btn icon="" @click="modalDelete = !modalDelete" small>
            <v-icon color="error">
              mdi-delete
            </v-icon>
          </v-btn>
        </v-card>
        <v-divider class="ml-1" vertical></v-divider>
        <v-btn icon="" :to="{ name: 'listProduct' }" small>
          <v-icon color="error">
            mdi-close
          </v-icon>
        </v-btn>
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
    modalDelete: false,
  }),
  methods: {
    ...mapActions(['GetProductById', 'GetCategoryById', 'GetBrandById', 'DeleteProduct']),
    addStock(item) {
      this.itemName = item.name;
      this.id = item.id;
      this.modalStock = !this.modalStock;
    },
    Delete() {
      this.DeleteProduct(this.$route.params.id);
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
