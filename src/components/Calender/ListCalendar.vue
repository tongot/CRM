<template>
  <div>
    <div class="mt-3">
      <v-card>
        <v-sheet class="d-flex pa-1">
          <v-btn icon class="ma-2" @click="Prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-select :items="['takudzwa', 'tongoona']" label="Employee" outlined class="mr-2"> </v-select>
          <v-select v-model="type" :items="types" label="Range" outlined class="mr-2"> </v-select>
          <v-select v-model="weekday" :items="weekdays" label="Range" outlined> </v-select>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <v-sheet min-height="600">
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
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getColor } from '../../../SharedFunc';
import AppointmentDisplay from './AppointmentDisplay';
export default {
  components: {
    AppointmentDisplay,
  },
  data: () => ({
    yearMonth: {
      month: '',
      year: '',
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
    events: [
      {
        name: 'Weekly Meeting',
        start: '2020-11-07 09:00',
        end: '2020-11-07 10:00',
      },
    ],
  }),
  methods: {
    ...mapActions(['GetCalendarItems']),
    EventPressed({ nativeEvent, event }) {
      this.selectedEvent = event;
      this.selectedElement = nativeEvent.target;
      this.open = true;
    },
    Prev() {
      console.log(Date.now());
      this.$refs.calendar.prev();
      console.log(this.$refs.calendar.title);
    },
    getEventColor(event) {
      if (event.color == undefined) {
        event.color = getColor();
      }
      return event.color;
    },
  },
  computed: {
    ...mapGetters(['get_CalendarItems']),
  },
  mounted() {
    var date = new Date(Date.now());
    this.yearMonth.month = date.getMonth() + 1;
    this.yearMonth.year = date.getFullYear();
    this.GetCalendarItems(this.yearMonth);
  },
};
</script>

<style>
.div-clender {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
