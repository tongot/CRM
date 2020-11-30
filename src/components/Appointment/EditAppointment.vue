<template>
  <div class="container d-flex justify-center">
    <v-dialog v-if="get_Employee != null" width="500" v-model="appointmentClash" persistent>
      <v-card>
        <v-card-title>Appointment clash </v-card-title>
        <v-card-text>
          <v-list dense>
            <v-subheader>{{ get_Employee.firstName + "'s table" }}</v-subheader>
            <v-list-item-group>
              <v-list-item v-for="appointment in get_Appointments" :key="appointment.id">
                <v-list-item-title>
                  <span class="mr-5">{{ appointment.date }}</span>
                  <v-chip color="success lighten-3">{{ appointment.startTime }}</v-chip>
                  <v-icon color="success lighten-2">mdi-arrow-right</v-icon>
                  <v-chip color="success lighten-1">{{ appointment.endTime }}</v-chip>
                </v-list-item-title>
                <v-list-item-action> </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn small="" @click="appointmentClash = !appointmentClash" color="error" depressed="">
            <v-icon>mdi-cancel</v-icon>
            cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn small="" @click="postEdit()" depressed="" color="success">
            continue
            <v-icon right>mdi-chevron-double-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--select customer -->
    <v-dialog width="500" v-model="get_modalSelectCustomer" persistent>
      <v-card>
        <v-card-title
          >select customer
          <v-spacer></v-spacer>
          <v-btn icon @click="OpenModalSelectCustomer('EditAppointment')">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <Customers :data="true" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!--select employee-->
    <v-dialog width="500" v-model="get_modalSelectEmployee" persistent>
      <v-card>
        <v-card-title
          >select worker
          <v-spacer></v-spacer>
          <v-btn icon @click="OpenModalSelectEmployee('EditAppointment')">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <Employees :data="true" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card width="900" flat v-if="get_Appointment != null">
      <v-card-title
        >Edit Appointment
        <v-spacer></v-spacer>
        <v-btn icon :to="{ name: 'listAppointment' }">
          <v-icon color="error">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-alert type="warning" v-if="errorAppoint != null">{{ errorAppoint }}</v-alert>
      <v-card-title>
        <v-btn v-if="get_Customer == null" text @click="OpenModalSelectCustomer('EditAppointment')">
          <v-icon>mdi-plus</v-icon>
          Select customer
        </v-btn>
        <v-btn v-else text @click="OpenModalSelectCustomer('EditAppointment')">
          {{ get_Customer.firstName + ' ' + get_Customer.lastName }}
          <v-icon right>mdi-pencil</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <div>
          <v-form ref="formEdit">
            <div class="pa-2">
              <v-card flat max-width="400">
                <datePicker
                  @date="getDate"
                  :data="{ date: get_Appointment.date, label: 'Appointment date', required: true }"
                />
              </v-card>
              <v-card class="appointment-div row-appoint mt-2">
                <v-row class="row-appoint">
                  <v-col class="d-flex justify-center align-center" cols="1" md="1" sm="1"> </v-col>
                  <v-col cols="10" md="10" sm="10">
                    <v-row>
                      <v-col cols="12" md="6" sm="12" xs="12">
                        <v-select
                          :items="getStartTime()"
                          outlined
                          label="start time"
                          v-model="get_Appointment.startTime"
                          @input="calculateEndTime()"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" md="6" sm="12" xs="12">
                        <v-select
                          label="Select Service"
                          target="#newPolicy"
                          width="auto"
                          :items="get_Services"
                          item-value="id"
                          :loading="get_loadService"
                          :rules="[required]"
                          item-text="name"
                          outlined
                          v-model="get_Appointment.serviceId"
                          @input="changeService()"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="6" sm="12" xs="12">
                        <v-select
                          label="Duration"
                          target="#newPolicy"
                          width="auto"
                          :items="getDuration()"
                          item-value="[0]"
                          :rules="[required]"
                          item-text="[1]"
                          outlined
                          v-model="serviceDuration"
                          @input="calculateEndTime()"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6" sm="12" xs="12">
                        <v-btn v-if="get_Employee == null" text @click="OpenModalSelectEmployee('EditAppointment')">
                          <v-icon>mdi-plus</v-icon>
                          Select Employee
                        </v-btn>
                        <v-btn v-else text @click="OpenModalSelectEmployee('EditAppointment')">
                          {{ get_Employee.firstName + ' ' + get_Employee.lastName }}
                          <v-icon right>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col class="d-flex justify-center align-center" cols="1" md="1" sm="1"> </v-col>
                </v-row>
              </v-card>
            </div>
          </v-form>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="get_loadAppointment" @click="saveAppointment()" depressed color="success">
          <v-icon>mdi-save</v-icon>
          Save appointment
          <!-- <v-chip color="error" v-if="get_Services != null"> P{{ getSelectedService().price }} </v-chip> -->
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { StartTIme, Duration } from '../../../SharedFunc';
import Customers from '../Customer/Customers';
import Employees from '../Employee/Employees';
import datePicker from '../Shared/DatePicker';
//import _ from 'lodash'
const moment = require('moment');

