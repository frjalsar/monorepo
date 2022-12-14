<template>
  <form v-if="!loggedInUser">
    <img class="d-block mx-auto mb-3" src="./assets/logo.png" alt="" width="100" height="90">

    <div class="form-floating mb-3">      
      <input type="text" class="form-control" id="floatingInput" v-model="username" placeholder="Kennitala">      
      <label for="floatingInput">Kennitala</label>
    </div>

    <div class="form-floating mb-3">
      <input type="password" class="form-control" id="floatingPassword" v-model="password" placeholder="Lykilorð">
      <label for="floatingPassword">Lykilorð</label>
    </div>

    <div v-if="error" class="text-danger text-center mb-3">{{ error }}</div>
    
    <button class="w-100 btn btn-lg btn-primary" type="submit" @click.prevent="login()">Innskrá</button>    
  </form>    
  <div v-if="loggedInUser"> 
    <Card>
      Hæ {{ this.loggedInUser.fullname }}
    </Card>
  </div>
</template>

<script>
console.log(import.meta.env.VITE_FRI_API_URL)
console.log(import.meta.env.VITE_RENDER_EXTERNAL_HOSTNAME)
console.log(import.meta.env.VITE_RENDER_EXTERNAL_URL)
console.log(import.meta.env.VITE_RENDER_GIT_BRANCH)
console.log(import.meta.env.VITE_RENDER_SERVICE_ID)
console.log(import.meta.env.VITE_RENDER_SERVICE_NAME)
import agent from 'superagent'
import Card from './_components/Card.vue'
export default {
  components: {
    Card
  },
  inject: ['FRI_API_URL'],
  emits: ['login'],
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login() {            
      return agent
        .post(this.FRI_API_URL + '/login')
        .withCredentials()
        .send({
          username: this.username,
          password: this.password
        })
        .then(res => {
          this.$emit('login',res.body)
        })
        .catch(e => {
          if (e.status === 401) {            
            this.error = 'Rangt notendanafn eða lykilorð'
          } else {
            this.error = 'Villa kom upp við innskráningu'
          }
        })
    },
  },
  created() {
    this.getUser().then(user => {
      this.loggedInUser = user
    })
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