//konfiguracije rutiranja ka svim vue stranicama 
//importovanje stranica (pages)
import  Vue  from 'vue'
import Router from 'vue-router'
import Homepage from '../pages/Homepage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'


Vue.use(Router)

const router = new Router({ 
    routes: [
        {
            path: '/',
            name: 'Homepage',
            component: Homepage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        }
    ],
    mode: 'history'
});

export default router
