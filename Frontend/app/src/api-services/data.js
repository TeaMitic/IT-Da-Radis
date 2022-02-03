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
        async loginUser({commit}, loginInfo) { 
            try { 
                const res = await Api().post('/api/auth/loginUser',loginInfo);
                let data = res.data
                // commit('setUser', currentUser)
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
                //     router.push("/User")
                // }
                // else {
                //     router.push("/Company")
                // }

            }
            catch(err) { 
                console.log(err)
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
        // async loginComapny({commit},loginInfo){
        // }

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