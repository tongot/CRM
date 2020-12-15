import axios from 'axios';

const state = {
  loadCob: false,
  processSuccess: false,
  cobError: null,
  Cobs: [],
};
const getters = {
  get_Cobs: (state) => state.Cobs,
  get_loadCob: (state) => state.loadCob,
  get_cobError: (state) => state.cobError,
  get_processSuccess: (state) => state.processSuccess,
};
const actions = {
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

  // cob processes
  async StartCob({ commit }, url) {
    state.loadCob = true;
    await axios
      .get(`cob/${url}`)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_processSuccess', { error: response.data.data, status: response.data.success });
          }
          state.loadCob = false;
        },
        (err) => {
          commit('set_processSuccess', {
            error: 'Error: ' + err.response.data.message,
            status: err.response.data.success,
          });
          state.loadCob = false;
        }
      )
      .catch((ex) => {
        commit('set_processSuccess', { error: ex, status: false });
        state.loadCob = false;
      });
  },
  async SetDate({ commit }, date) {
    state.loadCob = true;
    await axios
      .get(`cob/SetDate?date=${date}`, {
        date: date,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_processSuccess', { error: response.data.message, status: response.data.success });
          }
          state.loadCob = false;
        },
        (err) => {
          commit('set_processSuccess', {
            error: 'Error: ' + err.response.error,
            status: err.response.data.success,
          });
          state.loadCob = false;
        }
      )
      .catch((ex) => {
        commit('set_processSuccess', { error: ex, status: false });
        state.loadCob = false;
      });
  },
};
const mutations = {
  set_COB: (state, data) => (state.Cobs = data),
  set_processSuccess: (state, data) => ((state.cobError = data.error), (state.processSuccess = data.status)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
