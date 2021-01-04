<template>
  <div class="container">
    <v-card flat class="mx-auto" max-width="1000">
      <v-card flat>
        <v-card-text>
          <v-text-field
            append-icon="mdi-magnify"
            placeholder="Customer Name"
            v-model="search.text"
            @keyup="searchField()"
          >
          </v-text-field>
        </v-card-text>
      </v-card>
      <v-list two-line>
        <v-list-item-group v-if="get_Customers != null">
          <listItem
            v-for="customer in get_Customers"
            :key="customer.id"
            :data="{
              data: customer,
              link: 'editCustomer',
              detailLink: 'customer-details',
              isSelect: data,
              from: 'customer',
            }"
          />
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import listItem from '../Shared/UserItem';
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
    ...mapActions(['GetCustomers']),
    SearchBtn() {
      this.GetCustomers(this.search);
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
        this.GetCustomers(this.search);
        return;
      }, 1000);
    },
  },
  computed: mapGetters(['get_Customers']),
  mounted() {
    this.GetCustomers(this.search);
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}
</style>
