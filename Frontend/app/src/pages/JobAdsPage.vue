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
    <div class="container-fluid searchForm ">
        <h4 class="pt-3">Pronadjite bilo koji oglas koji Vam treba!</h4>
        <div class="input-group d-flex justify-content-end">
            <div class="form-outline d-flex align-items-center">
                <input type="search" id="form1" class="form-control rounded searchBar " placeholder="Search" />
            </div>
            <button type="button" class="btn btn-primary dugme rounded p-2 my-2 searchBtn ">
                <font-awesome-icon  :icon="['fas', 'search']" />
            </button>
        </div>
    </div>
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
  title: 'IT Da Radis - Jobs',
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
.searchForm { 
    background-color: hsl(177deg 12% 91%);
}
.dugme {
  margin: top 0.8rem;
  margin-bottom: 0.8rem;
  background-color: #00b1a8;
  color: white;
  outline: none;
  font-weight: 600;
  width: 3rem;
}
.dugme:hover { 
  background-color: hsl(177, 100%, 20%);

}
.rounded { 
  border-radius: 10px !important;
}
.searchBar { 
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.searchBtn { 
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}
.mainDiv { 
    padding: 0;
  background-color: whitesmoke

}
</style>