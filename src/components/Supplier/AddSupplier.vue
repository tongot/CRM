<template>
  <div>
    <v-container>
      <v-form ref="addForm">
        <v-card flat>
          <v-card-title>Add Supplier</v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="6" cols="12" sm="12" xs="12">
                <v-alert type="error" v-if="get_errorSupplier">{{ this.get_errorSupplier }}</v-alert>
                <v-text-field outlined label="Name" :rules="[rules.required]" v-model="supplier.name"></v-text-field>
                <v-textarea outlined label="description" v-model="supplier.description"></v-textarea>
                <v-text-field outlined label="phone" v-model="supplier.phone"></v-text-field>
                <v-text-field outlined label="email" :rules="[rules.email]" v-model="supplier.email"></v-text-field>
              </v-col>
              <v-col md="6" cols="12" sm="12" xs="12">
                <v-text-field outlined label="Website" v-model="supplier.website"></v-text-field>
                <v-text-field outlined label="Physical addredd" v-model="supplier.physicalAddress"></v-text-field>
                <v-text-field outlined label="Postal Address" v-model="supplier.postalAddress"></v-text-field>
                <v-text-field outlined label="Country" v-model="supplier.country"></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-text-field
              outlined
              label="Selling price"
              :rules="[rules.required]"
              type="number"
              v-model="supplier.salePrice"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="addSupplier()" :loading="get_loadSupplier" depressed="" color="success">
              <v-icon>mdi-save</v-icon>
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    supplier: {
      name: '',
      description: '',
      phone: '',
      email: '',

      website: '',
      physicalAddress: '',
      postalAddress: '',
      country: '',

      salePrice: '',
    },
    rules: {
      required: (v) => !!v || 'this field is required',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value != '') {
          return pattern.test(value) || 'Invalid e-mail.';
        }
        return true;
      },
    },
  }),
  methods: {
    ...mapActions(['AddSupplier']),
    addSupplier() {
      if (this.$refs.addForm.validate()) {
        this.AddSupplier(this.supplier);
      }
    },
  },
  computed: mapGetters(['get_loadSupplier', 'get_errorSupplier']),
};
</script>

<style></style>
