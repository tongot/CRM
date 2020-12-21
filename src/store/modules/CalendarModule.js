import axios from 'axios';
const state = {
  calenderItems: [],
  loadCalendar: false,
};
const getters = {
  get_CalendarItems: (state) => state.calenderItems,
  get_loadCalendar: (state) => state.loadCalendar,
};
const actions = {
  async GetCalendarItems({ commit }, dates) {
    state.loadCalendar = true;

    //check need be to clear the current calendar data for new data
    if (dates.toClear) {
      state.calenderItems = [];
    }
    await axios
      .get(
        'Appointment/Calendar?month=' +
          dates.data.month +
          '&year=' +
          dates.data.year +
          '&employeeId=' +
          dates.data.employeeId
      )
      .then((response) => {
        if (response.status === 200) {
          commit('set_CalendarItems', response.data.data);
        }
        state.loadCalendar = false;
      })
      .catch((ex) => {
        state.loadCalendar = false;
        alert('could not load calendar ' + ex);
      });
  },
};
const mutations = {
  set_CalendarItems: (state, data) =>
    data.forEach((item) => {
      state.calenderItems.push(item);
    }),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
