<template>
  <div v-if="get_Brand != null">
    <v-card flat>
      <v-card-title>
        {{ get_Brand.name }}
        <v-spacer></v-spacer>
        <v-btn :to="{ name: 'editBrand', params: { id: get_Brand.id } }" icon="">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row class="pa-2">
          <v-col md="6" cols="12" xs="12" sm="12">
            <h4>Details</h4>
            <v-divider></v-divider>
            <v-subheader><strong>Name</strong></v-subheader>
            <p class="pl-4">{{ get_Brand.name }}</p>
          </v-col>
          <v-col md="6" cols="12" xs="12" sm="12"> </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  methods: mapActions(['GetBrandById']),
  computed: mapGetters(['get_Brand']),
  mounted() {
    this.GetBrandById(this.$route.params.id);
  },
};
</script>

<style></style>
