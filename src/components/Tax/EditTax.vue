<template>
  <div>
    <v-container v-if="get_Tax != null">
      <v-form ref="editForm">
        <v-card flat>
          <v-card-title
            >Edit Tax
            <v-spacer></v-spacer>
            <v-btn icon color="red" :to="{ name: 'listTax' }">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col md="6" cols="12" sm="12" xs="12">
                <v-alert type="error" v-if="get_errorTax">{{ this.get_errorTax }}</v-alert>
                <v-text-field outlined label="Name" :rules="[rules.required]" v-model="get_Tax.name"></v-text-field>
                <v-text-field
                  outlined
                  label="Rate"
                  type="number"
                  :rules="[rules.percent, rules.required]"
                  v-model="get_Tax.rate"
                ></v-text-field>
                <v-switch label="Global" v-model="get_Tax.isGlobal"></v-switch>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="editTax()" :loading="get_loadTax" depressed="" color="success">
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
    ...mapActions(['EditTax', 'GetTaxById']),
    editTax() {
      if (this.$refs.editForm.validate()) {
        this.EditTax(this.get_Tax);
      }
    },
  },
  computed: mapGetters(['get_loadTax', 'get_errorTax', 'get_Tax']),
  mounted() {
    this.GetTaxById(this.$route.params.id);
  },
};
</script>

<style></style>
