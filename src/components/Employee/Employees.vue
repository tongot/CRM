<template>
  <div class="container">
    <v-card flat class="mx-auto" max-width="1000">
      <v-card flat>
        <v-card-text>
          <v-text-field
            append-icon="mdi-magnify"
            placeholder="Employee Name"
            v-model="search.text"
            @keyup="searchField()"
          >
          </v-text-field>
        </v-card-text>
      </v-card>
      <v-list two-line>
        <v-list-item-group v-if="get_Employees != null">
          <div v-if="get_Employees.length > 0">
            <listItem
              v-for="employee in get_Employees"
              :key="employee.id"
              :data="{
                data: employee,
                link: 'editEmployee',
                detailLink: 'detailEmployee',
                isSelect: data,
                from: 'employee',
              }"
            />
          </div>
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
    ...mapActions(['GetEmployees']),
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
        this.GetEmployees(this.search);
        return;
      }, 1000);
    },
  },
  computed: mapGetters(['get_Employees']),
  mounted() {
    this.GetEmployees(this.search);
  },
};
</script>

<style>
.container {
  width: 100%;
}
</style>
