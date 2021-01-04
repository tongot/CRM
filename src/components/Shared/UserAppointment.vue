<template>
  <div>
    <v-card flat>
      <v-card-title
        >Appointments {{ month + '/' + year }}
        <v-spacer></v-spacer>
        <v-select :items="years" class="mr-2" label="Select Year" v-model="year"></v-select>
        <v-select
          :items="getMonths()"
          item-value="number"
          item-text="name"
          label="Select Month"
          v-model="month"
          @input="getAppointments()"
        ></v-select>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :loading="get_loadCalendar"
          :headers="headers"
          :items="get_CalendarItems"
          :items-per-page="8"
          class="elevation-1"
        >
          <template v-slot:item.status="{ item }">
            <v-chip small class="mr-2" :color="getStateColor(item.status)">
              {{ item.status }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { Months, getStateColor } from '../../../SharedFunc';
const moment = require('moment');
export default {
  data: () => ({
    year: '',
    month: '',
    years: [],
    selectedAppointment: {},
    modalDetail: false,
    headers: [
      { text: 'Id', value: 'appointmentNumber' },
      { text: 'name', value: 'name' },
      { text: 'Start time', value: 'start' },
      { text: 'End time', value: 'end' },
      { text: 'Employee', value: 'employeeName' },
      { text: 'Customer', value: 'customerName' },
      { text: 'Status', value: 'status' },
    ],
  }),
  methods: {
    ...mapActions(['GetCalendarItems']),
    getMonths() {
      return Months;
    },
    getAppointments() {
      const search = {
        month: this.month,
        year: this.year,
        employeeId: this.$route.name == 'employee-appointment' ? this.$route.params.id : '',
        customerId: this.$route.name == 'customer-appointment' ? this.$route.params.id : '',
      };
      this.GetCalendarItems({ data: search, toClear: true });
    },
    getStateColor(item) {
      return getStateColor(item);
    },
    getYears() {
      let endYear = 2017;
      let startYear = Number(this.year);
      let years = [];
      years.push(String(startYear));

      for (let i = startYear; i > endYear; i--) {
        startYear--;
        years.push(String(startYear));
      }

      return years;
    },
  },
  computed: mapGetters(['get_loadCalendar', 'get_CalendarItems']),
  mounted() {
    const date = moment(new Date(Date.now()));
    this.year = moment(date.add(1, 'days')).format('YYYY');
    this.month = Number(moment(date.add(1, 'days')).format('M'));

    this.getAppointments();
    this.years = this.getYears();
  },
};
</script>
