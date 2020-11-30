<template>
  <div>
    <v-container>
      <v-form ref="addForm">
        <v-card flat>
          <v-card-title>Add Brand</v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="6" cols="12" sm="12" xs="12">
                <v-alert type="error" v-if="get_errorBrand">{{ this.get_errorBrand }}</v-alert>
                <v-text-field outlined label="Name" :rules="[rules.required]" v-model="brand.name"></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="addBrand()" :loading="get_loadBrand" depressed="" color="success">
                    <v-icon>mdi-save</v-icon>
                    Save
                  </v-btn>
                </v-card-actions>
              </v-col>
              <v-col md="6" cols="12" sm="12" xs="12"> </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    brand: {
      name: '',
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
    ...mapActions(['AddBrand']),
    addBrand() {
      if (this.$refs.addForm.validate()) {
        this.AddBrand(this.brand);
      }
    },
  },
  computed: mapGetters(['get_loadBrand', 'get_errorBrand']),
};
</script>

<style></style>
