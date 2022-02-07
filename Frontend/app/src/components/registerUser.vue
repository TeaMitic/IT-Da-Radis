<template >
  <div class="container ">
    <div v-if="!isDataLoaded">
      <AppSpinner/>
    </div>
    <!-- name -->
    <div class="d-flex flex-row justify-content-start align-items-center">
        <label for="name" class=" form-check-label col-2 ">Name:</label>
        <input type="text" class="form-control rounded col-9  inputPolje my-1" v-model.trim="registerInfo.name" name="name" placeholder="Your name" autofocus="" required />
    </div>
    <!-- surname -->
    <div class="d-flex flex-row justify-content-start align-items-center">
        <label for="name" class=" form-check-label col-2">Surname:</label>
        <input  type="text" class="form-control rounded col-9 inputPolje my-1" v-model.trim="registerInfo.surname" name="surname" placeholder="Your surname" autofocus="" required />
    </div>
    <!-- email -->
    <div class="d-flex flex-row justify-content-start align-items-center">
        <label for="name" class=" form-check-label col-2">Email:</label>
        <input  type="text" class="form-control rounded col-9 inputPolje my-1" v-model.trim="registerInfo.email" name="email" placeholder="your-email@domain" autofocus="" required />
    </div>
    <!-- username -->
    <div class="d-flex flex-row justify-content-start align-items-center">
        <label for="name" class=" form-check-label col-2">Username:</label>
        <input  type="text" class="form-control rounded col-9 inputPolje my-1" v-model.trim="registerInfo.username" name="username" placeholder="Your username" autofocus="" required />
    </div>
    <!-- password -->
    <div class="d-flex flex-row justify-content-start align-items-center">
        <label for="name" class=" form-check-label col-2">Password:</label>
        <input  type="password" class="form-control rounded col-9 inputPolje my-1" v-model.trim="registerInfo.password" name="password" placeholder="Your password" autofocus="" required />
    </div>
    <!-- button  -->
    <button v-on:click="register" class="btn btn-lg btn-primary rounded dugme">Registruj se</button>
  </div>
</template>

<script>
import AppSpinner from './AppSpinner.vue'

export default {
  components: { 
    AppSpinner
  },
  data() {
    return {
      registerInfo: {
        name: null,
        surname: null,
        email: null,
        username: null,
        password: null,
      },
      isDataLoaded: true
    };
  },
  methods: {
    async register() { 
      this.isDataLoaded = false
      let registerObject = { 
          registerInfo: this.registerInfo,
          userType: "user"
      }
      await this.$store.dispatch('register', registerObject)
      this.isDataLoaded = true
    },
  },
};
</script>
<style scoped>
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
.dugme:hover {
  background-color: hsl(177, 100%, 20%);
}
.inputPolje  {
    width: 83%;
}
.rounded { 
  border-radius: 10px !important;
}
</style>