<template >
  <div class="container-fluid mainDiv">
    <!-- header with navbar -->
    <CompanyHeader />

    <div class="container-xxl px-0">
      <!-- company cards -->
      <div v-if="isDataLoaded" class="container">
        <button  @click="showForm" class="btn col 12 m-3 btn-lg btn-block btn-primary rounded dugme mt-1" >Novi oglas</button>
        <div v-if="isShowFrom"> 
          <div class="container card mt-3 p-4 pt-2 rounded infoDiv shadow-large">
            <div class="d-flex">
              <h4 class="col-3 pt-3 text-start">Napravi novi oglas:</h4>
            </div>
            <div class=" row px-4 ">
              <div class="row">
                <!-- ad name -->
                <div class="col-4 d-flex flex-column align-items-start">
                  <label for="name" class="form-check-label px-1">Ime:</label>
                  <input type="text" class="form-control rounded inputPolje my-1" v-model.trim="adName" name="name"   autofocus=""  />
                </div>
                <!-- ad city  -->
                <div class="col-4 d-flex flex-column align-items-start">
                  <label for="city" class="form-check-label px-1">Grad:</label>
                  <input type="text" class="form-control  rounded inputPolje my-1" v-model.trim="adCity" name="city"  autofocus="" />
                </div>
                <!-- time expires -->
                <div class="col-4 d-flex flex-column align-items-start">
                  <label for="time" class="form-check-label px-1" >Rok za prijavu:</label>
                  <input type="date" class="form-control rounded inputPolje my-1" v-model.trim="adExpires" name="timeExpires" autofocus="" />
                </div>
              </div>
              <div class="row">
                <!-- salary -->
                <div class="col-4 d-flex flex-column align-items-start">
                  <label for="salary" class="form-check-label px-1">Plata:</label>
                  <input type="text" class="form-control rounded inputPolje my-1" v-model.trim="adSalary" name="salary" autofocus="" /> 
                </div>
                <!-- tags -->
                <div class="col-4 d-flex flex-column align-items-start">
                  <label for="tags" class="form-check-label px-1">Tag: </label>
                  <input type="text" class="form-control rounded inputPolje my-1" v-model.trim="adTag" name="tags" autofocus=""  />
                </div>
                <div class="col-4 d-flex flex-column align-items-start justify-content-end " >
                  <button @click="addTag" class="btn btn-lg btn-primary rounded dugme" > Dodaj tag</button>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex flex-column align-items-start">
                  <label for="time" class="form-check-label px-1">Tagovi:</label>
                  <div class="col-12 d-flex flex-row flex-wrap">
                    <div v-for="tag in this.adTags" :key="tag" class="col-2 container boja  card rounded d-flex flex-row p-2  align-items-start justify-content-between" >
                      <label for="tag" class="form-check-label px-1">{{tag}}</label>
                      <button @click="deleteTag(tag)" class="btn btn-sm btn-danger rounded">X</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex flex-column align-items-start">
                  <label for="description" class="form-check-label px-1" >Description:</label>
                  <textarea class="form-control rounded col-9 inputPolje my-1" name="description" v-model="adDescription" 
                    placeholder="Company description" maxlength="1000" rows="5" autoofocus required >
                  </textarea>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button @click="createAd" class="btn btn-lg btn-primary rounded dugme" >Napravi oglas</button>
            </div>
          </div>
        </div>
        <div v-if="jobAds">
          <div class="d-flex justify-content-between">
            <h4 class="col-3 pt-3 text-start">Moji oglasi:</h4>
          </div>
          <div class="container card mt-3 p-4 pt-2 rounded infoDiv shadow-large" >
            <CompanyJobCard v-for="job in jobAds" :key="job._id" :jobAd="job" />
          </div>
        </div>
      </div>
      <div v-else>
        <AppSpinner />
      </div>
      <!-- Footer -->
    </div>
      <div class="row">
        <Footer class="relative-bottom" />
      </div>
  </div>
</template>

<script>
import Vue from "vue";
import CompanyHeader from "../components/CompanyHeader.vue";
import Footer from "../components/Footer.vue";
import AppSpinner from "../components/AppSpinner.vue";
import CompanyJobCard from "../components/JobCardCompany.vue";
export default {
  title: "IT Da Radis - Homepage",
  components: {
    AppSpinner,
    Footer,
    CompanyHeader,
    CompanyJobCard,
    
  },
  data() {
    return {
      isDataLoaded: false,
      user: null,
      adSalary: null,
      adName: null,
      adExpires: null,
      adDescription: null,
      adTags: [],
      adTag: null,
      adCity: null,
      isShowFrom: false

      //   userType: null
    };
  },
  computed: {
    jobAds() {
      return this.$store.getters["getCurrentCompanyJobAds"];
    },
  },
  async created() {
    this.userType = this.$cookies.get("userType");
    let id = await this.$cookies.get("id");
    this.isDataLoaded = false;
    await this.$store.dispatch("getCompanyByID", id);
    await this.$store.dispatch("getCompanyJobAds", id);
    this.user = this.$store.getters["getCurrentCompany"];
    this.isDataLoaded = true;
  },
  methods: {
    validateInputs() { 
      let inputs = document.querySelectorAll('.inputPolje')
      let valid = false
      for (let element of inputs) { 
        let responseMessage = this.$helpers.validateInput(element)
        if (responseMessage != 'OK') { 
          valid = false
          Vue.toasted.show(responseMessage, {
            theme: "bubble",
            position: "top-center",
            duration: 2000,
          });
          break
        }
        valid = true
      }
        
      return valid
    },
    async createAd() {
      if (this.validateInputs()) { 
        await this.$store.dispatch("createAd", {
          companyID: this.user._id,
          ad: {
            name: this.adName,
            desc: this.adDescription,
            city: this.adCity,
            salary: 100,
            tags: this.adTags,
            expireAt: this.adExpires,
          },
        });
        await this.$store.dispatch("getCompanyJobAds", this.user._id);
      }
    },
    addTag() {
      if (this.adTag == null || this.adTag == "") {
        Vue.toasted.show("Polje za tag mora biti popunjeno.", {
          theme: "bubble",
          position: "top-center",
          duration: 2000,
        });
      } else if (this.adTags.indexOf(this.adTag) >= 0) {
        Vue.toasted.show("Taj tag ste vec uneli.", {
          theme: "bubble",
          position: "top-center",
          duration: 2000,
        });
      }
      else { 
        this.adTags.push(this.adTag);
      }
    },
    showForm(){
      this.isShowFrom=!this.isShowFrom
    },
    deleteTag(tag){
			this.adTags.pop(tag);
		},
    // this.userType = Vue.$cookies.get('userType')
    // this.isDataLoaded = false
    // await this.$store.dispatch('getAllCompanies', 2)
    // this.isDataLoaded = true
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
.boja { 
  background-color: #00b1a867;

}
.dugme {
  margin: top 0.8rem;
  background-color: #00b1a8;
  color: white;
  outline: none;
  font-weight: 600;
}
.dugme:hover {
  background-color: hsl(177, 100%, 20%);
}
.pictureSection {
  background-image: url("../assets/img/job-interview.jpg");
}
</style> 