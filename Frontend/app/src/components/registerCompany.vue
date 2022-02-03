<template >
  <div class="container ">
    <!-- name -->
    <input type="text" class="form-control" v-model.trim="registerInfo.name" name="company" placeholder="Company name" autofocus="" required />
    <!-- description -->
    <input type="text" class="form-control" v-model.trim="registerInfo.decs" name="company" placeholder="Company description" autofocus="" required />
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
    <!-- socialMedias -->
    <input type="url" class="form-control"  v-model.trim="lastSocialMedia" name="socialMedia" placeholder="https://example.com" autofocus="" />
    <!-- button add to list  -->
    <button class="btn btn-info" v-on:click="addToSocials">Dodaj url</button>

    <div class="row">
        <span>Your social media:</span>
        <ul>
            <!-- rel="noopener noreferrer" -->
            <li v-for="soc in registerInfo.socialMedias" :key="soc" :id=soc >
                <a class="link-primary" href=soc target="_blank" >{{soc}}</a>
                <button v-on:click="removeSocialMedia(soc)" class="btn btn-danger">X</button>
            </li>
        </ul>
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
//   computed: {
//     refreshSocialMedias() { 
//         if (!this.registerInfo.socialMedias.includes(this.lastSocialMedia)) { 
//             this.registerInfo.socialMedias.push(this.lastSocialMedia)
//         }
//         return this.registerInfo.socialMedias
//     }
//   },
  methods: { 
    async register() { 

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
.registerRow {
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
}
</style>