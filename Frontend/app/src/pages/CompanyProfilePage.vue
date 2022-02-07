<template >
  <div class="container-fluid mainDiv " >
    <!-- header with navbar -->
    <UserHeader/>
    <!-- main -->
    <!-- user info  -->
    <div v-if="!isDataLoaded">
        <AppSpinner/>
    </div>
    <div v-else class="container card mt-3 p-4 pt-2 rounded infoDiv shadow-large">
        <div class="d-flex justify-content-between ">
            <h4 class="col-3 pt-3">Podaci o kompaniji:</h4>
            <button @click="edit" class="btn btn-lg btn-primary rounded dugme editBtn"><font-awesome-icon  :icon="['fas', 'edit']" /></button>
        </div>
        <div class="row px-4">
            <div class="row ">
                <!-- name -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="name" class=" form-check-label px-1 ">Name:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.name" 
                        name="name"  autofocus=""  value=user.name />
                </div>
                <!-- address -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="address" class=" form-check-label px-1">Address:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.address"
                        name="address"  autofocus=""  value=user.address />
                </div>
            </div>
            <div class="row">
                <!-- email -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="email" class=" form-check-label px-1">Email:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.email" 
                        name="email"  autofocus=""  value=user.email />
                </div>
                <!-- username -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="username" class=" form-check-label px-1">Username:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.username"
                        name="username"  autofocus=""  value=user.username />
                </div>
            </div>           
       
        </div>
         <div class="row px-4">
            <div class="row">
                <!-- password input  -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="newPassword" class=" form-check-label px-1">New password:</label>
                    <input disabled type="password" class="form-control rounded  inputPolje my-1" v-model.trim="password" 
                        name="newPassword"  autofocus="" value=user.password />
                </div>
                <!-- repeat password  -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="repeatPassword" class=" form-check-label px-1">Repeat password:</label>
                    <input disabled type="password" class="form-control rounded  inputPolje my-1" v-model.trim="repeatPassword"
                        name="repeatPassword"  autofocus="" value=user.password />
                </div>
            </div>
        </div>
        <div class="row px-4">
            <div class="row">   
                <!-- cotactTel -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="contactTel" class=" form-check-label px-1">Contact Phone:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.contactTel"
                        name="contactTel"  autofocus="" value=user.contactTel />
                </div>
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="website" class=" form-check-label px-1">Website:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.website"
                        name="website"  autofocus=""  value=user.website />                        
                </div>
            </div>
        </div>
        <div class="row px-4">
            <div class="row">
                <!-- instagram input  -->
                <div class="col-3 d-flex flex-column align-items-start">
                    <label for="instagram" class=" form-check-label px-1">Instagram:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.socialMedia.instagramLink" 
                        name="instagram"  autofocus="" value=user.socialMedia.instagramLink />
                </div>
                <!-- repeat password  -->
                <div class="col-3 d-flex flex-column align-items-start">
                    <label for="facebook" class=" form-check-label px-1">Facebook:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.socialMedia.facebookLink"
                        name="facebook"  autofocus="" value=user.socialMedia.facebookLink />
                </div>
                <div class="col-3 d-flex flex-column align-items-start">
                    <label for="twitter" class=" form-check-label px-1">Twitter:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.socialMedia.twitterLink"
                        name="twitter"  autofocus="" value=user.socialMedia.twitterLink />
                </div>
                <div class="col-3 d-flex flex-column align-items-start">
                    <label for="linkedIn" class=" form-check-label px-1">LinkedIn:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.socialMedia.linkedInLink"
                        name="linkedIn"  autofocus="" value=user.socialMedia.linkedInLink />
                </div>
            </div>
        </div>
        
        <div class="row px-4">
         <div class="row">   
                <!-- description -->
                <div class="col-12 d-flex flex-column align-items-start">
                    <label for="description" class=" form-check-label px-1">Description:</label>
                     <textarea disabled class="form-control rounded col-9 inputPolje my-1" name="description" v-model="user.description"
              placeholder="Company description" maxlength="500" rows="5" autoofocus required ></textarea>                    
                </div>
                 <div class="col-12 d-flex flex-column align-items-start">
                <label for="categories" class=" form-check-label px-1">Categories:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.categories"
                        name="categories"  autofocus=""  value=categories />    
                 </div>     
            </div>
        </div>
       
        <div v-if="editable" class="col-12 d-flex flex-column align-items-start">            
            <button @click="update" class="btn btn-lg btn-primary rounded dugme">Update profile</button>
        </div>
    
    </div>
    <!-- previous job ads  -->
    <div v-if="!isDataLoaded">
        <AppSpinner/>
    </div>
    
    <!-- Footer -->
    <div class="row">
      <Footer class="relative-bottom" />
    </div>
  </div>
</template>

<script>
import UserHeader from '../components/UserHeader.vue'
import Footer from '../components/Footer.vue'
import AppSpinner from '../components/AppSpinner.vue'

export default {
  title: 'IT Da Radis - Homepage',
  components: {
    UserHeader,
    AppSpinner,
    Footer
  },
  data() {
    return {
      isDataLoaded: false,
      user: null,
      password: null,
      repeatPassword: null,
      editable: false,
      categories: null,
    };
  },
  async created() {
    this.isDataLoaded = false
    let id = this.$cookies.get('id')
    await this.$store.dispatch('getCompanyByID',id)
    this.user = this.$store.getters['getCurrentCompany']
    this.isDataLoaded = true
    this.categories = this.user.categories.toString()
    console.log(this.user);
    console.log(this.categories)
  },
  methods: {
      edit() { 
        this.editable = !this.editable
        let inputs = document.querySelectorAll('input')
        let ta = document.querySelector("textarea")
        console.log(ta);
        if (ta.disabled) {
                ta.disabled = false
        }
        else { 
            ta.disabled = true

        }
        inputs.forEach(input => {
            if (this.editable) {
                input.disabled = false
            }
            else { 
                input.disabled = true

            }
        });
      },
      async update() { 

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
  background-color: whitesmoke

}
.editBtn { 
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 0.75rem;

    
}
.dugme {
  margin: 0.8rem;
  background-color: #00b1a8;
  color: white;
  outline: none;
  font-weight: 600;
}
.dugme:hover { 
  background-color: hsl(177, 100%, 20%);

}

</style>