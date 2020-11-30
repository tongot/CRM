import axios from 'axios';
import router from '../../router';
import _ from 'lodash';
const state = {
  Suppliers: [],
  Supplier: null,
  loadSupplier: false,
  errorSupplier: null,
};
const getters = {
  get_Suppliers: (state) => state.Suppliers,
  get_Supplier: (state) => state.Supplier,
  get_loadSupplier: (state) => state.loadSupplier,
  get_errorSupplier: (state) => state.errorSupplier,
};
const actions = {
  SetEditSupplier({ commit }, supplier) {
    commit('set_EditSupplier', _.clone(supplier));
  },
  async GetSuppliers({ commit }) {
    state.loadSupplier = true;
    await axios
      .get('Supplier/GetAll')
      .then((response) => {
        if (response.status === 200) {
          commit('set_Suppliers', response.data.data);
        }
        state.loadSupplier = false;
      })
      .catch((ex) => {
        state.loadSupplier = false;
        alert('could not load supplier ' + ex);
      });
  },
  async GetSupplierById({ commit }, id) {
    state.loadSupplier = true;
    await axios
      .get('Supplier/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_EditSupplier', response.data.data);
        }
        state.loadSupplier = false;
      })
      .catch((ex) => {
        state.loadSupplier = false;
        alert('could not load supplier ' + ex);
      });
  },
  async AddSupplier({ state, dispatch }, supplier) {
    state.loadSupplier = true;
    state.errorSupplier = null;
    axios
      .post('Supplier', {
        name: supplier.name,
        Phone: supplier.phone,
        email: supplier.email,
        physicalAddress: supplier.physicalAddress,
        postalAddress: supplier.postalAddress,
        country: supplier.country,
        description: supplier.description,
        website: supplier.website,
        salePrice: supplier.salePrice,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.push({ name: 'listSuppliers' });
            dispatch('Notify', { text: 'Supplier saved', type: 'success' });
          }
          state.loadSupplier = false;
        },
        (er) => {
          state.loadSupplier = false;
          state.errorSupplier = er.response.data.message;
          dispatch('Notify', { text: 'Failed to save ' + er.response.data.message, type: 'error' });
        }
      )
      .catch((ex) => {
        state.errorSupplier = ex;
        dispatch('Notify', { text: 'Failed to save ' + ex, type: 'error' });
      });
  },
  async EditSupplier({ state }, supplier) {
    state.loadSupplier = true;
    state.errorSupplier = null;
    axios
      .put('Supplier', {
        id: supplier.id,
        name: supplier.name,
        Phone: supplier.phone,
        email: supplier.email,
        physicalAddress: supplier.physicalAddress,
        postalAddress: supplier.postalAddress,
        country: supplier.country,
        description: supplier.description,
        website: supplier.website,
        salePrice: supplier.salePrice,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.push({ name: 'detailSupplier', params: { id: supplier.id } });
          }
          state.loadSupplier = false;
        },
        (er) => {
          state.loadSupplier = false;
          state.errorSupplier = er.response.data.message;
        }
      )
      .catch((ex) => {
        state.errorSupplier = ex;
      });
  },
};
const mutations = {
  set_Suppliers: (state, data) => (state.Suppliers = data),
  set_EditSupplier: (state, data) => (state.Supplier = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
