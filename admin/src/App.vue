<template>
  <div class="container-fluid d-flex bg-light">
    <nav
      v-if="loggedInUser"
      class="shadow p-3 bg-white"
      :class="{ fullview: fullview }"
      @dblclick="toggleNav()"
    >
      <img
        src="./assets/logo.png"
        width="100"
        height="90"
        class="d-block mx-auto"
      >
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <router-link
            to="/idkendur"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Iðkendur
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/felog"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Félög
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/ithrottaherud"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Íþróttahéruð
          </router-link>
        </li>
      </ul>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <router-link
            to="/greinar"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Greinar
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/flokkungreina"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Flokkun greina
          </router-link>
        </li>
      </ul>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <router-link
            to="/domarar"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Dómarar
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/flokkundomara"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Flokkun dómara
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/mannvirki"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Mannvirki
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/ahold"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Áhöld
          </router-link>
        </li>
      </ul>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <router-link
            to="/felagaskipti"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Félagaskipti
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/umsoknir"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Umsóknir
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/hlauparar"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Hlauparar án keppnisnúmers
          </router-link>
        </li>
      </ul>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <router-link
            to="/notendur"
            class="nav-link link-dark text-decoration-none"
            active-class="active"
          >
            Notendur
          </router-link>
        </li>
      </ul>
    </nav>

    <main class="py-4 px-5">
      <router-view @login="login" />
    </main>
  </div>
</template>

<script>
import agent from 'superagent'

const FRI_API_URL = import.meta.env.VITE_FRI_API_URL
const COUNTRIES_API_URL = import.meta.env.VITE_COUNTRIES_API_URL
export default {
  name: 'AdminPage',
  provide: {
    FRI_API_URL,
    COUNTRIES_API_URL
  },
  data () {
    return {
      fullview: false,
      loggedInUser: undefined
    }
  },
  mounted () {
    console.log(FRI_API_URL)
    console.log(COUNTRIES_API_URL)

    this.authorize().then(user => {
      if (!user) {
        this.$router.push({ path: '/' })
        this.loggedInUser = undefined
      }

      this.loggedInUser = user
    })
  },
  methods: {
    authorize () {
      const userSession = sessionStorage.getItem('FRI_ADMIN')
      if (userSession) {
        const user = JSON.parse(userSession)
        return Promise.resolve(user)
      } else {
        const url = FRI_API_URL + '/user'
        return agent
          .get(url)
          .withCredentials()
          .then(res => {
            const user = res.body
            if (user && user.id) {
              sessionStorage.setItem('FRI_ADMIN', JSON.stringify(user))
              return user
            } else {
              sessionStorage.removeItem('FRI_ADMIN')
              return undefined
            }
          })
      }
    },
    login (user) {
      this.loggedInUser = user
      this.authorize() // double hit, need to fix
      this.$router.push({ path: '/idkendur' })
    },
    toggleNav () {
      this.fullview = !this.fullview
    }
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
