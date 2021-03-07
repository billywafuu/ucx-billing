import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: () => import('@/views/Authentication.vue')
  },
  {
    path: '/servererror',
    name: 'ServerError',
    component: () => import('@/views/ServerError.vue')
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/views/Unauthorized.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/tenancy',
    name: 'Tenancy',
    component: () => import('@/views/Tenancy.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
