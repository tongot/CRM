import Vue from 'vue';
import Vuex from 'vuex';
import accounts from './modules/AccountModule';
import branches from './modules/BranchesModule';
import service from './modules/ServiceModule';
//import cart from './modules/CartModule';
import customer from './modules/CustomerModule';
import employee from './modules/EmployeeModule';
import category from './modules/CategoryModule';
import calender from './modules/CalendarModule';
import appointment from './modules/AppointmentModule';
import supplier from './modules/SupplierModule';
import brand from './modules/BrandModule';
import product from './modules/ProductModule';
import checkout from './modules/CheckoutModule';
import invoice from './modules/InvoicingModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackBar: {
      show: false,
      color: '',
      text: '',
      icon: '',
    },
  },
  getters: {
    get_SnackBar: (state) => state.snackBar,
  },
  mutations: {},
  actions: {
    Notify({ state }, snack) {
      if (snack.type == 'error') {
        state.snackBar.color = 'error';
        state.snackBar.icon = 'mdi-close-circle-outline';
      }
      if (snack.type == 'success') {
        state.snackBar.color = 'success';
        state.snackBar.icon = 'mdi-checkbox-marked-circle-outline';
      }
      state.snackBar.show = true;
      state.snackBar.text = snack.text;
    },
  },
  modules: {
    accounts,
    brand,
    branches,
    service,
    //cart,
    customer,
    employee,
    category,
    appointment,
    calender,
    product,
    supplier,
    checkout,
    invoice,
  },
});
