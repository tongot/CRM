<template>
  <div>
    <v-card flat v-if="get_Customer != null">
      <v-toolbar flat>
        <v-chip :to="{ name: 'customer-details' }" large size="40">
          <h4>{{ `${get_Customer.firstName} ${get_Customer.lastName}` }}</h4>
          <v-btn icon :to="{ name: 'editCustomer', params: { id: get_Customer.id } }">
            <v-icon color="primary lighten-1">mdi-pencil</v-icon>
          </v-btn>
        </v-chip>

        <v-spacer></v-spacer>
        <v-btn depresses :to="{ name: 'customer-appointment' }" text="">Appointments</v-btn>
        <v-btn depresses="" :to="{ name: 'customer-invoice' }" text="">Invoices</v-btn>
        <v-btn icon="" :to="{ name: 'listCustomer' }">
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
import Details from './CustomerDetails';
export default {
  data: () => ({
    currentDisplay: Details,
  }),
  methods: {
    ...mapActions(['GetCustomerById']),
  },
  computed: mapGetters(['get_Customer']),
  mounted() {
    this.GetCustomerById(this.$route.params.id);
  },
};
</script>

<style></style>
