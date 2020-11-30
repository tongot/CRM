import axios from 'axios';
import router from '../../router';
const state = {
  Employees: [],
  Employee: null,
  loadEmployee: false,
  errorEmployee: null,
  modalSelectEmployee: false,
  EmployeeSelectFrom: '',
};
const getters = {
  get_Employee: (state) => state.Employee,
  get_Employees: (state) => state.Employees,
  get_loadEmployee: (state) => state.loadEmployee,
  get_errorEmployee: (state) => state.errorEmployee,
  get_modalSelectEmployee: (state) => state.modalSelectEmployee,
};
const actions = {
  OpenModalSelectEmployee({ state }, from) {
    state.modalSelectEmployee = !state.modalSelectEmployee;
    state.EmployeeSelectFrom = from;
  },
  ClearEmployee() {
    state.Employee = null;
  },
  SetEmployee({ dispatch }, data) {
    if (state.EmployeeSelectFrom == 'EditAppointment') {
      dispatch('editAppointmentEmployee', data.employee.id);
    }
    state.Employee = data.employee;
  },
  async GetEmployees({ commit }, search) {
    state.loadEmployee = true;
    await axios
      .get(`Employee/GetAll?page=${search.page}&search=${search.text}`)
      .then((response) => {
        if (response.status === 200) {
          commit('set_Employees', response.data.data);
        }
        state.loadEmployee = false;
      })
      .catch((ex) => {
        state.loadEmployee = false;
        alert('could not load employee ' + ex);
      });
  },

  async GetEmployeeById({ commit }, id) {
    state.loadEmployee = true;
    await axios
      .get('Employee/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_EditEmployee', response.data.data);
        }
        state.loadEmployee = false;
      })
      .catch((ex) => {
        state.loadEmployee = false;
        alert('could not load employee ' + ex);
      });
  },

  async AddEmployee({ state, dispatch }, employee) {
    state.loadEmployee = true;
    state.errorEmployee = null;
    axios
      .post('Employee', {
        jobTitle: employee.jobTitle,
        firstName: employee.firstName,
        lastName: employee.lastName,
        phone: employee.phone,
        sentNotification: employee.sentNotification,
        enableBooking: employee.enableBooking,
        jobDescription: employee.jobDescription,
        gender: employee.gender,
        dateOfBirth: employee.dateOfBirth,
        address: employee.address,
        startDate: employee.startDate,
        endDate: employee.endDate,
        register: employee.register,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.push({ name: 'listEmployee' });
            dispatch('Notify', { text: 'Employee saved', type: 'success' });
          }
          state.loadEmployee = false;
        },
        (er) => {
          state.loadEmployee = false;
          state.errorEmployee = er.response.data.message;
          dispatch('Notify', { text: 'Error ' + state.errorEmployee, type: 'error' });
        }
      )
      .catch((ex) => {
        state.errorEmployee = ex;
        dispatch('Notify', { text: 'Error ' + ex, type: 'error' });
      });
  },

  async EditEmployee({ state, dispatch }, employee) {
    state.loadEmployee = true;
    state.errorEmployee = null;
    axios
      .put('Employee', {
        id: employee.id,
        jobTitle: employee.jobTitle,
        firstName: employee.firstName,
        lastName: employee.lastName,
        phone: employee.phone,
        sentNotification: employee.sentNotification,
        enableBooking: employee.enableBooking,
        jobDescription: employee.jobDescription,
        gender: employee.gender,
        dateOfBirth: employee.dateOfBirth,
        address: employee.address,
        startDate: employee.startDate,
        endDate: employee.endDate,
        register: employee.register,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.push({ name: 'listEmployee' });
            dispatch('Notify', { text: 'Employee Edited', type: 'success' });
          }
          state.loadEmployee = false;
          state.Employee = null;
        },
        (er) => {
          state.loadEmployee = false;
          state.errorEmployee = er.response.data.message;
          dispatch('Notify', { text: 'Error ' + state.errorEmployee, type: 'error' });
        }
      )
      .catch((ex) => {
        state.errorEmployee = ex;
        dispatch('Notify', { text: 'Error ' + state.errorEmployee, type: 'error' });
      });
  },
};
const mutations = {
  set_Employees: (state, data) => (state.Employees = data),
  set_EditEmployee: (state, data) => (state.Employee = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
