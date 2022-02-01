<template>
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-light bg-dark fixed-top" id="mainNav" >
    <div class="container px-4 px-lg-5">
      <router-link :to="{ name: 'Homepage' }">
        <a class="navbar-brand">
          <img src="../assets/img/logo_no_bg.png" alt="logo"/></a>
      </router-link>
      <button
        v-on:click="showMenu" class="navbar-toggler text-white rounded menuBtn" type="button"
        data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"
        aria-expanded="false" aria-label="Toggle navigation">Menu
        </button>
         <!-- <i class="fas fa-bars"></i> -->
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto py-4 py-lg-0">
          <router-link :to="{ name: 'Homepage' }">
            <li class="nav-item active">
              <a class=" nav-link px-lg-3 py-3 py-lg-3 text-white slova rounded dropdown-item " href="#!" >Početna</a>
            </li></router-link>
          <router-link :to="{ name: 'Homepage' }">
            <li class="nav-item active">
              <a class=" nav-link px-lg-3 py-3 py-lg-3 text-white slova rounded dropdown-item " href="#!" >Sve komapnije</a>
            </li></router-link>
          <router-link :to="{ name: 'Login' }">
            <li class="nav-item active">
              <a class=" nav-link px-lg-3 py-3 py-lg-3 text-white slova rounded dropdown-item " href="#!" >Prijavi se</a>
            </li></router-link>
          <router-link :to="{ name: 'Register' }">
            <li class="nav-item active">
              <a class=" nav-link px-lg-3 py-3 py-lg-3 text-white slova rounded dropdown-item " href="#!" >Registruj se</a>
            </li></router-link>
          
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: true,
    };
  },
  methods: {
    showMenu: function () {
      const div = document.querySelector("#navbarResponsive");
      this.isCollapsed = !this.isCollapsed;
      if (!this.isCollapsed) {
        //menu was collapsed, show contents
        div.classList.remove("collapse");
        div.classList.add("collapse.show");
      } else {
        div.classList.remove("collapse.show");
        div.classList.add("collapse");
      }
    },
  },
};
</script>

<style scoped>
.slova {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.0625em;
  text-transform: uppercase;
}
.navbar-toggler { 
  transition: box-shadow 0.15s ease-in-out;
}
.menuBtn,.scrollBtn {
  background-color: #00b1a8;
}
.nav-link:hover, .nav-link:focus {
  color: #78e7ff  !important;
}
.dropdown-item:hover { 
  background-color: #e6e7ea82;
}
.menuBtn:hover { 
  background-color: hsl(177, 100%, 20%);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

</style>