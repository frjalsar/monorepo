<script>
import agent from 'superagent'

export default {
  name: 'UserMixin',
  data() {
    return {
      loggedInUser: undefined
    }
  },
  inject: ['FRI_API_URL'],
  methods: {
    getUser() {
      const userSession = sessionStorage.getItem('FRI_ADMIN')            
      if (userSession) {
        const user = JSON.parse(userSession)
        return Promise.resolve(user)
      } else {
        const url = this.FRI_API_URL + '/user'
        console.log('url', url)
        return agent
          .get(url)
          .withCredentials()
          .then(res => {
            this.setUser(res.body)
            return res.body
          })
      }
    },
    setUser(user) {
      if (user && user.id) {              
        sessionStorage.setItem('FRI_ADMIN', JSON.stringify(user))
      } else {      
        sessionStorage.removeItem('FRI_ADMIN')
        this.$router.push({ path: '/' })
      }
    }
  },  
}
</script>