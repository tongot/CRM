import axios from 'axios';
const state = {
  ProductUsage: null,
  ProdAnalysis: null,
  loadDash: false,
  CobResults: [],
};
const getters = {
  get_ProductUsage: (state) => state.ProductUsage,
  get_ProdAnalysis: (state) => state.ProdAnalysis,
  get_loadDash: (state) => state.loadDash,
  get_CobResults: (state) => state.CobResults,
};
const actions = {
  async GetProductUsage({ commit }, id) {
    state.loadDash = true;
    await axios
      .get('Dashboard/GetProductUsage/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_ProductUsage', response.data.data);
        }
        state.loadDash = false;
      })
      .catch((ex) => {
        state.loadDash = false;
        alert('could not load product usage ' + ex);
      });
  },
  async GetProductSaleAnalysis({ commit }, id) {
    state.loadDash = true;
    await axios
      .get('Dashboard/GetProductSaleAnalysis/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_ProdAnalysis', response.data.data);
        }
        state.loadDash = false;
      })
      .catch((ex) => {
        state.loadDash = false;
        alert('could not load product usage ' + ex);
      });
  },
  async GetCobResults({ commit }, date) {
    state.CobResults = [];
    state.loadDash = true;
    await axios
      .get('Dashboard/GetCobResults/?date=' + date)
      .then((response) => {
        if (response.status === 200) {
          commit('set_CobResults', response.data.data);
        }
        state.loadDash = false;
      })
      .catch((ex) => {
        state.loadDash = false;
        alert('could not load resulting cob ' + ex);
      });
  },
};
const mutations = {
  set_ProductUsage: (state, data) => (state.ProductUsage = data),
  set_ProdAnalysis: (state, data) => (state.ProdAnalysis = data),
  set_CobResults: (state, data) => (state.CobResults = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
