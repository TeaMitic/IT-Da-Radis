<template>
  <div id="navBar" class="container-fluid">
    <a href="/"><img src="../assets/img/logo_with_bg.png" alt="logo"></a>
    <div class="navLinks">
      <ul>
        <router-link :to="{name: 'Homepage'}"><li><a href="javascript:">Početna</a></li></router-link>
        <router-link :to="{name: 'Login'}"><li><a href="javascript:">Login</a></li></router-link>
        <router-link :to="{name: 'Register'}"><li><a href="javascript:">Register</a></li></router-link>

      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#navBar {
  display: flex;

}
.navLinks {
  display: flex;
  flex-direction: row;
  
}
</style>