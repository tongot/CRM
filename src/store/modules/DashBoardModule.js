import axios from 'axios';
const state = {
  ProductUsage: null,
  ProdAnalysis: null,
  loadDash: false,
};
const getters = {
  get_ProductUsage: (state) => state.ProductUsage,
  get_ProdAnalysis: (state) => state.ProdAnalysis,
  get_loadDash: (state) => state.loadDash,
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
};
const mutations = {
  set_ProductUsage: (state, data) => (state.ProductUsage = data),
  set_ProdAnalysis: (state, data) => (state.ProdAnalysis = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
