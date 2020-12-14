import Vue from 'vue';
import VueRouter from 'vue-router';

import LogIn from '../views/Login';

import Services from '../views/Services';
import newService from '../components/Services/NewService';
import editService from '../components/Services/EditService';
import serviceList from '../components/Services/ServiceList';

import Users from '../components/UserAccounts/Users';
import roles from '../components/UserAccounts/UserRoles';
import newUser from '../components/UserAccounts/AddNewUser';

import Branches from '../components/Branch/Branch';
import branchList from '../components/Branch/ListBranch';
import branchEdit from '../components/Branch/EditBranch';

import PayPoint from '../views/PayPoint';
import checkout from '../components/CheckoutPoint/CheckOut';

import listCalendar from '../components/Calender/ListCalendar';
import Calendar from '../views/Calendar';

import Appointment from '../views/Appointment';
import addAppointment from '../components/Appointment/NewAppointment';
import listAppointment from '../components/Appointment/Appointments';
import editAppointment from '../components/Appointment/EditAppointment';

import Employee from '../views/Employee';
import listEmployee from '../components/Employee/Employees';
import addEmployee from '../components/Employee/AddEmployee';
import editEmployee from '../components/Employee/EditEmployee';
import detailEmployee from '../components/Employee/DetailEmployee';

import Customer from '../views/Customer';
import listCustomer from '../components/Customer/Customers';
import addCustomer from '../components/Customer/AddCustomer';
import editCustomer from '../components/Customer/EditCustomer';
import detailCustomer from '../components/Customer/DetailCustomer';

import Category from '../views/ProductCategory';
import listCategory from '../components/ProductServiceCategory/Categories';
import listProductCategory from '../components/ProductServiceCategory/listProductCategory';
import listServiceCategory from '../components/ProductServiceCategory/listServiceCategory';
import addCategory from '../components/ProductServiceCategory/AddCategory';
import editCategory from '../components/ProductServiceCategory/EditCategory';

import Supplier from '../views/Supplier';
import listSuppliers from '../components/Supplier/Suppliers';
import addSupplier from '../components/Supplier/AddSupplier';
import detailSupplier from '../components/Supplier/SupplierDetail';
import editSupplier from '../components/Supplier/EditSupplier';

import Brand from '../views/Brand';
import listBrand from '../components/Brand/Brands';
import addBrand from '../components/Brand/AddBrand';
import detailBrand from '../components/Brand/BrandDetail';
import editBrand from '../components/Brand/EditBrand';

import Product from '../views/Product';
import listProduct from '../components/Product/Products';
import addProduct from '../components/Product/AddProduct';
import detailProduct from '../components/Product/DetailProduct';
import editProduct from '../components/Product/EditProduct';
import productStock from '../components/Product/ProductStock';
import productDetail from '../components/Product/ProductDetails';
import productSales from '../components/Product/ProductSales';
import productAnalysis from '../components/Product/ProductAnalysis';

import Tax from '../views/Tax';
import listTaxes from '../components/Tax/ListTax';
import addTax from '../components/Tax/AddTax';
import editTax from '../components/Tax/EditTax';

import Cob from '../views/Cob';
import listCob from '../components/Cob/listCob';
import addCob from '../components/Cob/AddCob';

import Invoice from '../components/Invoice/Invoice';

import Home from '../views/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LogIn,
  },
  {
    path: '/pay-point',
    name: 'pay-point',
    component: PayPoint,
    children: [
      {
        path: 'checkout',
        name: 'checkout',
        component: checkout,
      },
    ],
  },
  {
    path: '/Appointment',
    name: 'appointment',
    component: Appointment,
    children: [
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
    ],
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
    children: [
      {
        path: 'calendar',
        name: 'listCalendar',
        component: listCalendar,
      },
    ],
  },
  {
    path: '/supplier',
    name: 'supplier',
    component: Supplier,
    children: [
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
    ],
  },
  {
    path: '/brand',
    name: 'brand',
    component: Brand,
    children: [
      {
        path: 'brands',
        name: 'listBrand',
        component: listBrand,
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: addBrand,
      },
      {
        path: ':id',
        name: 'detailBrand',
        component: detailBrand,
      },
      {
        path: 'edit/:id',
        name: 'editBrand',
        component: editBrand,
      },
    ],
  },
  {
    path: '/product',
    name: 'product',
    component: Product,
    children: [
      {
        path: 'products',
        name: 'listProduct',
        component: listProduct,
      },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: addProduct,
      },
      {
        path: 'edit/:id',
        name: 'editProduct',
        component: editProduct,
      },
      {
        path: ':id',
        name: 'detailProduct',
        component: detailProduct,
        children: [
          {
            path: 'productStock',
            name: 'productStock',
            component: productStock,
          },
          {
            path: 'productDetail',
            name: 'productDetail',
            component: productDetail,
          },
          {
            path: 'productSales',
            name: 'productSales',
            component: productSales,
          },
          {
            path: 'productAnalysis',
            name: 'productAnalysis',
            component: productAnalysis,
          },
        ],
      },
      // {
      //   path: 'edit/:id',
      //   name: 'editProduct',
      //   component: editProduct,
      // },
    ],
  },
  {
    path: '/employee',
    name: 'employee',
    component: Employee,
    children: [
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
      },
    ],
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
    children: [
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
      },
    ],
  },
  {
    path: '/productCategory',
    name: 'category',
    component: Category,
    children: [
      {
        path: 'listCategory',
        name: 'listCategory',
        component: listCategory,
        children: [
          {
            path: 'listProductCategory',
            name: 'listProductCategory',
            component: listProductCategory,
          },
          {
            path: 'listServiceCategory',
            name: 'listServiceCategory',
            component: listServiceCategory,
          },
        ],
      },
      {
        path: 'newCategory',
        name: 'newCategory',
        component: addCategory,
      },
      {
        path: ':id',
        name: 'editCategory',
        component: editCategory,
      },
    ],
  },
  {
    path: '/services',
    name: 'services',
    component: Services,
    children: [
      {
        path: 'list',
        name: 'serviceList',
        component: serviceList,
      },
      {
        path: 'newService',
        name: 'newService',
        component: newService,
      },
      {
        path: ':id',
        name: 'editService',
        component: editService,
      },
    ],
  },
  {
    path: '/Users',
    name: 'users',
    component: Users,
    children: [
      {
        path: 'newUser',
        name: 'newUser',
        component: newUser,
      },
      {
        path: 'roles',
        name: 'roles',
        component: roles,
      },
    ],
  },
  {
    path: '/Branches',
    name: 'branches',
    component: Branches,
    children: [
      {
        path: 'list',
        name: 'branchList',
        component: branchList,
      },
      {
        path: 'edit/:branchId',
        name: 'branchEdit',
        component: branchEdit,
      },
    ],
  },
  {
    path: '/Tax',
    name: 'tax',
    component: Tax,
    children: [
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
    ],
  },
  {
    path: '/Cob',
    name: 'Cob',
    component: Cob,
    children: [
      {
        path: 'listCob',
        name: 'listCob',
        component: listCob,
      },
      {
        path: 'addCob',
        name: 'addCob',
        component: addCob,
      },
    ],
  },
  {
    path: '/Invoice/:id',
    name: 'Invoice',
    component: Invoice,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
