import axios from 'axios'
const state = {
    calenderItems:[],
}
const getters = {
    get_CalendarItems:(state)=>state.calenderItems,
}
const actions = {
    async GetCalendarItems({ commit }, date) {
        state.loadCustomer = true;
        await axios
          .get('Appointment/Calendar?month=' + date.month+'&year='+date.year)
          .then((response) => {
            if (response.status === 200) {
              commit('set_CalendarItems', response.data.data);
            }
            state.loadCustomer = false;
          })
          .catch((ex) => {
            state.loadCustomer = false;
            alert('could not load calendar ' + ex);
          });
      },
}
const mutations = {
    set_CalendarItems:(state,data)=>state.calenderItems= data,
}
export default{
    state,
    getters,
    actions,
    mutations
}