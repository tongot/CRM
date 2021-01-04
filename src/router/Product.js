import listProduct from '../components/Product/Products';
import addProduct from '../components/Product/AddProduct';
import detailProduct from '../components/Product/DetailProduct';
import editProduct from '../components/Product/EditProduct';
import productStock from '../components/Product/ProductStock';
import productDetail from '../components/Product/ProductDetails';
import productSales from '../components/Product/ProductSales';
import productAnalysis from '../components/Product/ProductAnalysis';
const product = [
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
];

export default product;
