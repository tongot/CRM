<template>
  <div>
    <v-container>
      <v-card :loading="get_loadProduct" flat>
        <v-card-title>
          Add Product
          <v-spacer></v-spacer>
          <v-btn icon="" :to="{ name: 'listProduct' }" small>
            <v-icon color="error">
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-form v-if="get_Product != null" ref="editForm">
          <v-card-text>
            <v-row>
              <v-col md="6" sm="12" xs="12">
                <v-text-field
                  label="Name"
                  v-model="get_Product.name"
                  :rules="[rules.requierd]"
                  outlined=""
                ></v-text-field>
                <v-text-field
                  label="Code"
                  v-model="get_Product.code"
                  :rules="[rules.requierd]"
                  outlined=""
                ></v-text-field>
                <v-select
                  :items="get_Categories"
                  item-value="id"
                  item-text="name"
                  :rules="[rules.requierd]"
                  label="Select Category"
                  v-model="get_Product.productCategoryId"
                  :loading="get_loadCategory"
                  outlined
                ></v-select>
                <v-select
                  :items="get_Brands"
                  item-value="id"
                  :rules="[rules.requierd]"
                  item-text="name"
                  label="Select Brand"
                  v-model="get_Product.productBrandId"
                  :loading="get_loadBrand"
                  outlined
                ></v-select>
                <v-textarea label="Description" v-model="get_Product.description" outlined=""></v-textarea>
              </v-col>
              <v-col md="6" sm="12" xs="12">
                <v-text-field
                  label="Price"
                  type="number"
                  v-model="get_Product.price"
                  :rules="[rules.price]"
                  outlined=""
                ></v-text-field>
                <v-text-field
                  label="Discount"
                  type="number"
                  v-model="get_Product.discount"
                  :rules="[rules.percent]"
                  outlined=""
                ></v-text-field>
                <v-switch label="save as refreshment" v-model="get_Product.isRefreshment"></v-switch>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="get_loadProduct" @click.prevent="editProduct()" color="success" depressed="">
            <v-icon>mdi-save</v-icon>
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    rules: {
      requierd: (v) => !!v || 'this field is requierd',
      price: (v) => (v > -1 && !!v) || 'invalid price',
      percent: (v) => {
        if (v != '') {
          return (v > 0 && v < 101) || 'invalid discount percent';
        }
        return true;
      },
    },
  }),
  methods: {
    ...mapActions(['GetBrands', 'GetProductById', 'GetProductCategories', 'EditProduct']),
    editProduct() {
      if (this.$refs.editForm.validate()) {
        this.EditProduct(this.get_Product);
      }
    },
  },
  computed: mapGetters([
    'get_Categories',
    'get_Product',
    'get_loadCategory',
    'get_Brands',
    'get_loadBrand',
    'get_loadProduct',
  ]),
  mounted() {
    const search = {
      text: '',
    };
    this.GetProductById(this.$route.params.id);
    this.GetBrands(search);
    this.GetProductCategories(search);
  },
};
</script>

<style></style>
