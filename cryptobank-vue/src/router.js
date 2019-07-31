import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from './views/Home.vue'

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
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/create_account',
      name: 'create-account',
      component: () => import(/* webpackChunkName: "createaccount" */ './views/CreateAccount.vue')
    },
    {
      path: '/account/:id',
      name: 'account',
      component: () => import(/* webpackChunkName: "account" */ './views/Account.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/deposit/new',
      name: 'new-deposit',
      component: () => import(/* webpackChunkName: "new-deposit" */ './views/NewDeposit.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/pay/new',
      name: 'new-pay',
      component: () => import(/* webpackChunkName: "new-pay" */ './views/NewPay.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/transfer/new',
      name: 'new-transfer',
      component: () => import(/* webpackChunkName: "new-transfer" */ './views/NewTransfer.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else next()
})

export default router
