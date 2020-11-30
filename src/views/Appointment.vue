<template>
   <div>
       <v-toolbar>
          <v-toolbar-title>
              <v-btn :to="{name:'listAppointment'}" text large>
                  Appointments
              </v-btn>
          </v-toolbar-title>
             <v-spacer></v-spacer>
          <v-btn :to="{name:'addAppointment'}">
              <v-icon>mdi-plus</v-icon>
              New Appointment
          </v-btn>
      </v-toolbar>
      <div class="mt-1">
                 <transition mode="out-in" 
                enter-active-class="animate__animated animate__fadeInLeft animate__fast"
                leave-active-class="animate__animated animate__fadeOutRight animate__fast"
                >
                <router-view></router-view>
              </transition>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>