<template>
  <div>
    <div class="container">
      <v-card flat class="mx-auto" max-width="1000">
        <v-card flat>
          <v-card-text>
            <v-text-field
              append-icon="mdi-magnify"
              placeholder="Supplier Name"
              v-model="search.text"
              @keyup="searchField()"
            >
            </v-text-field>
          </v-card-text>
        </v-card>
        <span v-for="item in get_Suppliers" :key="item.id">
          <listItem :data="{ item: item, url: 'detailSupplier' }" />
        </span>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import listItem from '../Shared/SupplierBrandItem';
export default {
  props: ['data'],
  data: () => ({
    search: {
      page: 1,
      text: '',
    },
  }),
  components: {
    listItem,
  },
  methods: {
    ...mapActions(['GetSuppliers']),
    SearchBtn() {
      this.GetSuppliers(this.search);
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
        this.GetSuppliers(this.search);
        return;
      }, 1000);
    },
  },
  computed: mapGetters(['get_Suppliers']),
  mounted() {
    this.GetSuppliers(this.search);
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}
</style>
