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
                <img class="logo p-2" src="../assets/img/company-card-bg.jpg" alt="Logo firme"/>
              </div>
              <div class="mx-3 d-flex flex-column align-items-start mt-3 text-start">
                <h4 class="mb-3">{{ jobAd.name }} Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, provident.</h4>
                <div class="d-flex flex-column align-items-start">
                  <div class="d-flex flex-column align-items-start ">
                      <router-link :to="{name: 'AboutCompany', params: {id: company._id}}"><h5 class="company-name">{{company.name}}</h5></router-link>
                  </div>
                  <br>
                  <div class="d-flex flex-column">
                      <label class="par">{{jobAd.city}}</label>
                      <label class="par">{{jobAd.salary}}</label>
                      <label class="par">{{jobAd.expireAt | date-format}}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex jobAd-tags justify-content-start flex-wrap mt-3" >
                 <a  class="m-1 px-1 border tagBg" v-for="tag in jobAd.tags"  :key="tag" href="#!" >{{ tag }}</a >
            </div>
          </div>
          <div>
            <hr />
            <h4 class="text-muted">About this job</h4>
          </div>
          <div class="jobAd-description text-start ">
            <p class=" ">
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
          <hr/>
          <div class="apply-section">
            <button @click="toggleApplySection" class="btn btn-lg btn-primary rounded dugme">Apply here</button>
            <div class="apply-form" v-if="showApply">
                <h1>not yet</h1>
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
      showApply: false
      
    };
  },
    methods: {
        toggleApplySection() {
            this.showApply = !this.showApply
        }
    },
  async created() {
    this.userType = Vue.$cookies.get("userType");
    this.isDataLoaded = false;
    let id = this.$route.params.id;
    await this.$store.dispatch("getJobAdByID", id);
    this.jobAd = this.$store.getters["getCurrentJobAd"];
    await this.$store.dispatch('getCompanyByID',this.jobAd.companyID)
    this.company = this.$store.getters['getCurrentCompany']
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
  .company-name{
    align-self: center !important;
    display: flex !important;
  }
}
</style>