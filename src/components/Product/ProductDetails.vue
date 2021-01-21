<template>
  <div>
    <v-card v-if="get_Product != null" flat>
      <v-row v-if="get_Product != null" class="pa-2">
        <v-col md="5" cols="12" xs="12" sm="12">
          <h4>Details</h4>
          <v-divider></v-divider>
          <v-subheader>Name</v-subheader>
          <p class="pl-4">{{ get_Product.name }}</p>
          <v-subheader>Code</v-subheader>
          <p class="pl-4">{{ get_Product.code }}</p>
          <v-subheader>Description</v-subheader>
          <p class="pl-4">{{ get_Product.description }}</p>
          <v-subheader>Added on</v-subheader>
          <p class="pl-4">
            {{ get_Product.createdOn | moment('ddd DD MMM YYYY, h:mm a') }}
          </p>
        </v-col>
        <v-col v-if="get_Category != null && get_Brand != null" md="5" cols="12" xs="12" sm="12">
          <h4>Origin</h4>
          <v-divider></v-divider>
          <v-subheader>Brand</v-subheader>
          <p class="pl-4">{{ get_Brand.name }}</p>
          <v-subheader>Category</v-subheader>
          <p class="pl-4">{{ get_Category.name }}</p>
          <v-subheader>Operating Volume</v-subheader>
          <p class="pl-4">{{ get_Product.volume }}</p>
        </v-col>
        <v-col md="2" cols="12" xs="12" sm="12">
          <h4>Pricing</h4>
          <v-divider></v-divider>
          <v-subheader>Quantity available for sale</v-subheader>
          <p class="pl-4">{{ get_Product.quantity }}</p>
          <v-subheader>Price</v-subheader>
          <p class="pl-4">P {{ get_Product.price.toFixed(2) }}</p>
          <v-subheader>Discount %</v-subheader>
          <p class="pl-4">{{ get_Product.discount }}</p>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: mapGetters(['get_Product', 'get_Brand', 'get_Category'])
};
</script>

<style></style>
