<template>
  <div>
    <v-card>
      <v-card-title>Appointment details</v-card-title>
      <v-card-text>
        <div>
          <AppointmentDisplay :data="data" />
        </div>
        <div>
          audit
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import AppointmentDisplay from '../Calender/AppointmentDisplay';
export default {
  name: 'DetailAppoint',
  props: ['data'],
  components: {
    AppointmentDisplay,
  },
  mounted() {},
};
</script>

<style></style>
