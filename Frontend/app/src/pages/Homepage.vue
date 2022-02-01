<template >
  <div class="container-fluid mainDiv" >
    <!-- header with navbar -->
    <div class="row">
      <header-app></header-app>
    </div>
    <div class="container-xxl px-0">
      <!-- Page Header-->
      <header class="masthead pictureSection">
        <div class="container position-relative px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
              <div class="site-heading">
                <h1>IT da radiš!</h1>
                <span class="subheading">Započni svoju karijeru jednim klikom</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- company cards -->
      <div class="container">      
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <h3>Neke od firmi u Srbiji</h3>
          <div class="row justify-content-around">
            <company-card></company-card>
            <company-card></company-card>
            <company-card></company-card>
            <company-card></company-card>
            <company-card></company-card>
            <company-card></company-card>
          </div>
          <router-link :to="{name: 'AllCompaniesPage'}">
            <button class="btn btn-primary rounded btnAllCompanies ">Sve kompanije</button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <div class="row">
      <footer-app></footer-app>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import CompanyCard from "../components/CompanyCard.vue"
import Footer from '../components/Footer.vue'

export default {
  components: {
    "header-app": Header,
    "company-card": CompanyCard,
    "footer-app": Footer
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.mainDiv { 
  padding: 0;
  margin: 0;
}
.btnAllCompanies { 
  background-color: #00b1a8;
  color: white;
  outline: none;
}
.btnAllCompanies:hover { 
  background-color: hsl(177, 100%, 20%);

}
.pictureSection {
  background-image: url("../assets/img/job-interview.jpg");
}
</style>