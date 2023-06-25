<template>
  <gnbBar />
  <div class="login">
    <div class="title-bar">로그인</div>

    <div class="wrap">
      <form method="post">
        <input
          v-model="email"
          type="text"
          id="username"
          :class="{ error_border: error_border_check }"
          placeholder="이메일"
        />
        <p id="error" v-if="email_check">
          이메일주소를 정확히 입력해주세요. 예)abcd@naver.com
        </p>

        <input
          v-model="password"
          type="password"
          id="password"
          :class="{ error_border: error_border_check }"
          placeholder="비밀번호"
        />
        <p id="error" v-if="password_check">
          비밀번호를 정확히 입력해주세요.<br />
          *8자리 이상 영문 대소문자, 숫자, 특수문자가 각각 1개 이상
        </p>
        <div class="user_login_btns">
          <input
            :class="{ error_submit: allcheck, submit: !allcheck }"
            :disabled="allcheck"
            type="submit"
            id="login"
            value="로그인"
          />
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
    joinForm() {
      //백엔드로 로그인정보 전달
      console.log(this.imageUploaded);
      axios({
        url: "http://localhost:3000/login",
        method: "POST",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((res) => {
          alert(res.data.message);
          window.location.href = "/";
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
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
  border-radius: 6px;
  box-shadow: 0 0 5px #ccc;
  border: 1px solid #fff;
}

.wrap2 {
  background-color: #ffffff;
  width: 25%;
  min-width: 350px;
  margin: 10px auto;
  border-radius: 6px;
}

input,
.join_btn {
  width: 90%;
  margin-bottom: 10px;
  padding: 5%;
  border-radius: 6px;
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
  border-radius: 6px;
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
  border-radius: 6px;
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
  border-radius: 6px;
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
  border-radius: 6px;
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
  border-radius: 6px;
  border: 1px solid #388265;
  font-size: 15px;
  background-color: #388265;
  color: #fff;
  margin-top: 10px;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
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
  padding: 3%;
  border-radius: 6px;
  border: 1px solid gray;
  font-size: 15px;
  background-color: grey;
  color: darkgray;
  margin-top: 25px;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
</style>
