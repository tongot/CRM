import axios from 'axios';
import router from '../../router';
import _ from 'lodash';
const state = {
  Services: [],
  Service: null,
  loadService: false,
  errorService: null,
  EmployeesForService: [],
  pages: 1,
};
const getters = {
  get_Services: (state) => state.Services,
  get_Service: (state) => state.Service,
  get_loadService: (state) => state.loadService,
  get_errorService: (state) => state.errorService,
  get_ServicePages: (state) => state.pages,
  get_EmployeesForService: (state) => state.EmployeesForService,
};
const actions = {
  SetEditServices({ commit }, service) {
    commit('set_EditServices', _.clone(service));
  },
  async GetServices({ commit }, search) {
    state.loadService = true;
    await axios
      .get(`servicePro/GetAll?page=${search.page}&search=${search.text}`)
      .then((response) => {
        if (response.status === 200) {
          commit('set_Services', response.data);
        }
        state.loadService = false;
      })
      .catch((ex) => {
        state.loadService = false;
        alert('could not load service ' + ex);
      });
  },
  async GetServiceById({ commit }, id) {
    state.loadService = true;
    await axios
      .get('servicePro/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_EditService', response.data.data);
        }
        state.loadService = false;
      })
      .catch((ex) => {
        state.loadService = false;
        alert('could not load service ' + ex);
      });
  },

  async GetEmployeesForService({ commit }, id) {
    state.loadService = true;
    await axios
      .get('servicePro/GetEmployees/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_EmployeeForService', response.data.data);
        }
        state.loadService = false;
      })
      .catch((ex) => {
        state.loadService = false;
        alert('could not load services ' + ex);
      });
  },

  async AddService({ state }, service) {
    state.loadService = true;
    state.errorService = null;
    axios
      .post('servicePro', {
        name: service.name,
        price: service.price,
        estimateHours: service.estimateHours,
        promotionPercent: service.promotion,
        description: service.description,
        allowOnlineBooking: service.allowOnlineBooking,
        pricing: service.pricing,
        categoryId: service.categoryId,
        employees: service.employees,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.push({ name: 'serviceList' });
          }
          state.loadService = false;
        },
        (er) => {
          state.loadService = false;
          state.errorService = er.response.data.message;
        }
      )
      .catch((ex) => {
        state.errorService = ex;
      });
  },
  async EditService({ state }, service) {
    state.loadService = true;
    state.errorService = null;
    axios
      .put('servicePro', {
        id: service.id,
        name: service.name,
        price: service.price,
        estimateHours: service.estimateHours,
        promotionPercent: service.promotionPercent,
        description: service.description,
        allowOnlineBooking: service.allowOnlineBooking,
        pricing: service.pricing,
        categoryId: service.categoryId,
        employees: service.employees,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.push({ name: 'serviceList' });
          }
          state.loadService = false;
        },
        (er) => {
          state.loadService = false;
          state.errorService = er.response.data.message;
        }
      )
      .catch((ex) => {
        state.errorService = ex;
      });
  },
};
const mutations = {
  set_Services: (state, data) => ((state.Services = data.data), (state.pages = data.numberOfPages)),
  set_EditService: (state, data) => (state.Service = data),
  set_EmployeeForService: (state, data) => (state.EmployeesForService = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
