<template>
  <div v-if="get_Supplier != null">
    <v-card flat>
      <v-card-title>
        {{ get_Supplier.name }}
        <v-spacer></v-spacer>
        <v-btn :to="{ name: 'editSupplier', params: { id: get_Supplier.id } }" icon="">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row class="pa-2">
          <v-col md="6" cols="12" xs="12" sm="12">
            <h4>Details</h4>
            <v-divider></v-divider>
            <v-subheader><strong>Name</strong></v-subheader>
            <p class="pl-4">{{ get_Supplier.name }}</p>
            <v-subheader><strong>Description</strong> </v-subheader>
            <p class="pl-4">{{ get_Supplier.description }}</p>
            <v-subheader><strong>Salling price</strong> </v-subheader>
            <p class="pl-4">{{ get_Supplier.salePrice }}</p>
            <v-subheader><strong>Email</strong> </v-subheader>
            <p class="pl-4">{{ get_Supplier.email }}</p>
          </v-col>
          <v-col md="6" cols="12" xs="12" sm="12">
            <h4>Contact</h4>
            <v-divider></v-divider>
            <v-subheader><strong>Phone</strong> </v-subheader>
            <p class="pl-4">{{ get_Supplier.phone }}</p>
            <v-subheader><strong>Physical Address</strong> </v-subheader>
            <p class="pl-4">{{ get_Supplier.physicalAddress }}</p>
            <v-subheader> <strong>Postal Address</strong> </v-subheader>
            <address class="pl-4">{{ get_Supplier.postalAddress }}</address>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  methods: mapActions(['GetSupplierById']),
  computed: mapGetters(['get_Supplier']),
  mounted() {
    this.GetSupplierById(this.$route.params.id);
  },
};
</script>

<style></style>
