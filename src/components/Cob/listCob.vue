<template>
  <div>
    {{ get_Cobs }}
    <v-card flat="">
      <v-card-title>
        <date-picker @date="getDateStart" :data="{ date: dates.startDate, label: 'Start date' }"></date-picker>
        <date-picker @date="getDateEnd" :data="{ date: dates.endDate, label: 'End date' }"></date-picker>
      </v-card-title>
      <v-card-text>
        <v-list dense="">
          <v-list-item-group>
            <v-list-item v-for="item in get_Cobs" :key="item.id" class="grey lighten-4">
              <v-list-item-title>{{ item.runningDate }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DatePicker from '../Shared/DatePicker.vue';
const moment = require('moment');
export default {
  components: { DatePicker },
  data: () => ({
    dates: {
      startDate: '',
      endDate: '',
    },
  }),
  methods: {
    ...mapActions(['GetCOB']),
    getDateStart(event) {
      this.dates.startDate = event;
    },
    getDateEnd(event) {
      this.dates.endDate = event;
    },
  },
  computed: mapGetters(['get_Cobs']),
  mounted() {
    const date = moment(new Date(Date.now()));

    this.dates.endDate = moment(date.add(1, 'days')).format('YYYY-MM-DD');
    this.dates.startDate = moment(date.add(-1, 'days')).format('YYYY-MM-DD');

    this.GetCOB(this.dates);
  },
};
</script>

<style></style>
