import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: () =>
      import(/* webpackChunkName: "mainpage" */ "../views/MainPage.vue"),
  },
  {
    path: "/join",
    name: "userJoin",
    component: () =>
      import(/* webpackChunkName: "userjoin" */ "../views/userJoin.vue"),
  },
  {
    path: "/login",
    name: "userLogin",
    component: () =>
      import(/* webpackChunkName: "userjoin" */ "../views/userLogin.vue"),
  },
  {
    path: "/detail",
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue"),
  },
  {
    path: "/naverlogin",
    name: "naverlogin",
    component: () =>
      import(/* webpackChunkName: "naverlogin" */ "../views/NaverLogin.vue"),
  },
  {
    path: "/mypage",
    name: "myPage",
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/myPage.vue"),
  },
  {
    path: "/newpost",
    name: "newPost",
    component: () =>
      import(/* webpackChunkName: "newpost" */ "../views/NewPost.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
