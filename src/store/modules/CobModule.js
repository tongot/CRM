import axios from 'axios';

const state = {
  loadCob: false,
  Cobs: [],
};
const getters = {
  get_Cobs: (state) => state.Cobs,
  get_loadCob: (state) => state.loadCob,
};
const actions = {
  // async ClearErrors({ commit }, date) {
  //   console;
  // },

  async GetCOB({ commit, dispatch }, dates) {
    state.loadCob = true;
    await axios
      .get('cob/getCob/?startDate=' + dates.startDate + '&endDate=' + dates.endDate)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_COB', response.data.data);
          }
          state.loadCob = false;
        },
        (err) => {
          dispatch('Notify', { text: err.data.message, type: 'error' });
          state.loadCob = false;
        }
      )
      .catch((ex) => {
        dispatch('Notify', { text: ex, type: 'error' });
        state.loadCob = false;
      });
  },
};
const mutations = {
  set_COB: (state, data) => (state.Cobs = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
