import axios from 'axios';
import router from '../../router';

const state = {
  Appointments: [],
  Appointment: null,
  AppointmentError: null,
  loadAppointment: false,
  Appointer: null,
  AppointmentsF: [],
  Ingredients: [],
  ItemsUsed: [],
  AppointmentDetail: {}
};
const getters = {
  get_Appointments: (state) => state.Appointments,
  get_Appointment: (state) => state.Appointment,
  get_AppointmentError: (state) => state.AppointmentError,
  get_loadAppointment: (state) => state.loadAppointment,
  get_Appointer: (state) => state.Appointer,
  get_AppointmentsF: (state) => state.AppointmentsF,
  get_Ingredients: (state) => state.Ingredients,
  get_ItemUsed: (state) => state.ItemsUsed,
  get_AppointmentDetail: (state) => state.AppointmentDetail
};
const actions = {
  editAppointmentCustomer({ state }, id) {
    state.Appointment.customerId = id;
  },
  SetUsedItemUsed({ state }, item) {
    state.ItemsUsed = item;
  },
  RemoveItemUsed({ state }, index) {
    state.ItemsUsed.splice(index, 1);
  },
  editAppointmentEmployee({ state }, id) {
    state.Appointment.employeeId = id;
  },
  async GetAppointmentsF({ commit }, search) {
    state.AppointmentsF = [];
    state.loadAppointment = true;
    await axios
      .post('Appointment/GetAppointmentsF/', {
        startDate: search.startDate,
        endDate: search.endDate,
        employeeId: search.employee,
        serviceId: search.service,
        status: search.status,
        currentCount: state.AppointmentsF.length
      })
      .then((response) => {
        if (response.status === 200) {
          commit('set_AppointmentsF', response.data.data);
        }
        state.loadAppointment = false;
      })
      .catch((ex) => {
        state.loadAppointment = false;
        alert('could not load appointer ' + ex);
      });
  },

  async GetAppointerById({ commit }, userId) {
    state.loadAppointment = true;
    await axios
      .get('UserAccount/GetUserById/' + userId)
      .then((response) => {
        if (response.status === 200) {
          commit('set_Appointer', response.data);
        }
        state.loadAppointment = false;
      })
      .catch((ex) => {
        state.loadAppointment = false;
        alert('could not load appointer ' + ex);
      });
  },

  async GetAppointmentById({ commit }, id) {
    state.loadAppointment = true;
    await axios
      .get('Appointment/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_Appointment', response.data.data);
        }
        state.loadAppointment = false;
      })
      .catch((ex) => {
        state.loadAppointment = false;
        alert('could not load appointment ' + ex);
      });
  },

  async GetAppointmentByIdF({ commit }, id) {
    state.loadAppointment = true;
    await axios
      .get('Appointment/GetAppointmentByIdF/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_AppointmentDetail', response.data.data);
        }
        state.loadAppointment = false;
      })
      .catch((ex) => {
        state.loadAppointment = false;
        alert('could not load appointment ' + ex);
      });
  },

  async ChangeAppointmentState({ dispatch, state }, status) {
    state.loadAppointment = true;
    await axios
      .post('Appointment/ChangeState/', {
        id: status.id,
        status: status.status,
        usedItems: status.usedItems,
        actualPrice: status.actualPrice
      })
      .then(
        (response) => {
          if (response.status === 200) {
            dispatch('Notify', { text: 'Status changed', type: 'success' });
          }
          state.loadAppointment = false;
        },
        (err) => {
          dispatch('Notify', { text: 'Status failed to change ' + err.response.data.message, type: 'error' });
        }
      )
      .catch((ex) => {
        state.loadAppointment = false;
        dispatch('Notify', { text: 'Status failed to change ' + ex, type: 'error' });
      });
  },

  async AddAppointment({ state, dispatch }, appointment) {
    let appointments = [];
    state.loadAppointment = true;

    console.log(appointment);

    appointment.appointments.forEach((item) => {
      const appoint = {
        date: appointment.date,
        serviceId: item.service,
        employeeId: item.employee.id,
        customerId: appointment.customer.id,
        startTime: item.startTime,
        endTime: item.endTime,
        appointmentDate: appointment.date,
        price: item.price
      };
      appointments.push(appoint);
    });

    state.AppointmentError = null;
    await axios
      .post('Appointment', {
        appointments: appointments
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.push({ name: 'listCalendar' });
            dispatch('Notify', { text: 'Appointment set', type: 'success' });
          }
          state.loadAppointment = false;
        },
        (err) => {
          state.AppointmentError = err.response.data.message;
          dispatch('Notify', { text: 'Failed to set appointment ' + state.AppointmentError, type: 'error' });
        }
      )
      .catch((ex) => {
        dispatch('Notify', { text: 'Failed to set appointment ' + ex, type: 'error' });
      });
  },
  async EditAppointment({ state, dispatch }, appointment) {
    state.loadAppointment = true;
    state.AppointmentError = null;
    await axios
      .put('Appointment', {
        id: appointment.data.id,
        date: appointment.data.date,
        serviceId: appointment.data.serviceId,
        employeeId: appointment.data.employeeId,
        customerId: appointment.data.customerId,
        startTime: appointment.data.startTime,
        endTime: appointment.data.endTime,
        appointmentDate: appointment.data.date,
        price: appointment.data.price,
        createdBy: appointment.data.createdBy,
        actualEndTime: appointment.data.actualEndTime,
        status: appointment.data.status,
        bookedOn: appointment.data.bookedOn,
        startDate: `${appointment.data.date} ${appointment.data.startTime}:00`,
        endDate: `${appointment.data.date} ${appointment.data.endTime}:00`
      })
      .then(
        (response) => {
          if (response.status === 200) {
            appointment.from == 'calendar'
              ? router.push({ name: 'listCalendar' })
              : router.push({ name: 'listAppointment' });
            dispatch('Notify', { text: 'Appointment set', type: 'success' });
          }
          state.loadAppointment = false;
        },
        (err) => {
          state.AppointmentError = err.response.data.message;
          dispatch('Notify', { text: 'Failed to set appointment ' + state.AppointmentError, type: 'error' });
        }
      )
      .catch((ex) => {
        dispatch('Notify', { text: 'Failed to set appointment ' + ex, type: 'error' });
      });
  },

  async CheckAvailability({ state, commit, dispatch }, appointment) {
    state.Appointments = [];
    state.loadAppointment = true;
    state.AppointmentError = null;

    state.AppointmentError = null;
    await axios
      .post('Appointment/CheckAvailability', {
        employeeId: appointment.app.employee.id,
        date: appointment.date,
        startDate: `${appointment.date} ${appointment.app.startTime}:00`,
        endDate: `${appointment.date} ${appointment.app.endTime}:00`
      })
      .then(
        (response) => {
          if (response.status === 200 && response.data.data != null) {
            commit('set_Appointments', response.data.data);
          }
          state.loadAppointment = false;
        },
        (err) => {
          state.loadAppointment = false;
          state.AppointmentError = err.response.data.message;
          dispatch('Notify', { text: 'Failed to check time table ' + state.AppointmentError, type: 'error' });
          state.AppointmentError = 'Failed to check time table ' + state.AppointmentError;
        }
      )
      .catch((ex) => {
        state.loadAppointment = false;
        dispatch('Notify', { text: 'Failed to check time table' + ex, type: 'error' });
        state.AppointmentError = 'Failed to check time table ' + ex;
      });
  },
  async GetProductsToCloseAppointment({ commit }, type) {
    state.Ingredients = [];
    state.loadAppointment = true;
    await axios
      .get('Product/GetProductToClose/' + type)
      .then((response) => {
        if (response.status === 200) {
          commit('set_Ingredient', response.data.data);
        }
        state.loadAppointment = false;
      })
      .catch((ex) => {
        state.loadAppointment = false;
        alert('could not load appointer ' + ex);
      });
  }
};
const mutations = {
  set_Appointments: (state, data) => (state.Appointments = data),
  set_Appointer: (state, data) => (state.Appointer = data),
  set_Appointment: (state, data) => (state.Appointment = data),
  set_Ingredient: (state, data) => (state.Ingredients = data),
  set_AppointmentDetail: (state, data) => (state.AppointmentDetail = data),
  set_AppointmentsF: (state, data) => (
    (state.AppointmentsF = []),
    data.forEach((item) => {
      state.AppointmentsF.push(item);
    })
  )
};

export default {
  state,
  getters,
  actions,
  mutations
};
