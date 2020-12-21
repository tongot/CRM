<template>
  <div>
    <v-card flat v-if="get_Employee != null">
      <v-toolbar flat>
        <v-chip :to="{ name: 'employee-details' }" large size="40">
          <h4>{{ `${get_Employee.firstName} ${get_Employee.lastName}` }}</h4>
          <v-btn icon :loading="get_loadEmployee" :to="{ name: 'editEmployee', params: { id: get_Employee.id } }">
            <v-icon color="primary lighten-1">mdi-pencil</v-icon>
          </v-btn>
        </v-chip>

        <v-spacer></v-spacer>
        <v-btn depresses :to="{ name: 'employee-appointment' }" text="">Appointments</v-btn>
        <v-btn depresses="" text="">Invoices</v-btn>
        <v-btn icon="" :to="{ name: 'listEmployee' }">
          <v-icon color="error">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <div>
        <router-view></router-view>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({}),
  methods: {
    ...mapActions(['GetEmployeeById']),
  },
  computed: mapGetters(['get_Employee', 'get_loadEmployee']),
  mounted() {
    this.GetEmployeeById(this.$route.params.id);
  },
};
</script>

<style></style>
