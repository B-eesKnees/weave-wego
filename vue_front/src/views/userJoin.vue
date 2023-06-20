<template>
    <gnbBar />
    <div class="join">
        <div class="title-bar">
            <h5>회원가입</h5>
            <a href="#"><img src="../assets/img/profileExample.png" alt="">
                <div class="title-bar-btn">+</div>
            </a>
        </div>

        <div class="wrap">
            <form @submit.prevent="joinForm">
                <label for="email">아이디</label>
                <input v-model="email" type="text" id="email" placeholder="이메일 입력" class="width">
                <input type="submit" id="email_check" class="username_submit"><br />
                <label for="password">비밀번호</label>
                <input v-model="password" type="password" id="password" placeholder="비밀번호 입력"><br />
                <label for="password_check">비밀번호 확인</label>
                <input v-model="password_check" type="password" id="password_check" placeholder="비밀번호 확인 입력"><br />
                <label for="nickname">별명</label>
                <input v-model="nickname" type="text" id="nickname" placeholder="활동명 입력" class="width">
                <input v-model="nickname_check" type="submit" id="nickname_check" class="username_submit"><br />
                <div class="gender">
                    <label for="sex">성별</label>
                    <input type='radio' name='gender' value='male' class="input_sex" />남자
                    <input type='radio' name='gender' value='female' class="input_sex" />여자
                </div>
                <div class="age_range">
                    <label for="age_range">나이대</label>
                    <input type='radio' name='age_range' value='male' class="input_sex" />10대
                    <input type='radio' name='age_range' value='female' class="input_sex" />20대
                    <input type='radio' name='age_range' value='male' class="input_sex" />30대
                    <input type='radio' name='age_range' value='female' class="input_sex" />40대
                    <input type='radio' name='age_range' value='male' class="input_sex" />50대
                    <input type='radio' name='age_range' value='female' class="input_sex" />60세 이상
                </div>
                <label for="phone_num">전화번호</label>
                <input v-model="phone" type="tel" id="phone_num" placeholder="전화번호 입력"><br />
                <a href="/auth/join"><input type="submit" class="submit" id="login" value="가입하기"></a>

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
            nickname: '',
            phone: ''
        };
    },
    methods: {
        movetomain() {
            window.location.href = '/';
        },
        joinForm() {

            axios({
                url: "http://localhost:3000/auth/join",
                method: "POST",
                data: {
                    email: this.email,
                    password: this.password,
                    nickname: this.nickname,
                    phone: this.phone
                }
            }).then(res => {
                alert(res.data.message);
                window.location.href = '/';
            }).catch(err => {
                alert(err);
            })
        }
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
    top: 72%;
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
</style>