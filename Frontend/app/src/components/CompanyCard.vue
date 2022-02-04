<template>
  <div class="card col-lg-3  mx-2 my-3 px-0 rounded" v-bind:id="company._id">
    <router-link :to="{name: 'CompanyPage', params: {id:company._id}}">
      <img class="card-img-top roundedImg" src="../assets/img/company-card-bg.jpg" alt="Card image cap" />
    </router-link>
    <div class="card-body d-flex flex-column align-items-start">
      <router-link :to="{ name: 'CompanyPage' }" ><h4 class="card-title ">{{company.name}}</h4></router-link >
      <a v-bind:href="company.website" target="_blank">{{company.website}}</a>
      <div class="d-flex flex-row flex-wrap ">
        <a class="m-1 px-1 border  tagBg" v-for="tag in company.categories" :key="tag" href="#!">{{ tag }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { 
    company: { 
      required: true,
      type: Object
    }
  },
  data() {
    return {
      
    };
  },
  
};
</script>

<style scoped>
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
 