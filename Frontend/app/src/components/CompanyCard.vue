<template>
  <div class="card col-lg-3  mx-2 my-3 px-0 rounded shadow  " v-bind:id="company._id">
    <!-- <router-link :to="{name: 'AboutCompany', params: {id: company._id}}">
      <img class="card-img-top roundedImg img" v-bind:src= imageUrl alt="Card image cap" />
    </router-link> -->
    <div v-if="company.image">
        <router-link  :to="{name: 'AboutCompany', params: {id: company._id}}">
            <img  class=" roundedImg img" :src= imageUrl alt="Comapny logo" />
        </router-link>
    </div>
    <div v-else>
        <router-link :to="{name: 'AboutCompany', params: {id: company._id}}">
            <img  class=" roundedImg img" src= "../assets/img/company-card-bg.jpg" alt="Comapny logo" />
        </router-link>
    </div>
    <div class="card-body d-flex flex-column align-items-start justify-content-end">
      <router-link :to="{ name: 'AboutCompany', params: {id: company._id}}" ><h4 class="card-title ">{{company.name}}</h4></router-link >
      <a class="link" v-bind:href="company.website" target="_blank" rel="noopener">{{company.website | trim-web}}</a>
      <div class="d-flex flex-row flex-wrap ">
        <button @click="reroute(tag)" v-for="tag in categories" :key="tag" class="m-1 px-1 border  tagBg ">
          {{tag}}
        </button>
        <!-- <router-link  v-for="tag in categories" :key="tag" :to="{name: 'AllCompanies', params: { tag: tag}}"  class="m-1 px-1 border  tagBg "  >{{tag}}</router-link> -->
        <div class="m-1 px-1 border  tagBg cursorNormal" v-if="restCount > 0">+{{restCount}}</div>
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
    },
  },
  data() {
    return {
      imageUrl: ""
    }
  },
  computed: { 
    categories() {
      let allCategories = this.company.categories
      let only5 = allCategories.slice(0,5)
      return only5
    },
    restCount() { 
      return this.company.categories.length - 5
    }
  },
  created(){
    // this.company.image.img.data.data.toString('base64')
    if(this.company.image != null){
      const url = btoa(new Uint8Array(this.company.image.img.data.data).reduce(function(data,byte) { 
        return data + String.fromCharCode(byte);
      }, ''))
      // const url = btoa(String.fromCharCode.apply(null, new Uint8Array(this.company.image.img.data.data)));
      this.imageUrl = `data:${this.company.image.img.contentType};base64,${url}`
    }
    //   this.imageUrl = URL.createObjectURL( this.company.image.img.data[0] );
  },
  methods: {
    reroute(tag) { 
      this.$router.push(`/AllCompanies/${tag}`)
    }
  },
 
  
 
  
};
</script>

<style scoped>

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
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  height: 90%;
  width: 100%;

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
 