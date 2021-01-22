<template>
  <div>
    <v-dialog width="500" v-model="appointmentClash" persistent>
      <v-card>
        <v-card-title>Appointment clash </v-card-title>
        <v-card-text>
          <v-list dense>
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
          <v-btn small="" @click="btnCancel()" color="error" depressed="">
            <v-icon>mdi-cancel</v-icon>
            cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn small="" @click="btnContinue()" depressed="" color="success">
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
          <v-btn icon @click="OpenModalSelectCustomer()">
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
          <v-btn icon @click="OpenModalSelectEmployee()">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <Employees :data="true" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <div class="container d-flex justify-center">
      <v-card width="900" flat>
        <v-card-title
          >New Appointment
          <v-spacer></v-spacer>
          <v-btn icon :to="{ name: 'listCalendar' }">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-alert type="warning" v-if="errorAppoint != null">{{ errorAppoint }}</v-alert>
        <v-card-title>
          <v-btn v-if="get_Customer == null" text @click="OpenModalSelectCustomer()">
            <v-icon>mdi-plus</v-icon>
            Select customer
          </v-btn>
          <v-btn v-else text @click="OpenModalSelectCustomer()">
            {{ get_Customer.firstName + ' ' + get_Customer.lastName }}
            <v-icon right>mdi-pencil</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <div>
            <v-form ref="formAdd">
              <div class="pa-2">
                <v-card flat max-width="400">
                  <datePicker @date="getDate" :data="{ date: deal.date, label: 'Appointment date', required: true }" />
                </v-card>

                <transition-group
                  tag="ul"
                  enter-active-class="animate__animated animate__fadeInUp"
                  leave-active-class="animate__animated animate__fadeOutDown"
                >
                  <v-card
                    :disabled="service.disabled"
                    class="appointment-div row-appoint mt-2"
                    v-for="(service, index) in deal.appointments"
                    :key="service.startTime"
                  >
                    <v-row class="row-appoint">
                      <v-col class="d-flex justify-center align-center" cols="1" md="1" sm="1">
                        <v-btn @click="prevBtn(index)" class="number" color="primary" fab>
                          <v-icon left v-if="index > 0">mdi-chevron-left</v-icon>
                          <h4 class="white--text">{{ index + 1 }}</h4>
                        </v-btn>
                      </v-col>
                      <v-col cols="10" md="10" sm="10">
                        <v-row>
                          <v-col cols="12" md="6" sm="12" xs="12">
                            <v-select
                              :items="getStartTime()"
                              outlined
                              label="start time"
                              v-model="service.startTime"
                              @input="selectStartTime(index)"
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
                              v-model="service.service"
                              @input="setDuration(service)"
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
                              v-model="service.duration"
                              @input="calculateNextServiceStartTime(service)"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" md="6" sm="12" xs="12">
                            <v-btn
                              v-if="get_Employee == null && service.employee == null"
                              text
                              @click="changeEmployee(index)"
                            >
                              <v-icon>mdi-plus</v-icon>
                              Select worker
                            </v-btn>
                            <v-btn v-if="service.employee != null" text @click="changeEmployee(index)">
                              <v-icon>mdi-pencil</v-icon>
                              {{ service.employee.firstName + ' ' + service.employee.lastName }}
                            </v-btn>
                            <v-btn
                              v-if="get_Employee != null && service.employee == null"
                              text
                              @click="changeEmployee(index)"
                            >
                              {{ get_Employee.firstName + ' ' + get_Employee.lastName }}
                              <v-icon right>mdi-pencil</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col class="d-flex justify-center align-center" cols="1" md="1" sm="1">
                        <v-btn fab class="ma-2 next" @click="addNewService(index)" :loading="get_loadAppointment">
                          {{ index + 2 }}
                          <v-icon right>mdi-chevron-right</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </transition-group>
              </div>
            </v-form>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="get_loadAppointment" @click="saveAppointment()" depressed color="success">
            <v-icon>mdi-save</v-icon>
            Save appointment
            <v-chip color="error"> P{{ getTotalPrice }} </v-chip>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { StartTIme, Duration } from '../../../SharedFunc';
import Customers from '../Customer/Customers';
import Employees from '../Employee/Employees';
import datePicker from '../Shared/DatePicker';
import _ from 'lodash';
const moment = require('moment');

