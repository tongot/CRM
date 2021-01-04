import listEmployee from '../components/Employee/Employees';
import addEmployee from '../components/Employee/AddEmployee';
import editEmployee from '../components/Employee/EditEmployee';
import detailEmployee from '../components/Employee/DetailEmployee';
import employeeAppointment from '../components/Shared/UserAppointment';
import employeeInvoice from '../components/Employee/EmployeeInvoices';
import employeeDetails from '../components/Employee/EmployeeDetails';

const employee = [
  {
    path: 'listEmployee',
    name: 'listEmployee',
    component: listEmployee,
  },
  {
    path: 'newEmployee',
    name: 'newEmployee',
    component: addEmployee,
  },
  {
    path: ':id',
    name: 'editEmployee',
    component: editEmployee,
  },
  {
    path: 'detail/:id',
    name: 'detailEmployee',
    component: detailEmployee,
    children: [
      {
        path: 'appointment',
        name: 'employee-appointment',
        component: employeeAppointment,
      },
      {
        path: 'invoices',
        name: 'employee-invoices',
        component: employeeInvoice,
      },
      {
        path: 'details',
        name: 'employee-details',
        component: employeeDetails,
      },
    ],
  },
];
export default employee;
