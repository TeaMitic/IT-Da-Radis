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
        currentUsersJobs: null,
        currentJobAppID: null,
        currentJobAd: null,
        currentToken: null,
        currentUsername: null,
        currentUserID: null,
        currentUserType: null,
        numOfApplicants: null,
        allCompanies: [],
        allJobAds: [],
        allCategories: [],
        allJobTags: [],
        jobCandidates:[],
        activeCompanyJobs:[]
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
                    console.log(err)
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
                    console.log(err)
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
        async deleteUser({commit,dispatch},id) { 
            try {
                let res = await Api().delete(`/api/user/deleteUser/${id}`)
                commit('setNista')
                if (res.status == 200) { 
                    Vue.toasted.show(res.data, { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
                }
                dispatch('logout')
            } catch (error) {
                console.log(error)
            }
        },
        async getUserByID({commit}, id) {
            try {
                let res = await Api().get('/api/user/getUser/'+id)
                commit('setUser', res.data)
                
            } catch (err) {
                console.log(err);
            }
        },
        async getCompanyByID({commit}, id) {
            try {
                let res = await Api().get('/api/company/getCompany/'+id)
                commit('setCompany', res.data)
                commit('setCurrentCompanyCategories',res.data.categories)
                
            } catch (err) {
                console.log(err);
            }
        },
        async getAllCompanies({commit}, limit) { 
            try { 
                let res = await Api().get(`/api/company/getAllCompanies/${limit}`)
                commit('setAllCompanies',res.data)
            }
            catch(err) { 
                console.log(err)
            }
        },
        async getAllJobAds({commit}) { 
            try { 
                let res = await Api().get(`/api/jobAd/getAllJobAds`)
                commit('setAllJobAds',res.data)
            }
            catch(err) { 
                console.log(err)
            }
        },
        async getCompanyJobAds({commit},companyID) { 
            try {
                //promena api: getCompaniesActiveJobAds
                let res = await Api().get('/api/jobAd/getCompaniesJobAds/' + companyID)
                commit('setCompanyJobAds',res.data)
            } catch (err) {
                console.log(err)
            }
            
        },
        async getCompaniesActiveJobAds({commit},companyID){
            try {
                // treba da se izmeni nije dobro
                let res = await Api().get('/api/jobAd/getCompaniesActiveJobAds/' + companyID)
                commit('setCompanyActiveJobAds',res.data)
                
            } catch (error) {
                console.log(error)
            }
        },
        async getCandidatesForJobAd({commit}, jobID){
            try{
                await Api().get('/api/jobUserRel/getCandidates/'+jobID).then(res=>{
                    commit('setCandidatesForJobAd', res.data)
                })
            }
            catch (err) {
                console.log(err)
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
                console.log(error)
            }
            
        },
        async updateUser({commit},user) { 
            try {
                let res = await Api().put(`api/user/updateUser/${user._id}`,user)
                if (res.status == 200) { 
                    Vue.toasted.show(res.data, { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
                }
                commit('setNista')
            } catch (error) {
                console.log(error)
            }
        },
        async getAllCategories({commit}) { 
            try {
                let res = await Api().get('/api/company/getAllCategories')
                commit('setAllCategories', res.data)
            } catch (error) {
                console.log(error);
            }
        },
        async getCompaniesByIndex({commit}, index) { 
            
            try {
                let res = await Api().put('/api/company/getCompaniesByIndex', index)
                commit('setAllCompanies',res.data)
            } catch (error) {
                console.log(error);
                
            }
        },
        async getJobAdsByIndex({commit}, index) { 
            
            try {
                let res = await Api().put('/api/jobAd/getFilteredJobAds', index)
                commit('setAllJobAds',res.data)
            } catch (error) {
                console.log(error);
                
            }
        },
        async deleteJobApplication({commit},id) { 
            try {
                let res = await Api().delete('/api/jobUserRel/deleteJobApplication/' + id)
                if (res.status == 200) { 
                    Vue.toasted.show(res.data, { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
                }
                commit('setNista')
            } catch (error) {
                console.log(error)
            }
        },
        async getUsersJobs({commit}, id) {
            try {
                let res = await Api().get(`/api/jobUserRel/getUsersJobAds/${id}`)
                commit('setCurrentUsersJobs', res.data)
            } catch (error) {
                console.log(error);
                
            }
        },
        async getJobAdByID({commit}, id) { 
            try {
                let res = await Api().get(`/api/jobAd/getJobAdByID/${id}`)
                commit('setJobAd',res.data)
            } catch (error) {
                console.log(error)
            }
            
        },
        async getAllJobTags({commit}) { 
            try {
                let res = await Api().get('/api/jobAd/getAllTags')
                commit('setAllJobTags', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async updateCompany({commit},company) { 
            try {
                let res = await Api().put(`api/company/updateCompany/${company._id}`,company)
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
        async upadteCategoriesCompany({commit},companyObject){
            let id = companyObject.id
            let jsonPass = {
                categories: companyObject.categories
            }
            try {
                let res = await Api().put(`/api/company/updateCategories/${id}`,jsonPass)
                if (res.status == 200) { 
                    Vue.toasted.show(res.data, { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
                }
                commit('setNista')
            } catch (error) {
                console.log(error)
            }
        },
        async changePasswordCompany({commit},companyObject){
            let id = companyObject.id
            let jsonPass = {
                newPassword: companyObject.newPassword
            }
            try {
                let res = await Api().put(`/api/company/changePassword/${id}`,jsonPass)
                if (res.status == 200) { 
                    Vue.toasted.show(res.data, { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
                }
                commit('setNista')
            } catch (error) {
                console.log(error)
            }
        },
        async createJobApplication({commit},application) { 
            try {
                let res = await Api().post('/api/jobUserRel/createJobApplication',application)
                //ne treba kasnije 
                if (res.status == 200) { 
                    commit("setJobAppID", res.data.jobRelID)
                    Vue.toasted.show(res.data.jobRelID,{ 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                    })
                }
                commit('setNista')
            } catch (error) {
                console.log(error.response);
                Vue.toasted.show(error.response.data,{ 
                    theme: "bubble", 
                    position: "top-center",  
                    duration : 2000
                })
            }
        },
        async createAd({commit},adObj) { 
            console.log(adObj)
            try {
                let res = await Api().post(`api/jobAd/createJobAd/${adObj.companyID}`,adObj.ad)
                console.log(res)
                if (res.status == 200) { 
                    Vue.toasted.show("Oglas je napravljen", { 
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
        async sendCV({commit},cv) { 
            try {
                let id = cv.jobRelID
                let form = cv.cv
                let res = await Api().put(`/api/jobUserRel/uploadCV/${id}`,form, { 
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (res.status == 200) { 
                    Vue.toasted.show(res.data,{ 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                    })
                }
                commit('setNista')
            } catch (error) {
                console.log(error)
            }
        },
        async uploadImage({commit}, img){
            try{
                let id = img.companyID
                let form = img.img
                let res = await Api().put(`/api/company/uploadImage/${id}`,form, { 
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (res.status == 200) { 
                    Vue.toasted.show(res.data,{ 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                    })
                }
                commit('setNista')

            }
            catch (error) {
                console.log(error)
            }
        },
        async postaviNumOfApplicants({commit}, id){
            try{
                let res = await Api().get(`/api/jobUserRel/numOfCandidates/${id}`)
                commit('setNumOfApplicants',res.data)
            }
            catch(error) {
                console.log(error)
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
        },
        postaviCurrentUserJobs({commit}, jobs) { 
            commit('setCurrentUsersJobs',jobs)
        }
        
        

    },
    mutations: { 
        setNista() { },
        setJobAppID(state,jobID) { 
            state.currentJobAppID = jobID
        },
        setJobAd(state,job) { 
            state.currentJobAd = job
        },
        setCurrentUsersJobs(state, jobs) { 
            state.currentUsersJobs = jobs
        },
        setAllJobTags(state,allJobTags) { 
            state.allJobTags = allJobTags
        },
        setAllCategories(state, allCategories){
            state.allCategories = allCategories
        },
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
        },
        setCandidatesForJobAd(state, candidates){
            state.jobCandidates=candidates
        },
        setCompanyActiveJobAds(state, activeJobs){
            state.activeCompanyJobs = activeJobs
        },
        setNumOfApplicants(state,numberOfApplicants){
            state.numOfApplicants = numberOfApplicants
        }

    },
    getters: { 
        getCurrentJobAppID(state) { 
            return state.currentJobAppID
        },
        getCurrentUsersJobs(state) { 
            return state.currentUsersJobs
        },
        getAllJobTags(state) { 
            return state.allJobTags
        },
        getCurrentJobAd(state) { 
            return state.currentJobAd
        },
        getAllCategories(state) { 
            return state.allCategories
        },
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
        },
        getCandidatesForJobAd(state){
            return state.jobCandidates
        },
        getCompanyActiveJobAds(state){
            return state.activeCompanyJobs
        },
        getNumberOfApplicants(state){
            return state.numOfApplicants
        }
    }
})