<template >
  <div class="container-xxl">
    <!-- header with navbar -->
    <div class="row">
      <header-app></header-app>
    </div>
    <!-- Footer -->
    <div class="row">
      <footer-app></footer-app>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from '../components/Footer.vue'

export default {
  components: {
    "header-app": Header,
    "footer-app": Footer
  },
};
</script>

<style scoped>
</style>