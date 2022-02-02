<template >
  <div class="container-fluid">
    <!-- header with navbar -->
    <div class="row">
      <header-app></header-app>
    </div>
    <div class="contaier-xxl PrijavaRow">
      <div class="col-lg-8">
        <!-- login-forma -->
        <form class="form-signin" @submit.prevent>
          <h2 class="form-signin-heading text-center">Prijava</h2>
          <!-- user type fields -->
          <div class="row d-flex">
            <label class="d-flex">Tip korisnika:</label>
            <!-- radio user -->
            <div class="form-check d-flex mx-3">
              <input  class="form-check-input" type="radio" name="userType" id="user" checked
                  value="user" v-model="userType"/>
              <label class="form-check-label mx-3" for="user">Običan korisinik</label>
            </div>
            <!-- radio company  -->
            <div class="form-check d-flex mx-3">
              <input class="form-check-input" type="radio" name="userType" id="comapny"
                 value="company" v-model="userType"/>
              <label class="form-check-label mx-3" for="company">Kompanija</label>
            </div>
          </div>
          <!-- username and password fields  -->
          <input type="text" class="form-control" v-model="loginInfo.username" name="username" placeholder="Username" autofocus=""  required/>
          <input type="password" class="form-control" v-model="loginInfo.password" name="sifra" placeholder="password" required /> 
          <button v-on:click="login" class="btn btn-lg btn-primary rounded dugme">Prijavi se</button>
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
      <footer-app class="fixed-bottom"></footer-app>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    "header-app": Header,
    "footer-app": Footer,
  },
  data() {
    return {
      loginInfo: {
        username: "",
        password: "",
      },
      userType: "user"
    };
  },
  methods: {
    async login() { 
      if (this.userType == "user") { 
        await this.$store.dispatch('loginUser', this.loginInfo)
      }
      else { 
        await this.$store.dispatch('loginCompany', this.loginInfo)

      }
    }
  },
};
</script>

<style scoped>
.PrijavaRow {
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
}

.form-control {
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}

.dugme {
  margin: top 0.8rem;
  margin-bottom: 0.8rem;
  background-color: #00b1a8;
  color: white;
  outline: none;
  font-weight: 600;
}

.dugme:hover,
.nemanalog:hover {
  background-color: hsl(177, 100%, 20%);
}
</style>