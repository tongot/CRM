import addAppointment from '../components/Appointment/NewAppointment';
import listAppointment from '../components/Appointment/Appointments';
import editAppointment from '../components/Appointment/EditAppointment';

const appointments = [
  {
    path: 'listAppointment',
    name: 'listAppointment',
    component: listAppointment,
  },
  {
    path: 'addAppointment',
    name: 'addAppointment',
    component: addAppointment,
  },
  {
    path: ':id',
    name: 'editAppointment',
    component: editAppointment,
  },
];

export default appointments;
