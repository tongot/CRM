import axios from 'axios';
const state = {
  SelectAppointments: [],
  CheckoutAppointments: [],
  totalPrice: 0,
  loadCheckout: false,
  CheckoutServices: [],
  CheckoutProducts: [],
};
const getters = {
  get_SelectAppointment: (state) => state.SelectAppointments,
  get_loadCheckout: (state) => state.loadCheckout,
  get_CheckoutAppointments: (state) => state.CheckoutAppointments,
  get_totalPrice: (state) => state.totalPrice,
  get_CheckoutProducts: (state) => state.CheckoutProducts,
};
const actions = {
  addToCheckoutProduct({ commit }, product) {
    console.log(product);
    state.totalPrice += getPrice(product.price, product.discount);

    //check for already in checkout product
    let inList = state.CheckoutProducts.filter((list) => list.id === product.id);

    if (inList.length > 0) {
      inList[0].totalPrice += getPrice(product.price, product.discount);
      inList[0].quantity += 1;
    } else {
      let newItem = {
        id: product.id,
        name: product.name,
        quantity: 1,
        promotionRate: product.discount,
        actualPrice: product.price,
        price: getPrice(product.price, product.discount),
        totalPrice: getPrice(product.price, product.discount),
      };
      commit('set_CheckoutProducts', newItem);
    }
  },
  PlusQuantity({ state }, index) {
    state.CheckoutProducts[index].totalPrice += state.CheckoutProducts[index].price;
    state.CheckoutProducts[index].quantity++;
    state.totalPrice += state.CheckoutProducts[index].price;
  },
  MinusQuantity({ state }, index) {
    state.CheckoutProducts[index].totalPrice -= state.CheckoutProducts[index].price;
    state.CheckoutProducts[index].quantity--;
    state.totalPrice -= state.CheckoutProducts[index].price;
    if (state.CheckoutProducts[index].quantity == 0) {
      state.CheckoutProducts.splice(index, 1);
    }
  },
  serviceAddTotal({ state }, services) {
    services.forEach((service) => {
      if (service.status == 'cancelled') {
        service.price = 0;
      } else {
        state.totalPrice += getPrice(service.price, service.discount);
        service.price = getPrice(service.price, service.discount);
      }
    });
  },
  clearCheckoutProduct({ state, dispatch }) {
    state.totalPrice = 0;
    state.CheckoutProducts = [];
    dispatch('clearProducts');
  },
  clearCheckout() {
    state.totalPrice = 0;
    state.CheckoutProducts = [];
    state.CheckoutAppointments = [];
    state.SelectAppointments = [];
  },
  async GetSelectAppointments({ commit }, search) {
    state.SelectAppointments = [];
    state.loadCheckout = true;
    await axios
      .get('Appointment/GetSelectAppointment/?search=' + search)
      .then((response) => {
        if (response.status === 200) {
          commit('set_SelectAppointment', response.data.data);
        }
        state.loadCheckout = false;
      })
      .catch((ex) => {
        state.loadCheckout = false;
        alert('could not load appointment ' + ex);
      });
  },
  async GetAppointmentByAppointmentNumber({ commit, dispatch }, appointmentNumber) {
    //reduce price by items removed
    state.CheckoutAppointments.forEach((service) => {
      state.totalPrice -= getPrice(service.price, service.discount);
    });

    state.CheckoutAppointments = [];
    state.loadCheckout = true;
    await axios
      .get('Appointment/GetAppointmentByAppointmentNumber/?appointmentNumber=' + appointmentNumber)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.length < 1) {
            dispatch('Notify', { text: 'No unpaid service(s)', type: 'info' });
          } else {
            commit('set_CheckoutAppointments', response.data.data);
          }
        }
        state.loadCheckout = false;
      })
      .catch((ex) => {
        state.loadCheckout = false;
        alert('could not load appointment ' + ex);
      });
  },
};
let getPrice = (price, discount) => {
  return parseFloat((price - (discount / 100) * price).toFixed(2));
};
const mutations = {
  set_SelectAppointment: (state, data) => (state.SelectAppointments = data),
  set_CheckoutAppointments: (state, data) => (state.CheckoutAppointments = data),
  set_CheckoutProducts: (state, data) => state.CheckoutProducts.push(data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