export default {
  components: {
    Customers,
    datePicker,
    Employees
  },
  data: () => ({
    appointmentClash: false,
    errorAppoint: null,
    totalPrice: 0,
    finishDate: '',
    nextTime: '',
    fromSave: false,
    currentIndex: '',
    deal: {
      date: '',
      customer: '',
      appointments: []
    },
    appointment: {
      startTime: '08:00',
      endTime: '',
      duration: '',
      service: '',
      employee: null,
      disabled: false,
      price: 0
    },
    modal: true,
    required: (v) => !!v || 'this field is required'
  }),
  watch: {
    get_Employee: {
      handler(val) {
        let f = _.clone(val);
        if (val != null) {
          this.deal.appointments[this.currentIndex].employee = f;
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'GetServices',
      'OpenModalSelectCustomer',
      'OpenModalSelectEmployee',
      'ClearCustomer',
      'ClearEmployee',
      'CheckAvailability',
      'AddAppointment'
    ]),

    getStartTime() {
      return StartTIme;
    },
    getDuration() {
      return Duration;
    },
    getDate(event) {
      this.deal.date = event;
    },
    getToday() {
      return moment().format('YYYY-MM-DD');
    },
    setEmployee(service) {
      service.employee = this.get_Employee;
    },
    changeEmployee(index) {
      this.OpenModalSelectEmployee();
      this.currentIndex = index;
    },
    setDuration(service) {
      let selectedService = this.get_Services.filter((item) => {
        return item.id == service.service;
      });
      console.log(selectedService[0]);
      service.duration = selectedService[0].estimateHours;
      this.totalPrice += selectedService[0].price;
      service.price = selectedService[0].price;
      this.calculateNextServiceStartTime(service);
    },
    async isAvailable(index) {
      let res = true;
      await this.CheckAvailability({ app: this.deal.appointments[index], date: this.deal.date }).then(() => {
        if (this.get_AppointmentError != null) {
          this.errorAppoint = this.get_AppointmentError;
          res = false;
        }
        if (this.get_Appointments.length > 0) {
          this.currentIndex = index;
          this.appointmentClash = true;
          res = false;
        }
      });
      return res;
    },
    addNewService(index) {
      console.log('hit');
      if (this.$refs.formAdd.validate()) {
        this.errorAppoint = null;

        if (!this.validateAppoint(index)) {
          return;
        }
        this.isAvailable(index).then((res) => {
          if (res) {
            this.deal.appointments[index].disabled = true;
            const appointment = {
              startTime: this.nextTime,
              duration: '',
              service: '',
              employee: null,
              disabled: false,
              price: 0
            };

            this.deal.appointments.push(appointment);
            this.ClearEmployee();
          } else {
            return;
          }
        });
      }
    },
    prevBtn(index) {
      if (index < 1) {
        return;
      }
      this.deal.appointments[index - 1].disabled = false;
      this.totalPrice -= this.deal.appointments[index].price;
      this.deal.appointments.splice(index, 1);
    },
    selectStartTime(index) {
      this.errorAppoint = null;
      this.calculateNextServiceStartTime(this.deal.appointments[index]);
      if (this.deal.appointments.length > 1) {
        let prevService = this.deal.appointments[index - 1];
        let currentService = this.deal.appointments[index];
        if (this.getDateTime(prevService.startTime) > this.getDateTime(currentService.startTime)) {
          let stringError = 'Time is less than start service consider making it the first service';
          this.errorAppoint = stringError;
          return stringError;
        }
      }
      return null;
    },
    validateAppoint(index) {
      if (this.get_Customer == null) {
        this.errorAppoint = 'Please select customer';
        return false;
      }
      if (this.get_Employee == null && this.deal.appointments[index].employee == null) {
        this.errorAppoint = 'Please assign employee';
        return false;
      }
      let timeError = this.selectStartTime(index);
      if (timeError != null) {
        return false;
      }
      return true;
    },
    calculateNextServiceStartTime(service) {
      const startTime = this.getDateTime(service.startTime);
      startTime.add(service.duration, 'minutes');
      this.finishDate = startTime.format('YYYY-MM-DD');
      this.nextTime = startTime.format('HH:mm');
      service.endTime = this.nextTime;
    },
    getDateTime(time) {
      return moment(`${this.deal.date} ${time}`);
    },
    saveAppointment() {
      let index = this.deal.appointments.length - 1;
      if (!this.$refs.formAdd.validate()) {
        return;
      }
      if (this.selectStartTime(index) != null) {
        return;
      }
      if (!this.validateAppoint(index)) {
        return;
      }
      if (this.deal.appointments[index].employee == null) {
        this.deal.appointments[index].employee = this.get_Employee;
      }
      this.deal.customer = this.get_Customer;

      //check availability of employee
      this.isAvailable(index).then((res) => {
        if (res) {
          this.AddAppointment(this.deal);
        } else {
          this.fromSave = true;
          return;
        }
      });
    },
    btnContinue() {
      if (this.fromSave) {
        this.deal.customer = this.get_Customer;
        this.AddAppointment(this.deal);
        this.fromSave = false;
      } else {
        this.deal.appointments[this.currentIndex].disabled = true;
        const appointment = {
          startTime: this.nextTime,
          duration: '',
          service: '',
          employee: null,
          disabled: false,
          price: 0
        };

        this.deal.appointments.push(appointment);
        this.ClearEmployee();
        this.appointmentClash = false;
      }
    },
    btnCancel() {
      this.fromSave = false;
      this.appointmentClash = false;
    }
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
      'get_loadAppointment'
    ]),
    getTotalPrice() {
      let total = 0;
      this.deal.appointments.forEach((item) => {
        total += item.price;
      });
      return total;
    }
  },

  mounted() {
    this.ClearCustomer();
    this.ClearEmployee();
    const search = {
      text: '',
      page: 1
    };
    this.GetServices(search);
    setTimeout(() => {
      this.deal.date = this.getToday();
      this.deal.appointments.push(this.appointment);
    }, 200);
  }
};
</script>

<style scoped>
.row-appoint {
  background-color: transparent;
  border-radius: 4px;
}
.appointment-div {
  position: relative;
}
.chip-price {
  right: -15px;
  top: -4px;
  position: absolute;
  z-index: 1;
}
.row-appoint {
  position: relative;
}
.number {
  position: absolute;
  left: -18px;
}
.next {
  position: absolute;
  right: -21px;
}
.container {
  width: 100%;
}
</style>