export default {
  appointmentClash: false,
  components: {
    Customers,
    datePicker,
    Employees,
  },
  data: () => ({
    appointmentClash: false,
    errorAppoint: null,
    finishDate: '',
    serviceDuration: '',
    modal: true,
    required: (v) => !!v || 'this field is required',
  }),
  methods: {
    ...mapActions([
      'GetServices',
      'OpenModalSelectCustomer',
      'OpenModalSelectEmployee',
      'ClearCustomer',
      'ClearEmployee',
      'CheckAvailability',
      'AddAppointment',
      'GetCustomerById',
      'GetEmployeeById',
      'GetAppointmentById',
      'EditAppointment',
    ]),

    getStartTime() {
      return StartTIme;
    },
    getDuration() {
      return Duration;
    },
    getDate(event) {
      console.log(event);
      this.get_Appointment.date = event;
    },
    getToday() {
      return moment().format('YYYY-MM-DD');
    },
    setEmployee(service) {
      service.employee = this.get_SelectedEmployee;
    },
    calculateEndTime() {
      let currentTime = this.getDateTime(this.get_Appointment.startTime);
      currentTime = currentTime.add(this.serviceDuration, 'minutes');
      this.get_Appointment.endTime = moment(currentTime).format('H:mm');
    },
    changeService() {
      this.serviceDuration = this.getSelectedService().estimateHours;
      this.calculateEndTime();
    },
    async isAvailable() {
      let res = true;
      const app = {
        startTime: this.get_Appointment.startTime,
        endTime: this.get_Appointment.endTime,
        employee: this.get_Employee,
      };
      await this.CheckAvailability({ app: app, date: this.get_Appointment.date }).then(() => {
        if (this.get_AppointmentError != null) {
          this.errorAppoint = this.get_AppointmentError;
          res = false;
        }
        if (this.get_Appointments.length > 1) {
          this.appointmentClash = true;
          res = false;
        }
      });
      return res;
    },

    validateAppoint(index) {
      if (this.get_Customer == null) {
        this.errorAppoint = 'Please select customer';
        return false;
      }
      if (this.get_SelectedEmployee == null && this.deal.appointments[index].employee == null) {
        this.errorAppoint = 'Please assign employee';
        return false;
      }
      let timeError = this.selectStartTime(index);
      if (timeError != null) {
        return false;
      }
      return true;
    },
    getDateTime(time) {
      return moment(`${this.get_Appointment.date} ${time}`);
    },
    saveAppointment() {
      if (this.$refs.formEdit.validate()) {
        this.isAvailable().then((response) => {
          if (response) {
            this.postEdit();
          }
        });
      }
    },
    postEdit() {
      this.EditAppointment({ data: this.get_Appointment, from: 'appointment' });
      this.appointmentClash = false;
    },
    getSelectedService() {
      return this.get_Services.filter((item) => {
        return item.id == this.get_Appointment.serviceId;
      })[0];
    },
  },
  computed: {
    ...mapGetters([
      'get_Services',
      'get_loadService',
      'get_loadEmployee',
      'get_modalSelectCustomer',
      'get_modalSelectEmployee',
      'get_Customer',
      'get_Employee',
      'get_Appointments',
      'get_AppointmentError',
      'get_loadAppointment',
      'get_Appointment',
    ]),
  },

  mounted() {
    this.ClearEmployee();
    this.ClearCustomer();

    this.GetAppointmentById(this.$route.params.id).then(() => {
      console.log(this.get_Appointment);
      this.get_Appointment.date = moment(this.get_Appointment.date).format('YYYY-MM-DD');
      const search = {
        text: '',
        page: 1,
      };
      this.GetServices(search).then(() => {
        this.serviceDuration = this.getSelectedService().estimateHours;
      });
      this.GetEmployeeById(this.get_Appointment.employeeId);
      this.GetCustomerById(this.get_Appointment.customerId);
      this.GetCusto;
    });
  },
};
</script>

<style></style>
