import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'
import Api from './dbConfig.js'


const cookieTime = "1h"

Vue.use(Vuex)

export default new Vuex.Store({
    state: { 
        currentCompany: null,
        currentCompanyJobAds: null,
        currentCompanyCategories: null,
        currentUser: null,
        currentToken: null,
        currentUsername: null,
        currentUserID: null,
        currentUserType: null,
        allCompanies: [],
        allJobAds: [],
    },
    actions: { 
        async login({commit}, loginObject) { 
            try { 
                let loginInfo = loginObject.loginInfo
                let userType = loginObject.userType
                let res = null
                if (userType == "user") { 
                    res = await Api().post('/api/auth/loginUser',loginInfo)
                }
                else { 
                    res = await Api().post('/api/auth/loginCompany',loginInfo)
                }
                let data = res.data
                commit('setID', data.id)
                commit('setUsername', data.username)
                commit('setToken', data.token)
                commit('setUserType', data.tip)
                Vue.$cookies.set("id", data.id, cookieTime)
                Vue.$cookies.set("username", data.username,cookieTime)
                Vue.$cookies.set("token", data.token, cookieTime)
                Vue.$cookies.set("userType", data.tip, cookieTime)
                
               
                if (data.tip == "U") { 
                    router.push('/')
                }
                else {
                    router.push('/CompanyHomepage')
                    
                }
               

            }
            catch(err) { 
                if (err.response.status == 500) { 
                    console.log(err.data)
                }
                else { 
                    Vue.toasted.show(err.response.data, { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })

                }
            }

        },
        async register({commit}, registerObject) { 
            try { 
                let registerInfo = registerObject.registerInfo
                let userType = registerObject.userType
                let res = null
                if (userType == "user") { 
                    res = await Api().post('/api/auth/registerUser', registerInfo)
                }
                else { 
                    res = await Api().post('/api/auth/registerCompany',registerInfo)
                }
                let data = res.data
                commit('setID', data.id)
                commit('setUsername', data.username)
                commit('setToken', data.token)
                commit('setUserType', data.tip)
                Vue.$cookies.set("id", data.id, cookieTime)
                Vue.$cookies.set("username", data.username,cookieTime)
                Vue.$cookies.set("token", data.token, cookieTime)
                Vue.$cookies.set("userType", data.tip, cookieTime)
                
                if (data.tip == "U") { 
                    router.push('/Homepage')
                }
                else {
                    router.push('/CompanyHomepage')
                    
                }
            }
            catch(err) { 
                if (err.response.status == 500) { 
                    console.log(err.data)
                }
            }
        },
        async logout({commit}) { 
            commit('setUser',null)
            commit('setToken',null)
            commit('setUsername',null)
            commit('setID',null)
            commit('setUserType',null)
            Vue.$cookies.remove("id")
            Vue.$cookies.remove("token")
            Vue.$cookies.remove("userType")
            Vue.$cookies.remove("username")
            window.location.reload()

        },
        async getUserByID({commit}, id) {
            try {
                let res = await Api().get('/api/user/getUser/'+id)
                commit('setUser', res.data)
                
            } catch (err) {
                console.log(err.data);
            }
        },
        async getCompanyByID({commit}, id) {
            try {
                let res = await Api().get('/api/company/getCompany/'+id)
                commit('setCompany', res.data)
                commit('setCurrentCompanyCategories',res.data.categories)
                
            } catch (err) {
                console.log(err.data);
            }
        },
        async getAllCompanies({commit}, limit) { 
            try { 
                let res = await Api().get(`/api/company/getAllCompanies/${limit}`)
                commit('setAllCompanies',res.data)
            }
            catch(err) { 
                console.log(err.data)
            }
        },
        async getAllJobAds({commit}) { 
            try { 
                let res = await Api().get(`/api/jobAd/getAllJobAds`)
                commit('setAllJobAds',res.data)
            }
            catch(err) { 
                console.log(err.data)
            }
        },
        async getCompanyJobAds({commit},companyID) { 
            try {
                
                let res = await Api().get('/api/jobAd/getCompaniesJobAds/' + companyID)
                commit('setCompanyJobAds',res.data)
            } catch (err) {
                console.log(err.data)
            }
            
        },
        async changePassword({commit},userObject) { 
            let id = userObject.id
            let jsonPass = {
                newPassword: userObject.newPassword
            }
            try {
                let res = await Api().put(`api/user/changePassword/${id}`,jsonPass)
                if (res.status == 200) { 
                    Vue.toasted.show(res.data, { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
                }
                commit('setNista')
            } catch (error) {
                console.log(error.data)
            }
            
        },
        postaviUserType({commit},userType) { 
            commit('setUserType',userType)
        },
        postaviToken({commit},token) { 
            commit('setToken',token)
        },
        postaviUsername({commit},username) { 
            commit('setUsername',username)
        },
        postaviUserID({commit},id) { 
            commit('setID',id)
        },
        postaviCurrentCompanyCategories({commit},categories) { 
            commit('setCurrentCompanyCategories',categories)
        }
        
        

    },
    mutations: { 
        setNista() { },
        setCompanyJobAds(state,jobAds) { 
            state.currentCompanyJobAds = jobAds
        },
        setAllJobAds(state, allJobAds) { 
            state.allJobAds = allJobAds
        },
        setAllCompanies(state,allCompanies) { 
            state.allCompanies = allCompanies
        },
        setCompany(state,company) {
            state.currentCompany = company
        },
        setUser(state,user) { 
            state.currentUser = user
        },
        setToken(state,token) { 
            state.currentToken = token
        },
        setUsername(state, username) {
            state.username = username
        },
        setID(state, userID) { 
            state.userID = userID
        },
        setUserType(state, type) { 
            state.currentUserType = type
        },
        setCurrentCompanyCategories(state,categories) { 
            state.currentCompanyCategories = categories
        }

    },
    getters: { 
        getCurrentCompanyJobAds(state) { 
            return state.currentCompanyJobAds
        },
        getAllJobAds(state) { 
            return state.allJobAds
        },
        getAllCompanies(state) { 
            return state.allCompanies
        },
        getCurrentCompany(state) {
            return state.currentCompany
        },
        getCurrentUser(state) {
          return state.currentUser   
        },
        getCurrentCompanyCategories(state) { 
            return state.currentCompanyCategories
        }
    }
})