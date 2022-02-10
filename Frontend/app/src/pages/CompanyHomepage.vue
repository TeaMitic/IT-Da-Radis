<template >
  <div class="container-fluid mainDiv" >
    <!-- header with navbar -->
    <CompanyHeader/>
    
    <div class="container-xxl px-0 ">
      <!-- company cards -->
      <div v-if="isDataLoaded" class="container">      
        <div class="container card mt-3 p-4 pt-2 rounded infoDiv shadow-large">
          <div class="d-flex ">
            <h4 class="col-3 pt-3  text-start">Napravi novi oglas:</h4>
            
        </div>
        <div class="row px-4">
            <div class="row ">
                <!-- name -->
                <div class="col-4 d-flex flex-column align-items-start">
                    <label for="name" class=" form-check-label px-1 ">Ime:</label>
                    <input type="text" class="form-control rounded  inputPolje my-1" v-model.trim="adName" 
                        name="name"  autofocus=""  value=user.name />
                </div>
                <div class="col-4 d-flex flex-column align-items-start">
                    <label for="tags" class=" form-check-label px-1">Grad:</label>
                    <input type="text" class="form-control rounded  inputPolje my-1" v-model.trim="adCity" 
                        name="tags"  autofocus="" />
                </div>
                 <!-- username -->
                <div class="col-4 d-flex flex-column align-items-start">
                    <label for="time" class=" form-check-label px-1">Rok za prijavu:</label>
                    <input type="date" class="form-control rounded  inputPolje my-1" v-model.trim="adExpires"
                        name="username"  autofocus=""  value=user.username />
                </div>
                
               
            </div>
            <div class="row">
               <div class="col-4 d-flex flex-column align-items-start">
                    <label for="time" class=" form-check-label px-1">Plata:</label>
                    <input type="text" class="form-control rounded  inputPolje my-1" v-model.trim="adSalary"
                        name="username"  autofocus=""  value=user.username />
                </div>
               <div class="col-4 d-flex flex-column align-items-start">
                    <label for="tags" class=" form-check-label px-1">Tag: </label>                    
                    <input type="text" class="form-control rounded  inputPolje my-1" v-model.trim="adTag" 
                        name="tags"  autofocus="" />
                </div>
                <div class=" col-4 d-flex flex-column align-items-start">            
                    <button @click="addTag" class="btn btn-lg btn-primary rounded dugme ">Dodaj tag</button>
                </div>  
            </div>  
            <div class="row">
              <div class="col-12 d-flex flex-column align-items-start">
                    <label for="time" class=" form-check-label px-1">Tagovi:</label>
                    <div class="col-12  d-flex flex-row flex-wrap">
                      <div v-for="tag in this.adTags" :key="tag" class="col-2 container card rounded">
                        <label for="tag" class="form-check-label px-1 ">{{tag}}</label>          
                      </div>                            
                   </div>  
                </div>
            </div>
            <div class="row">
               <div class="col-12 d-flex flex-column align-items-start">
                    <label for="description" class=" form-check-label px-1">Description:</label>
                     <textarea class="form-control rounded col-9 inputPolje my-1" name="description" v-model="adDescription"
                placeholder="Company description" maxlength="1000" rows="5" autoofocus required ></textarea>                    
                </div>  
            </div>        
        </div>
        <div class=" d-flex justify-content-end">            
            <button @click="createAd" class="btn btn-lg btn-primary rounded dugme">Napravi oglas</button>
        </div>  
      </div>
     <div v-if="jobAds">
       <div class="d-flex justify-content-between ">
            <h4 class="col-3 pt-3  text-start">Moji oglasi:</h4>            
        </div>
       <div class="container card mt-3 p-4 pt-2 rounded infoDiv shadow-large">
         <CompanyJobCard  v-for="job in jobAds" :key="job._id" :jobAd="job"/>
        </div>
      </div>
      </div>
       <div v-else>
        <AppSpinner/>
      </div>
    <!-- Footer -->
    <div class="row">
      <Footer class="relative-bottom" />
    </div>
  </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import CompanyHeader from '../components/CompanyHeader.vue'
import Footer from '../components/Footer.vue'
import AppSpinner from '../components/AppSpinner.vue'
import CompanyJobCard from '../components/JobCardCompany.vue'
export default {
  title: 'IT Da Radis - Homepage',
  components: {
    AppSpinner,
    Footer,
    CompanyHeader,
    CompanyJobCard
  },
  data() {
    return {
      isDataLoaded: false,
      user: null,
      adSalary: null,
      adName:null,
      adExpires:null,
      adDescription:null,
      adTags:[],
      adTag:null,
      adCity:null,
      
    //   userType: null
    };
  },
  computed: { 
    jobAds() { 
          return this.$store.getters['getCurrentCompanyJobAds']
      }
  },
  async created() {
     this.userType = this.$cookies.get('userType')
     let id = this.$cookies.get('id')
     this.isDataLoaded = false     
     await this.$store.dispatch('getCompanyJobAds',id)
     await this.$store.dispatch('getCompanyByID',id)
     this.user = this.$store.getters['getCurrentCompany']
     this.jobAds = this.$store.getters['getCurrentCompanyJobAds']
     this.isDataLoaded = true
     console.log(this.user);
  },
  methods:{
    async createAd(){ 
      await this.$store.dispatch('createAd', {
        companyID: this.user._id,
        ad : {        
        name: this.adName,
        desc:this.adDescription,
        city: this.adCity,
        salary:100,
        tags: this.adTags,
        expireAt:this.adExpires
      }
      })
      await this.$store.dispatch('getCompanyJobAds',this.user._id)
    },
    addTag(){
      this.adTags.push(this.adTag)
    }
    // this.userType = Vue.$cookies.get('userType')
    // this.isDataLoaded = false
    // await this.$store.dispatch('getAllCompanies', 2)
    // this.isDataLoaded = true

  }
  
};
</script>

<style scoped>

.rounded { 
  border-radius: 10px !important;
}

.mainDiv { 
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  background-color: whitesmoke


}

.dugme {
  margin: top 0.8rem;
  margin-bottom: 0.8rem;
  background-color: #00b1a8;
  color: white;
  outline: none;
  font-weight: 600;
}
.dugme:hover { 
  background-color: hsl(177, 100%, 20%);

}
.pictureSection {
  background-image: url("../assets/img/job-interview.jpg");
}
</style>