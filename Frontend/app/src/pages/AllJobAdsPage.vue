<template >
  <div  class="container-fluid mainDiv">
    <!-- header -->
    <div v-if="userType == 'U'">
      <UserHeader />
    </div>
    <div v-else>
      <Header />
    </div>
    <div class="container-xxl px-0">
      <!-- technologies  -->
      <div v-if="isDataLoaded" class="card flex-row flex-wrap d-flex tagForm">
        <div
          class="m-2 tag rounded tagDiv d-flex flex-row align-items-center"
          v-for="tag in allJobTags"
          :key="tag.tag"
          @click="searchByTag(tag.tag)"
        >
          <div class="tag-info">
            <label class="tag-name setCursor" v-bind:value="tag.tag">{{
              tag.tag
            }}</label>
            <label label class="setCursor">{{ tag.num }}</label>
          </div>
        </div>
        <div v-if="showCancel" class="d-flex py-2">
          <button
            @click="noFilterJobs"
            class="btn btn-sm btn-danger rounded"
          >
            X
          </button>
        </div>
        <!-- search box  -->
        <div class="container-fluid searchForm ">
        <div class="input-group d-flex justify-content-end">
            <div class="form-outline d-flex align-items-center">
                <input type="search" id="form1" class="form-control rounded searchBar "  @change="checkInput($event)"  placeholder="Search by name or city.." v-model="searchValue"/>
            </div>
            <button type="button" @click="searchByIndex" class="btn btn-primary dugme rounded p-2 my-2 searchBtn ">
                <font-awesome-icon  :icon="['fas', 'search']" />
            </button>
        </div>
    </div>
      </div>
      <div v-else>
        <AppSpinner/>
      </div>
     
    </div>
    <!-- lista svih poslova  -->
    <div v-if="isDataLoaded" class="container">
        <div class=" gx-4 gx-lg-5 ">
          <div class="d-flex flex-column align-items-stretch ">
            <JobCard  v-for="job in allJobAds" :key="job._id" :jobAd="job"/>
          </div>
        
        </div>
      </div>
      <!-- appspinner -->
    <div v-else>
      <AppSpinner/>
    </div>
    <!-- footer -->
    <div class="row">
      <Footer class="relative-bottom"/>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import UserHeader from "../components/UserHeader.vue";
import JobCard from '../components/JobCard.vue'
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import AppSpinner from '../components/AppSpinner.vue'

export default {
  components: {
    AppSpinner,
    JobCard,
    Footer,
    UserHeader,
    Header,
  },
  title: 'IT Da Radis - Jobs',
  data() {
    return {
      userType: null,
      isDataLoaded: false,
      searchValue: "",
      showCancel: false,

    };
  },
  computed: {
    
    allJobAds() { 
      return this.$store.getters['getAllJobAds']
    },
    allJobTags() { 
      return this.$store.getters['getAllJobTags']
      
    }
  },
  async created() {
    this.userType = Vue.$cookies.get("userType");
    this.isDataLoaded = false
    await this.$store.dispatch('getAllJobTags')
    let preload_tag = this.$route.params.tag
    if (preload_tag == '_') { 
        await this.noFilterJobs();
    }
    else { 
      await this.filterJobs(preload_tag)
    }
    this.$cookies.set('currentPage',`AllJobAds/${this.$route.params.tag}`, "1h" )

    this.isDataLoaded = true


  },
  methods: { 
    clearTagForm() { 
      this.showCancel = false;
      let tagDivs = document.querySelectorAll(".tagDiv");
      tagDivs.forEach((element) => {
        element.classList.remove("selected-tag");
      });
    },
    clearSearchForm() { 
      this.searchValue = ""
    },
    async checkInput(event) { 
      let value = event.target._value
      if (value === "") { 
        await this.noFilterJobs()
      }
    },
    async searchByIndex() { 
      if (this.searchValue != "" ) { 
        this.clearTagForm()
        await this.filterJobs(this.searchValue)
      }
    },
    async filterJobs(index) { 
      await this.$store.dispatch("getJobAdsByIndex", {
        trazeniTag: index,
      });
    },
    async searchByTag(tag) {
      this.clearSearchForm()
      let tagDivs = document.querySelectorAll(".tagDiv");
      tagDivs.forEach((element) => {
        let tagName = element.querySelector(".tag-name").innerHTML;
        if (tagName == tag) {
          element.classList.add("selected-tag");
        } else {
          element.classList.remove("selected-tag");
        }
      });
      await this.filterJobs(tag)
      this.showCancel = true;
    },
    async noFilterJobs() {
      this.clearTagForm()
      this.clearSearchForm()
      await this.$store.dispatch('getAllJobAds')

    },
   
  }
};
</script>
<style scoped>

.mainDiv {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  background-color: whitesmoke;
}
.tag {
  padding: 0.5rem 1rem 0.5rem 1rem;

  font-weight: 550;
  letter-spacing: 0;
  background-color: rgba(45, 154, 149, 0.494);

  color: white;
  font-size: 1rem;
  border-color: transparent !important;
}
.tag-name {
  margin-right: 0.5rem;
}
.tag:hover {
  background-color: rgba(198, 198, 199, 0.993);
  transition: 0.25s;
  cursor: pointer;
}
.cancelFilterBtn {
  margin-left: 0.5rem;
}
.selected-tag {
  background-color: rgba(198, 198, 199, 0.993) !important;
}
.setCursor {
  cursor: pointer;
}
.dugme {
  margin: top 0.8rem;
  margin-bottom: 0.8rem;
  background-color: #00b1a8;
  color: white;
  outline: none;
  font-weight: 600;
  width: 3rem;

}
.dugme:hover {
  background-color: #006661;
}

.rounded {
  border-radius: 10px !important;
}
.searchBar { 
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.searchBtn { 
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}
.searchForm { 
    background-color: hsl(177deg 12% 91%);
}
.tagForm { 
  background-color: hsl(177deg 12% 91%);
  padding-left: 1rem;
  padding-right: 1rem
  
}
@media (max-width: 576px) {
  .cat {
    font-size: 2vh;
  }
}
</style>