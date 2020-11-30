<template>
  <div class="ma-5">
    <!-- appointment details -->

    <v-dialog v-model="modalAppointment" persistent width="1000">
      <v-card>
        <v-card-title>
          Appolintment detail
          <v-spacer></v-spacer>
          <v-btn
            icon
            depressed=""
            :loading="get_loadAppointment"
            @click="modalAppointment = !modalAppointment"
            color="error"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <AppointmentDisplay :data="appointmentDetail" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Reciept sale -->
    <v-dialog v-model="modalReceipt" persistent width="1000">
      <v-card>
        <Receipt />
        <v-card-actions>
          <v-btn depressed="" @click="modalReceipt = !modalReceipt" color="primary">
            <v-icon>mdi-arrow-left</v-icon>
            Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add products to sale -->
    <v-dialog width="1000" v-model="modalOpen" persistent>
      <v-card flat>
        <PickProduct />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed="" @click="cancelProduct()" color="error">
            <v-icon>mdi-cancel</v-icon>
            cancel
          </v-btn>
          <v-btn depressed="" @click="modalOpen = !modalOpen" color="success">
            <v-icon>mdi-check</v-icon>
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- cancel confirm -->
    <v-dialog width="500" v-model="modalCancel">
      <v-card flat>
        <v-card-title class="error--text">Cancel service</v-card-title>
        <v-card-text>
          Are you sure you want to mark this service as cancelled?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed="" color="error">
            <v-icon>mdi-cancel</v-icon>
            No
          </v-btn>
          <v-btn depressed="" color="success">
            <v-icon>mdi-check</v-icon>
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card class="div-checkpoint" elevation="7">
      <v-card-title>Check out</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" sm="12" xs="12">
            <v-card color="grey lighten-4" flat>
              <v-card-text>
                <v-card flat>
                  <v-card-text>
                    <v-form ref="searchForm" @submit.prevent="getSearch()">
                      <v-text-field
                        v-model="search"
                        :rules="[required]"
                        append-icon="mdi-magnify"
                        placeholder="search appointment"
                      >
                      </v-text-field>
                    </v-form>
                  </v-card-text>
                </v-card>
                <v-list dense v-if="get_SelectAppointment.length > 0">
                  <v-list-item-group>
                    <v-list-item
                      @click="getAppointments(item.appointmentNumber)"
                      v-for="item in get_SelectAppointment"
                      :key="item.id"
                      two-line
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{ item.appointmentNumber }}</v-list-item-title>
                        <v-list-item-subtitle>{{ item.customerName }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <div class="d-flex justify-center" v-else-if="get_loadCheckout">
                  <v-icon>mdi-loading mdi-spin</v-icon>
                </div>
                <div class="d-flex justify-center">
                  <span class="error--text">{{ result }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="9" sm="12" xs="12">
            <v-row>
              <v-col v-if="get_CheckoutAppointments.length > 0" cols="12" md="7" sm="12" xs="12">
                <v-card flat>
                  <v-alert v-if="hasIncompleteState()" outlined border="left" prominent type="warning"
                    >Some of the services on this appointment were not completed please complet them first to
                    proceed</v-alert
                  >
                  <v-card-title>Services</v-card-title>
                  <v-list>
                    <v-list-item v-for="item in get_CheckoutAppointments" :key="item.id">
                      <v-list-item-avatar>
                        <v-icon>mdi-folder-account</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.serviceName"></v-list-item-title>
                        <v-list-item-subtitle>{{ item.date | moment('MMM DD YYYY') }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-chip :color="getStateColor(item.status)" small>
                          {{ item.status }}
                        </v-chip>
                        <v-icon @click="showAppointmentDetails(item.id)" color="info" class="mt-1">mdi-eye</v-icon>
                        <span class="success--text">{{ `P ${item.price}` }}</span>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12" md="5" sm="12" xs="12">
                <v-card outlined>
                  <v-card-title
                    >Products
                    <v-spacer></v-spacer>
                    <v-btn @click="modalOpen = !modalOpen" color="info">
                      <v-icon>
                        mdi-plus
                      </v-icon>
                      Add sale product
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <saleItems />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <span class="success--text display-2">
          <u>{{ `P ${get_totalPrice.toFixed(2)}` }}</u>
        </span>
      </v-card-actions>
      <v-card-actions v-if="get_CheckoutAppointments.length > 0 || get_CheckoutProducts.length > 0">
        <v-spacer> </v-spacer>
        <v-btn depressed="" @click="clearCheckout()" large color="error">
          <v-icon>mdi-cancel</v-icon>
          Cancel
        </v-btn>
        <v-btn :disabled="hasIncompleteState()" depressed="" @click="modalReceipt = !modalReceipt" large color="success">
          <v-icon>mdi-check</v-icon>
          Paid checkout
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PickProduct from './PickProduct';
import saleItems from './SaleProductList';
import Receipt from './Receipt';
import { getStateColor } from '../../../SharedFunc';
import AppointmentDisplay from '../../components/Calender/AppointmentDisplay';

export default {
  components: {
    saleItems,
    PickProduct,
    Receipt,
    AppointmentDisplay,
  },
  data: () => ({
    modalAppointment: false,
    modalOpen: false,
    modalCancel: false,
    modalReceipt: false,
    search: '',
    appointmentDetail: {},
    result: '',
    required: (v) => !!v || '',
  }),
  methods: {
    ...mapActions([
      'GetSelectAppointments',
      'GetAppointmentByAppointmentNumber',
      'clearCheckoutProduct',
      'serviceAddTotal',
      'clearCheckout',
      'GetAppointmentByIdF',
    ]),
    hasIncompleteState() {
      let incomplete = this.get_CheckoutAppointments.filter((item) => item.status != 'complete');
      if (incomplete.length > 0) {
        return true;
      }
      return false;
    },
    getStateColor(state) {
      return getStateColor(state);
    },
    getSearch() {
      this.result = '';
      this.GetSelectAppointments(this.search).then(() => {
        if (this.get_SelectAppointment.length < 1) {
          this.result = 'No records found';
        }
      });
    },
    showAppointmentDetails(id) {
      this.GetAppointmentByIdF(id).then(() => {
        this.appointmentDetail = this.get_AppointmentDetail;
        this.modalAppointment = true;
      });
    },
    getAppointments(number) {
      this.GetAppointmentByAppointmentNumber(number).then(() => {
        this.serviceAddTotal(this.get_CheckoutAppointments);
      });
    },
    cancelProduct() {
      this.clearCheckoutProduct();
      this.modalOpen = !this.modalOpen;
    },
    cancelService() {
      this.modalCancel = !this.modalCancel;
    },
  },
  computed: mapGetters([
    'get_SelectAppointment',
    'get_loadCheckout',
    'get_CheckoutAppointments',
    'get_totalPrice',
    'get_CheckoutProducts',
    'get_AppointmentDetail',
    'get_loadAppointment',
  ]),
  mounted() {
    //this.GetSelectAppointments(this.search)
  },
};
</script>

<style>
.div-checkpoint {
  height: 82vh;
}
.div-checkpoint-container {
  background-color: red;
  height: 82vh;
}
</style>
