import { createRouter, createWebHistory } from "vue-router";
import Detail from "../views/Detail.vue";
import MainPage from "../views/MainPage.vue";
import Join from "../views/userJoin.vue";
import Login from "../views/userLogin.vue";
import myPage from "../views/myPage.vue"

const routes = [

  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/join',
    name: 'userJoin',
    component: Join
  },
  {
    path: '/login',
    name: 'userLogin',
    component: Login
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/mypage',
    name: 'myPage',
    component: myPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
