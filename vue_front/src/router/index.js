import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Detail from "../views/Detail.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/mypage",
    name: "myPage",
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/myPage.vue"),
  },
  {
    path: "/mainpage",
    name: "MainPage",
    component: () =>
      import(/* webpackChunkName: "mainpage" */ "../views/MainPage.vue"),
  },
  {
    path: "/userjoin",
    name: "userJoin",
    component: () =>
      import(/* webpackChunkName: "userjoin" */ "../views/userJoin.vue"),
  },
  {
    path: "/userlogin",
    name: "userLogin",
    component: () =>
      import(/* webpackChunkName: "userjoin" */ "../views/userLogin.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: Detail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
