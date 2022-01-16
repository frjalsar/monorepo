import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/idkendur',
      component: () => import('./athletes/List.vue')
    }
  ]
})
const app = createApp(App)
app.use(router)
app.mount('#app')
