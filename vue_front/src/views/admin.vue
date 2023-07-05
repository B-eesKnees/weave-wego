<template>
    <gnbBar />
    <br/><br/><br/><br/>
    <div>
        <button type="button" @click="viewReport">버튼1</button> <button type="button" @click="reset1">취소버튼1</button>
        <div v-if="reportCourse.length > 0"> 
            <!-- 신고당한 게시글이 있다면 -->
        <h2>신고당한 게시글:</h2>
            <ul>
                <li v-for="course in reportCourse" :key="course.id"> <!--반복문-->
                <h3>{{ course.BRD_ID }}</h3>
                <p>{{ course.BRD_TITLE }}</p>
                <p>{{ course.BRD_WRITER }}</p>
                </li>
            </ul>
        </div>
    </div>
    <div>
        <button type="button" @click="viewReportComment">버튼2</button> <button type="button" @click="reset2">취소버튼2</button>
        <div v-if="reportComment.length > 0"> 
            <!-- 신고당한 댓글이 있다면 -->
        <h2>신고당한 댓글:</h2>
            <ul>
                <li v-for="com in reportComment" :key="com.id"> <!--반복문-->
                <h3>{{ com.COM_ID }}</h3>
                <p>{{ com.COM_NICK }}</p>
                <p>{{ com.COM_WRITER }}</p>
                </li>
            </ul>
        </div>
    </div>
    <div>
        <button type="button" @click="viewCourse">버튼3</button> <button type="button" @click="reset3">취소버튼3</button>
        <div v-if="totalCourse.length > 0"> 
            <!-- 전체 글 보기 -->
        <h2>전체 글 보기:</h2>
            <ul>
                <li v-for="course in totalCourse" :key="course.id"> <!--반복문-->
                <h3>{{ course.BRD_ID }}</h3>
                <p>{{ course.BRD_TITLE }}</p>
                <p>{{ course.BRD_WRITER }}</p>
                </li>
            </ul>
        </div>
    </div>
    <div>
        <button type="button" @click="viewUser">버튼4</button> <button type="button" @click="reset4">취소버튼4</button>
        <div v-if="userData.length > 0"> 
            <!-- 유저 보기 -->
        <h2>유저 보기:</h2>
            <ul>
                <li v-for="user in userData" :key="user.id"> <!--반복문-->
                <h3>{{ user.USER_EMAIL }}</h3>
                <p>{{ user.USER_NICKNAME }}</p>
                <p>{{ user.USER_PROVIDER }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import gnbBar from "../components/gnbBar.vue";
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
    components: {
        gnbBar
    },
    data() {
        return {
            reportCourse: [], //신고당한 게시글 담을 배열
            reportComment: [], //신고당한 댓글 담을 배열
            totalCourse: [], //전제 글
            userData: [] //유저데이터
        }
    },
    methods: {
        viewReport() { //신고당한 게시글 달라고 요청
            axios({
                url: '/admin/reportCourse',
                method: 'POST'
            }).then(async(res)=>{
                this.reportCourse = res.data;
            })
        },
        viewReportComment() { //신고당한 댓글 달라고 요청
            axios({
                url: '/admin/reportComment',
                method: 'POST'
            }).then(async(res)=>{
                this.reportComment = res.data;
            })
        },
        viewCourse() { //전체 게시글 요청
            axios({
                url: '/admin/viewBoardlist',
                method: 'POST'
            }).then(async (res)=>{
                this.totalCourse = res.data;
            })
        },
        viewUser() { //전체 유저 데이터 요청
            axios({
                url: '/admin/viewUserlist',
                method: 'POST'
            }).then(async (res)=>{
                this.userData = res.data;
            })
        },
        reset2() {
            this.reportComment = [];
        },
        reset1() {
            this.reportCourse = [];
        },
        reset3() {
            this.totalCourse = [];
        },
        reset4() {
            this.userData = [];
        }
    }
}
</script>