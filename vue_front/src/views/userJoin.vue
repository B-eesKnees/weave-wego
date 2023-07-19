<template>
    <gnbBar />
    <div class="join">
        <div class="title-bar">
            <h5>회원가입</h5>
            <form @submit.prevent="joinForm">
                <label class="title-bar-label" for="file">
                    <div class="title-bar-btn">+</div>
                    <img v-if="type" class="img_style" :src="imageUploaded" alt="올린 이미지" />
                    <img v-else id="img_style" src="../assets/img/profileExample.png" alt="올린 이미지" />
                    <br />
                </label>

                <input id="file" type="file" ref="image" @change="upload" maxlength="150" />
            </form>


        </div>
        <div class="wrap">
            <form @submit.prevent="joinForm">
                <label for="email">아이디</label>
                <input v-model="email" type="text" id="email" placeholder="이메일 입력"
                    :class="{ error_border: email_check || emailcheck != 2 }" maxlength="25">
                <form @submit.prevent="emailCheckForm">
                    <a href="/auth/checkemail"><button type="submit" id="email_check"
                            class="username_submit">중복확인</button></a>
                </form>
                <p id="error" v-if="email_check">이메일주소를 정확히 입력해주세요. 예)abcd@naver.com</p>
                <p id="error" v-show="emailcheck == 1">존재하는 이메일입니다.</p>
                <p id="complete" v-show="emailcheck == 2 && !email_check">사용가능한 이메일입니다.</p>
                <label for="password">비밀번호</label>
                <input v-model="password" type="password" id="password" :class="{ error_border: password_check }"
                    placeholder="비밀번호 입력" maxlength="15"><br />
                <p id="error" v-if="password_check">비밀번호를 정확히 입력해주세요.<br /> *8자리 이상 영문 대소문자, 숫자, 특수문자가 각각 1개 이상</p>
                <label for="password_check2">비밀번호 확인</label>
                <input v-model="password2" type="password" id="password_check" :class="{ error_border: password_check2 }"
                    placeholder="비밀번호 확인 입력"><br />
                <p id="error" v-if="password_check2">비밀번호가 일치하지 않습니다.</p>
                <label for="nickname">별명</label>
                <input @input="nickname = $event.target.value" type="text" id="nickname" placeholder="활동명 입력"
                    :class="{ error_border: nickname_check2 || nicknamecheck != 2 }" maxlength="10">
                <form @submit.prevent="nicknameCheckForm">
                    <a href="/auth/checknick"><button type="submit" id="nickname_check"
                            class="username_submit">중복확인</button></a>
                </form>
                <p id="error" v-show="nicknamecheck == 1">존재하는 닉네임입니다.</p>
                <p id="complete" v-show="nicknamecheck == 2">사용가능한 닉네임입니다.</p>
                <p id="error" v-if="nickname_check2">닉네임을 입력해주세요.</p>
                <div class="gender">
                    <label for="sex">성별</label>
                    <input v-model="sex" type='radio' name='gender' value='m' class="input_sex" />남자
                    <input v-model="sex" type='radio' name='gender' value='f' class="input_sex" />여자
                </div>
                <p id="error" v-if="sex_check">성별을 선택하세요.</p>
                <div class="age_range">
                    <label for="age_range">나이대</label>
                    <input v-model="agegroup" type='radio' name='agegroup' value='10' class="input_sex" />10대
                    <input v-model="agegroup" type='radio' name='agegroup' value='20' class="input_sex" />20대
                    <input v-model="agegroup" type='radio' name='agegroup' value='30' class="input_sex" />30대
                    <input v-model="agegroup" type='radio' name='agegroup' value='40' class="input_sex" />40대
                    <input v-model="agegroup" type='radio' name='agegroup' value='50' class="input_sex" />50대
                    <input v-model="agegroup" type='radio' name='agegroup' value='60' class="input_sex" />60세 이상
                </div>
                <p id="error" v-if="age_range_check">나이대를 선택하세요.</p>
                <label for="phone_num">전화번호</label>
                <input v-model="phone_num" @input="formatPhoneNumber" type="text" id="phone_num" placeholder="전화번호 입력"
                    :class="{ error_border: phone_check }" maxlength="13"><br />
                <p id="error" v-if="phone_check">전화번호를 정확히 입력해주세요.</p>
                <a href="/auth/join"><input type="submit" :class="{ 'error_submit': allcheck, 'submit': !allcheck }"
                        :disabled="allcheck" id="login" value="가입하기"></a>
            </form>
        </div>
    </div>
    <Footer />
</template>

