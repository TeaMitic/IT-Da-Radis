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
      <!-- technologies  -->
      <div v-if="isDataLoaded" class="card flex-row flex-wrap d-flex tagForm">
        <div
          class="m-2 cat rounded catDiv d-flex flex-row align-items-center"
          v-for="cat in allCategories"
          :key="cat.nameOfCat"
          @click="searchByCategory(cat.nameOfCat)"
        >
          <div class="cat-info">
            <label class="cat-name setCursor" v-bind:value="cat.nameOfCat">{{
              cat.nameOfCat
            }}</label>
            <label label class="setCursor">{{ cat.numOfComp }}</label>
          </div>
        </div>
        <div v-if="showCancel" class="d-flex py-2">
          <button
            @click="noFilterCompanies"
            class="btn btn-sm btn-danger rounded"
          >
            X
          </button>
        </div>
        <!-- search box  -->
        <div class="container-fluid searchForm ">
        <div class="input-group d-flex justify-content-end">
            <div class="form-outline d-flex align-items-center">
                <input type="search" id="form1" class="form-control rounded searchBar "  @change="checkInput($event)"  placeholder="Company name.." v-model="searchName"/>
            </div>
            <button type="button" @click="searchByName" class="btn btn-primary dugme rounded p-2 my-2 searchBtn ">
                <font-awesome-icon  :icon="['fas', 'search']" />
            </button>
        </div>
    </div>
      </div>
      <div v-else>
        <AppSpinner/>
      </div>
      <!-- company cards -->
      <div v-if="isDataLoaded" class="container">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="row justify-content-around">
            <CompanyCard
              v-for="company in allCompanies"
              :key="company._id"
              :company="company"
            />
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
import CompanyCard from "../components/CompanyCard.vue";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import UserHeader from "../components/UserHeader.vue";
import AppSpinner from "../components/AppSpinner.vue";

export default {
  title: "IT Da Radis - Companies",
  components: {
    UserHeader,
    AppSpinner,
    Header,
    CompanyCard,
    Footer,
  },
  // props: { 
  //   filterTag: null,
  // },
  data() {
    return {
      isDataLoaded: false,
      userType: null,
      showCancel: false,
      searchName: "",
    };
  },
  computed: {
    allCompanies() {
      return this.$store.getters["getAllCompanies"];
    },
    allCategories() {
      return this.$store.getters["getAllCategories"];
    },
  },
  methods: {
    clearTagForm() { 
      this.showCancel = false;
      let catDivs = document.querySelectorAll(".catDiv");
      catDivs.forEach((element) => {
        element.classList.remove("selected-cat");
      });
    },
    clearSearchForm() { 
      this.searchName = ""
    },
    // enterFunc(event) { 
    //   console.log(event);
    //   if (event.keyCode == 13) { 

    //   }
    // },
    async checkInput(event) { 
      let value = event.target._value
      if (value == "") { 
        await this.noFilterCompanies()
      }
    },
    async searchByName() { 
      if (this.searchName != "" ) { 
        this.clearTagForm()
        await this.filterCompanies(this.searchName)
      }

    },
    async filterCompanies(index) { 
      await this.$store.dispatch("getCompaniesByIndex", {
        trazeniTag: index,
      });
    },
    async searchByCategory(category) {
      this.clearSearchForm()
      let catDivs = document.querySelectorAll(".catDiv");
      catDivs.forEach((element) => {
        let catName = element.querySelector(".cat-name").innerHTML;
        if (catName == category) {
          element.classList.add("selected-cat");
        } else {
          element.classList.remove("selected-cat");
        }
      });
      await this.filterCompanies(category)
      this.showCancel = true;
    },
    async noFilterCompanies() {
      this.clearTagForm()
      this.clearSearchForm()
      await this.$store.dispatch("getAllCompanies", 0);
    },
  },
  async created() {
    this.userType = Vue.$cookies.get("userType");
    this.isDataLoaded = false;
    await this.$store.dispatch("getAllCategories");
    let preload_cat = this.$route.params.tag

    if (preload_cat == '_') { 
        await this.noFilterCompanies();
      }
    else { 
      await this.filterCompanies(preload_cat)
    }
    
    this.isDataLoaded = true;
  },
  
    

};
</script>
<style scoped>

.mainDiv {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  background-color: whitesmoke;
}
.cat {
  padding: 0.5rem 1rem 0.5rem 1rem;

  font-weight: 550;
  letter-spacing: 0;
  background-color: rgba(45, 154, 149, 0.494);

  color: white;
  font-size: 1rem;
  border-color: transparent !important;
}
.cat-name {
  margin-right: 0.5rem;
}
.cat:hover {
  background-color: rgba(198, 198, 199, 0.993);
  transition: 0.25s;
  cursor: pointer;
}
.cancelFilterBtn {
  margin-left: 0.5rem;
}
.selected-cat {
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