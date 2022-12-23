<template>
  <div>
    <form v-if="!loggedInUser">
      <img
        class="d-block mx-auto mb-3"
        src="./assets/logo.png"
        alt=""
        width="100"
        height="90"
      >

      <div class="form-floating mb-3">
        <input
          id="floatingInput"
          v-model="username"
          type="text"
          class="form-control"
          placeholder="Kennitala"
        >
        <label for="floatingInput">Kennitala</label>
      </div>

      <div class="form-floating mb-3">
        <input
          id="floatingPassword"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Lykilorð"
          autocomplete="lykilorð"
        >
        <label for="floatingPassword">Lykilorð</label>
      </div>

      <div
        v-if="error"
        class="text-danger text-center mb-3"
      >
        {{ error }}
      </div>

      <button
        class="w-100 btn btn-lg btn-primary"
        type="submit"
        @click.prevent="login()"
      >
        Innskrá
      </button>
    </form>
    <div v-if="loggedInUser">
      <CardComponent>
        Hæ {{ loggedInUser.fullname }}
      </CardComponent>
    </div>
  </div>
</template>

<script>
import agent from 'superagent'
import CardComponent from './_components/CardComponent.vue'
export default {
  name: 'LoginComponent',
  components: {
    CardComponent
  },
  inject: ['FRI_API_URL'],
  emits: ['login'],
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login () {
      return agent
        .post(this.FRI_API_URL + '/login')
        .withCredentials()
        .send({
          username: this.username,
          password: this.password
        })
        .then(res => {
          this.$emit('login', res.body)
        })
        .catch(e => {
          if (e.status === 401) {
            this.error = 'Rangt notendanafn eða lykilorð'
          } else {
            this.error = 'Villa kom upp við innskráningu'
          }
        })
    }
  }
}
</script>

<style scoped>
form {
  max-width: 330px;
  margin: auto;
  text-align: center,
}
</style>
