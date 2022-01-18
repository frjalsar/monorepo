import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import GetUser from './_mixins/GetUser.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./Login.vue')
    },
    {
      path: '/idkendur',
      component: () => import('./athletes/List.vue')
    },
    {
      path: '/felog',
      component: () => import('./clubs/List.vue')
    },
    {
      path: '/ithrottaherud',
      component: () => import('./regions/List.vue')
    },
    {
      path: '/domarar',
      component: () => import('./judges/List.vue')
    },
    {
      path: '/mannvirki',
      component: () => import('./venues/List.vue')
    },
    {
      path: '/felagaskipti',
      component: () => import('./transfers/List.vue')
    },
    {
      path: '/motaumsoknir',
      component: () => import('./meetapplications/List.vue')
    }
  ]
})
const app = createApp(App)
app.use(router)
app.mixin(GetUser)
app.mount('#app')
