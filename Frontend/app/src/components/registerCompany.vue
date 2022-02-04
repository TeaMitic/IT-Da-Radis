<template >
  <div class="container ">
    <div class="d-flex flex-row justify-content-start align-items-center">
        <!-- name -->
        <label for="name" class=" form-check-label col-2 ">Name:</label>
        <input type="text" class="form-control rounded col-9 inputPolje my-1" v-model.trim="registerInfo.name" 
            name="company" placeholder="Company name" autofocus="" required />
    </div>
    <div class="d-flex flex-row justify-content-start align-items-center">
        <!-- description -->
        <label for="name" class=" form-check-label col-2 ">Description:</label>
        <textarea class="form-control rounded col-9 inputPolje my-1" name="description" v-model="registerInfo.desc"
            placeholder="Company description" maxlength="500" rows="5" autoofocus required ></textarea>
    </div>
    <div class="d-flex flex-row justify-content-start align-items-center">
        <!-- official website  -->
        <label for="name" class=" form-check-label col-2 ">Website:</label>
        <input type="url" class="form-control rounded col-9 inputPolje my-1"  v-model.trim="registerInfo.website"
             name="website" placeholder="https://example.com" autofocus="" required />

    </div>
    <div class="d-flex flex-row justify-content-start align-items-center">
        <!-- email -->
        <label for="name" class=" form-check-label col-2 ">Email:</label>
        <input type="email" class="form-control rounded col-9 inputPolje my-1" v-model.trim="registerInfo.email" 
            name="email" placeholder="your-email@domain" autofocus required />
    </div>
    <div class="d-flex flex-row justify-content-start align-items-center">
        <!-- username -->
        <label for="name" class=" form-check-label col-2 ">Username:</label>
        <input type="text" class="form-control rounded col-9 inputPolje my-1" v-model.trim="registerInfo.username" 
        name="username" placeholder="Your username" autofocus="" required />

    </div>
    <div class="d-flex flex-row justify-content-start align-items-center">
        <!-- password -->
        <label for="name" class=" form-check-label col-2 ">Password:</label>
        <input type="password" class="form-control rounded col-9 inputPolje my-1" v-model.trim="registerInfo.password" name="password" placeholder="Your password" autofocus="" required />

    </div>
    <div class="d-flex flex-row justify-content-start align-items-center">
        <!-- address -->
        <label for="name" class=" form-check-label col-2 ">Addres:</label>
        <input type="text" class="form-control rounded col-9 inputPolje my-1" v-model.trim="registerInfo.address" name="address" placeholder="Your address" autofocus="" required />

    </div>
    <div class="d-flex flex-row justify-content-start align-items-center">
        <!-- contactTelephone -->
        <label for="name" class=" form-check-label col-2 ">Contact telephone:</label>
        <input type="tel" class="form-control rounded col-9 inputPolje my-1" v-model.trim="registerInfo.contactTel" name="contactTel" placeholder="06*******" autofocus="" />

    </div>
    <div class="d-flex flex-row justify-content-start align-items-center">
        <!-- Linkedin url  -->
        <label for="name" class=" form-check-label col-2 ">Linkedin:</label>
        <input type="url" class="form-control rounded col-9 inputPolje my-1"  v-model.trim="registerInfo.liLink" name="liLink" placeholder="https://www.linkedin.com/example" autofocus="" required />

    </div>
    <div class="d-flex flex-row justify-content-start align-items-center">
        <!-- Instagram url  -->
        <label for="name" class=" form-check-label col-2 ">Instagram:</label>
        <input type="url" class="form-control rounded col-9 inputPolje my-1"  v-model.trim="registerInfo.igLink" name="igLink" placeholder="https://instagram.com/example" autofocus="" required />

    </div>
    <div class="d-flex flex-row justify-content-start align-items-center">
        <!-- Twitter url  -->
        <label for="name" class=" form-check-label col-2 ">Twitter:</label>
        <input type="url" class="form-control rounded col-9 inputPolje my-1"  v-model.trim="registerInfo.twLink" name="twLink" placeholder="https://twitter.com/example" autofocus="" required />
    </div>
    <div class="d-flex flex-row justify-content-start align-items-center">
    <!-- Facebook url  -->
    <label for="name" class=" form-check-label col-2 ">Facebook:</label>
        <input type="url" class="form-control rounded col-9 inputPolje my-1"  v-model.trim="registerInfo.fbLink" name="fbLink" placeholder="https://facebook.com/example" autofocus="" required />
    </div>
    <!-- button  -->
    <button v-on:click="register" class="btn btn-lg btn-primary rounded dugme">Registruj se</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      registerInfo: {
        name: null,
        desc: null,
        website: null,
        email: null,
        username: null,
        password: null,
        address: null,
        contactTel: null,
        igLink: null,
        fbLink: null,
        twLink: null,
        liLink: null
      },
    };
  },
  methods: { 
    async register() { 
        let registerObject = { 
            registerInfo: this.registerInfo,
            userType: "company"
        }
        await this.$store.dispatch('register', registerObject)
    }
  }
};
</script>
<style scoped>
.form-control {
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}
.dugme {
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