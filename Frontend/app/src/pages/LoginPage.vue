<template >
  <div class="container-fluid mainDiv">
    <!-- header with navbar -->
    <div class="row">
      <Header></Header>
    </div>
    <div v-if="!isDataLoaded">
      <AppSpinner/>
    </div>
    <div class="contaier-xxl PrijavaRow">
      <div class="col-lg-8">
        <!-- login-forma -->
        <form class="form-signin"   @submit.prevent>
          <h2 class="form-signin-heading text-center">Prijava</h2>
          <!-- user type fields -->
          <div class="row d-flex">
            <label class="d-flex">Tip korisnika:</label>
            <!-- radio user -->
            <div class="form-check d-flex mx-3">
              <input  class="form-check-input pointerForma" type="radio" name="userType" id="user" checked
                  value="user" v-model="userType "/>
              <label class="form-check-label mx-3 pointerForma" for="user">Običan korisinik</label>
            </div>
            <!-- radio company  -->
            <div class="form-check d-flex mx-3">
              <input class="form-check-input pointerForma" type="radio" name="userType" id="company"
                 value="company" v-model="userType"/>
              <label class="form-check-label mx-3 pointerForma" for="company">Kompanija</label>
            </div>
          </div>
          <!-- username and password fields  -->
          <input type="text"  class="form-control rounded mt-3 mb-1" v-model.trim="loginInfo.username" name="username" placeholder="Username" autofocus=""  required/>
          <input type="password" class="form-control rounded my-2" v-model.trim="loginInfo.password" name="sifra" placeholder="password" required /> 
          <button v-on:click="login" class="btn btn-lg btn-primary rounded dugme mt-3">Prijavi se</button>
        </form>
        <div class="row justify-content-center">
          <div class="col-xl-3">
            <router-link :to="{ name: 'Register' }">
              <button class="btn btn-lg btn-link rounded ">Nemate nalog?</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <div class="row">
      <Footer class="fixed-bottom"></Footer>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import AppSpinner from "../components/AppSpinner.vue"

export default {
  title: 'IT Da Radis - Login',
  components: {
    AppSpinner,
    Header,
    Footer,
  },
  data() {
    return {
      loginInfo: {
        username: "",
        password: "",
      },
      userType: "user",
      isDataLoaded: true
    };
  },
  methods: {
    async login() { 
      this.isDataLoaded = false
      await this.$store.dispatch('login', {
        loginInfo: this.loginInfo,
        userType: this.userType,
      })
      this.isDataLoaded = true
    }
    
  },
};
</script>

<style scoped>
.rounded { 
  border-radius: 10px !important;
}
.pointerForma:hover { 
  cursor: pointer;
}
.PrijavaRow {
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
}

.form-control {
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}
.mainDiv { 
  background-color: whitesmoke;
  height: 100vh;
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