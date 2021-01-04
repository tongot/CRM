import newService from '../components/Services/NewService';
import editService from '../components/Services/EditService';
import serviceList from '../components/Services/ServiceList';

const service = [
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
];

export default service;
