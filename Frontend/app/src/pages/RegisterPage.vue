<template >
  <div class="container-fluid mainDiv">
    <!-- header with navbar -->
    <div class="row">
      <Header></Header>
    </div>
   
     <div class="contaier-xxl registerRow">
      <div class="col-lg-8 ">
        <!-- Register-forma -->
        <form class="form-signin" @submit.prevent>
          <h2 class="form-signin-heading text-center">Registracija</h2>
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
          <!-- account fields  -->
          <div class="row" v-if="userType=='user'">
            <UserForm></UserForm>
          </div>
          <div class="row" v-else>
            <CompanyForm></CompanyForm>
          </div>
         
        </form>
        <div class="row justify-content-center">
          <div class="col-xl-3">
            <router-link :to="{ name: 'Login' }">
              <button class="btn btn-lg btn-link rounded">Već imate nalog?</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <div class="row">
      <Footer  class="relative-bottom"></Footer>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from '../components/Footer.vue';
import UserForm from '../components/registerUser.vue';
import CompanyForm from '../components/registerCompany.vue';

export default {
  title: 'IT Da Radis - Register',
  components: {
    Header,
    Footer,
    UserForm,
    CompanyForm
  },
  data() {
    return {
      userType: "user",
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
.registerRow {
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
}
.form-control {
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}
.mainDiv { 
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

.dugme:hover,
.nemanalog:hover {
  background-color: hsl(177, 100%, 20%);
}
</style>