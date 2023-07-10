<template>
  <gnbBar />
  <div class="login">
    <div class="title-bar">
      <h5>로그인</h5>
    </div>

    <div class="wrap">
      <form @submit.prevent="loginForm">
        <input v-model="email" type="text" id="username" :class="{ error_border: error_border_check }"
          placeholder="이메일" />
        <p id="error" v-if="email_check">
          이메일주소를 정확히 입력해주세요. 예)abcd@naver.com
        </p>

        <input v-model="password" type="password" id="password" :class="{ error_border: error_border_check }"
          placeholder="비밀번호" />
        <p id="error" v-if="password_check">
          비밀번호를 정확히 입력해주세요.<br />
          *8자리 이상 영문 대소문자, 숫자, 특수문자가 각각 1개 이상
        </p>
        <div class="user_login_btns">
          <a href="/auth/login" class="login_btn"><input :class="{ error_submit: allcheck, submit: !allcheck }"
              :disabled="allcheck" type="submit" id="login" value="로그인" /></a>
          <a class="join_btn" href="/join">회원가입</a>
        </div>
      </form>
    </div>

    <div class="wrap2">
      <form method="post">
        <div class="user_social_btns">
          <a class="social_btn kakao" @click="kakaoLogin">카카오로 시작하기</a>
          <a class="social_btn naver" href="/naverlogin">네이버로 시작하기</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import gnbBar from "../components/gnbBar.vue";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  data() {
    return {
      email: "",
      password: "",

      email_check: false,
      password_check: false,
      error_border_check: false,

      allcheck: true,
      allcheck1: true,
      allcheck2: true,
    };
  },
  components: { gnbBar },

  watch: {
    email: function () {
      this.checkEmail();
      this.inputAllCheck();
    },
    password: function () {
      this.checkPassword();
      this.inputAllCheck();
    },
  },
  methods: {
    checkEmail() {
      // 이메일 형식 검사
      const validateEmail =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

      if (this.email === "" || !validateEmail.test(this.email) || !this.email) {
        this.email_check = true;
        this.error_border_check = true;
        this.allcheck1 = true; //입력조건 안맞을시 true
      } else {
        this.email_check = false;
        this.error_border_check = false;
        this.allcheck1 = false;
      }
    },
    checkPassword() {
      // 최소 8자리 이상 영문 대소문자, 숫자, 특수문자가 각각 1개 이상
      const validatePassword =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

      if (
        this.password === "" ||
        !validatePassword.test(this.password) ||
        !this.password
      ) {
        this.password_check = true;
        this.error_border_check = true;
        this.allcheck2 = true;
      } else {
        this.password_check = false;
        this.error_border_check = false;
        this.allcheck2 = false;
      }
    },
    inputAllCheck() {
      if (this.allcheck1 || this.allcheck2) {
        //하나라도 입력조건이 안맞을시
        this.allcheck = true; //버튼 비활성
      } else {
        this.allcheck = false;
      }
    },
    loginForm() {
      //백엔드로 로그인정보 전달
      axios({
        url: "http://localhost:3000/auth/login",
        method: "POST",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            //로그인 성공시
            alert(res.data.success);
            localStorage.setItem("userID", res.data.email);
            localStorage.setItem("userNick", res.data.nick);
            localStorage.setItem("userImage", res.data.image);
            localStorage.setItem("userProvider", res.data.provider);

            window.location.href = "/";
          } else {
            if (res.data.code == 204) {
              //비밀번호 오류시
              alert(res.data.error + "\n" + res.data.message);
              window.location.href = "/login";
            } else if (res.data.code == 206) {
              // 존재하지 않는 이메일 일때
              alert(res.data.error + "\n" + res.data.message);
              window.location.href = "/login";
            }
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope:
          "profile_nickname, profile_image, account_email, gender, age_range",
        success: this.getProfile,
      });
    },
    getProfile(autoObj) {
      console.log(autoObj);
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          console.log(kakao_account);
          this.login(kakao_account);
          alert("로그인 성공");
        },
      });
    },
    async login(kakao_account) {
      const email = kakao_account.email;

      await axios({
        url: "http://localhost:3000/auth/kakaologin",
        method: "POST",
        data: {
          email: kakao_account.email,
          nick: kakao_account.profile.nickname,
          image: kakao_account.profile.profile_image_url,
          sex: kakao_account.gender,
          agegroup: kakao_account.age_range,
          provider: "kakao",
        },
      }).then(async (res) => {
        this.pullData(email);
      });
    },
    pullData(email) {
      axios({
        url: "http://localhost:3000/auth/kakaoData",
        method: "POST",
        data: {
          email: email,
        },
      }).then(async (res) => {
        localStorage.setItem("userID", res.data.email);
        localStorage.setItem("userNick", res.data.nick);
        localStorage.setItem("userImage", res.data.image);
        localStorage.setItem("userProvider", res.data.provider);

        window.location.href = "/";
      });
    },
  },
};
</script>

