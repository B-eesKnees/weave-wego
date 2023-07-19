<style src="../assets/css/gnbBar.css"></style>
<style src="../assets/css/reset.css"></style>
<template>
  <div class="gnb">
    <div class="gnb_bar">
      <div class="gnb_bar_logo">
        <h2>
          <a href="/"><img src="../assets/img/logo.png" alt="logo" /></a>
        </h2>
      </div>

      <!-- 로그인 전--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
      <div v-if="email === null" class="gnb_bar_user">
        <p><a href="/login">로그인</a></p>
        <p><a href="/join">회원가입</a></p>
      </div>
      <!-- 카카오 로그인--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
      <div v-else-if="provider === 'kakao'" class="gnb_bar_user_login">
        <div
          class="kakao_img"
          :style="{ 'background-image': 'url(' + image + ')' }"
          @click="toggleButtons"
        ></div>
        <div class="gnbmypage">
          <div v-if="isButtonsVisible">
            <div v-for="button in buttonList" :key="button.tab" class="gnbmypage_btns">
              <button
                @click="selectTab(button.tab)"
                :class="{ 'active-button': activeTab === button.tab }"
              >
                {{ button.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 네이버 로그인--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
      <div v-else-if="provider === 'naver'" class="gnb_bar_user_login">
        <img
          class="naver_img"
          :src="image"
          alt="profileExample"
          @click="toggleButtons"
        />
        <div class="gnbmypage">
          <div v-if="isButtonsVisible">
            <div v-for="button in buttonList" :key="button.tab" class="gnbmypage_btns">
              <button
                @click="selectTab(button.tab)"
                :class="{ 'active-button': activeTab === button.tab }"
              >
                {{ button.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 로컬로그인, 유저가 이미지 넣음--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
      <div
        v-else-if="provider === 'local' && image !== 'default'"
        class="gnb_bar_user_login"
      >
        <div
          class="local_img"
          :style="{
            'background-image': `url('http://localhost:3000/downloadProfile/${email}/${image}')`,
          }"
          @click="toggleButtons"
        ></div>

        <div class="gnbmypage">
          <div v-if="isButtonsVisible">
            <div v-for="button in buttonList" :key="button.tab" class="gnbmypage_btns">
              <button @click="selectTab(button.tab)">{{ button.name }}</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 로컬로그인, 이미지 없음--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
      <div
        v-else-if="image === 'default' && this.email !== 'admin@admin.com'"
        class="gnb_bar_user_login"
      >
        <img
          class="naver_img"
          src="../assets/img/profileExample.png"
          alt="profileExample"
          @click="toggleButtons"
        />
        <div class="gnbmypage">
          <div v-if="isButtonsVisible">
            <div v-for="button in buttonList" :key="button.tab">
              <button
                @click="selectTab(button.tab)"
                :class="[
                  'gnb-button',
                  { 'active-button': activeTab === button.tab },
                  button.tab,
                ]"
              >
                {{ button.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- admin 계정 로그인 했을 시--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
      <div
        v-else-if="provider === 'local' && this.email === 'admin@admin.com'"
        class="gnb_bar_user_login"
      >
        <a href="/admin"><button class="adminbtn">ADMIN</button></a>
        <img
          class="local_img"
          src="../assets/img/profileExample.png"
          alt="profileExample"
          @click="toggleButtons"
        />
        <div class="gnbmypage">
          <div v-if="isButtonsVisible">
            <div v-for="button in buttonList" :key="button.tab" class="gnbmypage_btns">
              <button
                @click="selectTab(button.tab)"
                :class="[
                  'gnb-button',
                  { 'active-button': activeTab === button.tab },
                  button.tab,
                ]"
              >
                {{ button.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { app } from "../main";

export default {
  data() {
    return {
      email: "",
      nick: "",
      image: "",
      provider: "",
      buttonList: [
        { name: "마이페이지", tab: "myPage" },
        { name: "내 코스", tab: "myCourse" },
        { name: "최근에 본 코스", tab: "recentCourse" },
        { name: "좋아요 리스트", tab: "likeList" },
        { name: "내가 쓴 댓글", tab: "myComment" },
        { name: "로그아웃", tab: "logout" },
      ],
      isButtonsVisible: false,
      activeTab: "",
    };
  },
  mounted() {
    (this.email = localStorage.getItem("userID")),
      (this.nick = localStorage.getItem("userNick")),
      (this.image = localStorage.getItem("userImage")),
      (this.provider = localStorage.getItem("userProvider"));
  },
  methods: {
    // 생략
    toggleButtons() {
      this.isButtonsVisible = !this.isButtonsVisible;

    },
    selectTab(tab) {
      this.activeTab = tab;
      if (tab === "logout") {
        this.logout();
      } else if (tab === "myPage") {
        window.location.href = "/mypage";
        sessionStorage.setItem("selectGnb", "myCourse");
      } else if (tab === "myCourse") {
        window.location.href = "/mypage";
        sessionStorage.setItem("selectGnb", "myCourse");
      } else if (tab === "myComment") {
        window.location.href = "/mypage";
        sessionStorage.setItem("selectGnb", "myComment");
      } else if (tab === "recentCourse") {
        window.location.href = "/mypage";
        sessionStorage.setItem("selectGnb", "recentCourse");
      } else if (tab === "likeList") {
        window.location.href = "/mypage";
        sessionStorage.setItem("selectGnb", "likeList");
      }
    },
    logout() {
      localStorage.removeItem("userID");
      localStorage.removeItem("userNick");
      localStorage.removeItem("userImage");
      localStorage.removeItem("userProvider");
      // localStorage.clear(); // localStorage의 모든 항목 제거
      window.location.href = "/"; // 메인
    },
  },
};
</script>
