<template >
  <div class="container-fluid">
    <!-- header with navbar -->
      <header-app></header-app>
    <!-- Page Welcome Header-->
    <div class="welcome header">
      <img class="slika" src="../assets/img/job-interview.jpg" alt="ilustration of a job interview">
      <h1>IT da radiš sada!</h1>
      <h3>Započni svoju karijeru jednim klikom</h3>
    </div>
    <!-- Main Content-->
    <div class="companyCards">
      <h4>Neke od kompanija na našem prostoru</h4>
      <!-- sada ide jedan div u kome ce da budu desetak ili 12 kompanija -->
      <button class="checkAllCompanies">Pogledaj sve kompanije</button>
    </div>
    <!-- Footer -->
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
    components: { 
        'header-app': Header
    },
    data() {
        return {
            
        }
    },
};
</script>

<style scoped>
.slika { 
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  left: 0;
}
</style>