<script>
import gnbBar from '../components/gnbBar.vue'
import Footer from '../components/footer.vue'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
    components: { gnbBar, Footer },
    data() {
        return {

            email: '',
            password: '',
            password2: '',
            nickname: '',
            phone_num: '',
            sex: '',
            agegroup: '',
            image: '',
            imageUploaded: null,
            type: false,

            email_check: false,
            password_check: false,
            password_check2: false,
            nickname_check: false,
            sex_check: false,
            age_range_check: false,
            phone_check: false,
            error_border_check: false,

            allcheck: true,
            allcheck1: true,
            allcheck2: true,
            allcheck3: true,
            allcheck4: true,
            allcheck5: true,
            allcheck6: true,
            allcheck7: true,
            emailcheck: 3,
            nicknamecheck: 3,


        };
    },
    watch: {
        'email': function () {
            this.checkEmail()

            this.funcWatch()
        },
        'password': function () {
            this.checkPassword()
            this.funcWatch()

        },
        'password2': function () {
            this.checkPassword2()
            this.funcWatch()
        },
        'nickname': function () {
            this.checknickname()

            this.funcWatch()
        },
        'sex': function () {
            this.checksex()
            this.funcWatch()
        },
        'agegroup': function () {
            this.checkage_range()
            this.funcWatch()
        },
        'phone_num': function () {
            this.checkphone()
            this.funcWatch()
        }

    },
    methods: {
        funcWatch() {
            this.emailCheckForm()
            this.inputAllCheck()
            this.nicknameCheckForm()



        },
        movetomain() {
            window.location.href = '/';
        },
        checkEmail() {
            // 이메일 형식 검사
            const validateEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

            if (this.email === '' || !validateEmail.test(this.email) || !this.email) {
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
            const validatePassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

            if (this.password === '' || !validatePassword.test(this.password) || !this.password) {
                this.password_check = true;
                this.error_border_check = true;
                this.allcheck2 = true;
            } else {
                this.password_check = false;
                this.error_border_check = false;
                this.allcheck2 = false;
            }
        },
        checkPassword2() {
            if (this.password === this.password2) {
                this.password_check2 = false;
                this.error_border_check = false;
                this.allcheck3 = false;
            } else {
                this.password_check2 = true;
                this.error_border_check = true;
                this.allcheck3 = true;
            }
        },
        checknickname() {
            const validateNickname = /^.{1,10}$/;

            if (!this.nickname || !validateNickname.test(this.nickname)) {
                this.nickname_check2 = true;
                this.error_border_check = true;
                this.allcheck4 = true;
            } else {
                this.nickname_check2 = false;
                this.error_border_check = false;
                this.allcheck4 = false;
            }
        },
        checksex() {
            if (this.sex == null) { //선택했으면
                this.allcheck5 = true;
            } else {
                this.allcheck5 = false;
            }
        },
        checkage_range() {
            if (this.agegroup == null) {
                this.allcheck6 = true;
            } else {
                this.allcheck6 = false;
            }
        },
        checkphone() {
            const validatephone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

            if (this.phone_num === '' || !validatephone.test(this.phone_num) || !this.phone_num) {
                this.phone_check = true;
                this.error_border_check = true;
                this.allcheck7 = true;
            } else {
                this.phone_check = false;
                this.error_border_check = false;
                this.allcheck7 = false;
            }
        },
        formatPhoneNumber() {
            // 숫자 이외의 문자 제거
            this.phone_num = this.phone_num.replace(/[^\d-]/g, '');
            // 하이픈(-) 삽입
            if (this.phone_num.length > 2) {
                this.phone_num = this.phone_num.replace(/^01([0|1|6|7|8|9])-?(\d{4})-?(\d{4})$/, '01$1-$2-$3');
            }
        },
        inputAllCheck() {
            if (this.allcheck1 || this.allcheck2 || this.allcheck3 || this.allcheck4 || this.allcheck5 || this.allcheck6 || this.allcheck7 || this.email_check) { //하나라도 입력조건이 안맞을시
                this.allcheck = true; //버튼 비활성

            } else {
                this.allcheck = false;

            }
        },
        emailCheckForm() {
            axios({
                url: "http://localhost:3000/auth/checkemail",
                method: "POST",
                data: {
                    email: this.email,
                },
            }).then(async (res) => {
                const validateEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

                if (res.data.message == '사용가능한 이메일입니다.' && validateEmail.test(this.email)) {
                    this.emailcheck = 2;
                } else if (res.data.message == '존재하는 이메일입니다.') {
                    this.emailcheck = 1;
                    this.allcheck = true;
                } else if (!this.email) {
                    this.emailcheck = 3;
                }

            }).catch(error => {
                alert(error);
            })
        },
        nicknameCheckForm() {
            axios({
                url: "http://localhost:3000/auth/checknick",
                method: "POST",
                data: {
                    nickname: this.nickname,
                },
            }).then(async (res) => {
                if (res.data.message == '사용가능한 닉네임입니다.' && this.nickname) {
                    this.nicknamecheck = 2;
                } else if (res.data.message == '존재하는 닉네임입니다.') {
                    this.nicknamecheck = 1;
                    this.allcheck = true;
                } else if (!this.nickname) {
                    this.nicknamecheck = 3;
                }
            }).catch(error => {
                alert(error);
            })
        },
        joinForm() { //백엔드로 회원가입 정보 전달


            axios({
                url: "http://localhost:3000/auth/join",
                method: "POST",
                data: {
                    email: this.email,
                    password: this.password,
                    nickname: this.nickname,
                    sex: this.sex,
                    agegroup: this.agegroup,
                    phone_num: this.phone_num
                },
            }).then(async (res) => {
                alert(res.data.message);
                if (this.image) {
                    await this.uploadFile(this.image).then(() => {
                        this.autoLogin();
                    });
                } else {
                    this.autoLogin();
                }
            }).catch(error => {
                alert(error);
            })
        },
        async autoLogin() {
            await axios({
                url: "http://localhost:3000/auth/login",
                method: "POST",
                data: {
                    email: this.email,
                    password: this.password,
                },
            }).then(async (res) => {
                if (res.data.code == 200) {

                    localStorage.setItem("userID", res.data.email);
                    localStorage.setItem("userNick", res.data.nick);
                    localStorage.setItem("userImage", res.data.image);
                    localStorage.setItem("userProvider", res.data.provider);

                    window.location.href = "/";
                }
            }).catch((error) => {
                alert(error);
            });
        },
        async uploadFile(files) {
            if (!files) {
                return; // 파일이 없으면 함수 종료
            }
            let name = files.name;
            let data = await this.$base64(files);

            return axios({
                url: `http://localhost:3000/uploadProfile/${this.email}/${name}`,
                method: 'POST',
                data: {
                    "data": data
                }
            }).then(res => {

            }).catch(error => {
                alert(error);
            })
        },
        upload() {
            this.type = true;
            const files = this.$refs.image.files;

            if (files && files.length > 0) {
                this.image = files[0]; // 사용자가 올린 이미지
                // URL.createObjectURL로 사용자가 올린 이미지를 URL로 만들어서 화면에 표시할 수 있게 한다. img 태그의 src값에 바인딩해준다
                this.imageUploaded = URL.createObjectURL(this.image);


            }
        }
    }
}
</script> 

