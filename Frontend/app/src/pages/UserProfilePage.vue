<template >
  <div class="container-fluid mainDiv">
    <!-- header with navbar -->
    <UserHeader />
    <!-- main -->
    <!-- user info  -->
    <div v-if="!isDataLoaded">
      <AppSpinner />
    </div>
    <div v-else class="container card mt-3 p-4 pt-2 rounded infoDiv shadow-large" >
      <div class="d-flex justify-content-between mt-3">
        <h4 class="col-2 pt-3">Lični podaci:</h4>
        <button @click="edit" class="btn btn-lg btn-primary rounded dugme editBtn" >
          <font-awesome-icon :icon="['fas', 'edit']" />
        </button>
      </div>
      <div class="row px-4">
        <div class="row">
          <!-- name -->
          <div class="col-6 d-flex flex-column align-items-start">
            <label for="name" class="form-check-label px-1">Name:</label>
            <input disabled type="text" class="form-control rounded inputPolje my-1" v-model.trim="user.name"
              name="name" autofocus="" value="user.name" />
          </div>
          <!-- surname -->
          <div class="col-6 d-flex flex-column align-items-start">
            <label for="surname" class="form-check-label px-1">Surname:</label>
            <input disabled type="text" class="form-control rounded inputPolje my-1" v-model.trim="user.surname" 
              name="surname" autofocus="" value="user.surname" />
          </div>
        </div>
        <div class="row">
          <!-- email -->
          <div class="col-6 d-flex flex-column align-items-start">
            <label for="email" class="form-check-label px-1">Email:</label>
            <input disabled type="text" class="form-control rounded inputPolje my-1" v-model.trim="user.email"  
              name="email" autofocus="" value="user.email" />
          </div>
          <!-- username -->
          <div class="col-6 d-flex flex-column align-items-start">
            <label for="username" class="form-check-label px-1" >Username:</label >
            <input disabled type="text"  class="form-control rounded inputPolje my-1" v-model.trim="user.username"
              name="username" autofocus="" value="user.username" />
          </div>
        </div>
        <div v-if="editable">
          <button @click="update" class="btn btn-lg btn-primary rounded dugme mt-3">Update profile</button>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-3">
        <h4 class="col-2 ">Promena šifre:</h4>
        <button @click="editPassword" class="btn btn-lg btn-primary rounded dugme editBtn" >
          <font-awesome-icon :icon="['fas', 'edit']" />
        </button>
      </div>
      <div class="row px-4">
        <div class="row">
          <!-- password input  -->
          <div class="col-6 d-flex flex-column align-items-start">
            <label for="newPassword" class="form-check-label px-1" >New password:</label >
            <input  disabled type="password" class="form-control rounded passwordPolje my-1" v-model.trim="password"
              name="newPassword" autofocus="" />
          </div>
          <!-- repeat password  -->
          <div class="col-6 d-flex flex-column align-items-start">
            <label for="repeatPassword" class="form-check-label px-1">Repeat password:</label>
            <input disabled type="password" class="form-control rounded passwordPolje my-1" v-model.trim="repeatPassword"
              name="repeatPassword" autofocus="" />
          </div>
          
          
        </div>
        <div v-if="passwordEditable">
          <button @click="changePassword" class="btn btn-lg btn-primary rounded dugme mt-3">Change password</button>
        </div>
      </div>
      
    </div>
    <!-- previous job ads  -->
    <div v-if="!isDataLoaded">
      <AppSpinner />
    </div>
    <div v-else class="container card mt-3 p-4 pt-2 rounded infoDiv shadow-large">
      <div class="d-flex flex-wrap align-items-start flex-column">
        <h4>Moje prijave</h4>
        <p class="my-0 text-muted">Sve prijave na oglase, aktivni i istekli konkursi</p>
      </div>
    </div>
    <!-- Footer -->
    <div class="row">
      <Footer class="relative-bottom" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import UserHeader from "../components/UserHeader.vue";
import Footer from "../components/Footer.vue";
import AppSpinner from "../components/AppSpinner.vue";

export default {
  title: "IT Da Radis - Homepage",
  components: {
    UserHeader,
    AppSpinner,
    Footer,
  },
  data() {
    return {
      isDataLoaded: false,
      user: null,
      password: null,
      repeatPassword: null,
      editable: false,
      passwordEditable: false
    };
  },
  async created() {
    this.isDataLoaded = false;
    let id = this.$cookies.get("id");
    await this.$store.dispatch("getUserByID", id);
    this.user = this.$store.getters["getCurrentUser"];
    this.isDataLoaded = true;
  },
  methods: {
    
    edit() {
      this.editable = !this.editable;
      let inputs = document.querySelectorAll(".inputPolje");
      inputs.forEach((input) => {
        if (this.editable) {
          input.disabled = false;
        } else {
          input.disabled = true;
        }
      });
    },
    editPassword() {
      this.passwordEditable = !this.passwordEditable;
      let inputs = document.querySelectorAll(".passwordPolje");
       inputs.forEach((input) => {
        if (this.passwordEditable) {
          input.disabled = false;
        } else {
          input.disabled = true;
        }
      });
    },
    async update() {},
    async changePassword() {
      let responseMessage = this.$helpers.validatePassword(this.password,this.repeatPassword)
      if ( responseMessage !== 'OK') { 
        Vue.toasted.show(responseMessage, { 
          theme: "bubble", 
          position: "top-center", 
          duration : 2000
  
        })
      }
      await this.$store.dispatch('changePassword',{
        id: this.user._id,
        newPassword: this.repeatPassword
      })
      this.editPassword()
    }

  },
};
</script>

<style scoped>
.rounded {
  border-radius: 10px !important;
}

.mainDiv {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  background-color: whitesmoke;
}
.editBtn {
  /* padding-top: 0.5rem; */
  /* padding-bottom: 0.5rem; */
  padding-left: 1rem;
  padding-right: 0.75rem;
}
.dugme {
  /* margin: 0.8rem; */
  background-color: #00b1a8;
  color: white;
  outline: none;
  font-weight: 600;
}
.dugme:hover {
  background-color: hsl(177, 100%, 20%);
}
</style>