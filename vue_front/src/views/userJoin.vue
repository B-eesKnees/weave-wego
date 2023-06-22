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

                <input id="file" type="file" ref="image" @change="upload" />
            </form>


        </div>
        <div class="wrap">
            <form @submit.prevent="joinForm">
                <label for="email">아이디</label>
                <input v-model="email" type="text" id="email" placeholder="이메일 입력" class="width">
                <form @submit.prevent="emailCheckForm">
                    <a href="/auth/checkemail"><button type="submit" id="email_check"
                            class="username_submit">중복확인</button></a>
                </form>
                <p id="error" v-if="email_check">이메일주소를 정확히 입력해주세요. 예)abcd@naver.com</p>
                <p id="error" v-if="emailcheck == 0">존재하는 닉네임입니다.</p>
                <p id="error" v-else-if="emailcheck == 1">사용가능한 닉네임입니다.</p>
                <label for="password">비밀번호</label>
                <input v-model="password" type="password" id="password" placeholder="비밀번호 입력"><br />
                <p id="error" v-if="password_check">비밀번호를 정확히 입력해주세요.<br /> *8자리 이상 영문 대소문자, 숫자, 특수문자가 각각 1개 이상</p>
                <label for="password_check2">비밀번호 확인</label>
                <input v-model="password2" type="password" id="password_check" placeholder="비밀번호 확인 입력"><br />
                <p id="error" v-if="password_check2">비밀번호가 일치하지 않습니다.</p>
                <label for="nickname">별명</label>
                <input v-model="nickname" type="text" id="nickname" placeholder="활동명 입력" class="width">
                <form @submit.prevent="nicknameCheckForm">
                    <a href="/auth/checknick"><button type="submit" id="nickname_check"
                            class="username_submit">중복확인</button></a>
                </form>
                <p id="error" v-if="nickname_check">닉네임을 입력해주세요.</p>
                <div class="gender">
                    <label for="sex">성별</label>
                    <input v-model="sex" type='radio' name='gender' value='male' class="input_sex" />남자
                    <input v-model="sex" type='radio' name='gender' value='female' class="input_sex" />여자
                </div>
                <p id="error" v-if="sex_check">성별을 선택하세요.</p>
                <div class="age_range">
                    <label for="age_range">나이대</label>
                    <input v-model="agegroup" type='radio' name='agegroup' value='ten' class="input_sex" />10대
                    <input v-model="agegroup" type='radio' name='agegroup' value='20' class="input_sex" />20대
                    <input v-model="agegroup" type='radio' name='agegroup' value='30' class="input_sex" />30대
                    <input v-model="agegroup" type='radio' name='agegroup' value='40' class="input_sex" />40대
                    <input v-model="agegroup" type='radio' name='agegroup' value='50' class="input_sex" />50대
                    <input v-model="agegroup" type='radio' name='agegroup' value='60' class="input_sex" />60세 이상
                </div>
                <p id="error" v-if="age_range_check">나이대를 선택하세요.</p>
                <label for="phone_num">전화번호</label>
                <input v-model="phone_num" type="text" id="phone_num" placeholder="전화번호 입력"><br />
                <p id="error" v-if="phone_check">전화번호를 정확히 입력해주세요. 예)01066090043</p>
                <a href="/auth/join"><input type="submit" :class="{ 'error_submit': allcheck, 'submit': !allcheck }"
                        :disabled="allcheck" id="login" value="가입하기"></a>

            </form>
        </div>
    </div>
</template>

