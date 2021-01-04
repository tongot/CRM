import Vue from 'vue';
import VueRouter from 'vue-router';

import LogIn from '../views/Login';
import Users from '../components/UserAccounts/Users';
import roles from '../components/UserAccounts/UserRoles';
import newUser from '../components/UserAccounts/AddNewUser';

import Branches from '../components/Branch/Branch';
import branchList from '../components/Branch/ListBranch';
import branchEdit from '../components/Branch/EditBranch';

import Services from '../views/Services';
import serviceChildren from './Service';

import PayPoint from '../views/PayPoint';
import checkout from '../components/CheckoutPoint/CheckOut';

import listCalendar from '../components/Calender/ListCalendar';
import Calendar from '../views/Calendar';

import Appointment from '../views/Appointment';
import appointmentChildren from './Appointments';

import Employee from '../views/Employee';
import employeeChildren from './Employee';

import Customer from '../views/Customer';
import customerChildren from './Customer';

import Category from '../views/ProductCategory';
import categoryChildren from './Category';

import Supplier from '../views/Supplier';
import supplierChildren from './Supplier';

import Brand from '../views/Brand';
import brandChildren from './Brands';

import Product from '../views/Product';
import productChildren from './Product';

import Tax from '../views/Tax';
import taxChildren from './Tax';

import Cob from '../views/Cob';
import cobChildren from './Cob';

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
    path: '/Appointment',
    name: 'appointment',
    component: Appointment,
    children: appointmentChildren,
  },
  {
    path: '/supplier',
    name: 'supplier',
    component: Supplier,
    children: supplierChildren,
  },
  {
    path: '/brand',
    name: 'brand',
    component: Brand,
    children: brandChildren,
  },
  {
    path: '/product',
    name: 'product',
    component: Product,
    children: productChildren,
  },
  {
    path: '/employee',
    name: 'employee',
    component: Employee,
    children: employeeChildren,
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
    children: customerChildren,
  },
  {
    path: '/productCategory',
    name: 'category',
    component: Category,
    children: categoryChildren,
  },
  {
    path: '/services',
    name: 'services',
    component: Services,
    children: serviceChildren,
  },
  {
    path: '/Tax',
    name: 'tax',
    component: Tax,
    children: taxChildren,
  },
  {
    path: '/Cob',
    name: 'Cob',
    component: Cob,
    children: cobChildren,
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
