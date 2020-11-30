import axios from 'axios';
import router from '../../router';

const state = {
  Invoice: null,
  Invoices: [],
  loadInvoice: false,
};
const getters = {
  get_Invoice: (state) => state.Invoice,
  get_loadInvoice: (state) => state.loadInvoice,
  get_Invoices: (state) => state.Invoices,
};
const actions = {
  async AddInvoice({ state, dispatch }, invoice) {
    console.log(invoice);
    state.loadInvoice = true;
    let products = [];
    let services = [];

    //add products to list
    if (invoice.products.length > 0) {
      invoice.products.forEach((item) => {
        const prod = {
          productId: item.id,
          discount: item.promotionRate,
          actualAmountPaid: item.price,
          quantity: item.quantity,
        };
        products.push(prod);
      });
    }

    //add service to list
    if (invoice.services.length > 0) {
      invoice.services.forEach((item) => {
        const prod = {
          serviceId: item.serviceId,
          discount: item.discount,
          actualAmountPaid: item.price,
          employeeId: item.employeeId,
          appointmentId: item.id,
        };
        services.push(prod);
      });
    }

    console.log(services);
    console.log(products);

    await axios
      .post('Invoicing', {
        customerId: invoice.customerId,
        totalAmount: invoice.totalAmount,
        appointmentNumber: invoice.appointmentNumber,
        actualAmountReceived: invoice.actualAmountPaid,
        status: 'Paid',
        totalServices: services.length,
        totalProducts: products.length,
        products: products,
        services: services,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            dispatch('Notify', { text: 'Invoice Processed', type: 'success' });
            router.go();
          }
          state.loadInvoice = false;
        },
        (e) => {
          dispatch('Notify', { text: `Failed ${e.response.data.message}`, type: 'error' });
        }
      )
      .catch((ex) => {
        dispatch('Notify', { text: `Failed ${ex}`, type: 'error' });
      });
  },
};
const mutations = {};
export default {
  state,
  getters,
  actions,
  mutations,
};
