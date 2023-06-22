import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/mypage',
    name: 'myPage',
    component: () => import(/* webpackChunkName: "mypage" */ '../views/myPage.vue')
  },
  {
    path: '/',
    name: 'MainPage',
    component: () => import(/* webpackChunkName: "mainpage" */ '../views/MainPage.vue')
  },
  {
    path: '/join',
    name: 'userJoin',
    component: () => import(/* webpackChunkName: "userjoin" */ '../views/userJoin.vue')
  },
  {
    path: '/login',
    name: 'userLogin',
    component: () => import(/* webpackChunkName: "userjoin" */ '../views/userLogin.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
