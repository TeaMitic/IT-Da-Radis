//konfiguracije rutiranja ka svim vue stranicama 
//importovanje stranica (pages)
import  Vue  from 'vue'
import Router from 'vue-router'
import Homepage from '../pages/Homepage.vue'

Vue.use(Router)

const router = new Router({ 
    routes: [
        {
            path: '/',
            name: 'Homepage',
            component: Homepage
        }
    ],
    mode: 'history'
});

export default router
