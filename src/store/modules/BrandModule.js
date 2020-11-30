import axios from 'axios';
import router from '../../router';
import _ from 'lodash';
const state = {
  Brands: [],
  Brand: null,
  loadBrand: false,
  errorBrand: null,
};
const getters = {
  get_Brands: (state) => state.Brands,
  get_Brand: (state) => state.Brand,
  get_loadBrand: (state) => state.loadBrand,
  get_errorBrand: (state) => state.errorBrand,
};
const actions = {
  SetEditBrand({ commit }, brand) {
    commit('set_EditBrand', _.clone(brand));
  },
  async GetBrands({ commit }) {
    state.loadBrand = true;
    await axios
      .get('Brand/GetAll')
      .then((response) => {
        if (response.status === 200) {
          commit('set_Brands', response.data.data);
        }
        state.loadBrand = false;
      })
      .catch((ex) => {
        state.loadBrand = false;
        alert('could not load brand ' + ex);
      });
  },
  async GetBrandById({ commit }, id) {
    state.loadBrand = true;
    await axios
      .get('Brand/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_EditBrand', response.data.data);
        }
        state.loadBrand = false;
      })
      .catch((ex) => {
        state.loadBrand = false;
        alert('could not load brand ' + ex);
      });
  },
  async AddBrand({ state, dispatch }, brand) {
    state.loadBrand = true;
    state.errorBrand = null;
    axios
      .post('Brand', {
        name: brand.name,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.push({ name: 'listBrand' });
            dispatch('Notify', { text: 'Brand saved', type: 'success' });
          }
          state.loadBrand = false;
        },
        (er) => {
          state.loadBrand = false;
          state.errorBrand = er.response.data.message;
          dispatch('Notify', { text: 'Failed to save ' + er.response.data.message, type: 'error' });
        }
      )
      .catch((ex) => {
        state.errorBrand = ex;
        dispatch('Notify', { text: 'Failed to save ' + ex, type: 'error' });
      });
  },
  async EditBrand({ state }, brand) {
    state.loadBrand = true;
    state.errorBrand = null;
    axios
      .put('Brand', {
        id: brand.id,
        name: brand.name,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.push({ name: 'detailBrand', params: { id: brand.id } });
          }
          state.loadBrand = false;
        },
        (er) => {
          state.loadBrand = false;
          state.errorBrand = er.response.data.message;
        }
      )
      .catch((ex) => {
        state.errorBrand = ex;
      });
  },
};
const mutations = {
  set_Brands: (state, data) => (state.Brands = data),
  set_EditBrand: (state, data) => (state.Brand = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
