import axios from 'axios';
import router from '../../router';
import _ from 'lodash';
const state = {
  Taxes: [],
  Tax: null,
  loadTax: false,
  errorTax: null,
};
const getters = {
  get_Taxes: (state) => state.Taxes,
  get_Tax: (state) => state.Tax,
  get_loadTax: (state) => state.loadTax,
  get_errorTax: (state) => state.errorTax,
};
const actions = {
  SetEditTax({ commit }, tax) {
    commit('set_EditTax', _.clone(tax));
  },
  async GetTaxes({ commit }) {
    state.loadTax = true;
    await axios
      .get('Tax/GetAll')
      .then((response) => {
        if (response.status === 200) {
          commit('set_Taxes', response.data.data);
        }
        state.loadTax = false;
      })
      .catch((ex) => {
        state.loadTax = false;
        alert('could not load tax ' + ex);
      });
  },
  async GetTaxForProduct({ commit }, id) {
    state.loadTax = true;
    await axios
      .get('Tax/GetTaxForProduct/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_Taxes', response.data.data);
        }
        state.loadTax = false;
      })
      .catch((ex) => {
        state.loadTax = false;
        alert('could not load tax ' + ex);
      });
  },
  async GetTaxById({ commit }, id) {
    state.loadTax = true;
    await axios
      .get('Tax/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_EditTax', response.data.data);
        }
        state.loadTax = false;
      })
      .catch((ex) => {
        state.loadTax = false;
        alert('could not load tax ' + ex);
      });
  },
  async AddTax({ state, dispatch }, tax) {
    console.log(tax);
    state.loadTax = true;
    state.errorTax = null;
    axios
      .post('Tax', {
        name: tax.name,
        rate: tax.rate,
        isGlobal: tax.isGlobal,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.push({ name: 'listTax' });
            dispatch('Notify', { text: 'Tax saved', type: 'success' });
          }
          state.loadTax = false;
        },
        (er) => {
          state.loadTax = false;
          state.errorTax = er.response.data.message;
          dispatch('Notify', { text: 'Failed to save ' + er.response.data.message, type: 'error' });
        }
      )
      .catch((ex) => {
        state.errorTax = ex;
        dispatch('Notify', { text: 'Failed to save ' + ex, type: 'error' });
      });
  },
  async AddProductToTax({ state, dispatch }, tax) {
    state.loadTax = true;
    state.errorTax = null;
    axios
      .post('Tax/AddTaxToProduct', {
        productId: tax.id,
        taxes: tax.items,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.go();
            dispatch('Notify', { text: 'Tax saved', type: 'success' });
          }
          state.loadTax = false;
        },
        (er) => {
          state.loadTax = false;
          state.errorTax = er.response.data.message;
          dispatch('Notify', { text: 'Failed to save ' + er.response.data.message, type: 'error' });
        }
      )
      .catch((ex) => {
        state.errorTax = ex;
        dispatch('Notify', { text: 'Failed to save ' + ex, type: 'error' });
      });
  },
  async EditTax({ state, dispatch }, tax) {
    state.loadTax = true;
    state.errorTax = null;
    axios
      .put('Tax', {
        id: tax.id,
        name: tax.name,
        isGlobal: tax.isGlobal,
        rate: tax.rate,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.push({ name: 'listTax', params: { id: tax.id } });
            dispatch('Notify', { text: 'Tax edited', type: 'success' });
          }
          state.loadTax = false;
        },
        (er) => {
          state.loadTax = false;
          state.errorTax = er.response.data.message;
        }
      )
      .catch((ex) => {
        state.errorTax = ex;
      });
  },
};
const mutations = {
  set_Taxes: (state, data) => (state.Taxes = data),
  set_EditTax: (state, data) => (state.Tax = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
