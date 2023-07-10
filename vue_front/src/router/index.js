import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";
import userLogin from "../views/userLogin.vue";
import userJoin from "../views/userJoin.vue";

const requireLogin = () => (to, from, next) => {
  //로그인안하고 접근하려했을때 실행할 함수?
  if (localStorage.getItem("userID") !== null) {
    //localStorage에 데이터 있으면
    return next(); //접근가능
  }
  next("/login"); //localStorage에 데이터 없으면 로그인창으로 리다이렉트
};

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
    beforeEnter: requireLogin(),
  },
  {
    path: "/newpost",
    name: "newPost",
    component: () =>
      import(/* webpackChunkName: "newpost" */ "../views/NewPost.vue"),
    // beforeEnter: requireLogin()
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
      import(
        /* webpackChunkName: "updateprofile" */ "../views/updateProfile.vue"
      ),
    beforeEnter: requireLogin(),
  },
  {
    path: "/detail/:boardId",
    name: "detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue"),
  },
  {
    path: "/detail/edit/:boardId",
    name: "boardEdit",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/UpdatePost.vue"),
  },
  {
    path: "/checkpw",
    name: "checkpw",
    component: () =>
      import(/* webpackChunkName: "checkpw" */ "../views/checkPw.vue"),
    beforeEnter: requireLogin(),
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/admin.vue"),
    beforeEnter: requireLogin(),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
