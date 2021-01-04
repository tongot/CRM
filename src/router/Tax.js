import listTaxes from '../components/Tax/ListTax';
import addTax from '../components/Tax/AddTax';
import editTax from '../components/Tax/EditTax';

const tax = [
  {
    path: 'list',
    name: 'listTax',
    component: listTaxes,
  },
  {
    path: 'addTax',
    name: 'addTax',
    component: addTax,
  },
  {
    path: 'editTax/:id',
    name: 'editTax',
    component: editTax,
  },
];

export default tax;
