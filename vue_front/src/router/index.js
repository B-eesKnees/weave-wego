import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";
import userLogin from "../views/userLogin.vue";
import userJoin from "../views/userJoin.vue";
import adminBoardList from "../components/adminBoardlist.vue";
import adminReportBoard from "../components/adminReportBoard.vue";
import adminUserList from "../components/adminUserList.vue";
import adminReportComment from "../components/adminReportComment.vue";

const requireLogin = () => (to, from, next) => {
  //로그인안하고 접근하려했을때 실행할 함수?
  if (localStorage.getItem("userID") !== null) {
    //localStorage에 데이터 있으면
    return next(); //접근가능
  }
  next("/login"); //localStorage에 데이터 없으면 로그인창으로 리다이렉트
};

const isAdmin = (to, from, next) => {
  requireLogin()(to, from, () => {
    const userEmail = localStorage.getItem("userID");
    if (userEmail === "admin@admin.com") {
      next(); // 관리자 계정으로 로그인한 경우, 다음 미들웨어 또는 라우트 핸들러로 이동합니다.
    } else {
      // 관리자 계정이 아닌 경우, 메인 페이지로 리다이렉트하지 않고 경고 알림만 보여줍니다.

      next("/");
      setTimeout(() => {
        alert("관리자 권한이 필요합니다.");
      }, 200);
    }
  });
};

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },

  {
    path: "/test2",
    name: "testpage2",
    component: () =>
      import(/* webpackChunkName: "naverlogin" */ "../views/cart.vue"),
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
    path: "/admin/boardlist",
    name: "adminBoardList",
    component: adminBoardList,
  },
  {
    path: "/admin/reportboard",
    name: "adminReportBoard",
    component: adminReportBoard,
  },
  {
    path: "/admin/userlist",
    name: "adminUserList",
    component: adminUserList,
  },
  {
    path: "/admin/reportcomment",
    name: "adminReportComment",
    component: adminReportComment,
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
    beforeEnter: requireLogin(),
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
    beforeEnter: isAdmin,
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import(/* webpackChunkName: "test" */ "../views/bookTest.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
export default router;
