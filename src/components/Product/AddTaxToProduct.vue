<template>
  <div v-if="get_Taxes != null">
    <v-card flat="">
      <v-card-text>
        <v-list>
          <v-list-item v-for="tax in get_Taxes" :key="tax.id">
            <v-list-item-avatar>
              <v-avatar size="40" class="white--text" color="primary">{{ tax.rate }}</v-avatar>
            </v-list-item-avatar>
            <v-list-item-title>
              {{ tax.name }}
            </v-list-item-title>
            <v-list-item-action>
              <v-checkbox v-model="tax.isSelected"></v-checkbox>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed @click="addToTax()" color="success">
          <v-icon left>mdi-content-save</v-icon>
          save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: ['data'],
  data: () => ({
    prodToTax: {
      productIds: [],
      priceAfterTax: '',
    },
  }),
  methods: {
    ...mapActions(['GetTaxForProduct', 'AddProductToTax']),
    addToTax() {
      this.AddProductToTax({ items: this.get_Taxes, id: this.data.id });
    },
  },
  computed: mapGetters(['get_loadTax', 'get_Taxes']),
};
</script>

<style></style>
