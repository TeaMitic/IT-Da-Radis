<template>
  <div class="card col-lg-3  mx-2 my-3 px-0 rounded shadow  bg-white  kartica " v-bind:id="jobAd._id">
    <router-link :to="{name: 'CompanyPage', params: {id:jobAd.companyID}}">
        <img class="card-img-top roundedImg" src="../assets/img/company-card-bg.jpg" alt="Card image cap" />
    </router-link>
    <div class="card-body d-flex flex-column align-items-start">  
      <router-link :to="{ name: 'CompanyPage' }" ><h4 class="card-title ">{{jobAd.name}}</h4></router-link >
      <router-link :to="{ name: 'CompanyPage' }"><h6 class="card-subtitle">{{jobAd.companyID}}></h6></router-link>
      <p>{{jobAd.description}}</p>
      <label>{{jobAd.city}}</label>
      <label>{{jobAd.expireAt | date-format}}</label>
      <div class="d-flex flex-row flex-wrap ">
        <a class="m-1 px-1 border  tagBg " v-for="tag in jobAd.tags" :key="tag" href="#!" >{{ tag }}</a>
      </div>
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
    }
  },
  computed: { 
    
  },
 
  
 
  
};
</script>

<style scoped>
.kartica { 
    width: 100%;
}
.cursorNormal:hover { 
  cursor: default;
}
.link { 
    color: #5d6bf6;
    font-size: 14px;
    font-weight: 700;
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
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;

}
.tagBg { 
  font-weight: 700;
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
 