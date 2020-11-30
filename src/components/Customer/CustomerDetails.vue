<template>
  <div>
    <v-row class="pa-2">
      <v-col md="6" cols="12" xs="12" sm="12">
        <h4>Personal Details</h4>
        <v-divider></v-divider>
        <v-subheader>Name</v-subheader>
        <p class="pl-4">{{ get_Customer.firstName }}</p>
        <v-subheader>Surname</v-subheader>
        <p class="pl-4">{{ get_Customer.lastName }}</p>
        <v-subheader>Gender</v-subheader>
        <p class="pl-4">{{ get_Customer.gender }}</p>
        <v-subheader>Date of birth</v-subheader>
        <p class="pl-4">{{ get_Customer.dateOfBirth | Date }}</p>
        <v-subheader>Send notifications</v-subheader>
        <p class="ml-5">
          <v-chip small v-if="!get_Customer.sentNotification" color="error">No</v-chip>
          <v-chip small v-if="get_Customer.sentNotification" color="success">Yes</v-chip>
        </p>
      </v-col>
      <v-col md="6" cols="12" xs="12" sm="12">
        <h4>Contact</h4>
        <v-divider></v-divider>
        <v-subheader>Email</v-subheader>
        <p class="pl-4">{{ get_Customer.email }}</p>
        <v-subheader>Phone</v-subheader>
        <p class="pl-4">{{ get_Customer.phone }}</p>
        <v-subheader>Address</v-subheader>
        <address class="pl-4">{{ get_Customer.address }}</address>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: mapGetters(['get_Customer']),
};
</script>

<style></style>
