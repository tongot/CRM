<template>
  <div>
    <v-card flat="">
      <v-card-title>
        <date-picker @date="getDateStart" :data="{ date: dates.startDate, label: 'Start date' }"></date-picker>
        <date-picker @date="getDateEnd" :data="{ date: dates.endDate, label: 'End date' }"></date-picker>
        <v-btn depressed="" @click="getCobs()" color="primary" class="mb-5">search</v-btn>
      </v-card-title>
      <v-card-text>
        <v-list dense="">
          <v-list-item-group>
            <v-list-item
              v-for="item in get_Cobs"
              :key="item.id"
              :class="item.isRunningDate ? 'red lighten-4 ' : 'success lighten-4 '"
              :to="{ name: 'detailCob', params: { date: getDate(item.runningDate) } }"
            >
              <v-list-item-title>{{ item.runningDate | moment('YYYY-MM-DD') }}</v-list-item-title>
              <v-list-item-action>
                <v-chip small="" color="red lighten-2" class="white--text" v-if="item.isRunningDate"
                  >running date</v-chip
                >
                <v-chip small="" color="success lighten-2" class="white--text" v-if="item.isCompleted">completed</v-chip>
              </v-list-item-action>
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
    getCobs() {
      this.GetCOB(this.dates);
    },
    getDate(item) {
      return moment(item).format('YYYY-MM-DD');
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
