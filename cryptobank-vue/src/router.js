import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Feed from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Feed,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

export default router
