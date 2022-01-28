import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import UserMixin from './_mixins/UserMixin.vue'

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
      path: '/flokkundomara',
      component: () => import('./judgetypes/List.vue')
    },
    {
      path: '/mannvirki',
      component: () => import('./venues/List.vue')
    },
    {
      path: '/greinar',
      component: () => import('./events/List.vue')
    },
    {
      path: '/flokkungreina',
      component: () => import('./eventtypes/List.vue')
    },
    {
      path: '/felagaskipti',
      component: () => import('./transfers/List.vue')
    },
    {
      path: '/umsoknir',
      component: () => import('./applications/List.vue')
    },
    {
      path: '/notendur',
      component: () => import('./users/List.vue')
    },
  ]
})
const app = createApp(App)
app.use(router)
app.mixin(UserMixin)
app.mount('#app')
