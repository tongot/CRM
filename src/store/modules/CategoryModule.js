import axios from 'axios';
import router from '../../router';
const state = {
  Categories: [],
  Category: null,
  loadCategory: false,
  errorCategory: null,
};
const getters = {
  get_Categories: (state) => state.Categories,
  get_Category: (state) => state.Category,
  get_loadCategory: (state) => state.loadCategory,
  get_errorCategory: (state) => state.errorCategory,
};
const actions = {
  async GetProductCategories({ commit }, search) {
    state.loadCategory = true;
    await axios
      .get('Category/GetAllProduct?search=' + search.text)
      .then((response) => {
        if (response.status === 200) {
          commit('set_Categories', response.data.data);
        }
        state.loadCategory = false;
      })
      .catch((ex) => {
        state.loadCategory = false;
        alert('could not load category ' + ex);
      });
  },

  async GetServiceCategories({ commit }, search) {
    state.Categories = [];
    state.loadCategory = true;
    await axios
      .get('Category/GetAllService?search=' + search.text)
      .then((response) => {
        if (response.status === 200) {
          commit('set_Categories', response.data.data);
        }
        state.loadCategory = false;
      })
      .catch((ex) => {
        state.loadCategory = false;
        alert('could not load category ' + ex);
      });
  },
  async GetCategoryById({ commit }, id) {
    state.loadCategory = true;
    await axios
      .get('Category/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_EditCategory', response.data.data);
        }
        state.loadCategory = false;
      })
      .catch((ex) => {
        state.loadCategory = false;
        alert('could not load category ' + ex);
      });
  },
  async AddCategory({ state, dispatch }, category) {
    state.loadCategory = true;
    state.errorCategory = null;
    axios
      .post('Category', {
        name: category.name,
        description: category.description,
        isService: category.isService,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            if (category.isService) {
              router.push({ name: 'listServiceCategory' });
              dispatch('Notify', { text: 'Service category saved', type: 'success' });
            } else {
              router.push({ name: 'listProductCategory' });
              dispatch('Notify', { text: 'Product category saved', type: 'success' });
            }
          }
          state.loadCategory = false;
        },
        (er) => {
          state.loadCategory = false;
          state.errorCategory = er.response.data.message;
        }
      )
      .catch((ex) => {
        state.errorCategory = ex;
      });
  },
  async EditCategory({ state, dispatch }, category) {
    state.loadCategory = true;
    state.errorCategory = null;
    axios
      .put('Category', {
        id: category.id,
        name: category.name,
        description: category.description,
        isService: category.isService,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            if (category.isService) {
              router.push({ name: 'listServiceCategory' });
              dispatch('Notify', { text: 'Service category saved', type: 'success' });
            } else {
              router.push({ name: 'listProductCategory' });
              dispatch('Notify', { text: 'Product category saved', type: 'success' });
            }
          }
          state.loadCategory = false;
        },
        (er) => {
          state.loadCategory = false;
          state.errorCategory = er.response.data.message;
        }
      )
      .catch((ex) => {
        state.errorCategory = ex;
      });
  },
};
const mutations = {
  set_Categories: (state, data) => (state.Categories = data),
  set_EditCategory: (state, data) => (state.Category = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
