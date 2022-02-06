import '@/assets/styles.css';
import Vue from "vue";
import App from "./App.vue";
import router from './router/index'
import store from './api-services/data'
import Axios from 'axios'
import Toasted from 'vue-toasted'
import VueCookies from 'vue-cookies'
import titleMixin from './mixins/titleMixins'
import moment from 'moment'
import { faSearch, faEdit } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.mixin(titleMixin)
library.add(faSearch)
library.add(faEdit)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

Axios.defaults.baseURL = process.env.API_ENDPOINT;

Vue.use(Toasted)
Vue.use(VueCookies)

Vue.filter('dateFormat', function(value){
  if(!value) return '/'
  return moment(value).format('LL')
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
