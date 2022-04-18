<template>
<div class="container-fluid d-flex bg-light">
  <nav class="shadow p-3 bg-white" :class="{ fullview: fullview }" v-if="loggedInUser" @dblclick="toggleNav()">    
    <img src="./assets/logo.png" width="100" height="90" class="d-block mx-auto" />    
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
        <router-link to="/greinar" class="nav-link link-dark text-decoration-none" active-class="active">Greinar</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/flokkungreina" class="nav-link link-dark text-decoration-none" active-class="active">Flokkun greina</router-link>
      </li>
    </ul>
    <hr>
     <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/domarar" class="nav-link link-dark text-decoration-none" active-class="active">Dómarar</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/flokkundomara" class="nav-link link-dark text-decoration-none" active-class="active">Flokkun dómara</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/mannvirki" class="nav-link link-dark text-decoration-none" active-class="active">Mannvirki</router-link>
      </li>
       <li class="nav-item">
        <router-link to="/ahold" class="nav-link link-dark text-decoration-none" active-class="active">Áhöld</router-link>
      </li>
    </ul>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/felagaskipti" class="nav-link link-dark text-decoration-none" active-class="active">Félagaskipti</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/umsoknir" class="nav-link link-dark text-decoration-none" active-class="active">Umsóknir</router-link>
      </li>
    </ul>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/notendur" class="nav-link link-dark text-decoration-none" active-class="active">Notendur</router-link>
      </li>
    </ul>
  </nav>

  <main class="py-4 px-5">
    <router-view @login="login"></router-view>
  </main>
</div>
</template>

<script>
export default {
  name: 'admin',
  data() {
    return {
      fullview: false
    }
  },
  provide: {
    FRI_API_URL: import.meta.env.VITE_FRI_API_URL,
    COUNTRIES_API_URL: import.meta.env.VITE_COUNTRIES_API_URL
  }, 
  methods: {
    login(user) {
      this.loggedInUser = user
      this.setUser(user)
      this.$router.push({ path: '/idkendur'})
    },
    toggleNav() {
      this.fullview = !this.fullview
    }
  },
  created() {
    this.getUser().then(user => {
      this.loggedInUser = user
    })
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

@media (max-width: 576px) {
  nav {
    transition: 1s;
    width: 50px;
  }

  nav * {
    transition: 0.3s;
    opacity: 0;
    display: none;
  }

  nav.fullview {
    transition: 1s;
    width: 280px;
    position: fixed;
    z-index: 99;
    height: 100vh;
  }  

  nav.fullview * {
    opacity: 1;
    display: block;
  }  
}
</style>
