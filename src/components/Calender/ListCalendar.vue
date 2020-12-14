<template>
  <div>
    <div v-if="get_CalendarItems != null && !get_loadCalendar" class="mt-3">
      <v-card>
        <v-card-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-card-title>
        <v-sheet class="d-flex pa-1">
          <v-btn icon class="ma-2" @click="Prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-row>
            <v-col cols="12" md="4" xs="12" sm="12">
              <v-select
                :items="get_Employees"
                item-text="firstName"
                item-value="id"
                :loading="get_loadEmployee"
                label="Employee"
                outlined
                class="mr-2"
                v-model="yearMonth.employeeId"
                @input="getAppointments()"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="4" xs="12" sm="12">
              <v-select v-model="type" :items="types" label="Range" outlined class="mr-2"> </v-select>
            </v-col>
            <v-col cols="12" md="4" xs="12" sm="12">
              <v-select v-model="weekday" :items="weekdays" label="Range" outlined> </v-select>
            </v-col>
          </v-row>
          <v-btn icon class="ma-2" @click="Next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <div class="calendar">
          <v-sheet min-height="600" min-width="1000">
            <v-calendar
              ref="calendar"
              v-model="value"
              :weekdays="weekday"
              :type="type"
              :events="get_CalendarItems"
              :event-overlap-mode="mode"
              :event-overlap-threshold="30"
              :event-color="getEventColor"
              @click:event="EventPressed"
            ></v-calendar>
            <v-menu
              v-model="open"
              :close-on-content-click="false"
              :activator="selectedElement"
              :close-on-click="false"
              offset-x
            >
              <v-card color="grey lighten-4" width="600px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="open = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <AppointmentDisplay :data="selectedEvent" />
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="open = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </div>
      </v-card>
    </div>
    <div v-if="get_loadCalendar" class="load-calendar justify-center d-flex align-content-center">
      <v-icon size="40">
        mdi-loading mdi-spin
      </v-icon>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getColor, FullMonthsArr, HalfMonth } from '../../../SharedFunc';
import AppointmentDisplay from './AppointmentDisplay';
export default {
  components: {
    AppointmentDisplay,
  },
  data: () => ({
    yearMonth: {
      month: '',
      year: '',
      employeeId: '',
    },
    colorHit: false,
    open: false,
    selectedEvent: {},
    selectedElement: null,
    value: '',
    weekday: [0, 1, 2, 3, 4, 5, 6],
    type: 'week',
    types: ['day', 'week', 'month', '4day'],
    mode: 'stack',
    weekdays: [
      { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
      { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
    ],
    search: {
      page: 1,
      text: '',
    },
  }),
  methods: {
    ...mapActions(['GetCalendarItems', 'GetEmployees']),
    EventPressed({ nativeEvent, event }) {
      this.selectedEvent = event;
      if (event.status == 'complete') {
        this.selectedEvent.NotComplete = false;
      } else {
        this.selectedEvent.NotComplete = true;
      }
      this.selectedElement = nativeEvent.target;
      this.open = true;
    },
    Prev() {
      this.$refs.calendar.prev();
      setTimeout(() => {
        this.getAppointments();
      }, 100);
    },
    Next() {
      this.$refs.calendar.next();
      setTimeout(() => {
        this.getAppointments();
      }, 100);
    },
    getDates() {
      let m = this.$refs.calendar.title.split(' ');
      return m;
    },
    getAppointments() {
      //when date stracture is [December,2020]
      if (this.getDates.length === 2) {
        this.yearMonth.month = FullMonthsArr.indexOf(this.getDates()[0]) + 1;
        this.yearMonth.year = this.getDates()[1];
        this.GetCalendarItems({ data: this.yearMonth, toClear: true });
      }
      //when date stracture is [Nov, -, Dec, 2020]
      else if (this.getDates().length === 4) {
        const firstCall = {
          month: HalfMonth.indexOf(this.getDates()[0]) + 1,
          year: this.getDates()[3],
          employeeId: this.yearMonth.employeeId,
        };
        const secondCall = {
          month: HalfMonth.indexOf(this.getDates()[2]) + 1,
          year: this.getDates()[3],
          employeeId: this.yearMonth.employeeId,
        };
        this.GetCalendarItems({ data: firstCall, toClear: true }).then(() => {
          this.GetCalendarItems({ data: secondCall, toClear: false });
        });
      }
      //when date structure is [Dec,2020,-,Jan,2021]
      else if (this.getDates().length === 5) {
        const firstCall = {
          month: HalfMonth.indexOf(this.getDates()[0]) + 1,
          year: this.getDates()[1],
          employeeId: this.yearMonth.employeeId,
        };
        const secondCall = {
          month: HalfMonth.indexOf(this.getDates()[3]) + 1,
          year: this.getDates()[4],
          employeeId: this.yearMonth.employeeId,
        };
        this.GetCalendarItems({ data: firstCall, toClear: true }).then(() => {
          this.GetCalendarItems({ data: secondCall, toClear: false });
        });
      }
    },
    getEventColor(event) {
      if (event.color == undefined) {
        event.color = getColor();
      }
      return event.color;
    },
  },
  computed: {
    ...mapGetters(['get_CalendarItems', 'get_loadCalendar', 'get_Employees', 'get_loadEmployee']),
  },
  mounted() {
    this.GetEmployees(this.search).then(() => {
      this.get_Employees.push({ firstName: 'All', id: '' });
    });
    this.getDates();
    setTimeout(() => {
      this.getAppointments();
    }, 100);
  },
};
</script>

<style>
.div-clender {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.load-calendar {
  height: 100vh;
}
.calendar {
  min-width: 1000;
  overflow: auto;
}
</style>
