<template>
  <div v-if="isDataLoaded" class="card rounded shadow  kartica my-3 mx-5 p-5 " v-bind:id="candidate.userID">
    
    <div class="card-body d-flex flex-column align-items-start ">  
      <h4 class="card-title">{{candidate.name}} {{candidate.surname}}</h4>
      <!-- <h4 class="card-title">{{jobAd.name}}</h4> -->
      <!-- <router-link :to="{ name: 'AboutCompany', params: { id: jobAd.companyID}  }"><h6 class="card-subtitle">{{company.name}}</h6></router-link> -->
      <!-- <br><h6 class="card-subtitle">{{company.name}}</h6> -->
      <label><b class="mx-1">Email:</b> {{candidate.userEmail}}</label>
      <label><b class="mx-1">Tel:</b> {{candidate.userTel}}</label>
      <div class="d-flex flex-row flex-wrap mt-1 mx-1 align-items-center">
        <label><b class="mx-1">CV: </b> </label>
        <a v-bind:href=downloadCV v-bind:download=candidate.cv.name >{{candidate.cv.name}}</a>
        <font-awesome-icon :icon="['fas', 'file-download']" class="mx-2"/>
      </div>
    </div>
    <!-- <div class="d-flex align-items-center pictureDiv">
        <router-link  :to="{name: 'CompanyJobAd', params: {id:jobAd.jobAd._id}}">
            <img class=" roundedImg " v-bind:src= imageUrl alt="Comapny logo" />
        </router-link>
    </div> -->
    
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
   props: { 
    candidate: { 
      required: true,
      type: Object
    },
  },
  data() {
    return {
        isDataLoaded: false,
        // company: null,
        downloadCV: null 

    }
  }, 
  async created(){
      console.log(this.candidate.cv)
      if(this.candidate.cv.data != null){
        const blob = new Blob([new Uint8Array(this.candidate.cv.data.data)], {type: this.candidate.cv.contentType })
        this.downloadCV = window.URL.createObjectURL(blob)
        this.isDataLoaded=true
      }
  }
}
</script>

<style >
.kartica { 
    /* width: 100%; */
    display: flex !important;
    flex-direction: row;
}
</style>
