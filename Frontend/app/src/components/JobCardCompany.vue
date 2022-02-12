<template>
  <div v-if="isDataLoaded" class="card col-lg-3   my-3 px-0 rounded shadow   kartica " v-bind:id="jobAd._id">
    
    <div class="card-body d-flex flex-column align-items-start ">  
      <router-link :to="{ name: 'CompanyJobAd', params: { id: jobAd._id} }" ><h4 class="card-title ">{{jobAd.name}}</h4></router-link >
      <!-- <h4 class="card-title">{{jobAd.name}}</h4> -->
      <!-- <router-link :to="{ name: 'AboutCompany', params: { id: jobAd.companyID}  }"><h6 class="card-subtitle">{{company.name}}</h6></router-link> -->
      <br><h6 class="card-subtitle">{{company.name}}</h6>
      <label>{{jobAd.city}}</label>
      <label>{{jobAd.expireAt | date-format}}</label>
      <div class="d-flex flex-row flex-wrap ">
        <div class="m-1 px-1 border  tagBg cursorNormal" v-for="tag in jobAd.tags" :key="tag"  >{{ tag }}</div>
      </div>
      <div class="d-flex flex-row flex-wrap mt-1 ">
          <h5>Broj prijava: {{numOfApplicants.num}}</h5>
      </div>
    </div>
    <div v-if="company.image" class="d-flex align-items-center pictureDiv">
        <router-link  :to="{name: 'CompanyJobAd', params: {id:jobAd._id}}">
            <img  class=" roundedImg " :src= imageUrl alt="Comapny logo" />
        </router-link>
    </div>
    <div v-else class="d-flex align-items-center pictureDiv">
        <router-link  :to="{name: 'CompanyJobAd', params: {id:jobAd._id}}">
            <img  class=" roundedImg " src= "../assets/img/company-card-bg.jpg" alt="Comapny logo" />
        </router-link>
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
  },
  data() {
    return {
        isDataLoaded: false,
        company: null,
        numOfApplicants: null,
        imageUrl:null,

    }
  },
  
  async created() {
    await this.$store.dispatch('getCompanyByID',this.jobAd.companyID)
    this.company = this.$store.getters['getCurrentCompany']
     await this.$store.dispatch('postaviNumOfApplicants',this.jobAd._id)
    this.numOfApplicants = this.$store.getters['getNumberOfApplicants'] 
    if(this.company.image != null){
      const url = btoa(new Uint8Array(this.company.image.img.data.data).reduce(function(data,byte) { 
        return data + String.fromCharCode(byte);
      }, ''))
      // const url = btoa(String.fromCharCode.apply(null, new Uint8Array(this.company.image.img.data.data)));
      this.imageUrl = `data:${this.company.image.img.contentType};base64,${url}`
    }
    this.isDataLoaded = true
  },
 
  
 
  
};
</script>

<style scoped>
.pictureDiv { 
    margin: 3rem;
}
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
</style>
 