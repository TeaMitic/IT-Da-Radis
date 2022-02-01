<template >
  <div class="container-fluid">
    <!-- header with navbar -->
    <div class="row">
      <header-app></header-app>
    </div>
    <div class="contaier-xxl PrijavaRow">
      <div class="col-lg-8">
        <form class="form-signin" @submit.prevent>
          <h2 class="form-signin-heading text-center">Prijava</h2>
          <input type="text" class="form-control" v-model="loginInfo.username" 
            name="username"  placeholder="Username" autofocus="" />
          <input type="password" class="form-control" v-model="loginInfo.password"
            name="sifra" placeholder="password" />
          <button class="btn btn-lg btn-primary rounded dugme" >Prijavi se</button>
        </form>
        <div class="row justify-content-center">
          <router-link :to="{ name: 'Register' }">
            <button class="btn btn-lg btn-link rounded dugme">Nemate nalog?</button>
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
import Footer from '../components/Footer.vue'

export default {
  components: {
    "header-app": Header,
    "footer-app": Footer
  },
  data() {
      return {
          loginInfo: {
          username: "",
          password: ""
        }
      }
  },
 
};
</script>

<style scoped>
.PrijavaRow{
  display: flex;
  justify-content: center;
  padding-top:1.5rem;
}

.form-control{
    margin-top:1.2rem;
    margin-bottom: 1.2rem;
}

.dugme{
  margin: top 0.8rem;
  margin-bottom: 0.8rem;
  background-color: #00b1a8;
  color: white;
  outline: none;
  font-weight: 600;
}


.dugme:hover, .nemanalog:hover { 
  background-color: hsl(177, 100%, 20%);
}
</style>