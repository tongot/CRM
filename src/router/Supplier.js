import listSuppliers from '../components/Supplier/Suppliers';
import addSupplier from '../components/Supplier/AddSupplier';
import detailSupplier from '../components/Supplier/SupplierDetail';
import editSupplier from '../components/Supplier/EditSupplier';

const supplier = [
  {
    path: 'suppliers',
    name: 'listSuppliers',
    component: listSuppliers,
  },
  {
    path: 'addSupplier',
    name: 'addSupplier',
    component: addSupplier,
  },
  {
    path: ':id',
    name: 'detailSupplier',
    component: detailSupplier,
  },
  {
    path: 'edit/:id',
    name: 'editSupplier',
    component: editSupplier,
  },
];
export default supplier;
