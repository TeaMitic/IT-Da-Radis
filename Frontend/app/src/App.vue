<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'App',
  data() {
    return {
      user:
      {
        id: null,
        token: null,
        type: null,
        username: null
      }
    }
  },
  async created() {
    this.user.id = Vue.$cookies.get("id");
    this.user.token = Vue.$cookies.get("token");
    this.user.type = Vue.$cookies.get("type");
    this.user.username = Vue.$cookies.get("username")

    

    if (this.user != null && this.user.id != null) {
      await this.$store.dispatch("postaviUserType", this.user.type)
      await this.$store.dispatch("postaviToken", this.user.token)
      await this.$store.dispatch("postaviUsername", this.user.token)
      await this.$store.dispatch("postaviUserID", this.user.id)

      if (this.user.type == 'U') { 
        await this.$store.dispatch("getUserByID", this.user.id)
      }
      else { 
        await this.$store.dispatch("getCompanyByID", this.user.id)
      }
    }

  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 57px;
  background-color: whitesmoke;
  

}
</style>
