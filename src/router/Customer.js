import listCustomer from '../components/Customer/Customers';
import addCustomer from '../components/Customer/AddCustomer';
import editCustomer from '../components/Customer/EditCustomer';
import detailCustomer from '../components/Customer/DetailCustomer';
import customerAppointment from '../components/Shared/UserAppointment';
import customerDetails from '../components/Customer/CustomerDetails';
import customerInvoice from '../components/Customer/CustomerInvoices';

const customer = [
  {
    path: 'listCustomer',
    name: 'listCustomer',
    component: listCustomer,
  },
  {
    path: 'newCustomer',
    name: 'newCustomer',
    component: addCustomer,
  },
  {
    path: ':id',
    name: 'editCustomer',
    component: editCustomer,
  },
  {
    path: 'detail/:id',
    name: 'detailCustomer',
    component: detailCustomer,
    children: [
      {
        path: 'appointment',
        name: 'customer-appointment',
        component: customerAppointment,
      },
      {
        path: 'details',
        name: 'customer-details',
        component: customerDetails,
      },
      {
        path: 'invoices',
        name: 'customer-invoice',
        component: customerInvoice,
      },
    ],
  },
];

export default customer;
