import agent from 'superagent'

export default {
  name: 'UserMixin',
  data() {
    return {
      user: undefined,
    }
  },
  methods: {
    getUser() {
      const apiUrl = import.meta.env.VITE_FRI_API_URL

      const userSession = sessionStorage.getItem('FRI_ADMIN')            
      if (userSession) {
        const user = JSON.parse(userSession)
        return Promise.resolve(user)
      } else {
        return agent
          .get(apiUrl + '/user')
          .withCredentials()
          .then(res => {
            if (res.body && res.body.id) {
              return res.body
            }
          })
      }
    },
    setUser(user) {
      if (user && user.id) {        
        sessionStorage.setItem('FRI_ADMIN', JSON.stringify(user))
        this.user = user        
      } else {
        this.user = undefined
        this.$router.push({ path: '/'})
      }      
    }
  },  
}
