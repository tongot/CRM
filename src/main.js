import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import 'animate.css';

//axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.baseURL = 'https://exappo.azurewebsites.net';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('authToken');

Vue.use(require('vue-moment'));

Vue.filter('Date', (value) => {
  if (!value) return '';
  var date = new Date(value);
  return date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear();
});

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    try {
      if (error.response.status === 401) {
        if (router.currentRoute.name != 'login') {
          router.push({ name: 'login' });
          sessionStorage.clear();
        }
      }
      if (error.response.status === 403) {
        if (router.currentRoute.name != 'unauthorized') {
          router.push({ name: 'unauthorized' });
          //router.go();
        }
      }
    } catch {
      alert('Connection error');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
