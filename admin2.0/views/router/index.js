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
        name: 'admin',
        children: [
          {
            path: 'home',
            name: 'home',
            component: () => import('@/pages/Home/Home'),
            meta: { title: '首页' }
          },
          {
            path: 'publish',
            name: 'publish',
            component: () => import('@/pages/Publish/Publish'),
            meta: { title: '文章发布' }
          },
          {
            path: 'article',
            component: () => import('@/pages/Articles/Articles'),
            name: 'article',
            meta: { title: '文章列表' }
          },
          {
            path: 'category',
            name: 'category',
            component: () => import('@/pages/Category/Category'),
            meta: { title: '分类管理' }
          },
          {
            path: 'tag',
            name: 'tag',
            component: () => import('@/pages/Tag/Tag'),
            meta: { title: '标签管理' }
          },
          {
            path: 'draft',
            name: 'draft',
            component: () => import('@/pages/Draft/Draft'),
            meta: { title: '草稿箱' }
          },
          {
            path: 'link',
            name: 'link',
            component: () => import('@/pages/Link/Link'),
            meta: { title: '友链管理' }
          }
        ]
      },
      {
        path: '/login',
        component: () => import('@/pages/Login/Login'),
        name: 'login'
      }
    ]
  })
}
