<template >
  <div class="container-fluid mainDiv">
    <!-- header with navbar -->
    <div class="row">
      <Header/>
    </div>
    <div class="container-xxl px-0 moveCont">
      <!-- Page Header-->
      <Welcome/>
      <!-- company cards -->
      <div v-if="isDataLoaded" class="container">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <h3>Neke od firmi u Srbiji</h3>
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
import CompanyCard from "../components/CompanyCard.vue"
import Footer from '../components/Footer.vue'
import Welcome from '../components/WelcomeSection.vue'
import Header from '../components/UserHeader.vue'
import AppSpiner from '../components/AppSpinner.vue'

export default {
  title: 'User homepage',
    components: {
    AppSpiner,
    Header,
    Welcome,
    CompanyCard,
    Footer
  },
  data() {
    return {
      isDataLoaded: false
    };
  },
  computed: { 
    allCompanies() { 
      return this.$store.getters['getAllCompanies']
    }
  },
  async created() {
    this.isDataLoaded = false
    await this.$store.dispatch('getAllCompanies', 0)
    this.isDataLoaded = true
  },
};
</script>
<style scoped>
.moveCont { 
  margin-top: -15px !important;
}
.mainDiv { 
  padding: 0;
  margin: 0;
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
.rounded { 
  border-radius: 10px !important;
}
</style>