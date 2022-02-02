import '@/assets/styles.css';
import Vue from "vue";
import App from "./App.vue";
import router from './router/index'
import store from './api-services/data'
import Axios from 'axios'


Vue.config.productionTip = false;

Axios.defaults.baseURL = process.env.API_ENDPOINT;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
