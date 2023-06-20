<template>
  <gnbBar />
  <div class="login">
    <div class="title-bar">로그인</div>

    <div class="wrap">
      <form method="post">
        <input type="text" id="username" placeholder="이메일" />
        <input type="password" id="password" placeholder="비밀번호" />
        <div class="user_login_btns">
          <input type="submit" class="submit" id="login" value="로그인" />
          <a class="join_btn" href="/join">회원가입</a>
        </div>
      </form>
    </div>

    <div class="wrap2">
      <form method="post">
        <div class="user_social_btns">
          <a class="social_btn" href="/auth/kakao">카카오로 시작하기</a>
          <a class="social_btn" href="/auth/naver">네이버로 시작하기</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import gnbBar from "../components/gnbBar.vue";

export default {
  components: { gnbBar },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding-top: 1.8%;
  margin: 0;
  background-color: white;
  font-family: arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.title-bar {
  padding-top: 7%;
  text-align: center;
  color: #333333;
  font-size: 30px;
  padding-bottom: 10px;
}

.info-bar {
  text-align: center;
  color: #666;
  font-size: 15px;
  padding-bottom: 50px;
}

.info-bar a {
  color: #45b3e7;
  text-decoration: none;
}

.wrap {
  background-color: #ffffff;
  padding: 2%;
  width: 25%;
  min-width: 350px;
  margin: 0 auto;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  box-shadow: 0 0 5px #ccc;
  border: 1px solid #fff;
}

.wrap2 {
  background-color: #ffffff;
  width: 25%;
  min-width: 350px;
  margin: 10px auto;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
}

input,
.join_btn {
  width: 90%;
  margin-bottom: 10px;
  padding: 5%;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border: 1px solid #efefef;
  font-size: 15px;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.submit2 {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 0px;
  padding: 5%;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border: 1px solid #efefef;
  font-size: 15px;
  color: #fff;
  background-color: #388265;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

input:focus {
  outline: none;
  border-color: #a5c2b6;
  box-shadow: 0 0 10px #a5c2b6;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

input.submit,
.join_btn {
  width: 100%;
  padding: 5%;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border: 1px solid #388265;
  font-size: 15px;
  background-color: #388265;
  color: #fff;
  margin-top: 25px;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

input.submit:hover {
  width: 100%;
  padding: 5%;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  opacity: 0.7;
  font-size: 15px;

  color: #fff;
  margin-top: 25px;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

input.submit2:hover {
  width: 100%;
  padding: 5%;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  opacity: 0.7;
  font-size: 15px;
  color: #fff;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.user_login_btns {
  display: flex;
  text-align: center;
}
.user_login_btns a {
  text-decoration: none;
  text-align: center;
}

.user_login_btns a {
  margin-left: 8px;
  width: 25%;
}

.user_social_btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.social_btn {
  width: 90%;
  padding: 5%;
  text-decoration: none;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border: 1px solid #388265;
  font-size: 15px;
  background-color: #388265;
  color: #fff;
  margin-top: 10px;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
</style>
