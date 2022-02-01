<template>
  <div class="card col-3 mx-2 my-3">
    <img class="card-img-top" src="../assets/img/company-card-bg.jpg" alt="Card image cap" />
    <div class="card-body">
      <router-link :to="{ name: 'CompanyPage' }" ><h5 class="card-title">Company name</h5></router-link >
      <a href="https://google.com" target="_blank">Company website</a>
      <div class="row">
        <a v-for="tag in tags" :key="tag" href="#!">{{ tag }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: {
        id: "axmakml1241xqwxq",
        name: "CompanyName",
        Logo: "Picture",
        backgroundImage: "BgPicture",
        website: "google.com",
        tags: ["Javascript", "Nodejs", "MongoDB"],
      },
    };
  },
  computed: {
    tags() {
      return ["Javascript", "Nodejs", "MongoDB"];
    },
  },
};
</script>

<style scoped>
</style>
 