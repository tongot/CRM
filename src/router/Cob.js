import listCob from '../components/Cob/listCob';
import addCob from '../components/Cob/AddCob';
import detailCob from '../components/Cob/CobDetails';

const cob = [
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
  {
    path: 'detailCob/:date',
    name: 'detailCob',
    component: detailCob,
  },
];

export default cob;
