<template >
  <div class="container-fluid mainDiv " >
    <!-- header with navbar -->
    <CompanyHeader/>
    <!-- main -->
    <!-- user info  -->
    <div v-if="!isDataLoaded">
        <AppSpinner/>
    </div>
    <div v-else class="container card mt-3 p-4 pt-2 rounded infoDiv shadow-large">
        <div class="d-flex justify-content-between ">
            <h4 class="col-3 pt-3  text-start">Podaci o kompaniji:</h4>
            <button @click="edit" class="btn btn-lg btn-primary rounded dugme editBtn  "><font-awesome-icon  :icon="['fas', 'edit']" /></button>
        </div>
        <div class="row ">
            <div v-if="user.image" class="col-6 imgDiv align-items-start">
                <img  class="roundedImg img" v-bind:src= imageUrl  alt="Comapny logo">
            </div>
            <div v-else class="col-6 imgDiv align-items-start">
                <img  class="roundedImg img" src= "../assets/img/company-card-bg.jpg"  alt="Comapny logo">
            </div>
            <div class="col-5 align-items-start">
                <input type="file" class="form-control rounded mt-3"   @change="processFile($event)" id="customFile"/> 
            </div>
            <div class="col-2 align-items-start">
                <button @click="upload" class="btn btn-lg btn-primary rounded dugme editBtn p-2">Upload image</button>
            </div>

        </div>
        <div class="row px-4">
            <div class="row ">
                <!-- name -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="name" class=" form-check-label px-1 ">Name:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.name" 
                        name="name"  autofocus=""  value=user.name />
                </div>
                 <!-- username -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="username" class=" form-check-label px-1">Username:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.username"
                        name="username"  autofocus=""  value=user.username />
                </div>
               
            </div>
            <div class="row">
                <!-- email -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="email" class=" form-check-label px-1">Email:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.email" 
                        name="email"  autofocus=""  value=user.email />
                </div>
                <!-- address -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="address" class=" form-check-label px-1">Address:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.address"
                        name="address"  autofocus=""  value=user.address />
                </div>
            </div>           
       
        </div>
        
        <div class="row px-4">
            <div class="row">   
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
                <div class="col-3 d-flex flex-column align-items-start">
                    <label for="instagram" class=" form-check-label px-1">Instagram:</label>
                    <input disabled type="text" class="form-control rounded  inputPolje my-1" v-model.trim="user.socialMedia.instagramLink" 
                        name="instagram"  autofocus="" value=user.socialMedia.instagramLink />
                </div>
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
                placeholder="Company description" maxlength="1000" rows="5" autoofocus required ></textarea>                    
                </div>                     
            </div>            
        </div>
        <div v-if="editable" class="col-12 d-flex flex-row align-items-justify ">            
            <button @click="update" class="btn col-6 btn-lg btn-primary rounded dugme">Update profile</button>
             <button @click="deleteProfile" class="btn col-6 btn-lg btn-danger rounded dugme2">Delete profile</button>
        </div>        
        
        <div class="d-flex justify-content-between align-items-center mt-3">
            <h4 class="col-2  text-start">Promena šifre:</h4>
            <button @click="editPassword" class="btn btn-lg btn-primary rounded dugme editBtn" >
            <font-awesome-icon :icon="['fas', 'edit']" />
            </button>
        </div>

        <div class="row px-4">
            <div class="row">
                <!-- password input  -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="newPassword" class=" form-check-label px-1">New password:</label>
                    <input disabled type="password" class="form-control rounded passwordPolje my-1" v-model.trim="password" 
                        name="newPassword"  autofocus="" value=user.password />
                </div>
                <!-- repeat password  -->
                <div class="col-6 d-flex flex-column align-items-start">
                    <label for="repeatPassword" class=" form-check-label px-1">Repeat password:</label>
                    <input disabled type="password" class="form-control rounded passwordPolje my-1" v-model.trim="repeatPassword"
                        name="repeatPassword"  autofocus="" value=user.password />
                </div>
                
            </div>  
            <div v-if="passwordEditable" class="col-12 d-flex flex-column align-items-justify ">
                <button @click="changePassword" class="btn btn-lg btn-primary rounded dugme mt-3">Change password</button>
            </div>     
        </div>

        <div class="d-flex justify-content-between align-items-center mt-3">
            <h4 class="col-3 text-start">Izmena kategorija:</h4>            
        </div>

        <div class="row px-4">
            <div class="row">
                <div class="col-6 d-flex  flex-column align-items-start mt-3">
                    <label for="categories" class=" form-check-label px-1">Categories:</label>
                    <div class="categoriesInputs  d-flex flex-wrap mt-3 `">
                        <Category v-for="cat in categories" :key="cat" :category="cat" :allCategories="categories"/>
                    </div>                   
                </div>
                <div class="col-6 d-flex  flex-column align-items-start mt-3">
                    <label for="categories" class=" form-check-label px-1">Dodaj kategoriju:</label>
                    <input type="text" class="form-control rounded kategorijaPolje abcd my-1"
                        name="kategorijaPolje" v-model="inputkat" />
                    <button @click="addCategory" class="btn btn-lg btn-primary rounded dugme mt-3">Add Category</button>
                </div>
                <button @click="saveCategories" class="btn btn-lg btn-primary rounded dugme mt-3">Save categories</button>
            </div>            
        </div>
        <div v-if="categoriesEditable">
                
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
import Vue from 'vue'
import CompanyHeader from '../components/CompanyHeader.vue'
import Footer from '../components/Footer.vue'
import AppSpinner from '../components/AppSpinner.vue'
import Category from '../components/CompanyCategory.vue'

