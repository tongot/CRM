<template>
  <div>
    <v-dialog v-model="dialogStart" persistent width="500">
      <v-card>
        <v-card-title>
          Starting close of business
          <v-spacer></v-spacer>
          <v-btn @click="cancelStart()" icon="">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-alert type="warning" prominent icon="mdi-exclamation">
            Please type in <strong>Start COB</strong> belowe if you are sure to start cob
          </v-alert>
          <v-text-field v-model="sureText"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="startCob()" color="success" :disabled="!(sureText === 'Start COB')"> start </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogRunningDate" persistent width="500">
      <v-card>
        <v-card-title>
          Set next running date
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-alert type="error" v-if="get_cobError != null && !get_processSuccess">
            {{ get_cobError }}
          </v-alert>
          <v-form ref="addForm">
            <date-picker @date="getDate" :data="{ date: nextDate, required: true }"></date-picker>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="setRunningDate()" color="success"> Approve </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card class="items">
      <v-row>
        <v-col md="6" sm="12" xs="12" cols="12">
          <v-card flat class="d-flex justify-center">
            <v-card flat width="200">
              <v-sheet flat="">
                <v-btn @click="dialogStart = !dialogStart" depressed color="black" class="white--text">
                  <v-icon>
                    mdi-ray-start-arrow
                  </v-icon>
                  Start
                </v-btn>
              </v-sheet>
              <div class="linker"></div>
              <div class="d-flex flex-column" v-for="process in processes" :key="process.order">
                <v-sheet flat
                  ><v-badge
                    :color="!process.runnig ? 'primary' : 'success'"
                    :icon="`mdi-refresh ${process.runnig ? 'mdi-spin' : ''}`"
                    bordered=""
                    overlap=""
                    ><v-avatar :color="process.color" size="60" class="white--text">
                      <strong> {{ process.order }}</strong></v-avatar
                    >
                  </v-badge>
                  <span
                    ><strong>{{ process.item }}</strong></span
                  >
                </v-sheet>

                <div class="linker"></div>
              </div>
              <v-sheet flat="">
                <v-avatar color="black" size="20" class="ml-5 white--text"> <strong></strong></v-avatar>
                <span><strong> Finish</strong></span>
              </v-sheet>
            </v-card>
          </v-card>
        </v-col>
        <v-col md="6" sm="12" xs="12" cols="12">
          <v-card-text>
            <v-alert prominent type="error" v-if="get_cobError != null && !get_processSuccess">{{
              get_cobError
            }}</v-alert>
            <v-alert prominent icon="mdi-check" type="success" v-if="get_cobError != null && get_processSuccess">{{
              get_cobError
            }}</v-alert>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DatePicker from '../Shared/DatePicker.vue';
export default {
  components: { DatePicker },
  data: () => ({
    dialogStart: false,
    nextDate: '',
    dialogRunningDate: false,
    sureText: '',
    processes: [
      { item: 'Getting ready', order: 1, success: false, runnig: false, color: 'grey', processUrl: 'StartCob' },
      { item: 'Sales', order: 2, success: false, runnig: false, color: 'grey', processUrl: 'SalesCob' },
      { item: 'Products', order: 3, success: false, runnig: false, color: 'grey', processUrl: 'ProductCob' },
      { item: 'Employees', order: 4, success: false, runnig: false, color: 'grey', processUrl: 'EmployeeCob' },
      { item: 'Appointments', order: 5, success: false, runnig: false, color: 'grey', processUrl: 'AppointmentCob' },
      { item: 'Suppliers', order: 6, success: false, runnig: false, color: 'grey', processUrl: 'SupplierCob' },
      { item: 'Cashiers', order: 7, success: false, runnig: false, color: 'grey', processUrl: 'CashierCob' },
      { item: 'Tax', order: 8, success: false, runnig: false, color: 'grey', processUrl: 'TaxCob' },
      { item: 'Completing Cob', order: 9, success: false, runnig: false, color: 'grey', processUrl: 'CompleteCob' },
    ],
  }),
  methods: {
    ...mapActions(['StartCob', 'SetDate']),
    getDate(event) {
      this.nextDate = event;
    },
    async startCob() {
      this.dialogStart = false;
      //for to run each process required from 1 to end
      let failed = false;
      for (let i in this.processes) {
        failed = false;
        this.processStart(i);
        await this.StartCob(this.processes[i].processUrl).then(() => {
          if (this.get_processSuccess) {
            this.processSuccess(i);
          } else {
            this.processFail(i);
            failed = true;
          }
        });
        //if the previous process failed execution will stop
        if (failed) {
          break;
        }
      }
      this.dialogRunningDate = true;
    },

    processStart(order) {
      this.processes[order].runnig = true;
      this.processes[order].color = 'primary';
    },
    processSuccess(order) {
      this.processes[order].runnig = false;
      this.processes[order].success = this.get_processSuccess;
      this.processes[order].color = 'success';
    },
    processFail(order) {
      this.processes[order].runnig = false;
      this.processes[order].success = this.get_processSuccess;
      this.processes[order].color = 'error';
    },
    cancelStart() {
      this.dialogStart = !this.dialogStart;
      this.sureText = '';
    },
    setRunningDate() {
      if (this.$refs.addForm.validate()) {
        this.SetDate(this.nextDate).then(() => {
          if (this.get_cobError == null) {
            this.dialogRunningDate = false;
          }
        });
      }
    },
  },
  computed: mapGetters(['get_cobError', 'get_processSuccess']),
};
</script>

<style>
.items {
}
.linker {
  width: 5px;
  height: 50px;
  background: black;
  margin-left: 27px;
}
</style>
