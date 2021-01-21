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

import Landing from '../views/Landing';
import landing from './landing';

import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    children: landing
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: { auth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/pay-point',
    name: 'pay-point',
    component: PayPoint,
    meta: { auth: true },
    children: [
      {
        path: 'checkout',
        name: 'checkout',
        component: checkout
      }
    ]
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
    meta: { auth: true },
    children: [
      {
        path: 'calendar',
        name: 'listCalendar',
        component: listCalendar
      }
    ]
  },

  {
    path: '/Appointment',
    name: 'appointment',
    component: Appointment,
    meta: { auth: true },
    children: appointmentChildren
  },
  {
    path: '/supplier',
    name: 'supplier',
    component: Supplier,
    meta: { auth: true },
    children: supplierChildren
  },
  {
    path: '/brand',
    name: 'brand',
    component: Brand,
    meta: { auth: true },
    children: brandChildren
  },
  {
    path: '/product',
    name: 'product',
    component: Product,
    meta: { auth: true },
    children: productChildren
  },
  {
    path: '/employee',
    name: 'employee',
    component: Employee,
    meta: { auth: true },
    children: employeeChildren
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
    meta: { auth: true },
    children: customerChildren
  },
  {
    path: '/productCategory',
    name: 'category',
    component: Category,
    meta: { auth: true },
    children: categoryChildren
  },
  {
    path: '/services',
    name: 'services',
    component: Services,
    meta: { auth: true },
    children: serviceChildren
  },
  {
    path: '/Tax',
    name: 'tax',
    component: Tax,
    meta: { auth: true },
    children: taxChildren
  },
  {
    path: '/Cob',
    name: 'Cob',
    component: Cob,
    meta: { auth: true },
    children: cobChildren
  },
  {
    path: '/Invoice/:id',
    name: 'Invoice',
    component: Invoice,
    meta: { auth: true }
  },
  {
    path: '/Users',
    name: 'users',
    component: Users,
    meta: { auth: true },
    children: [
      {
        path: 'newUser',
        name: 'newUser',
        component: newUser
      },
      {
        path: 'roles',
        name: 'roles',
        component: roles
      }
    ]
  },
  {
    path: '/Branches',
    name: 'branches',
    component: Branches,
    meta: { auth: true },
    children: [
      {
        path: 'list',
        name: 'branchList',
        component: branchList
      },
      {
        path: 'edit/:branchId',
        name: 'branchEdit',
        component: branchEdit
      }
    ]
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && store.getters.get_user == null) {
    next('/login');
  }
  next();
});
export default router;
