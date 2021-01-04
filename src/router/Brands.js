import listBrand from '../components/Brand/Brands';
import addBrand from '../components/Brand/AddBrand';
import detailBrand from '../components/Brand/BrandDetail';
import editBrand from '../components/Brand/EditBrand';
const brands = [
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
];
export default brands;
