<template>
  <div class="container">
    <v-card flat class="mx-auto" max-width="1000">
      <v-card flat>
        <v-card-text>
          <v-text-field
            append-icon="mdi-magnify"
            placeholder="search key word"
            v-model="search.text"
            @keyup="searchField()"
          >
          </v-text-field>
        </v-card-text>
      </v-card>

      <div>
        <v-data-table
          :loading="get_loadService"
          :headers="headers"
          :items="get_Services"
          hide-default-footer
          class="elevation-1 mt-3"
        >
          <template v-slot:item.actions="{ item }">
            <div class="d-flex">
              <v-btn :to="{ name: 'editService', params: { id: item.id } }" small icon="">
                <v-icon small>
                  mdi-eye
                </v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </div>
      <div>
        <v-pagination v-model="search.page" :length="get_ServicePages" @input="SearchBtn()" circle></v-pagination>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    search: {
      page: 1,
      text: ''
    },
    headers: [
      { text: 'name', value: 'name' },
      { text: 'pricing', value: 'pricing' },
      { text: 'Estimate duration', value: 'estimateHours' },
      { text: 'Price', value: 'price' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  methods: {
    ...mapActions(['GetServices']),
    SearchBtn() {
      this.GetServices(this.search);
    },
    searchField() {
      if (this.search.text.length >= 3) {
        this.searchFunc();
      }
      if (this.search.text.length == '') {
        this.searchFunc();
      }
    },
    searchFunc() {
      setTimeout(() => {
        this.search.page = 1;
        this.GetServices(this.search);
        return;
      }, 1000);
    }
  },
  computed: mapGetters(['get_Services', 'get_ServicePages', 'get_loadService']),
  mounted() {
    this.GetServices({ page: 1, text: '' });
  }
};
</script>

<style scoped>
.container {
  width: 100%;
}
</style>
