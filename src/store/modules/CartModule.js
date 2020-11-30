import axios from 'axios';
import router from '../../router';

const state = {
  Items: [],
  totalPrice: 0,
  NumberOfItems: 0,
  loadingTrans: false,
};
const getters = {
  get_CartItems: (state) => state.Items,
  get_CartTotalPrice: (state) => state.totalPrice,
  get_TotalPrice: (state) => state.totalPrice,
  get_ItemsCount: (state) => state.NumberOfItems,
  get_loadingTrans: (state) => state.loadingTrans,
};
const actions = {
  AddToCart({ commit }, item) {
    state.NumberOfItems += 1;
    state.totalPrice += getPrice(item.price, item.promotionPercent);

    //check for already in cart
    let inList = state.Items.filter((list) => list.productId === item.productId);
    if (inList.length > 0) {
      inList[0].totalPrice += getPrice(item.price, item.promotionPercent);
      inList[0].quantity += 1;
    } else {
      let newItem = {
        productId: item.productId,
        name: item.name,
        isService: item.isService,
        quantity: 1,
        promotionRate: item.promotionPercent,
        actualPrice: item.price,
        price: getPrice(item.price, item.promotionPercent),
        totalPrice: getPrice(item.price, item.promotionPercent),
      };
      commit('set_CartItems', newItem);
    }
  },
  PlusQuantity({ state }, index) {
    state.Items[index].totalPrice += state.Items[index].price;
    state.Items[index].quantity++;
    state.NumberOfItems++;
    state.totalPrice += state.Items[index].price;
  },
  MinusQuantity({ state }, index) {
    state.Items[index].totalPrice -= state.Items[index].price;
    state.Items[index].quantity--;
    state.NumberOfItems--;
    state.totalPrice -= state.Items[index].price;
    if (state.Items[index].quantity == 0) {
      state.Items.splice(index, 1);
    }
  },
  ClearCart({ state }) {
    state.Items = [];
    state.totalPrice = 0;
    state.NumberOfItems = 0;
  },
  async Transact({ state, dispatch }, transaction) {
    state.loadingTrans = true;

    if (state.Items.length < 1) {
      dispatch('Notify', { show: true, type: 'error', text: 'No items in cart' });
      return;
    }
    await axios
      .post('Transaction', {
        transactionBy: transaction.transBy,
        amountPaid: transaction.amountPaid,
        totalAmount: transaction.totalAmount,
        change: transaction.change,
        numberOfItems: state.NumberOfItems,
        items: state.Items,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            dispatch('Notify', { show: true, type: 'success', text: 'Transaction processed' });
            dispatch('ClearCart');
            router.push({ name: 'serviceList' });
          }
          state.loadingTrans = false;
        },
        (e) => {
          dispatch('Notify', { show: true, type: 'error', text: e.response.message });
          state.loadingTrans = false;
        }
      )
      .catch((ex) => {
        dispatch('Notify', { show: true, type: 'error', text: ex });
        state.loadingTrans = false;
      });
  },
};
const mutations = {
  set_CartItems: (state, data) => state.Items.push(data),
};

let getPrice = (price, promotion) => {
  return parseFloat((price - (promotion / 100) * price).toFixed(2));
};
export default {
  state,
  getters,
  actions,
  mutations,
};
