import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";
import userLogin from "../views/userLogin.vue";
import userJoin from "../views/userJoin.vue";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/login",
    name: "userLogin",
    component: userLogin,
  },
  {
    path: "/join",
    name: "userJoin",
    component: userJoin,
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
  {
    path: "/detail",
    name: "detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue"),
  },
  {
    path: "/updateprofile",
    name: "updateProfile",
    component: () =>
      import(/* webpackChunkName: "updateprofile" */ "../views/updateProfile.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