<style scoped>
.join {
    padding-top: 5%;
    width: 100%;
    height: 80vh;
    margin: 0;
    background-color: white;
    font-family: arial;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#file {
    display: none;
}

.title-bar-label {
    width: 1%;
    cursor: pointer;
}

.img_style {
    border: 2px solid black;
    border-radius: 50%;
}

input[type="file"] {
    position: absolute;
    width: 22px;
    height: 22px;
    left: 50%;
    top: 70%;
    line-height: 20x;
    border: 2px solid black;
    color: white;
    font-size: 22px;
    background-color: #388265;
    border-radius: 50%;
}

.title-bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333333;
    font-size: 30px;
    padding-bottom: 10px;
    position: relative;
}

.title-bar-btn {
    position: absolute;
    width: 22px;
    height: 22px;
    left: 50.5%;
    top: 80%;
    text-align: center;
    line-height: 20px;
    border: 2px solid black;
    color: white;
    font-size: 22px;

    background-color: #388265;
    border-radius: 50%;
}

.title-bar h5 {
    margin: 24px 0;
    font-size: x-large;
    font-weight: bold;
}

.title-bar img {
    width: 50px;
    height: 50px;
}

.wrap {
    background-color: #ffffff;
    padding: 1%;
    width: 35%;
    min-width: 350px;
    margin: 0 auto;
    border-radius: 6px;
    box-shadow: 0 0 5px #ccc;
    border: 1px solid #fff;
}

label {
    margin-right: 3%;
    display: inline-block;
    width: 110px;
    text-align: right;
}

input {
    width: 70%;
    margin-bottom: 1%;
    padding: 1%;
    border-radius: 6px;
    border: 1px solid #efefef;
    font-size: 15px;
    transition: all .2s ease-in-out;
}



.username_submit {
    font-size: 14px;
    background-color: #388265;
    color: white;
    width: 15%;
    margin-left: 5%;
    border-radius: 4px;
    border: none;
    display: none;
}

input:focus {
    outline: none;
    border-color: #A5C2B6;
    box-shadow: 0 0 10px #A5C2B6;
    transition: all .2s ease-in-out;
}

input.submit {
    width: 100%;
    padding: 3%;
    border-radius: 6px;
    border: 1px solid #388265;
    font-size: 15px;
    background-color: #388265;
    color: #fff;
    margin-top: 25px;
    transition: all .2s ease-in-out;
}

input.submit:hover {
    width: 100%;
    padding: 3%;
    border-radius: 6px;
    font-size: 15px;
    color: #fff;
    margin-top: 25px;
    transition: all .2s ease-in-out;
}

.gender,
.age_range {
    width: 100%;
    display: block;
    justify-content: center;
    align-items: center;
    padding: 1%;
    margin-left: -1%;
    font-size: 14px;

}

.input_sex {
    width: 14px;
    height: 14px;
    transition: all .2s ease-in-out;
}

#error {
    color: red;
    margin-bottom: 2%;
    margin-left: 24%;
    font-size: 12px;
}

#complete {
    color: #388265;
    margin-bottom: 2%;
    margin-left: 24%;
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
    transition: all .2s ease-in-out;
}
</style>
