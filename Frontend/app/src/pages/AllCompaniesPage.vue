<template >
  <div class="container-fluid mainDiv">
    <!-- header with navbar -->
    <div v-if="userType == 'U'">
            <UserHeader/>
    </div>
    <div v-else>
        <Header/>
    </div>
    <div class="container-xxl px-0 ">
      <!-- Page Header-->
      <header class="masthead pictureSection">
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-start">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="site-heading">
              <h1>Pregled svih kompanija</h1>
              <span class="subheading">Sve informacije na jednom mestu</span >
            </div>
          </div>
        </div>
      </div>
    </header>
      <!-- company cards -->
      <div v-if="isDataLoaded" class="container">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="row justify-content-around">
            <CompanyCard v-for="company in allCompanies" :key="company._id" :company="company"/>
          </div>
        
        </div>
      </div>
      <div v-else>
        <AppSpiner/>
      </div>
    </div>
    <!-- Footer -->
    <div class="row">
      <Footer class="relative-bottom"/>
    </div>
  </div>
</template>

<script>
import  Vue  from 'vue'
import CompanyCard from "../components/CompanyCard.vue"
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import UserHeader from '../components/UserHeader.vue'
import AppSpiner from '../components/AppSpinner.vue'

export default {
  title: 'IT Da Radis - Companies',
  components: {
    UserHeader,
    AppSpiner,
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
    await this.$store.dispatch('getAllCompanies', 0)
    this.isDataLoaded = true
  },
};
</script>
<style scoped>

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
  background-image: url("../assets/img/desk.jpg");
}
.rounded { 
  border-radius: 10px !important;
}
</style>