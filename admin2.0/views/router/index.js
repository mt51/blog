import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/admin',
        component: () => import('@/pages/index'),
        name: 'admin'
      },
      {
        path: '/login',
        component: () => import('@/pages/Login/Login'),
        name: 'login'
      }
    ]
  })
}
