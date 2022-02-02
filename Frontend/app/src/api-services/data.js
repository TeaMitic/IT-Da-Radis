import Vue from 'vue'
import Vuex from 'vuex'
import Api from './dbConfig.js'
// import router from "@/router"
// import cookies from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { 
        user: null
    },
    actions: { 
        async loginUser({commit}, loginInfo) { 
            try { 
                console.log("entering the loginUser func");
                const res = await Api().post('/api/auth/loginUser',loginInfo);
                console.log(res);
                let currUser = res.data.user
                commit('setUser',currUser)
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
        // async loginComapny({commit},loginInfo){
        // }

    },
    mutations: { 
        setUser(state,user) { 
            state.user = user
        }
    }
})