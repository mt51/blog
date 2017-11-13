import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/views/signin'
import Home from '@/views/home'
import Category from '@/views/categorys'
import Article from '@/views/article'
import Base from '@/views/base'
import Draft from '@/views/draft'
import EditTheme from '@/views/edittheme'
import Pages from '@/views/pages'
import Publish from '@/views/publish'
import Statistics from '@/views/statistics'
import Tags from '@/views/tags'
import Themes from '@/views/themes'
import User from '@/views/user'
import Dashboard from '@/views/dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      component: Dashboard,
      children: [{
        path: '',
        redirect: 'home'
      }, {
        path: 'home',
        name: 'home',
        component: Home
      }, {
        path: 'categorys',
        name: 'categorys',
        component: Category
      }, {
        path: 'article',
        name: 'article',
        component: Article
      }, {
        path: 'base',
        name: 'base',
        component: Base
      }, {
        path: 'draft',
        name: 'draft',
        component: Draft
      }, {
        path: 'edittheme',
        name: 'edittheme',
        component: EditTheme
      }, {
        path: 'publish',
        name: 'publish',
        component: Publish
      }, {
        path: 'pages',
        name: 'pages',
        component: Pages
      }, {
        path: 'statistics',
        name: 'statistics',
        component: Statistics
      }, {
        path: 'tags',
        name: 'tags',
        component: Tags
      }, {
        path: 'themes',
        name: 'themes',
        component: Themes
      }, {
        path: 'user',
        name: 'user',
        component: User
      }, {
        path: 'edit/:id',
        name: 'edit',
        component: Publish
      }]
    }, {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})
