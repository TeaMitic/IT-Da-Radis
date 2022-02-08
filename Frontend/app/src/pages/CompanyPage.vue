<template >
  <div class="container-fluid mainDiv">
    <!-- header with navbar -->
    <div v-if="userType == 'U'">
      <UserHeader />
    </div>
    <div v-else>
      <Header />
    </div>

    <div class="container-xxl px-0">
      <div v-if="isDataLoaded">
        <div class="px-5">
          <hr/>
          <h4 class="text-muted">Company informations</h4>
        </div>
        <div class="card rounded company my-3 mx-5 p-5 ">
          <div class="d-flex flex-column company-info">
            <div class="d-flex flex-row company-info-basic">
                <div class="imageDiv d-flex justify-content-center">
                    <img class=" logo p-2" src="../assets/img/company-card-bg.jpg" alt="Logo firme" />
                </div>
              <div class="mx-3 d-flex flex-column align-items-start mt-3">
                <h4 class="mb-3">{{ company.name }}</h4>
                <div class="d-flex flex-column align-items-start">
                  <label>Contact:</label>
                  <div class="d-flex flex-column align-items-start px-3">
                    <div  class="d-flex align-items-center my-1">
                      <font-awesome-icon  :icon="['fas', 'globe']" v-if="company.website"/>
                      <a class="link mx-2" v-bind:href="company.website" target="_blank" rel="noopener" >{{ company.website | trim-web }}</a >
                    </div>
                    <div class="d-flex align-items-center my-1">
                      <font-awesome-icon  :icon="['fas', 'search-location']" v-if="company.address" />
                      <p class="par my-0 mx-2 small">{{ company.address }}</p>
                    </div>
                    <div class="d-flex align-items-center my-1">
                      <font-awesome-icon  :icon="['fas', 'envelope']" v-if="company.email" />
                      <p class="par my-0  mx-2 small">{{ company.email }}</p>
                    </div>
                    <div class="d-flex align-items-center my-1">
                      <font-awesome-icon  :icon="['fas', 'phone']" v-if="company.contactTel" />
                      <p class="par mx-2 my-0 small">{{ company.contactTel }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex company-categories justify-content-start flex-wrap mt-3">
              <a  class="m-1 px-1 border tagBg" v-for="tag in company.categories"  :key="tag" href="#!" >{{ tag }}</a >
            </div>
          </div>
          <div class="d-flex flex-row-reverse  company-social-media ">
              <a class="socialIcon" v-bind:href="company.socialMedia.linkedInLink" target="_blank" rel="noopener" ><font-awesome-icon :icon="['fab', 'linkedin']"/></a>
              <a class="socialIcon" v-bind:href="company.socialMedia.instagramLink" target="_blank" rel="noopener"><font-awesome-icon :icon="['fab', 'instagram']"/></a>
              <a class="socialIcon" v-bind:href="company.socialMedia.twitterLink" target="_blank" rel="noopener"><font-awesome-icon :icon="['fab', 'twitter']"/></a>
              <a class="socialIcon" v-bind:href="company.socialMedia.facebookLink" target="_blank" rel="noopener"><font-awesome-icon :icon="['fab', 'facebook']"/></a>
          </div>
          <div >
            <hr/>
          <h4 class="text-muted">About company</h4>
        </div>
          <div class="company-description text-start">
            <p>{{company.description}}</p>
          </div>
        </div>
        
        <div class="px-5">
          <hr/>
          <h4 class="text-muted">Jobs</h4>
        </div>
        <div class="ads mx-5">
          <JobCard v-for="job in jobAds" :key="job._id" :jobAd="job"/>
        </div>
       
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
import UserHeader from "../components/UserHeader.vue";
import Footer from "../components/Footer.vue";
import AppSpinner from "../components/AppSpinner.vue";
import JobCard from '../components/JobCard.vue'

export default {
  title: "IT Da Radis - Homepage",
  components: {
    UserHeader,
    JobCard,
    AppSpinner,
    Header,
    Footer,
  },
  data() {
    return {
      isDataLoaded: false,
      userType: null,
      company: null,
    };
  },
  computed: {
    jobAds() {
      return this.$store.getters["getCurrentCompanyJobAds"];
    },
  },
  async created() {
    this.userType = Vue.$cookies.get("userType");
    this.isDataLoaded = false;
    let id = this.$route.params.id;
    await this.$store.dispatch("getCompanyByID", id);
    this.company = this.$store.getters["getCurrentCompany"];
    await this.$store.dispatch("getCompanyJobAds", id);
    this.isDataLoaded = true;
  },
};
</script>

<style scoped>

.socialIcon { 
    margin: 0 1rem 0 1rem ;
    
}
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
.par {
  font-size: medium;
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
.rounded {
  border-radius: 10px !important;
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

    .company-info-basic { 
      display: flex !important;
      flex-direction: column !important;
    }
    .company { 
      margin: 2rem !important;
      padding: 2rem !important;
    }
    .company-info-basic > div  > h4 { 
      align-self: center !important;
      display: flex !important;
    }
    .company-social-media { 
      flex-direction: row !important;
    }



}
</style>