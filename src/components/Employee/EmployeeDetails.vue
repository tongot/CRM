<template>
  <div>
       <v-row class="pa-2">
        <v-col md="6" cols="12" xs="12" sm="12">
          <h4>Personal Details</h4>
          <v-divider></v-divider>
          <v-subheader>Name</v-subheader>
          <p class="pl-4">{{ get_Employee.firstName }}</p>
          <v-subheader>Surname</v-subheader>
          <p class="pl-4">{{ get_Employee.lastName }}</p>
          <v-subheader>Gender</v-subheader>
          <p class="pl-4">{{ get_Employee.gender }}</p>
          <v-subheader>Date of birth</v-subheader>
          <p class="pl-4">{{ get_Employee.dateOfBirth |Date }}</p>
          <v-subheader>Send notifications</v-subheader>
          <p class="ml-5">
               <v-chip small v-if="!get_Employee.sentNotification" color="error">No</v-chip>
        <v-chip small v-if="get_Employee.sentNotification" color="success">Yes</v-chip>
          </p>
         
        </v-col>
        <v-col md="6" cols="12" xs="12" sm="12">
          <h4>Contact</h4>
          <v-divider></v-divider>
          <v-subheader>Email</v-subheader>
          <p class="pl-4">{{ get_Employee.email }}</p>
          <v-subheader>Phone</v-subheader>
          <p class="pl-4">{{ get_Employee.phone }}</p>
          <v-subheader>Address</v-subheader>
          <address class="pl-4">{{ get_Employee.address }}</address>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

computed:mapGetters(['get_Employee'])
}
</script>

<style>

</style>