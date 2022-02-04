<template >
  <div class="container ">
    <!-- name -->
    <input type="text" class="form-control" v-model.trim="registerInfo.name" name="company" placeholder="Company name"  required />
    <!-- description -->
    <input type="text" class="form-control" v-model.trim="registerInfo.desc" name="company" placeholder="Company description" autofocus="" required />
    <!-- official website  -->
    <input type="url" class="form-control"  v-model.trim="registerInfo.website" name="website" placeholder="https://example.com" autofocus="" required />
    <!-- email -->
    <input type="email" class="form-control" v-model.trim="registerInfo.email" name="email" placeholder="your-email@domain" autofocus required />
    <!-- username -->
    <input type="text" class="form-control" v-model.trim="registerInfo.username" name="username" placeholder="Your username" autofocus="" required />
    <!-- password -->
    <input type="password" class="form-control" v-model.trim="registerInfo.password" name="password" placeholder="Your password" autofocus="" required />
    <!-- address -->
    <input type="text" class="form-control" v-model.trim="registerInfo.address" name="address" placeholder="Your address" autofocus="" required />
    <!-- contactTelephone -->
    <input type="tel" class="form-control" v-model.trim="registerInfo.contactTel" name="contactTel" placeholder="06*******" autofocus="" />
    <div class="d-flex">
        <!-- socialMedias -->
        <input type="url" class="form-control mediaInput" onfocus="this.value=''" v-model.trim="lastSocialMedia" name="socialMedia" placeholder="https://example.com" autofocus="" />
        <!-- button add to list  -->
        <button class="btn btn-lg btn-primary rounded dugme addBtn"  v-on:click="addToSocials">Dodaj</button>
    </div>

    <div class="d-flex flex-column ">
        <span class="d-flex align-self-start">Your social media:</span>
        <div >
            <ul class=" d-flex flex-wrap flex-column list-grouped" >
                <li v-for="soc in registerInfo.socialMedias" :key="soc" :id=soc class="d-inline-flex align-items-center list-group-item" >
                    <a class="link-primary" href=soc target="_blank" >{{soc}}</a>
                    <button v-on:click="removeSocialMedia(soc)" class="btn btn-lg btn-outline-danger rounded deleteBtn">X</button>
                </li>
            </ul>
        </div>
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
        socialMedias: []
      },
      lastSocialMedia: null
    };
  },
  methods: { 
    async register() { 
        await this.$store.dispatch('registerCompany', this.registerInfo)
    },
    removeSocialMedia(media) { 
        console.log(media)
        console.log(this.registerInfo.socialMedias)
        let index = this.registerInfo.socialMedias.indexOf(media)

        this.registerInfo.socialMedias.splice(index,1)
        console.log(this.registerInfo.socialMedias)

    },
    addToSocials() { 
        this.registerInfo.socialMedias.push(this.lastSocialMedia)
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
.addBtn { 
   margin: 1rem;
}
.mediaInput { 
    margin-right: 2rem;
}
.deleteBtn { 
    margin: 0.5rem;
}

</style>