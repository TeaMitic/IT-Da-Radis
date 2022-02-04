import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'
import Api from './dbConfig.js'
// import router from "@/router"
// import cookies from 'vue-cookies'

const cookieTime = "1h"

Vue.use(Vuex)

export default new Vuex.Store({
    state: { 
        currentCompany: null,
        currentUser: null,
        currentToken: null,
        currentUsername: null,
        currentUserID: null,
        currentUserType: null,
        allCompanies: []
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
                    router.push('/UserHomepage')
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
                    router.push('/UserHomepage')
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
        },
        async getUserByID({commit}, id) {
            try {
                let res = await Api().get('/api/user/'+id)
                commit('setUser', res.data)
                
            } catch (err) {
                console.log(err.data);
            }
        },
        async getCompanyByID({commit}, id) {
            try {
                let res = await Api().get('/api/company/getCompany/'+id)
                commit('setCompany', res.data)
                
            } catch (err) {
                console.log(err.data);
            }
        },
        async getAllCompanies({commit}) { 
            try { 
                let res = await Api().get('/api/company/getAllCompanies')
                commit('setAllCompanies',res.data)
            }
            catch(err) { 
                console.log(err.data)
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
        }
        
        

    },
    mutations: { 
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
        }

    },
    getters: { 
        getAllCompanies(state) { 
            return state.allCompanies
        }
    }
})