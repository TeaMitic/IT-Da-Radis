//konfiguracije rutiranja ka svim vue stranicama 
//importovanje stranica (pages)
import  Vue  from 'vue'
import Router from 'vue-router'
import Homepage from '../pages/Homepage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import CompanyHomepage from '../pages/CompanyHomepage.vue'
import AllCompaniesPage from '../pages/AllCompaniesPage.vue'
import AllJobAdsPage from '../pages/JobAdsPage.vue'
import UserProfilePage from '../pages/UserProfilePage.vue'
import Companypage from '../pages/CompanyPage.vue'
import CompanyProfilePage from '../pages/CompanyProfilePage'

Vue.use(Router)



function checkCookie() { 
    let id = Vue.$cookies.get('id')
    let username = Vue.$cookies.get('username')
    let token = Vue.$cookies.get('token')
    let userType = Vue.$cookies.get('userType')
    
    if (id == null) return false
    if (username == null) return false
    if (token == null) return false
    if (userType == null) return false
    return true
}

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
            path:'/CompanyHomepage',
            name: 'CompanyHomepage',
            component: CompanyHomepage,
            beforeEnter(to,from,next) { 
                if (checkCookie()) { 
                    next()
                }
                else { 
                    next({name: 'Homepage'})
                }
            }
        },
        {
            path:'/AllCompanies',
            name: 'AllCompanies',
            component: AllCompaniesPage,
            
        },
        {
            path:'/AllJobAds',
            name: 'AllJobAds',
            component: AllJobAdsPage,
        },
        {
            path: '/UserProfile',
            name: 'UserProfile',
            component: UserProfilePage,
            beforeEnter(to,from,next) { 
                if (checkCookie()) { 
                    next()
                }
                else { 
                    next({name: 'Homepage'})
                }
            }
        },
        {
            path: '/AboutCompany/:id',
            name: 'AboutCompany',
            component: Companypage,
            // params: {
            //     id: String
            // }
        },
        {
            path: '/CompanyProfilePage',
            name: 'CompanyProfilePage',
            component: CompanyProfilePage,
            beforeEnter(to,from,next) { 
                if (checkCookie()) { 
                    next()
                }
                else { 
                    next({name: 'Homepage'})
                }
            }
        }

       

    ],
    mode: 'history'
});

export default router
