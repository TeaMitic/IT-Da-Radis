<template >
  <div class="container ">
    <!-- name -->
    <input type="text" class="form-control" v-model.trim="registerInfo.name" name="name" placeholder="Your name" autofocus="" required />
    <!-- surname -->
    <input  type="text" class="form-control" v-model.trim="registerInfo.surname" name="surname" placeholder="Your surname" autofocus="" required />
    <!-- email -->
    <input type="email" class="form-control" v-model.trim="registerInfo.email" name="email" placeholder="your-email@domain" autofocus required />
    <!-- username -->
    <input type="text" class="form-control" v-model.trim="registerInfo.username" name="username" placeholder="Your username" autofocus="" required />
    <!-- password -->
    <input type="password" class="form-control" v-model.trim="registerInfo.password" name="password" placeholder="Your password" autofocus="" required />
    <!-- button  -->
    <button v-on:click="register" class="btn btn-lg btn-primary rounded dugme">Registruj se</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      registerInfo: {
        name: null,
        surname: null,
        email: null,
        username: null,
        password: null,
      },
    };
  },
  methods: {
    async register() { 
        
    },
  },
};
</script>
<style scoped>
</style>