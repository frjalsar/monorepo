<template>
<div class="container-fluid d-flex bg-light">
  <nav class="shadow p-3 bg-white">
    <a href="/" class="">
      <img src="./assets/logo.png" width="100" height="90" class="d-block mx-auto" />      
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/idkendur" class="nav-link link-dark text-decoration-none">Iðkendur</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link link-dark text-decoration-none">Félög</router-link>        
      </li>      
      <li class="nav-item">
        <router-link to="/" class="nav-link link-dark text-decoration-none">Íþróttahéruð</router-link>
      </li>  
    </ul>
     <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/" class="nav-link link-dark text-decoration-none">Dómarar</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link link-dark text-decoration-none">Mannvirki</router-link>
      </li>      
    </ul>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">      
      <li class="nav-item">
        <router-link to="/" class="nav-link link-dark text-decoration-none">Félagaskipti</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link link-dark text-decoration-none">Mótaumsóknir</router-link>
      </li>      
    </ul>
    <hr />
  </nav>

  <main class="py-4 px-5">    
    <router-view></router-view>
  </main>
</div>
</template>

<script>
export default {
  name: 'admin',
  provide: {
    FRI_API_URL: import.meta.env.VITE_FRI_API_URL
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
