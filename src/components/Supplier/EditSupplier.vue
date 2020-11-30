<template>
  <div>
    <v-container v-if="get_Supplier != null">
      <v-form ref="editForm">
        <v-card flat>
          <v-card-title>
            Edit Supplier
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="6" cols="12" sm="12" xs="12">
                <v-alert type="error" v-if="get_errorSupplier">{{ this.get_errorSupplier }}</v-alert>
                <v-text-field outlined label="Name" :rules="[rules.required]" v-model="get_Supplier.name"></v-text-field>
                <v-textarea outlined label="description" v-model="get_Supplier.description"></v-textarea>
                <v-text-field outlined label="phone" v-model="get_Supplier.phone"></v-text-field>
                <v-text-field outlined label="email" :rules="[rules.email]" v-model="get_Supplier.email"></v-text-field>
              </v-col>
              <v-col md="6" cols="12" sm="12" xs="12">
                <v-text-field outlined label="Website" v-model="get_Supplier.website"></v-text-field>
                <v-text-field outlined label="Physical addredd" v-model="get_Supplier.physicalAddress"></v-text-field>
                <v-text-field outlined label="Postal Address" v-model="get_Supplier.postalAddress"></v-text-field>
                <v-text-field outlined label="Country" v-model="get_Supplier.country"></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-text-field
              outlined
              label="Selling price"
              :rules="[rules.required]"
              type="number"
              v-model="get_Supplier.salePrice"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="editSupplier()" :loading="get_loadSupplier" depressed="" color="success">
              <v-icon>mdi-save</v-icon>
              Edit
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
    ...mapActions(['EditSupplier', 'GetSupplierById']),
    editSupplier() {
      if (this.$refs.editForm.validate()) {
        this.EditSupplier(this.get_Supplier);
      }
    },
  },
  computed: mapGetters(['get_loadSupplier', 'get_errorSupplier', 'get_Supplier']),
  mounted() {
    this.GetSupplierById(this.$route.params.id);
  },
};
</script>

<style></style>
