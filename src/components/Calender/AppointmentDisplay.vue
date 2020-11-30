<template>
  <div>
    <v-dialog width="1000" v-model="dialogCloseApp" persistent>
      <v-card>
        <TakeCloseDetail @close="closeModal" :data="data" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancelComplete()">
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="d-flex justify-space-between">
      <h4>Appointment ({{ data.appointmentNumber }})</h4>
      <v-chip small :color="getStateColor(data.status)">{{ data.status }}</v-chip>
    </div>
    <v-card class="mt-1" outlined>
      <v-card outlined>
        <v-card-text>
          <v-select
            :disabled="checkRouter()"
            :loading="get_loadAppointment"
            label="change status"
            outlined
            :items="states"
            v-model="data.status"
            @input="changeState()"
          >
          </v-select>
        </v-card-text>
      </v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" sm="12" xs="12">
            <v-subheader><strong>Customer:</strong></v-subheader>
            <p class="pl-4">
              <router-link :to="{ name: 'detailCustomer', params: { id: data.customerId } }">{{
                data.customerName
              }}</router-link>
            </p>
            <v-subheader> <strong> Assignee:</strong></v-subheader>
            <p class="pl-4">
              <span>
                <router-link :to="{ name: 'detailEmployee', params: { id: data.employeeId } }">
                  {{ data.employeeName }}
                </router-link>
              </span>
            </p>
            <v-subheader> <strong> Booked by:</strong></v-subheader>
            <v-card :loading="get_loadAppointment" flat>
              <p class="pl-4" v-if="get_Appointer != null">{{ `${get_Appointer.name} ${get_Appointer.surname}` }}</p>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" sm="12" xs="12">
            <v-subheader><strong>Time:</strong> </v-subheader>
            <v-chip> {{ data.start | moment('ddd, MM, h:mm a') }} to {{ data.end | moment('h:mm a') }} </v-chip>
            <v-subheader> <strong> Booked on:</strong></v-subheader>
            <p class="pl-4">{{ data.bookedOn | moment('dddd, MMMM Do YYYY, h:mm:ss a') }}</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="!checkRouter()"
          depressed=""
          color="success"
          :to="{ name: 'editAppointment', params: { id: data.appointmentId } }"
          small=""
        >
          <v-icon>mdi-save</v-icon>
          Edit
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getStateColor } from '../../../SharedFunc';
import TakeCloseDetail from '../Appointment/CloseAppointment';
export default {
  props: ['data'],
  components: {
    TakeCloseDetail,
  },
  data: () => ({
    dialogCloseApp: false,
    states: ['new', 'arrived', 'start', 'complete', 'cancelled'],
  }),
  methods: {
    ...mapActions(['GetAppointerById', 'OpenModalSelectEmployee', 'ClearEmployee', 'ChangeAppointmentState']),
    getStateColor(state) {
      return getStateColor(state);
    },
    changeState() {
      if (this.data.status == this.states[3]) {
        this.dialogCloseApp = true;
        return;
      }
      this.setState();
    },
    setState() {
      const state = { status: this.data.status, id: this.data.appointmentId, usedItems: [] };
      this.ChangeAppointmentState(state);
    },
    cancelComplete() {
      this.$router.go();
    },
    closeModal(event) {
      this.dialogCloseApp = event;
    },
    checkRouter() {
      if (this.$route.name == 'checkout') {
        return true;
      }
      return false;
    },
  },
  computed: mapGetters(['get_Appointer', 'get_loadAppointment', 'get_modalSelectEmployee']),
  mounted() {
    this.ClearEmployee();
    this.GetAppointerById(this.data.appointedBy);
  },
};
</script>

<style></style>
