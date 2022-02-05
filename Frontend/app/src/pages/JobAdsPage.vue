<template >
  <div  class="container-fluid mainDiv">
    <!-- header -->
    <div v-if="userType == 'U'">
      <UserHeader />
    </div>
    <div v-else>
      <Header />
    </div>
    <!-- search box  -->
    <!-- lista svih poslova  -->
    <div v-if="isDataLoaded" class="container">
        <div class=" gx-4 gx-lg-5 ">
          <div class="d-flex flex-column align-items-stretch ">
            <JobCard  v-for="job in allJobAds" :key="job._id" :jobAd="job"/>
          </div>
        
        </div>
      </div>
    <!-- appspinner -->
      <div v-else>
        <AppSpinner/>
      </div>
    <!-- footer -->
    <div class="row">
      <Footer class="relative-bottom"/>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import UserHeader from "../components/UserHeader.vue";
import JobCard from '../components/JobCard.vue'
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import AppSpinner from '../components/AppSpinner.vue'

export default {
  components: {
    AppSpinner,
    JobCard,
    Footer,
    UserHeader,
    Header,
  },
  data() {
    return {
      userType: null,
      isDataLoaded: false,
    };
  },
  computed: {
    allJobAds() { 
        return this.$store.getters['getAllJobAds']
    }   
  },
  async created() {
    this.userType = Vue.$cookies.get("userType");
    this.isDataLoaded = false
    await this.$store.dispatch('getAllJobAds')
    this.isDataLoaded = true


  },
};
</script>
<style scoped>

</style>