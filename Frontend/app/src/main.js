import '@/assets/styles.css';
import Vue from "vue";
import App from "./App.vue";
import router from './router/index'
import store from './api-services/data'
import Axios from 'axios'
import Toasted from 'vue-toasted'
import VueCookies from 'vue-cookies'
import titleMixin from './mixins/titleMixins'

Vue.mixin(titleMixin)
Vue.config.productionTip = false;

Axios.defaults.baseURL = process.env.API_ENDPOINT;

Vue.use(Toasted)
Vue.use(VueCookies)


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
