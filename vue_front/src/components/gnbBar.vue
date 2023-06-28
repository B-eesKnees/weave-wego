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
      <div v-if="email === null" class="gnb_bar_user">
        <p><a href="/login">로그인</a></p>
        <p><a href="/join">회원가입</a></p>
      </div>
      <div v-else-if="provider === 'kakao'" class="gnb_bar_user_login">
        <a href="/mypage"
          ><img class="kakao_img" :src="image" alt="profileExample"
        /></a>
      </div>
      <div v-else-if="provider === 'local'" class="gnb_bar_user_login">
        <a href="/mypage"
          ><img
            class="local_img"
            :src="`http://localhost:3000/downloadProfile/${email}/${image}`"
            alt="profileExample"
        /></a>
      </div>
      <div v-else-if="provider === 'naver'" class="gnb_bar_user_login">
        <a href="/mypage"
          ><img class="naver_img" :src="image" alt="profileExample"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      nick: "",
      image: "",
      provider: "",
    };
  },
  mounted() {
    (this.email = localStorage.getItem("userID")),
      (this.nick = localStorage.getItem("userNick")),
      (this.image = localStorage.getItem("userImage")),
      (this.provider = localStorage.getItem("userProvider"));
  },
};
</script>
