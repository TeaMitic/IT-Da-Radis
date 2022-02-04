//konfiguracije rutiranja ka svim vue stranicama 
//importovanje stranica (pages)
import  Vue  from 'vue'
import Router from 'vue-router'
import Homepage from '../pages/Homepage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import UserHomepage from '../pages/UserHomepage.vue'
import CompanyHomepage from '../pages/CompanyHomepage.vue'

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
        },
        {
            path:'/UserHomepage',
            name: 'UserHomepage',
            component: UserHomepage
        },
        {
            path:'/CompanyHomepage',
            name: 'CompanyHomepage',
            component: CompanyHomepage
        },
        // { 
        //     path: '/CompanyPage',
        //     name: 'CompanyPage',
        //     component: CompanyPage,
            
        // }

    ],
    mode: 'history'
});

export default router
