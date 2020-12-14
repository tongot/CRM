<template>
  <div>
    <v-card class="items">
      <v-card-text class="d-flex flex-column">
        <v-sheet flat="">
          <v-btn depressed color="black" class="white--text">
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
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
//import axios from 'axios';
export default {
  data: () => ({
    processes: [
      { item: 'Getting ready', order: 1, success: false, runnig: false, color: 'grey', processUrl: 'StartCob' },
      { item: 'Sales', order: 2, success: false, runnig: false, color: 'grey', processUrl: 'SalesCob' },
      { item: 'Products', order: 3, success: false, runnig: false, color: 'grey', processUrl: 'ProductsCob' },
      { item: 'Employees', order: 4, success: false, runnig: false, color: 'grey', processUrl: 'EmployeeCob' },
      { item: 'Appointments', order: 5, success: false, runnig: false, color: 'grey', processUrl: 'AppointmentCob' },
      { item: 'Suppliers', order: 6, success: false, runnig: false, color: 'grey', processUrl: 'SupplierCob' },
      { item: 'Cashiers', order: 7, success: false, runnig: false, color: 'grey', processUrl: 'CashierCob' },
      { item: 'Tax', order: 8, success: false, runnig: false, color: 'grey', processUrl: 'TaxCob' },
      // { item: 'Moving Dates', order: 9, success: false, runnig: false, color: 'grey' ,processUrl:'Cob'},
    ],
  }),
  methods: {
    // StartCob() {
    //   this.processes.forEach((process) => {
    //   axios.get(process.url).then(
    //       (response) => {
    //         if (response.status === 200) {
    //             if()
    //         }
    //         state.loadCob = false;
    //       },
    //       (err) => {
    //         dispatch('Notify', { text: err.data.message, type: 'error' });
    //         state.loadCob = false;
    //       }
    //     )
    //     .catch((ex) => {
    //       dispatch('Notify', { text: ex, type: 'error' });
    //       state.loadCob = false;
    //     });
    //   });
    // },
  },
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
