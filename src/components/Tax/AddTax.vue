<template>
  <div>
    <v-container>
      <v-form ref="addForm">
        <v-card flat>
          <v-card-title>Add Tax</v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="6" cols="12" sm="12" xs="12">
                <v-alert type="error" v-if="get_errorTax">{{ this.get_errorTax }}</v-alert>
                <v-text-field outlined label="Name" :rules="[rules.required]" v-model="tax.name"></v-text-field>
                <v-text-field
                  outlined
                  label="Rate"
                  type="number"
                  :rules="[rules.percent, rules.required]"
                  v-model="tax.rate"
                ></v-text-field>
                <v-switch label="Global" v-model="tax.isGlobal"></v-switch>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="addTax()" :loading="get_loadTax" depressed="" color="success">
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
    tax: {
      name: '',
      rate: '',
      isGlobal: false,
    },
    rules: {
      required: (v) => !!v || 'this field is required',
      percent: (v) => {
        if (v != '') {
          return (v > 0 && v < 101) || 'invalid discount percent';
        }
        return true;
      },
    },
  }),
  methods: {
    ...mapActions(['AddTax']),
    addTax() {
      if (this.$refs.addForm.validate()) {
        this.AddTax(this.tax);
      }
    },
  },
  computed: mapGetters(['get_loadTax', 'get_errorTax']),
};
</script>

<style></style>
