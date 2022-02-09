<template >
  <div class="container-fluid mainDiv">
    <!-- header with navbar -->
    <div v-if="userType == 'U'">
      <UserHeader />
    </div>
    <div v-else>
      <Header />
    </div>

    <div class="container-xxl px-0">
      <div v-if="isDataLoaded">
        <div class="px-5">
          <hr />
          <h4 class="text-muted">Job infromations</h4>
        </div>
        <div class="card rounded jobAd my-3 mx-5 p-5">
          <div class="d-flex flex-column jobAd-info">
            <div class="d-flex flex-row jobAd-info-basic">
              <div class="imageDiv d-flex justify-content-center">
                <img class="logo p-2" src="../assets/img/company-card-bg.jpg"  alt="Logo firme"/>
              </div>
              <div class=" mx-3 d-flex flex-column align-items-start mt-3 text-start" > 
                <h4 class="mb-3">
                  {{ jobAd.name }} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Eligendi, provident.
                </h4>
                <div class="d-flex flex-column align-items-start">
                  <div class="d-flex flex-column align-items-start">
                    <router-link :to="{ name: 'AboutCompany', params: { id: company._id }, }" >
                      <h5 class="company-name">{{ company.name }}</h5></router-link >
                  </div>
                  <br />
                  <div class="d-flex flex-column">
                    <label class="par">{{ jobAd.city }}</label>
                    <label class="par">{{ jobAd.salary }}</label>
                    <label class="par">{{ jobAd.expireAt | date-format }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex jobAd-tags justify-content-start flex-wrap mt-3">
              <a class="m-1 px-1 border tagBg" v-for="tag in jobAd.tags" :key="tag" href="#!" >{{ tag }}</a >
            </div>
          </div>
          <div>
            <hr />
            <h4 class="text-muted">About this job</h4>
          </div>
          <div class="jobAd-description text-start">
            <p class="">
              {{ jobAd.description }}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Aspernatur aliquam nobis delectus aut dolorem dicta architecto
              autem ut sint facere maiores obcaecati, eaque, ipsam rem aperiam!
              Perspiciatis vitae nulla sequi aspernatur deleniti nihil delectus
              veniam hic? Maiores cupiditate possimus culpa obcaecati nisi
              fugiat tenetur vitae animi cumque ut blanditiis illo assumenda
              optio nemo dolores odit, odio rem velit. Ab minus quod fuga? Ullam
              laudantium labore ipsam neque rerum minima perspiciatis
              repellendus iusto ipsum esse vero, impedit incidunt velit veniam
              ducimus reprehenderit, sequi animi. Incidunt unde a deleniti
              perferendis nisi eum et provident ipsum quas, velit non mollitia
              saepe aut. Minima magnam eius, praesentium minus porro totam
              laboriosam inventore rem placeat earum facere expedita eveniet
              omnis atque consectetur hic molestias fugiat! Corporis impedit at
            </p>
          </div>
        </div>
        <hr class="mx-5" />
        <div class="card apply-section mx-5 pt-3 px-5 rounded jobAd">
          <h4 class="text-muted">Interested about this job?</h4>
          <div>
            <button @click="toggleApplySection" class="btn btn-lg btn-primary rounded dugme my-4" > Apply here </button>
          </div>
          <div class="apply-form card rounded mb-3 px-5 py-3" v-if="showApply">
            <div v-if="isUserDataLoaded" lass="user-form ">
              <label class="" for="user-info-group">Your informations:</label>
              <div class="user-info-group" name="user-info-group">
                <div class="row">
                  <!-- name -->
                  <div class="col-6 d-flex flex-column align-items-start">
                    <label for="name" class="form-check-label px-1">Name:</label>
                    <input type="text" class="form-control rounded inputPolje my-1" v-model.trim="user.name" name="name"/>
                  </div>
                  <!-- surname -->
                  <div class="col-6 d-flex flex-column align-items-start">
                    <label for="surname" class="form-check-label px-1">Surname:</label >
                    <input type="text"  class="form-control rounded inputPolje my-1" v-model.trim="user.surname" name="surname"/>
                  </div>
                </div>
                <div class="row">
                  <!-- username -->
                  <div class="col-6 d-flex flex-column align-items-start">
                    <label for="username" class="form-check-label px-1">Username:</label>
                    <input type="text" class="form-control rounded inputPolje my-1" v-model.trim="user.username" name="username" />
                  </div>
                  <!-- mail -->
                  <div class="col-6 d-flex flex-column align-items-start">
                    <label for="email" class="form-check-label px-1" >Email:</label > 
                    <input type="text" class="form-control rounded inputPolje my-1" v-model.trim="user.email" name="email" />
                  </div>
                </div>
                <div class="row">
                  <!-- contact telephone -->
                  <div class="col-6 d-flex flex-column align-items-start">
                    <label for="contact_tel" class="form-check-label px-1">Contact telephone:</label >
                    <input type="tel" class="form-control rounded inputPolje my-1" v-model.trim="user.contactTel" name="contact_tel"/>
                  </div>
                  <!-- cv -->
                  <!-- <div class="col-6 d-flex flex-column align-items-start">
                          <label for="contact_tel" class="form-check-label px-1">CV:</label>
                          <input  type="file" class="form-control rounded inputPolje my-1"  name="cv" @change="processFile($event)"/> 
                        </div> -->
                </div>
                <div class="row">
                  <label class="d-flex" name="cv">CV:</label>
                  <textarea class="rounded p-3" name="cv" maxlength="150" cols="30" rows="10" > 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, porro hic blanditiis
                    tenetur eligendi repellat saepe sit minus labore veniam suscipit expedita officiis iste 
                    id aliquid doloribus maiores inventore quae! Nihil autem quaerat cum sunt natus tempore ullam 
                    aut quis, neque nisi qui quasi voluptatum est vel ab vero officiis velit facilis quos et atque? 
                    Reiciendis vero itaque aliquid totam illo tenetur cum soluta voluptatibus facere maiores, consequatur 
                    doloremque officiis aspernatur nisi incidunt distinctio eveniet expedita non esse reprehenderit 
                    nostrum sint? Autem laudantium dicta eius delectus id fugiat hic quaerat dolore enim iure ipsam 
                    debitis laboriosam, ut animi dolorem vel aut nam mollitia minima at eum unde in nesciunt! Repellendus 
                    adipisci saepe ex harum repudiandae cum eos officiis perferendis itaque! Iste suscipit molestias 
                    adipisci deserunt distinctio nemo dolorum maiores vel neque, magnam quam commodi a laudantium officiis. 
                    Ut molestias voluptatem molestiae doloremque odit ex iste quam ratione tempore! Ab, expedita.
                  </textarea>
                </div>
              </div>
              <button @click="send" class="btn btn-lg btn-primary rounded dugme mt-3">Send</button>
            </div>
            <div v-else>
              <AppSpinner />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <AppSpinner />
      </div>
    </div>
    <!-- Footer -->
    <div class="row">
      <Footer class="relative-bottom" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Header from "../components/Header.vue";
import UserHeader from "../components/UserHeader.vue";
import Footer from "../components/Footer.vue";
import AppSpinner from "../components/AppSpinner.vue";
import router from "../router/index";

export default {
  title: "IT Da Radis - Homepage",
  components: {
    UserHeader,
    AppSpinner,
    Header,
    Footer,
  },
  data() {
    return {
      isDataLoaded: false,
      userType: null,
      jobAd: null,
      company: null,
      showApply: false,
      user: null,
      isUserDataLoaded: false,
      cv: null,
    };
  },
  methods: {
    processFile(event) {
      this.cv = event.target.files[0];
    },
    async getUser() {
      let id = Vue.$cookies.get("id");
      await this.$store.dispatch("getUserByID", id);
      this.user = this.$store.getters["getCurrentUser"];
    },
    async toggleApplySection() {
      this.isUserDataLoaded = false;
      this.showApply = !this.showApply;
      this.userType = Vue.$cookies.get('userType')
      if (this.userType !== "U") {
        Vue.toasted.show("Morate biti prijavljeni za izabranu akciju.", {
          theme: "bubble",
          position: "top-center",
          duration: 2000,
        });
        router.push("/login");
      }
      if (this.user == null) {
        await this.getUser();
      }
      this.isUserDataLoaded = true;
    },
  },
  async created() {
    this.userType = Vue.$cookies.get("userType");
    this.isDataLoaded = false;
    let id = this.$route.params.id;
    await this.$store.dispatch("getJobAdByID", id);
    this.jobAd = this.$store.getters["getCurrentJobAd"];
    await this.$store.dispatch("getCompanyByID", this.jobAd.companyID);
    this.company = this.$store.getters["getCurrentCompany"];
    this.isDataLoaded = true;
  },
};
</script>

<style scoped>
.logo {
  width: 10rem;
  height: 10rem;
  border-radius: 2rem !important;
}
.rounded {
  border-radius: 10px !important;
}

.mainDiv {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  background-color: whitesmoke;
}
.link {
  color: #5d6bf6;
  font-size: 14px;
  font-weight: 550;
  letter-spacing: 0;
  line-height: 18px;
  text-decoration: none;
  cursor: pointer;
}
.textColor {
  color: #2c3e50;
}
.par {
  font-size: 14px;
  color: #2c3e50;
  font-weight: 550;
  letter-spacing: 0;
  line-height: 18px;
  text-decoration: none;
  cursor: default;
}
.link:hover {
  text-decoration: underline;
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

.tagBg {
  font-weight: 550;
  letter-spacing: 0;
  border-radius: 2px;
  background-color: #f4f5f9;
  color: #8b8b9f;
  font-size: 1rem;
  border-color: transparent !important;
}
.tagBg:hover {
  background-color: hsl(240, 1%, 78%);
  transition: 0.25s;
}
@media (max-width: 576px) {
  .jobAd-info-basic {
    display: flex !important;
    flex-direction: column !important;
  }
  .jobAd {
    margin: 2rem !important;
    padding: 2rem !important;
  }
  .company-name {
    align-self: center !important;
    display: flex !important;
  }
}
</style> 