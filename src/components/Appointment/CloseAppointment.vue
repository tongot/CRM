<template>
  <div>
    <v-card>
      <v-card-title>Select used items</v-card-title>
      <v-card-text>
        <v-alert type="error" v-if="error != null">{{ error }}</v-alert>
        <v-row>
          <v-col md="6" sm="12" xs="12">
            <v-form ref="addForm">
              <div v-if="data.pricingMethod == 'Minimum'">
                <v-alert type="info" v-if="priceTopay <= data.price"
                  >Price should be above minimum P {{ data.price.toFixed(2) }}</v-alert
                >
                <v-text-field
                  type="number"
                  :rules="priceValidate"
                  outlined
                  label="Actual price"
                  v-model="actualPrice"
                ></v-text-field>
              </div>
              <v-select
                label="select category"
                @input="getProduct()"
                :items="categories"
                v-model="category"
                :rules="[rules.required]"
                outlined=""
              ></v-select>
              <v-select
                label="Select the product"
                :loading="get_loadAppointment"
                :items="get_Ingredients"
                item-text="name"
                item-value="id"
                @input="selectProduct()"
                :rules="[rules.required]"
                v-model="productId"
                outlined=""
                :hint="`${maxValue}`"
              ></v-select>
              <v-text-field
                v-if="maxValue > 0"
                type="number"
                :rules="[rules.required]"
                outlined
                label="Volume"
                v-model="volume"
              ></v-text-field>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="addItem()">Add</v-btn>
            </v-card-actions>
          </v-col>
          <v-col md="6" sm="12" xs="12">
            <v-card v-if="selectedItems.length > 0">
              <v-card-title>selected items</v-card-title>
              <v-card-text>
                <v-list-item v-for="(item, index) in selectedItems" :key="item.product">
                  <v-list-item-icon>
                    <v-icon color="success" v-if="item.isRefreshment">
                      mdi-food-fork-drink
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ item.description + ' ' + item.volume }}</v-list-item-title>
                  <v-list-item-action>
                    <v-btn color="error" @click="removeItem(index)" small>
                      remove
                    </v-btn>
                  </v-list-item-action>
                  <v-divider></v-divider>
                </v-list-item>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="get_loadAppointment" @click="setStatus()">
                  <v-icon>mdi-check</v-icon>
                  Ok
                </v-btn>
              </v-card-actions>
            </v-card>
            <div v-else>
              <v-btn @click="setStatus()" color="warning">
                No Items used >>
              </v-btn>
            </div>
            <v-list> </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: ['data'],
  data: () => ({
    error: null,
    categories: ['Refreshment', 'Ingredient'],
    actualPrice: '',
    category: '',
    maxValue: '',
    productId: '',
    productName: '',
    volume: '',
    item: {
      description: '',
      isRefreshment: false,
      productId: '',
      volume: '',
    },
    selectedItems: [],
    rules: {
      required: (v) => !!v || 'this field is required',
    },
  }),
  methods: {
    ...mapActions(['GetProductsToCloseAppointment', 'ChangeAppointmentState']),
    getProduct() {
      this.GetProductsToCloseAppointment(this.category);
    },
    selectProduct() {
      this.volume = '';
      let selected = this.get_Ingredients.filter((x) => {
        return x.id == this.productId;
      })[0];
      if (typeof selected !== 'undefined') {
        this.maxValue = selected.volume;
        this.productName = selected.name;
      }
    },
    addItem() {
      this.error = null;
      let itemExist = this.selectedItems.filter((x) => {
        return x.productId == this.productId;
      })[0];
      if (typeof itemExist === 'undefined') {
        const newItem = {
          description: this.productName,
          isRefreshment: this.categories[0] == this.category ? true : false,
          productId: this.productId,
          volume: this.volume,
        };
        this.selectedItems.push(newItem);
        return;
      }
      this.error = 'Item already added';
    },
    removeItem(index) {
      this.selectedItems.splice(index, 1);
    },
    setStatus() {
      const state = {
        status: this.data.status,
        id: this.data.appointmentId,
        actualPrice: this.actualPrice,
        usedItems: this.selectedItems,
      };
      this.ChangeAppointmentState(state).then(() => {
        this.$emit('close', false);
      });
      this.selectItems = [];
      this.category = '';
      this.maxValue = '';
      this.productId = '';
      this.productName = '';
      this.volume = '';
    },
  },
  computed: {
    ...mapGetters(['get_loadAppointment', 'get_Ingredients', 'get_ItemUsed']),
    priceTopay() {
      return this.actualPrice - this.data.price;
    },
    priceValidate() {
      let errors = [];
      if (!this.actualPrice) {
        errors.push('please enter actual price');
      }
      if (this.actualPrice < this.data.price) {
        errors.push('Price lower than minimum');
      }
      return errors;
    },
  },
  mounted() {
    this.selectItems = [];
    this.category = '';
    this.maxValue = '';
    this.productId = '';
    this.productName = '';
    this.volume = '';
  },
};
</script>

<style></style>
