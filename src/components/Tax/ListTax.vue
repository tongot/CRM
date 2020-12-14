<template>
  <div>
    <v-data-table
      :loading="get_loadTax"
      :headers="headers"
      :items="get_Taxes"
      hide-default-footer
      class="elevation-1 mt-3"
    >
      <template v-slot:item.isGlobal="{ item }">
        <v-chip small="" v-if="item.isGlobal" color="red">Yes</v-chip>
        <v-chip small="" v-else class="white--text" color="success">No</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex">
          <v-btn :to="{ name: 'editTax', params: { id: item.id } }" small icon="">
            <v-icon small>
              mdi-pencil
            </v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Rate', value: 'rate' },
      { text: 'Is Global', value: 'isGlobal' },
      { text: '', value: 'actions' },
    ],
  }),
  methods: {
    ...mapActions(['GetTaxes']),
  },
  computed: mapGetters(['get_loadTax', 'get_Taxes']),
  mounted() {
    this.GetTaxes();
  },
};
</script>

<style></style>
