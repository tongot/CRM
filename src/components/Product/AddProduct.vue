<template>
  <div>
    <v-container>
      <v-card flat>
        <v-card-title>
          Add Product
        </v-card-title>
        <v-form ref="addForm">
          <v-card-text>
            <v-row>
              <v-col md="6" sm="12" xs="12">
                <v-text-field label="Name" v-model="product.name" :rules="[rules.requierd]" outlined=""></v-text-field>
                <v-text-field label="Code" v-model="product.code" :rules="[rules.requierd]" outlined=""></v-text-field>
                <v-select
                  :items="get_Categories"
                  item-value="id"
                  item-text="name"
                  :rules="[rules.requierd]"
                  label="Select Category"
                  v-model="product.productCategoryId"
                  :loading="get_loadCategory"
                  outlined
                ></v-select>
                <v-select
                  :items="get_Brands"
                  item-value="id"
                  :rules="[rules.requierd]"
                  item-text="name"
                  label="Select Brand"
                  v-model="product.productBrandId"
                  :loading="get_loadBrand"
                  outlined
                ></v-select>
                <v-textarea label="Description" v-model="product.description" outlined=""></v-textarea>
              </v-col>
              <v-col md="6" sm="12" xs="12">
                <v-text-field
                  label="Price"
                  type="number"
                  v-model="product.price"
                  :rules="[rules.price]"
                  outlined=""
                ></v-text-field>
                <v-text-field
                  label="Discount"
                  type="number"
                  v-model="product.discount"
                  :rules="[rules.percent]"
                  outlined=""
                ></v-text-field>
                <v-switch label="save as refreshment" v-model="product.isRefreshment"></v-switch>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="get_loadProduct" @click.prevent="addProduct()" color="success" depressed="">
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
    product: {
      name: '',
      code: '',
      description: '',
      productCategoryId: '',
      productBrandId: '',
      price: '',
      discount: '',
      isRefreshment: false,
    },
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
    ...mapActions(['GetBrands', 'GetProductCategories', 'AddProduct']),
    addProduct() {
      if (this.$refs.addForm.validate()) {
        this.AddProduct(this.product);
      }
    },
  },
  computed: mapGetters(['get_Categories', 'get_loadCategory', 'get_Brands', 'get_loadBrand', 'get_loadProduct']),
  mounted() {
    const search = {
      text: '',
    };
    this.GetBrands(search);
    this.GetProductCategories(search);
  },
};
</script>

<style></style>
