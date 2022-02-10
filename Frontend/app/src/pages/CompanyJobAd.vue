<template >
  <div class="container-fluid mainDiv">
    <!-- header with navbar -->
    <div v-if="userType == 'U'">
      <CompanyHeader />
    </div>
    <div v-else>
      <Header />
    </div>

    <div class="container-xxl px-0">
      <div v-if="isDataLoaded">
        <div class="px-5">
          <hr />
          <h4 class="text-muted">Job infromations</h4>
        </div>
        <div class="card rounded jobAd my-3 mx-5 p-5">
          <div class="d-flex flex-column jobAd-info">
            <div class="d-flex flex-row jobAd-info-basic">
              <div class="imageDiv d-flex justify-content-center">
                <img class="logo p-2" v-bind:src= imageUrl alt="Logo firme"/>
              </div>
              <div class=" mx-3 d-flex flex-column align-items-start mt-3 text-start" > 
                <h4 class="mb-3">
                  {{ jobAd.name }}
                </h4>
                <div class="d-flex flex-column align-items-start">
                  <div class="d-flex flex-column align-items-start">
                    <router-link :to="{ name: 'AboutCompany', params: { id: user._id }, }" >
                      <h5 class="company-name">{{ user.name }}</h5></router-link >
                  </div>
                  <br />
                  <div class="d-flex flex-column">
                    <label class="par">{{ jobAd.city }}</label>
                    <label class="par">{{ jobAd.salary }}</label>
                    <label class="par">{{ jobAd.expireAt | date-format }}</label>
                  </div>
                  
                </div>

                
              </div>
              <br />
                  <div>
                      <router-link :to="{ name: 'CompanyJobAd', params: { id: jobAd._id} }" ><button class="btn btn-lg btn-primary rounded dugme editBtn" >
                        <!--  @click="editPassword" -->
                        <font-awesome-icon :icon="['fas', 'edit']" />
                </button></router-link >
                      
                  </div>
            </div>
            <div class="d-flex jobAd-tags justify-content-start flex-wrap mt-3">
              <a class="m-1 px-1 border tagBg" v-for="tag in jobAd.tags" :key="tag" href="#!" >{{ tag }}</a >
            </div>
          </div>
          <div>
            <hr />
            <h4 class="text-muted">About this job</h4>
          </div>
          <div class="jobAd-description text-start">
            <p class="">
              {{ jobAd.description }}              
            </p>
          </div>
        </div>
        <hr class="mx-5" />

        <!-- <div class="row"> -->
          <h4 class="text-muted">Job candidates</h4>
          <CandidateInfo v-for="candidate in candidates" 
                          :key="candidate.userID" 
                          :candidate="candidate" />

        <!-- </div> -->

      </div>
      <div v-else>
        <AppSpinner />
      </div>
    </div>
    <!-- Footer -->
    <div class="row">
      <Footer class="relative-bottom" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import AppSpinner from "../components/AppSpinner.vue";
import CandidateInfo from "../components/CandidateInfo.vue"


export default {
  title: "IT Da Radis - Homepage",
  components: {    
    AppSpinner,
    Header,
    Footer,
    CandidateInfo
  },
  data() {
    return {
      isDataLoaded: false,
      userType: null,
      jobAd: null,      
      user: null,   
      imageUrl: ""   
    };
  },
  computed:{
    candidates(){
      return this.$store.getters['getCandidatesForJobAd']
    }
  },
  methods: {    
    async getUser() {
      let id = Vue.$cookies.get("id");
      await this.$store.dispatch("getCompanyByID", id);
      this.user = this.$store.getters["getCurrentCompany"];
    },    
  },
  async created() {
    this.userType = Vue.$cookies.get("userType");
    this.isDataLoaded = false;
    let id = this.$route.params.id;
    await this.$store.dispatch("getJobAdByID", id);
    this.jobAd = this.$store.getters["getCurrentJobAd"];
    await this.$store.dispatch("getCompanyByID", this.jobAd.companyID);
    this.user = this.$store.getters["getCurrentCompany"];
    await this.$store.dispatch("getCandidatesForJobAd", this.jobAd._id)
    this.isDataLoaded = true;
    const url = btoa(String.fromCharCode.apply(null, new Uint8Array(this.user.image.img.data.data)))
    this.imageUrl = `data:${this.user.image.img.contentType};base64,${url}`
  },
};
</script>

<style scoped>
.logo {
  width: 10rem;
  height: 10rem;
  border-radius: 2rem !important;
}
.rounded {
  border-radius: 10px !important;
}

.mainDiv {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  background-color: whitesmoke;
}
.link {
  color: #5d6bf6;
  font-size: 14px;
  font-weight: 550;
  letter-spacing: 0;
  line-height: 18px;
  text-decoration: none;
  cursor: pointer;
}
.textColor {
  color: #2c3e50;
}
.par {
  font-size: 14px;
  color: #2c3e50;
  font-weight: 550;
  letter-spacing: 0;
  line-height: 18px;
  text-decoration: none;
  cursor: default;
}
.link:hover {
  text-decoration: underline;
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

.tagBg {
  font-weight: 550;
  letter-spacing: 0;
  border-radius: 2px;
  background-color: #f4f5f9;
  color: #8b8b9f;
  font-size: 1rem;
  border-color: transparent !important;
}
.tagBg:hover {
  background-color: hsl(240, 1%, 78%);
  transition: 0.25s;
}
@media (max-width: 576px) {
  .jobAd-info-basic {
    display: flex !important;
    flex-direction: column !important;
  }
  .jobAd {
    margin: 2rem !important;
    padding: 2rem !important;
  }
  .company-name {
    align-self: center !important;
    display: flex !important;
  }
}
</style> 