export default {
  title: 'IT Da Radis - Homepage',
  components: {
    CompanyHeader,
    Category,
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
      passwordEditable: false,
      categoriesEditable: false,
      inputkat: "",
      imageUrl: "",
      image: null
    };
  },
  computed: {
      categories() { 
          return this.$store.getters['getCurrentCompanyCategories']
      }
  },
  async created() {
    this.isDataLoaded = false
    let id = this.$cookies.get('id')
    await this.$store.dispatch('getCompanyByID',id)
    this.user = this.$store.getters['getCurrentCompany']
    
    this.isDataLoaded = true
    console.log(this.user);
    // const blob = new Blob([new Uint8Array(this.user.image.img.data.data)], {type: this.user.image.img.contentType})
    if(this.user.image != null){
        const url = btoa(String.fromCharCode.apply(null, new Uint8Array(this.user.image.img.data.data)));
        this.imageUrl = `data:${this.user.image.img.contentType};base64,${url}`
    }
  },
  methods: {
      edit() { 
        this.editable = !this.editable
        let inputs = document.querySelectorAll('.inputPolje')
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
     
      addCategory(){          
          this.categories.push(this.inputkat)
          this.inputkat = ""
          this.$store.dispatch('postaviCurrentCompanyCategories',this.categories)
      },
      enableCategory(id) { 
          console.log("ID:",id)
          let inputPolje = document.getElementById(id)
          inputPolje.disabled = !inputPolje.disabled
      },
      async update() { 
            await this.$store.dispatch('updateCompany', this.user)
            this.edit()
      },
      async changePassword(){
            let responseMessage = this.$helpers.validatePassword(this.password,this.repeatPassword)
            if ( responseMessage !== 'OK') { 
            Vue.toasted.show(responseMessage, { 
              theme: "bubble", 
              position: "top-center", 
              duration : 2000
    
                })
            } 
      await this.$store.dispatch('changePasswordCompany',{
        id: this.user._id,
        newPassword: this.repeatPassword
      })
      this.editPassword()
    },
    async saveCategories(){
        await this.$store.dispatch('upadteCategoriesCompany',{
            id: this.user._id,
            categories: this.categories
        })
        
    },
    async upload(){
        //treba id kompanije i form-data sa filename u body i image u form
        var form = new FormData()
        form.append('image', this.image);
        await this.$store.dispatch('uploadImage',{
            companyID: this.user._id,
            img: form
        })

      
    },
    processFile(event) {
        this.image = event.target.files[0];
        console.log(this.image)
    },
    async deleteProfile(){
        await this.$store.dispatch("deleteCompany",this.user._id)
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
.dugme2{
    margin: 0.8rem;
  color: white;
  outline: none;
  font-weight: 600;
}
.dugme:hover { 
  background-color: hsl(177, 100%, 20%);

}
.roundedImg { 
  border-radius: 10px  !important;
  height: 8rem;
  width: 10rem;

}
.imgDiv{
    height:8rem;
    width: 8rem;
    margin-bottom: 2%;
    margin-right: 4%;
}

</style>