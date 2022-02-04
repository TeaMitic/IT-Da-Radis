import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router/index.js'
import Api from './dbConfig.js'
// import router from "@/router"
// import cookies from 'vue-cookies'

const cookieTime = "1h"

Vue.use(Vuex)

export default new Vuex.Store({
    state: { 
        currentUser: null,
        currentToken: null,
        currentUsername: null,
        currentUserID: null,
        currentUserType: null,
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
                commit('setUserID', data.id)
                commit('setUsername', data.username)
                commit('setToken', data.token)
                commit('setUserType', data.tip)
                Vue.$cookies.set("id", data.id, cookieTime)
                Vue.$cookies.set("username", data.username,cookieTime)
                Vue.$cookies.set("token", data.token, cookieTime)
                Vue.$cookies.set("userType", data.tip, cookieTime)
                
                Vue.toasted.show(`Successful login. UserType: ${data.tip}`, {
                    theme: "bubble", 
                    position: "top-center", 
                    duration : 2000
                })
                // if (data.tip == "U") { 
                //     router.push('/User')
                // }
                // else {
                //     router.push('/Company')
                    
                // }
               

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
                commit('setUserID', data.id)
                commit('setUsername', data.username)
                commit('setToken', data.token)
                commit('setUserType', data.tip)
                Vue.$cookies.set("id", data.id, cookieTime)
                Vue.$cookies.set("username", data.username,cookieTime)
                Vue.$cookies.set("token", data.token, cookieTime)
                Vue.$cookies.set("userType", data.tip, cookieTime)
                Vue.toasted.show(`Successful register. UserType: ${data.tip}`, {
                    theme: "bubble", 
                    position: "top-center", 
                    duration : 2000
                })
                  // if (data.tip == "U") { 
                //     router.push('/User')
                // }
                // else {
                //     router.push('/Company')
                    
                // }
            }
            catch(err) { 
                if (err.response.status == 500) { 
                    console.log(err.data)
                }
            }
        },
        
        

    },
    mutations: { 
        setUser(state,user) { 
            state.currentUser = user
        },
        setToken(state,token) { 
            state.currentToken = token
        },
        setUsername(state, username) {
            state.username = username
        },
        setUserID(state, userID) { 
            state.userID = userID
        },
        setUserType(state, type) { 
            state.currentUserType = type
        }

    }
})