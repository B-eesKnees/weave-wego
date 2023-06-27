<template>
  <div>
    <div id="naverIdLogin">
      <button type="button" @click="logout">로그아웃</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data(){
    return {
      naverLogin: null,
    };
  },
  mounted() {
    let userData = {};
    this.naverLogin = new window.naver.LoginWithNaverId({
      clientId: "ZpkAE5YTiolSaFISr_CV", // 개발자센터에 등록한 Client ID
      callbackUrl: "http://localhost:8080/naverlogin", // 개발자센터에 등록한 callback Url
      isPopup: true, // 팝업을 통한 연동처리 여부
      loginButton: {
        color: "green", type: 3, height: 60 },  // 로그인 버튼의 타입을 지정
    });

    // 설정 정보를 초기화 연동을 준비
    this.naverLogin.init();

    this.naverLogin.getLoginStatus((status) => {
      if (status) {
        console.log(status);
        console.log(this.naverLogin.user);

        // 필수적으로 받아야하는 프로필 정보가 있다면 callback 처리 시점에 체크
        var email = this.naverLogin.user.getEmail();
        var nickname = this.naverLogin.user.getNickName();
        var gender = this.naverLogin.user.getGender();
        var age = this.naverLogin.user.getAge();
        var profile_image = this.naverLogin.user.getProfileImage();
        /* var mobile = this.naverLogin.user.getMobile(); */
        
        userData = {email, nickname, gender, age, profile_image};

        if (email == undefined || email == null) {
          alert("이메일은 필수 정보입니다. 정보 제공을 동의해주세요.");
          // 사용자 정보 재동의를 위하여 다시 동의 페이지로 이동함
          this.naverLogin.reprompt();
          return;
        }
      } else {
        console.log("callback 처리에 실패하였습니다.");
      }
      
      if (nickname == undefined || nickname == null) {
          
          alert("별명은 필수 정보입니다. 정보 제공을 동의해주세요.");
          // 사용자 정보 재동의를 위하여 다시 동의 페이지로 이동함
          this.naverLogin.reprompt();
          return;
        } else {
        console.log("callback 처리에 실패하였습니다.");
      }

      if (gender == undefined || gender == null) {
          alert("성별은 필수 정보입니다. 정보 제공을 동의해주세요.");
          // 사용자 정보 재동의를 위하여 다시 동의 페이지로 이동함
          this.naverLogin.reprompt();
          return;
        } else {
        console.log("callback 처리에 실패하였습니다.");
      }

      if (age == undefined || age == null) {
          alert("연령대는 필수 정보입니다. 정보 제공을 동의해주세요.");
          // 사용자 정보 재동의를 위하여 다시 동의 페이지로 이동함
          this.naverLogin.reprompt();
          return;
        } else {
        console.log("callback 처리에 실패하였습니다.");
      }

      if (profile_image == undefined || profile_image == null) {
          alert("프로필 이미지는 필수 정보입니다. 정보 제공을 동의해주세요.");
          // 사용자 정보 재동의를 위하여 다시 동의 페이지로 이동함
          this.naverLogin.reprompt();
          return;
        } else {
        console.log("callback 처리에 실패하였습니다.");
      }

      this.naverlogin2(userData);

      // window.location.href = '/';


    });
  },
  methods: {
    logout() {
      const accessToken = this.naverLogin.accessToken.accessToken;
      const url='/oauth2.0/token?grant_type=delete&client_id=ZpkAE5YTiolSaFISr_CV&client_secret=J_ia7bQ3W_&access_token=${accessToken}&service_provider=NAVER';

      axios.get(url).then((res) => {
        console.log(res.data);
      });

      

    },
    naverlogin2(userData) {
            const email = userData.email;

            axios({
                url: "http://localhost:3000/auth/naverlogin",
                method: "POST",
                data: {
                    email: userData.email,
                    nick: userData.nickname,
                    image: userData.profile_image,
                    sex: userData.gender,
                    agegroup: userData.age,
                    provider: 'naver'
                },

            }).then(async (res)=> {
                this.pullData(email)
            })
        },
    pullData(email) {
      axios({
                url: "http://localhost:3000/auth/naverData",
                method: "POST",
                data: {
                    email: email,
                }
            }).then(async (res)=> {
                localStorage.setItem('userID', res.data.email);
                localStorage.setItem('userNick', res.data.nick);
                localStorage.setItem('userImage', res.data.image);
                localStorage.setItem('userProvider', res.data.provider);

                window.location.href = '/';
            })
    }
  },
};
</script>