<template >
  <div class="container-fluid mainDiv" >
    <!-- header with navbar -->
    <div v-if="userType == 'U'">
            <UserHeader/>
    </div>
    <div v-else>
        <Header/>
    </div>
    
    <div class="container-xxl px-0 ">
      <!-- Page Header-->
      <Welcome/>
      <!-- company cards -->
      <div v-if="isDataLoaded" class="container">      
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <h3>Neke od firmi u Srbiji</h3>
          <div class="row justify-content-around">
            <CompanyCard v-for="company in allCompanies" :key="company._id" :company="company"/>
          </div>
          <router-link :to="{name: 'AllCompanies', params: {tag: '_'}}">
            <button class="btn btn-lg btn-primary rounded dugme  ">Sve kompanije</button>
          </router-link>
        </div>
      </div>
      <div v-else>
        <AppSpinner/>
      </div>
    </div>
    <!-- Footer -->
    <div class="row">
      <Footer class="relative-bottom" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from "../components/Header.vue";
import UserHeader from '../components/UserHeader.vue'
import CompanyCard from "../components/CompanyCard.vue"
import Footer from '../components/Footer.vue'
import Welcome from '../components/WelcomeSection.vue'
import AppSpinner from '../components/AppSpinner.vue'

export default {
  title: 'IT Da Radis - Homepage',
  components: {
    UserHeader,
    AppSpinner,
    Welcome,
    Header,
    CompanyCard,
    Footer
  },
  data() {
    return {
      isDataLoaded: false,
      userType: null
    };
  },
  computed: { 
    allCompanies() { 
      return this.$store.getters['getAllCompanies']
    }
  },
  async created() {
    this.userType = Vue.$cookies.get('userType')
    this.isDataLoaded = false
    await this.$store.dispatch('getAllCompanies', 2)
    this.isDataLoaded = true

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