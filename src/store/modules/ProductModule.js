import axios from 'axios';
import router from '../../router';
import _ from 'lodash';
var moment = require('moment');
const state = {
  Products: [],
  StocksForProd: [],
  Product: null,
  loadProduct: false,
  errorProduct: null,
};
const getters = {
  get_Products: (state) => state.Products,
  get_Product: (state) => state.Product,
  get_loadProduct: (state) => state.loadProduct,
  get_errorProduct: (state) => state.errorProduct,
  get_StocksForProd: (state) => state.StocksForProd,
};
const actions = {
  SetEditProduct({ commit }, product) {
    commit('set_EditProduct', _.clone(product));
  },
  clearProducts({ state }) {
    state.Products = [];
  },
  async GetProducts({ commit }, search) {
    if (search.fromMount) {
      state.Products = [];
    }
    state.loadProduct = true;
    await axios
      .post('Product/GetAll?items=' + state.Products.length, {
        name: search.name,
        code: search.code,
        categoryId: search.categoryId,
        brandId: search.brandId,
      })
      .then((response) => {
        if (response.status === 200) {
          commit('set_Products', response.data.data);
        }
        state.loadProduct = false;
      })
      .catch((ex) => {
        state.loadProduct = false;
        alert('could not load product ' + ex);
      });
  },
  async GetProductById({ commit }, id) {
    state.loadProduct = true;
    await axios
      .get('Product/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_EditProduct', response.data.data);
        }
        state.loadProduct = false;
      })
      .catch((ex) => {
        state.loadProduct = false;
        alert('could not load product ' + ex);
      });
  },
  async GetStockForProduct({ commit, dispatch }, id) {
    state.loadProduct = true;
    await axios
      .get('Product/stockForProduct/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_StocksForProd', response.data.data);
        }
        state.loadProduct = false;
      })
      .catch((ex) => {
        state.loadProduct = false;
        dispatch('Notify', { text: 'Failed to save ' + ex, type: 'error' });
      });
  },
  async AddProduct({ state, dispatch }, product) {
    state.loadProduct = true;
    state.errorProduct = null;
    axios
      .post('Product', {
        name: product.name,
        code: product.code,
        description: product.description,
        productCategoryId: product.productCategoryId,
        productBrandId: product.productBrandId,
        price: product.price,
        discount: product.discount,
        isRefreshment: product.isRefreshment,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.push({ name: 'listProduct' });
            dispatch('Notify', { text: 'Product saved', type: 'success' });
          }
          state.loadProduct = false;
        },
        (er) => {
          console.log(er.response);
          state.loadProduct = false;
          state.errorProduct = er.response.data.message;
          dispatch('Notify', { text: 'Failed to save ' + er.response.data.message, type: 'error' });
        }
      )
      .catch((ex) => {
        state.errorProduct = ex;
        dispatch('Notify', { text: 'Failed to save ' + ex, type: 'error' });
      });
  },
  async AddStock({ state, dispatch }, stock) {
    state.loadProduct = true;
    state.errorProduct = null;
    console.log(stock);
    axios
      .post('Product/AddStock', {
        id: stock.id,
        supplyerId: stock.supplierId,
        quantity: stock.quantity,
        productId: stock.productId,
        purchasePrice: stock.purchasePrice,
        comment: stock.comment,
        volume: stock.volume,
        measureWithUnits: stock.measureWithUnits,
        unityMeasure: stock.unityMeasure,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.go();
            dispatch('Notify', { text: 'Product saved', type: 'success' });
          }
          state.loadProduct = false;
        },
        (er) => {
          console.log(er.response);
          state.loadProduct = false;
          state.errorProduct = er.response.data.message;
          dispatch('Notify', { text: 'Failed to save ' + er.response.data.message, type: 'error' });
        }
      )
      .catch((ex) => {
        state.errorProduct = ex;
        dispatch('Notify', { text: 'Failed to save ' + ex, type: 'error' });
      });
  },
  async EditProduct({ state }, product) {
    state.loadProduct = true;
    state.errorProduct = null;
    axios
      .put('Product', {
        id: product.id,
        name: product.name,
        code: product.code,
        description: product.description,
        productCategoryId: product.productCategoryId,
        productBrandId: product.productBrandId,
        price: product.price,
        discount: product.discount,
        createdOn: product.createdOn,
        quantity: product.quantity,
        isRefreshment: product.isRefreshment,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.push({ name: 'productDetail', params: { id: product.id } });
          }
          state.loadProduct = false;
        },
        (er) => {
          state.loadProduct = false;
          state.errorProduct = er.response.data.message;
        }
      )
      .catch((ex) => {
        state.errorProduct = ex;
      });
  },
  async GetProductByCode({ dispatch }, code) {
    state.loadProduct = true;
    await axios
      .get('Product/GetByBarcode/' + code)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data != null) {
            dispatch('addToCheckoutProduct', response.data.data);
          }
        }
        state.loadProduct = false;
      })
      .catch((ex) => {
        state.loadProduct = false;
        alert('could not load product ' + ex);
      });
  },
};
const mutations = {
  set_Products: (state, data) =>
    data.forEach((item) => {
      item.createdOn = moment(item.createdOn).format('YYYY-MM-DD, HH:mm:ss');
      state.Products.push(item);
    }),
  set_EditProduct: (state, data) => (state.Product = data),
  set_StocksForProd: (state, data) => (state.StocksForProd = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
