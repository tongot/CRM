<template>
  <div>
      <v-card flat v-if="get_Employee!=null">
          <v-toolbar flat>
                  <v-chip @click="currentDisplay='Details'" large size="40">
                      <h4>{{`${get_Employee.firstName} ${get_Employee.lastName}`}}</h4>
                       <v-btn icon :to="{name:'editEmployee',params:{id:get_Employee.id}}">
                        <v-icon  color="primary lighten-1">mdi-pencil</v-icon>
                    </v-btn>
                  </v-chip>
                  
              <v-spacer></v-spacer>
                  <v-btn depresses @click="currentDisplay='Appointments'" text="">Appointments</v-btn>
                   <v-btn depresses="" text="">Products</v-btn>
                    <v-btn depresses="" text="">Invoices</v-btn>
                  <v-btn icon="" :to="{name:'listEmployee'}">
                      <v-icon color="error">mdi-close</v-icon>
                  </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <div>
              <div :is="currentDisplay"></div>
          </div>
      </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Details from './EmployeeDetails'
import Appointments from '../Appointment/AppointmentItem'
export default {
    components:{
        Details,
        Appointments
    },
    data:()=>({
        currentDisplay:Details
    }),
methods:{
    ...mapActions(['GetEmployeeById']),

},
computed:mapGetters(['get_Employee']),
mounted(){
    this.GetEmployeeById(this.$route.params.id)
}
}
</script>

<style>

</style>