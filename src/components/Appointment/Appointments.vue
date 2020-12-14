<template>
  <div class="container">
    <v-dialog v-model="modalDettail" width="1200">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-icon @click="closeModalDetail()">
            mdi-close
          </v-icon>
        </v-card-title>
        <AppointmentDetail :data="selectedAppointment" />
      </v-card>
    </v-dialog>
    <v-container>
      <v-row>
        <v-col md="2" sm="12" cols="12" xs="12">
          <v-select :items="states" v-model="search.status" outlined label="Status" append-icon="mdi-chart-bubble">
          </v-select>
        </v-col>
        <v-col md="2" sm="12" cols="12" xs="12">
          <v-select
            :items="get_Employees"
            v-model="search.employee"
            label="Employee"
            outlined
            item-text="lastName"
            item-value="id"
            loading="get_loadEmployee"
            append-icon="mdi-account-check"
          >
          </v-select>
        </v-col>
        <v-col md="2" sm="12" cols="12" xs="12">
          <datePicker @date="getDateS" :data="{ date: search.startDate, label: 'Start date' }" />
        </v-col>
        <v-col md="2" sm="12" cols="12" xs="12">
          <datePicker @date="getDateE" :data="{ date: search.endDate, label: 'End date' }" />
        </v-col>
        <v-col md="2" sm="12" cols="12" xs="12">
          <v-select
            :items="get_Services"
            v-model="search.service"
            label="Service"
            item-text="name"
            item-value="id"
            outlined
            append-icon="mdi-chair-school"
            loading="get_loadService"
          >
          </v-select>
        </v-col>
        <v-col md="2" sm="12" cols="12" xs="12">
          <v-btn @click="filter()" depressed="" color="primary" block="">
            <v-icon>mdi-filter-outline</v-icon>
            filter
          </v-btn>
          <v-btn @click="clearFilters()" depressed="" class="mt-1" block="">
            <v-icon>mdi-filter-remove-outline</v-icon>
            clear filter
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table :headers="headers" :items="get_AppointmentsF" hide-default-footer class="elevation-1">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="details(item)">
            mdi-eye
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppointmentDetail from './AppointmentDetails';
import datePicker from '../Shared/DatePicker';
const moment = require('moment');

export default {
  components: {
    AppointmentDetail,
    datePicker,
  },
  data: () => ({
    selectedAppointment: {},
    modalDettail: false,
    states: ['all', 'complete', 'arrived', 'start', 'cancelled', 'new'],
    search: {
      startDate: '',
      endDate: '',
      service: '',
      employee: '',
      status: 'all',
    },
    headers: [
      { text: 'name', value: 'name' },
      { text: 'Start time', value: 'start' },
      { text: 'End time', value: 'end' },
      { text: 'Employee', value: 'employeeName' },
      { text: 'Customer', value: 'customerName' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),

  methods: {
    ...mapActions(['GetServices', 'GetEmployees', 'GetAppointmentsF']),
    clearFilters() {
      this.search.startDate = '';
      this.search.endDate = '';
      this.search.service = '';
      this.search.employee = '';
      this.search.status = 'all';
      this.filter();
    },
    getDateS(event) {
      this.search.startDate = event;
    },
    getDateE(event) {
      this.search.endDate = event;
    },
    filter() {
      this.search.status = this.search.status == 'all' ? (this.search.status = '') : this.search.status;
      this.GetAppointmentsF(this.search);
    },
    details(item) {
      this.selectedAppointment = item;
      if (item.status == this.states[1]) {
        this.selectedAppointment.NotComplete = false;
      } else {
        this.selectedAppointment.NotComplete = true;
      }
      this.modalDettail = true;
    },
    closeModalDetail() {
      this.modalDettail = false;
    },
  },
  computed: mapGetters([
    'get_Services',
    'get_ServicePages',
    'get_loadService',
    'get_Employees',
    'get_loadEmployee',
    'get_AppointmentsF',
    'get_loadAppointment',
  ]),
  mounted() {
    this.GetServices({ page: 1, text: '' });
    this.GetEmployees({ page: 1, text: '' });
    let date = moment(new Date(Date.now())).format('YYYY-MM-DD');

    this.search.startDate = date;
    this.search.endDate = date;

    this.filter();
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}
.replace {
  height: 100%;
  width: 100%;
}
</style>