<script>
import gnbBar from '../components/gnbBar.vue'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
    components: { gnbBar },
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
            emailcheck: false,


        };
    },
    watch: {
        'email': function () {
            this.checkEmail()
            this.inputAllCheck()
            this.emailCheckForm()
        },
        'password': function () {
            this.checkPassword()
            this.inputAllCheck()
        },
        'password2': function () {
            this.checkPassword2()
            this.inputAllCheck()
        },
        'nickname': function () {
            this.checknickname()
            this.inputAllCheck()
        },
        'sex': function () {
            this.checksex()
            this.inputAllCheck()
        },
        'agegroup': function () {
            this.checkage_range()
            this.inputAllCheck()
        },
        'phone_num': function () {
            this.checkphone()
            this.inputAllCheck()
        }

    },
    methods: {


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
            if (this.password !== this.password2) {
                this.password_check2 = true;
                this.error_border_check = true;
                this.allcheck3 = true;
            } else {
                this.password_check2 = false;
                this.error_border_check = false;
                this.allcheck3 = false;
            }
        },
        checknickname() {
            if (!this.nickname) {
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
            const validatephone = /^\d{3}\d{3,4}\d{4}$/;

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
        inputAllCheck() {
            if (this.allcheck1 || this.allcheck2 || this.allcheck3 || this.allcheck4 || this.allcheck5 || this.allcheck6 || this.allcheck7 || this.emailcheck) { //하나라도 입력조건이 안맞을시
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
                if (res.data.message == '존재하는 이메일입니다.') {
                    this.emailcheck = 0;
                    
                } else if(res.data.message == '사용가능한 닉네임입니다.') {
                    this.emailcheck = 1;
                } else {
                    this.emailcheck = false;
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
                if (res.data.message == '존재하는 닉네임입니다.') {
                    this.allcheck = true;
                } else {
                    this.allcheck = false;
                }
                alert(res.data.message);
            }).catch(error => {
                alert(error);
            })
        },
        joinForm() { //백엔드로 회원가입 정보 전달
            if (this.sex === 'female') {
                this.sex = 'f';
            } else {
                this.sex = 'm';
            }

            axios({
                url: "http://localhost:3000/auth/join",
                method: "POST",
                data: {
                    email: this.email,
                    password: this.password,
                    nickname: this.nickname,
                    sex: this.sex,
                    agegroup: this.agegroup,
                    phone_num: this.phone_num,

                },
            }).then(async (res) => {
                alert(res.data.message);
                await this.uploadFile(this.image);
            }).catch(error => {
                alert(error);
            })
        },
        async uploadFile(files) {
            if (!files) {
                return; // 파일이 없으면 함수 종료
            }
            window.location.href = '/';
            let name = files.name;
            let data = await this.$base64(files);

            axios({
                url: `http://localhost:3000/uploadProfile/${this.email}/${name}`,
                method: 'POST',
                data: {
                    "data": data
                }
            }).then(res => {
                window.location.href = '/';
            }).catch(error => {
                alert(error);
            })
        },
        upload() {
            this.type = true;
            const files = this.$refs.image.files;

            if (files && files.length > 0) {
                this.image = files[0]; // 사용자가 올린 이미지
                console.log(this.image);
                // URL.createObjectURL로 사용자가 올린 이미지를 URL로 만들어서 화면에 표시할 수 있게 한다. img 태그의 src값에 바인딩해준다
                this.imageUploaded = URL.createObjectURL(this.image);


            }
        },
    }
}
</script> 

<style scoped>
.join {
    width: 100%;
    height: 100%;
    padding-top: 1.8%;
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
    line-height: 24px;
    border: 2px solid black;
    color: white;
    font-size: 22px;

    background-color: #388265;
    border-radius: 50%;
}

.title-bar {
    margin-top: 6%;
    text-align: center;
    color: #333333;
    font-size: 30px;
    padding-bottom: 10px;
    position: relative;
}

.title-bar-btn {
    position: absolute;
    width: 22px;
    height: 22px;
    left: 50%;
    top: 70%;
    text-align: center;
    line-height: 24px;
    border: 2px solid black;
    color: white;
    font-size: 22px;

    background-color: #388265;
    border-radius: 50%;
}

.title-bar h5 {
    margin: 24px 0;
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
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
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
    margin-bottom: 10px;
    padding: 2%;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border: 1px solid #efefef;
    font-size: 15px;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}

.width {
    width: 50%;
}

.username_submit {
    font-size: 14px;
    background-color: #388265;
    color: white;
    width: 15%;
    margin-left: 5%;
    border-radius: 4px;
    border: none;
}

input:focus {
    outline: none;
    border-color: #A5C2B6;
    box-shadow: 0 0 10px #A5C2B6;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}

input.submit {
    width: 100%;
    padding: 3%;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border: 1px solid #388265;
    font-size: 15px;
    background-color: #388265;
    color: #fff;
    margin-top: 25px;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}

input.submit:hover {
    width: 100%;
    padding: 3%;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    opacity: 0.7;
    font-size: 15px;

    color: #fff;
    margin-top: 25px;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
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
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}

#error {
    color: red;
    margin-top: -1%;
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
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border: 1px solid gray;
    font-size: 15px;
    background-color: grey;
    color: darkgray;
    margin-top: 25px;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}
</style>