<style scoped>
a {
  padding: 0;
  margin: 0;
}

.login {
  padding-top: 5%;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: white;
  font-family: arial;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.title-bar {
  text-align: center;
  color: #333333;
  font-size: 30px;
  padding-bottom: 10px;
}

.title-bar h5 {
  margin-top: 2%;
  font-size: x-large;
  font-weight: bold;
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
  width: 30%;
  min-width: 350px;
  margin: 0 auto;
  border-radius: 6px;
  box-shadow: 0 0 5px #ccc;
  border: 1px solid #fff;
}

.wrap2 {
  background-color: #ffffff;
  width: 30%;
  min-width: 350px;
  margin: 10px auto;
  border-radius: 6px;
}

input,
.join_btn {
  width: 100%;
  margin-bottom: 10px;
  padding: 3%;
  border-radius: 6px;
  border: 1px solid #efefef;
  font-size: 15px;
  transition: all 0.2s ease-in-out;
}

.submit2 {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 0px;
  padding: 3%;
  border-radius: 6px;
  border: 1px solid #efefef;
  font-size: 15px;
  color: #fff;
  background-color: #388265;
  transition: all 0.2s ease-in-out;
}

input:focus {
  outline: none;
  border-color: #a5c2b6;
  box-shadow: 0 0 10px #a5c2b6;
  transition: all 0.2s ease-in-out;
}

input.submit {
  width: 100%;
  padding: 5%;
  border-radius: 6px;
  border: 1px solid #388265;
  font-size: 15px;
  background-color: #388265;
  color: #fff;
  margin-top: 25px;
  transition: all 0.2s ease-in-out;
}

.join_btn {
  width: 100%;
  padding: 3%;
  border-radius: 6px;
  border: 1px solid #388265;
  font-size: 14px;
  background-color: #388265;
  color: #fff;
  margin-top: 25px;
  transition: all 0.2s ease-in-out;
}

input.submit:hover {
  width: 100%;
  padding: 5%;
  border-radius: 6px;
  font-size: 15px;
  color: #fff;
  margin-top: 25px;
  transition: all 0.2s ease-in-out;
}

input.submit2:hover {
  width: 100%;
  padding: 5%;
  border-radius: 6px;
  opacity: 0.7;
  font-size: 15px;
  color: #fff;
  transition: all 0.2s ease-in-out;
}

.user_login_btns {
  display: flex;
  text-align: center;
}

.user_login_btns a:last-child {
  text-decoration: none;
  text-align: center;
  line-height: 30px;
  margin-left: 8px;
  width: 30%;
}

.user_login_btns a:first-child {
  text-decoration: none;
  text-align: center;
  width: 70%;
}

.user_social_btns {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.social_btn {
  width: 100%;
  padding: 5%;
  text-decoration: none;
  border-radius: 6px;
  border: 1px solid #388265;
  font-size: 15px;
  background-color: #388265;
  color: #fff;
  margin-top: 10px;
  transition: all 0.2s ease-in-out;
}

#error {
  color: red;
  margin-top: -1%;
  font-size: 12px;
}

.error_border:focus {
  border-color: red;
  box-shadow: none;
}

.error_submit {
  width: 100%;
  padding: 5%;
  border-radius: 6px;
  border: 1px solid gray;
  font-size: 15px;
  background-color: grey;
  color: darkgray;
  margin-top: 25px;
  transition: all 0.2s ease-in-out;
}

.kakao {
  background-color: #f7e600;
  color: #3a1d1d;
  border: 1px solid #f7e600;
  box-shadow: 0 0 5px #ccc;
  font-weight: bold;
  line-height: normal;
}

.naver {
  background-color: #2db400;
  color: white;
  border: 1px solid #2db400;
  box-shadow: 0 0 5px #ccc;
  font-weight: bold;
  line-height: normal;
}
</style>
