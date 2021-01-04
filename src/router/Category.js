import listCategory from '../components/ProductServiceCategory/Categories';
import listProductCategory from '../components/ProductServiceCategory/listProductCategory';
import listServiceCategory from '../components/ProductServiceCategory/listServiceCategory';
import addCategory from '../components/ProductServiceCategory/AddCategory';
import editCategory from '../components/ProductServiceCategory/EditCategory';

const category = [
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
];

export default category;
