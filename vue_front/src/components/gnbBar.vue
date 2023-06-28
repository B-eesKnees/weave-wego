<template>
  <div class="gnb">
    <div class="gnb_bar">
      <div class="gnb_bar_logo">
        <h2>
          <a href="/"><img src="../assets/img/logo.png" alt="logo" /></a>
        </h2>
      </div>
      <div v-if="email===null" class="gnb_bar_user">
        <p><a href="/login">로그인</a></p>
        <p><a href="/join">회원가입</a></p>
      </div>
      <div v-else-if="provider==='kakao'" class="gnb_bar_user">
        <p>
          <a href="/mypage"
            ><img class="kakao_img" :src="image" alt="profileExample"
          /></a>
        </p>
      </div>
      <div v-else-if="provider==='local'" class="gnb_bar_user">
        <p>
          <a href="/mypage"
            ><img class="local_img" :src="`http://localhost:3000/downloadProfile/${email}/${image}`" alt="profileExample"
          /></a>
        </p>
      </div>
      <div v-else-if="provider==='naver'" class="gnb_bar_user">
        <p>
          <a href="/mypage"
            ><img class="naver_img" :src="image" alt="profileExample"
          /></a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      nick : '',
      image : '',
      provider : ''
    }
  },
  mounted() {
    this.email = localStorage.getItem('userID'),
    this.nick = localStorage.getItem('userNick'),
    this.image = localStorage.getItem('userImage'),
    this.provider = localStorage.getItem('userProvider')
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.gnb {
  z-index: 9999;
  position: relative;
}
.gnb_bar {
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  position: fixed;
  top: 0;
  background-color: #fafafa;
}
.gnb_bar_logo {
  position: absolute;
  left: 40vw;
}
.gnb_bar_logo a {
  padding: 3vh;
}

.gnb_bar_logo > h2 > a > img {
  width: 20vh;
}
.gnb_bar_user {
  display: flex;
  margin-right: 10%;
}
.gnb_bar_user a {
  padding: 2vh;
}

.gnb_bar_user a:hover {
  background-color: rgba(56, 130, 101, 0.2);
}
.kakao_img {
  width: 7%;
  border-radius: 100%;
}

.local_img {
  width: 7%;
  border-radius: 100%;
}

.naver_img {
  width: 7%;
  border-radius: 100%;
}
</style>
