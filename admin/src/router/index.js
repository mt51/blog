import Vue from 'vue'
import Router from 'vue-router'
// import Signin from '@/views/signin'
// import Home from '@/views/home'
// import Category from '@/views/categorys'
// import Article from '@/views/article'
// import Base from '@/views/base'
// import Draft from '@/views/draft'
// import EditTheme from '@/views/edittheme'
// import Pages from '@/views/pages'
// import Publish from '@/views/publish'
// import Statistics from '@/views/statistics'
// import Tags from '@/views/tags'
// import Themes from '@/views/themes'
// import User from '@/views/user'
// import Dashboard from '@/views/dashboard'
// import Import from '@/views/import'
// import Link from '@/views/links'

const Signin = () => import('@/views/signin')
const Home = () => import('@/views/home')
const Category = () => import('@/views/categorys')
const Article = () => import('@/views/article')
const Base = () => import('@/views/base')
const Draft = () => import('@/views/draft')
const EditTheme = () => import('@/views/edittheme')
const Pages = () => import('@/views/pages')
const Publish = () => import('@/views/publish')
const Statistics = () => import('@/views/statistics')
const Tags = () => import('@/views/tags')
const Themes = () => import('@/views/themes')
const User = () => import('@/views/user')
const Dashboard = () => import('@/views/dashboard')
const Import = () => import('@/views/import')
const Link = () => import('@/views/links')

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
        component: Home,
        meta: {nickname: '首页'}
      }, {
        path: 'categorys',
        name: 'categorys',
        component: Category,
        meta: {nickname: '管理分类'}
      }, {
        path: 'article',
        name: 'article',
        component: Article,
        meta: {nickname: '文章列表'}
      }, {
        path: 'base',
        name: 'base',
        component: Base,
        meta: {nickname: '基本设置'}
      }, {
        path: 'draft',
        name: 'draft',
        component: Draft,
        meta: {nickname: '草稿箱'}
      }, {
        path: 'edittheme',
        name: 'edittheme',
        component: EditTheme,
        meta: {nickname: '编辑主题'}
      }, {
        path: 'publish',
        name: 'publish',
        component: Publish,
        meta: {nickname: '添加文章'}
      }, {
        path: 'pages',
        name: 'pages',
        component: Pages,
        meta: {nickname: '页面列表'}
      }, {
        path: 'statistics',
        name: 'statistics',
        component: Statistics,
        meta: {nickname: '统计代码'}
      }, {
        path: 'tags',
        name: 'tags',
        component: Tags,
        meta: {nickname: '标签管理'}
      }, {
        path: 'themes',
        name: 'themes',
        component: Themes,
        meta: {nickname: '主题列表'}
      }, {
        path: 'user',
        name: 'user',
        component: User,
        meta: {nickname: '用户设置'}
      }, {
        path: 'edit/:id',
        name: 'edit',
        component: Publish,
        meta: {nickname: '编辑文章'}
      }, {
        path: 'import',
        name: 'import',
        component: Import,
        meta: {nickname: '导入文章'}
      }, {
        path: 'links',
        name: 'links',
        component: Link,
        meta: {nickname: '友链管理'}
      }]
    }, {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }, {
      path: '/',
      redirect: '/dashboard'
    }
  ]
})
