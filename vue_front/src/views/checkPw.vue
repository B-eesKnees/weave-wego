<template>
  <gnbBar />
  <form @submit.prevent="checkPW">
    <div id="wrap" class="gbank_login box__social-login">
      <div class="login_box pwChk_box">
        <h2 class="pwcheck">비밀번호 확인</h2>
        <div class="box_check_pw">
          <p class="txt">
            회원님의 정보를 보호하기 위해 비밀번호를 다시 확인합니다.
          </p>
          <label for="input-password" class="for-a11y">비밀번호 입력</label>
          <input
            v-model="password"
            type="password"
            id="pwd_check_field"
            name="pwd_check_field"
            placeholder="비밀번호"
            class="form__input-text"
            maxlength="20"
          />
          <button type="submit" class="check_button__submit" id="gochecking4personal">
            확인
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import gnbBar from "../components/gnbBar.vue";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  components: { gnbBar },
  data() {
    return {
      email: "",
      password: "",
      provider: "",
    };
  },
  mounted() {
    (this.email = localStorage.getItem("userID")),
      (this.provider = localStorage.getItem("userProvider")),
      this.checkLogin();
  },
  methods: {
    checkPW() {
      axios({
        url: "http://localhost:3000/auth/checkPW",
        method: "POST",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then(async (res) => {
          if (res.data.code == 200) {
            window.location.href = "/updateprofile";
          } else {
            alert("일치하지않는 비밀번호입니다.");
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
    checkLogin() {
      if (this.email == null) {
        window.location.href = "/login";
      }
      if (this.provider == "kakao" || this.provider == "naver") {
        window.location.href = "/updateprofile";
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}
.gbank_login#wrap.box__social-login .login_box {
  width: 600px;
  background: #fff;
  border: 1px solid #d3d3d3;
  box-shadow: 0 1px 0 0 #dedede;
  box-sizing: border-box;
}
#wrap {
  padding: 0;
  margin: 0;
  background: #f7f7f7;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gbank_login#wrap.box__social-login .login_box h2 {
  padding: 21px 0 18px;
  background: none;
  border-bottom: 1px solid #e4e4e4;
  color: #222;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.5px;
  text-indent: 0;
  text-align: center;
  line-height: 36px;
  box-sizing: border-box;
}

.box_check_pw {
  padding: 40px 64px 40px 64px;
  border: 0 none;
}
.gbank_login#wrap.box__social-login {
  padding: 194px 0;
  background: #f7f7f7;
}
.for-a11y {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
  text-indent: -5000em;
}
.box__social-login .check_button__submit {
  position: relative;
  display: block;
  margin-top: 16px;
  width: 100%;
  height: 65px;
  background-color: #388265;
  border-radius: 2px;
  border: none;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
}
.gbank_login#wrap.box__social-login .login_box .form__input-text {
  position: relative;
  width: 100%;
  height: 67px;
  margin-right: 0;
  padding: 23px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  color: #222;
  font-size: 21px;
  line-height: 16px;
  font-weight: 400;
  outline: 0;
  box-sizing: border-box;
}
.gbank_login#wrap.box__social-login .login_box .box__password-check .txt {
  height: auto;
  margin-bottom: 39px;
  background: none;
  border-bottom: none;
  color: #222;
  font-size: 18px;
  letter-spacing: -0.5px;
  text-align: center;
}
</style>
