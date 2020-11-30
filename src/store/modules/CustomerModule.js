import axios from 'axios';
import router from '../../router';
const state = {
  Customers: [],
  Customer: null,
  loadCustomer: false,
  errorCustomer: null,
  modalSelectCustomer:false,
  CustomerSelectFrom:'',
};
const getters = {
  get_Customers: (state) => state.Customers,
  get_Customer: (state) => state.Customer,
  get_loadCustomer: (state) => state.loadCustomer,
  get_errorCustomer: (state) => state.errorCustomer,
  get_modalSelectCustomer:(state)=>state.modalSelectCustomer,
};
const actions = {
  OpenModalSelectCustomer({state},from){
    state.CustomerSelectFrom = from
    state.modalSelectCustomer= !state.modalSelectCustomer;
  },
  ClearCustomer(){
    state.Customer= null;
  },
  SetCustomer({dispatch},data){
    if(state.CustomerSelectFrom=='EditAppointment'){
      dispatch('editAppointmentCustomer',data.customer.id)
    }
    state.Customer=data.customer;
  },
  async GetCustomers({ commit },search) {
    state.loadCustomer = true;
    await axios
    .get(`Customer/GetAll?page=${search.page}&search=${search.text}`)
      .then((response) => {
        if (response.status === 200) {
          commit('set_Customers', response.data.data);
        }
        state.loadCustomer = false;
      })
      .catch((ex) => {
        state.loadCustomer = false;
        alert('could not load customer ' + ex);
      });
  },

  async GetCustomerById({ commit }, id) {
    state.loadCustomer = true;
    await axios
      .get('Customer/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_EditCustomer', response.data.data);
        }
        state.loadCustomer = false;
      })
      .catch((ex) => {
        state.loadCustomer = false;
        alert('could not load customer ' + ex);
      });
  },

  async AddCustomer({ state,dispatch }, customer) {
    state.loadCustomer = true;
    state.errorCustomer = null;
    axios
      .post('Customer', {
                firstName: customer.firstName,
               lastName: customer.lastName,
               phone: customer.phone,
               email: customer.email,
               sentNotification:customer.sentNotification,
               notes: customer.notes,
               gender: customer.gender,
               dateOfBirth: customer.dateOfBirth,
               address: customer.address,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.push({name:'listCustomer'});
            dispatch('Notify',{text:"Customer saved", type:"success"})
          }
          state.loadCustomer = false;
        },
        (er) => {
          state.loadCustomer = false;
          state.errorCustomer = er.response.data.message;
          dispatch('Notify',{text:"Error "+state.errorCustomer, type:"error"})
        }
      )
      .catch((ex) => {
        state.errorCustomer = ex;
        dispatch('Notify',{text:"Error "+ex, type:"error"})
      });
  },
  
  async EditCustomer({ state,dispatch }, customer) {
    state.Customer=null
    state.loadCustomer = true;
    state.errorCustomer = null;
    axios
      .put('Customer', {
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        email: customer.email,
        sentNotification:customer.sentNotification,
        notes: customer.notes,
        gender: customer.gender,
        dateOfBirth: customer.dateOfBirth,
        address: customer.address,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.push({ name: 'listCustomer' });
            dispatch('Notify',{text:"Customer Edited", type:"success"})
          }
          state.loadCustomer = false;
        },
        (er) => {
          state.loadCustomer = false;
          state.errorCustomer = er.response.data.message;
          dispatch('Notify',{text:"Error "+state.errorCustomer, type:"error"})
        }
      )
      .catch((ex) => {
        state.errorCustomer = ex;
        dispatch('Notify',{text:"Error "+state.errorCustomer, type:"error"})
      });
  },
};
const mutations = {
  set_Customers: (state, data) => (state.Customers = data),
  set_EditCustomer: (state, data) => (state.Customer = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
