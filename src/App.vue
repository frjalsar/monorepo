<template>
<div class="container-fluid d-flex bg-light">   
  <nav class="shadow p-3 bg-white" v-if="user">
    <a href="/" class="">
      <img src="./assets/logo.png" width="100" height="90" class="d-block mx-auto" />
    </a>
      <span class="navbar-toggler-icon"></span>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/idkendur" class="nav-link link-dark text-decoration-none" active-class="active">Iðkendur</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/felog" class="nav-link link-dark text-decoration-none" active-class="active">Félög</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/ithrottaherud" class="nav-link link-dark text-decoration-none" active-class="active">Íþróttahéruð</router-link>
      </li>
    </ul>
     <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/domarar" class="nav-link link-dark text-decoration-none" active-class="active">Dómarar</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/mannvirki" class="nav-link link-dark text-decoration-none" active-class="active">Mannvirki</router-link>
      </li>
    </ul>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/felagaskipti" class="nav-link link-dark text-decoration-none" active-class="active">Félagaskipti</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/motaumsoknir" class="nav-link link-dark text-decoration-none" active-class="active">Mótaumsóknir</router-link>
      </li>
    </ul>
    <hr />
  </nav>

  <main class="py-4 px-5">
    <router-view @login="login">
    </router-view>
  </main>
</div>
</template>

<script>
export default {
  name: 'admin',  
  provide: {
    FRI_API_URL: import.meta.env.VITE_FRI_API_URL,
    COUNTRIES_API_URL: import.meta.env.VITE_COUNTRIES_API_URL
  }, 
  methods: {
    login(user) {
      this.setUser(user)
    }
  },
  created() {
    this.getUser().then(this.setUser)
  }
}
</script>
<style>
html, body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

nav {
  width: 280px;
}

main {
  width: 100%;  
}

div.container-fluid {
  padding-left: 0;
  min-height: 100vh;  
  width: 100%;
}

</style>
