<template>
  <div>
    <!-- <v-dialog width="500" v-model="modalStocks">
      <v-card flat="">
        <v-card-title
          >Select stock with Returns
          <v-spacer></v-spacer>
          <v-icon @click="closeModalStock()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          {{ get_StocksForProd }}
          <v-list dense="">
            <v-list-item :disabled="stock.comment == 'Returns'" v-for="stock in get_StocksForProd" :key="stock.id">
              <v-avatar>
                {{ stock.quantity }}
              </v-avatar>
              <v-list-item-title>{{ stock.supplierName + ' ' + stock.date }}</v-list-item-title>
              <v-list-item-action>
                <v-btn
                  small=""
                  @click="selectStock(stock)"
                  :disabled="stock.comment == 'Returns'"
                  depressed=""
                  fab
                  color="primary"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog> -->

    <v-card>
      <v-card-title>
        Stock manager
      </v-card-title>
      <v-form ref="addForm">
        <v-alert type="error" v-if="stockError != null">
          {{ stockError }}
        </v-alert>
        <v-card-text>
          <v-select
            :items="actions"
            :rules="[rules.required]"
            label="Action"
            v-model="stock.comment"
            outlined
          ></v-select>
          <v-select
            :items="get_Suppliers"
            item-value="id"
            item-text="name"
            :rules="[rules.required]"
            label="Select Supplier"
            v-model="stock.supplierId"
            :loading="get_loadSupplier"
            outlined
            @input="getPrice()"
          ></v-select>
          <v-text-field
            label="Price"
            outlined=""
            type="number"
            :rules="[rules.price]"
            v-model="stock.purchasePrice"
          ></v-text-field>

          <div v-if="stock.comment == actions[2]">
            <v-switch v-model="stock.measureWithUnits" label="Use volume measurement"></v-switch>
            <div v-if="stock.measureWithUnits">
              <v-text-field
                label="Volume per unit"
                :rules="[rules.required, rules.price]"
                type="number"
                outlined
                v-model="stock.volume"
              ></v-text-field>
              <v-select
                :items="units"
                :rules="[rules.required]"
                label="Unit"
                v-model="stock.unityMeasure"
                outlined=""
              ></v-select>
            </div>
          </div>
          <!-- <div class="mb-5" v-if="stock.comment != actions[0]">
            <v-btn :loading="get_loadProduct" @click="getStock()" text="">
              <span v-if="supplier != ''">
                {{ supplier }}
              </span>
              <span v-else>
                Select stock
              </span>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </div> -->

          <v-text-field
            label="Quantity"
            type="number"
            outlined=""
            :rules="[rules.price]"
            v-model="stock.quantity"
          ></v-text-field>
        </v-card-text>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="get_loadProduct" @click.prevent="addStock()" color="success" depressed="">
          <v-icon>mdi-save</v-icon>
          save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getColor } from '../../../SharedFunc';

export default {
  props: ['data'],
  data: () => ({
    stockError: null,
    supplier: '',
    stockId: null,
    modalStocks: false,
    units: ['mm', 'grams'],
    actions: ['New', 'Returns', 'ToInternal'],
    stock: {
      id: null,
      quantity: '',
      purchasePrice: '',
      supplierId: '',
      comment: 'New',
      productId: '',
      volume: '',
      measureWithUnits: false,
      unityMeasure: '',
    },
    rules: {
      required: (v) => !!v || 'this field is required',
      price: (v) => (v > 0 && !!v) || 'invalid',
    },
  }),
  methods: {
    ...mapActions(['GetSuppliers', 'AddStock', 'GetStockForProduct']),
    getPrice() {
      this.stock.purchasePrice = this.get_Suppliers.filter((item) => {
        return item.id == this.stock.supplierId;
      })[0].salePrice;
    },
    addStock() {
      this.stockError = null;
      if (!this.$refs.addForm.validate()) {
        return;
      }
      this.stock.productId = this.data;
      //   if (this.stock.comment == this.actions[1] || this.stock.comment == this.actions[2]) {
      //     if (this.stockId == null) {
      //       this.stockError = 'please select stock';
      //       return;
      //     }
      //     this.stock.id = this.stockId;
      //   }
      this.AddStock(this.stock);
    },
    getStock() {
      this.GetStockForProduct(this.data).then(() => {
        this.modalStocks = true;
      });
    },
    getCol() {
      return getColor();
    },
    selectStock(stock) {
      this.supplier = stock.supplierName;
      this.stockId = stock.id;
      this.modalStocks = false;
    },
    closeModalStock() {
      this.modalStocks = !this.modalStocks;
      this.stockId = null;
      this.supplier = '';
    },
  },
  computed: mapGetters(['get_Suppliers', 'get_loadSupplier', 'get_loadProduct', 'get_StocksForProd']),
  mounted() {
    this.GetSuppliers({ text: '' });
  },
};
</script>

<style></style>
