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
import { faSearch, faEdit, faCheck, faPhone, faSearchLocation, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook, faLinkedin, faTwitter,  } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Validation from '../src/helpers/validation'  

const pluginValidation = { 
  install() {
    Vue.helpers = Validation,
    Vue.prototype.$helpers = Validation
  }
}
Vue.use(pluginValidation)
Vue.mixin(titleMixin)

library.add(faSearch)
library.add(faCheck)
library.add(faEdit)
library.add(faPhone)
library.add(faSearchLocation)
library.add(faEnvelope)
library.add(faGlobe)

library.add(faInstagram)
library.add(faFacebook)
library.add(faTwitter)
library.add(faLinkedin)


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;

Axios.defaults.baseURL = process.env.API_ENDPOINT;

Vue.use(Toasted)
Vue.use(VueCookies)

Vue.filter('dateFormat', function(value){
  if(!value) return '/'
  return moment(value).format('LL')
})
Vue.filter('trimWeb', function(value) { 
  if (value) {
    //https://quantox.com/
    return value.replace(/(^\w+:|^)\/\//, '');
    
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
