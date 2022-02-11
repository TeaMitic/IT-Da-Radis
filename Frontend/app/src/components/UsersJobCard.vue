<template>
  <div v-if="isDataLoaded" class="card col-md-12 col-lg-5  m-3 px-0 rounded shadow flex-row" v-bind:id="jobAd._id">
    
    <div class="card-body d-flex flex-column align-items-start ">  
      <router-link :to="{ name: 'AboutJobAd', params: { id: jobAd._id} }" ><h4 class="card-title ">{{jobAd.name}}</h4></router-link >
      <router-link :to="{ name: 'AboutCompany', params: { id: jobAd.companyID}  }"><h6 class="card-subtitle">{{company.name}}</h6></router-link>
      <br>
      <label>{{jobAd.city}}</label>
      <label>{{jobAd.expireAt | date-format}}</label>
      <div class="d-flex flex-row flex-wrap ">
        <router-link :to="{name: 'AllJobAds', params: {tag: tag}}" class="m-1 px-1 border tagBg" v-for="tag in jobAd.tags" :key="tag" >{{tag}}</router-link>
      </div>
      <div class="cv d-flex flex-row flex-wrap mt-1 mx-1 align-items-center">
        <label><b class="mx-1">CV: </b> </label>
        <a v-bind:href=downloadCV v-bind:download=cv.name >{{cv.name}}</a>
        <font-awesome-icon :icon="['fas', 'file-download']" class="mx-2"/>

      </div>
    </div>
    <div class="px-3 py-2">
      <button class="btn btn-lg btn-danger rounded mt-3  dugme deleteBtn " @click="deleteJob">X</button>
    </div>
    
    
  </div>
</template>

<script>
export default {
  
  props: { 
    jobAd: { 
      required: true,
      type: Object
    },
    jobRelID: { 
      required: true,
      type: String
    },
    allUsersJobs: {
      required: true,
      type: Array
    },
    cv: { 
      required: false,
      type: Object
    }
  },
  data() {
    return {
        isDataLoaded: false,
        company: null,
        downloadCV: null 

    }
  },
  
  async created() {
    await this.$store.dispatch('getCompanyByID',this.jobAd.companyID)
    this.company = this.$store.getters['getCurrentCompany']
    if (this.cv.data != null) {
      const blob = new Blob([new Uint8Array(this.cv.data.data)], {type: this.cv.contentType })
     
      this.downloadCV = window.URL.createObjectURL(blob)
      

    }

    this.isDataLoaded = true
  },
  methods: { 
    async deleteJob() { 
      await  this.$store.dispatch('deleteJobApplication', this.jobRelID)
      this.$store.dispatch('postaviCurrentUserJobs', this.allUsersJobs.filter(job => job._id != this.jobRelID))
    }
  }
  
 
  
};
</script>

<style scoped>

.kartica { 
    width: 100%;
    display: flex !important;
    flex-direction: row;
}
.cursorNormal:hover { 
  cursor: default;
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
.link:hover { 
  text-decoration: underline;
}
.rounded { 
  border-radius: 10px !important;
 
}
.roundedImg { 
  border-radius: 10px  !important;
  height: 8rem;
  width: 8rem;

}
.tagBg { 
  font-weight: 550;
  letter-spacing: 0;
  border-radius: 2px;
  background-color: #f4f5f9;
  color: #8b8b9f;
  font-size: small;
  border-color: transparent !important;
}
.tagBg:hover { 
  background-color: hsl(240, 1%, 78%);
  transition: 0.25s;

}
.dugme {
  /* margin: 0.8rem; */
  background-color: #00b1a8;
  color: white;
  outline: none;
  font-weight: 600;
}
.dugme:hover {
  background-color: hsl(177, 100%, 20%);
}
.deleteBtn {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}
.deleteBtn:hover {
  background-color: #bb2d3b;
  border-color: #b02a37;
}
</style>
 