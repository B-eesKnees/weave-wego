<template>
    <gnbBar />
    <SideBar />
    <h2 class="admin_h2">관리자 페이지</h2>
    <div class="admin">
        <div class="reportCourse">
            <div class="reportCourse_titles">
                <h5 class="reportCourse_title">신고 게시글</h5>
                <div>
                    <a class="reportCourse_titles_link" href="/admin/reportboard">
                        <span class="reportCourse_titles_number">{{ reportCourse.length }}</span>
                        <span>></span>
                    </a>
                </div>
            </div>
            <div class="reportCourse_info">
                <p>글번호</p>
                <p>글제목</p>
                <p>유저이메일</p>
            </div>
            <div class="reportCourse_contents">
                <div v-for="course in reportCourse.slice(0, 4)" :key="course.id" class="reportCourse_content">
                    <p class="reportCourse_content_num">{{ course.BRD_ID }}</p>
                    <p class="reportCourse_content_title">{{ course.BRD_TITLE }}</p>
                    <p class="reportCourse_content_writer">{{ course.BRD_WRITER }}</p>
                </div>
            </div>
        </div>

        <div class="reportCourse">
            <div class="reportCourse_titles">
                <h5 class="reportCourse_title">전체 게시글</h5>
                <div>
                    <a class="reportCourse_titles_link" href="/admin/boardlist">
                        <span class="reportCourse_titles_number">{{ totalCourse.length }}</span>
                        <span>></span>
                    </a>
                </div>
            </div>
            <div class="reportCourse_info">
                <p>글번호</p>
                <p>글제목</p>
                <p>유저이메일</p>
            </div>
            <div class="reportCourse_contents">
                <div v-for="course in totalCourse.slice(0, 4)" :key="course.id" class="reportCourse_content">
                    <p class="reportCourse_content_num">{{ course.BRD_ID }}</p>
                    <p class="reportCourse_content_title">{{ course.BRD_TITLE }}</p>
                    <p class="reportCourse_content_writer">{{ course.BRD_WRITER }}</p>
                </div>
            </div>
        </div>

        <div class="reportCourse">
            <div class="reportCourse_titles">
                <h5 class="reportCourse_title">신고 댓글</h5>
                <div>
                    <a class="reportCourse_titles_link" href="#">
                        <span class="reportCourse_titles_number">{{ reportComment.length }}</span>
                        <span>></span>
                    </a>
                </div>
            </div>
            <div class="reportComment_info">
                <p>댓글번호</p>
                <p>댓글제목</p>
                <p>유저닉네임</p>
            </div>
            <div class="reportCourse_contents">
                <div v-for="com in reportComment" :key="com.id" class="reportCourse_content">
                    <p class="reportComment_content_num">{{ com.COM_ID }}</p>
                    <p class="reportComment_content_title">{{ com.COM_NICK }}</p>
                    <p class="reportComment_content_writer">{{ com.COM_WRITER }}</p>
                </div>
            </div>
        </div>

        <div class="reportCourse">
            <div class="reportCourse_titles">
                <h5 class="reportCourse_title">유저목록</h5>
                <div>
                    <a class="reportCourse_titles_link" href="#">
                        <span class="reportCourse_titles_number">{{ userData.length }}</span>
                        <span>></span>
                    </a>
                </div>
            </div>
            <div class="user_info">
                <p>유저이메일</p>
                <p>유저닉네임</p>
                <p>가입경로</p>
            </div>
            <div class="reportCourse_contents">
                <div v-for="user in userData.slice(0, 4)" :key="user.id" class="user_content">
                    <p class="user_content_num">{{ user.USER_EMAIL }}</p>
                    <p class="user_content_title">{{ user.USER_NICKNAME }}</p>
                    <p class="user_content_writer">{{ user.USER_PROVIDER }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gnbBar from "../components/gnbBar.vue";
import SideBar from "../components/adminSidebar.vue"
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
    components: {
        gnbBar,
        SideBar,
    },
    data() {
        return {
            reportCourse: [], //신고당한 게시글 담을 배열
            reportComment: [], //신고당한 댓글 담을 배열
            totalCourse: [], //전제 글
            userData: [] //유저데이터
        }
    },
    created() {
        this.viewReport()
        this.viewReportComment()
        this.viewCourse()
        this.viewUser()
    },
    mounted() {

    },
    methods: {
        viewReport() { //신고당한 게시글 달라고 요청
            axios({
                url: '/admin/reportCourse',
                method: 'POST'
            }).then(async (res) => {
                this.reportCourse = res.data;
            })
        },
        viewReportComment() { //신고당한 댓글 달라고 요청
            axios({
                url: '/admin/reportComment',
                method: 'POST'
            }).then(async (res) => {
                this.reportComment = res.data;
            })
        },
        viewCourse() { //전체 게시글 요청
            axios({
                url: '/admin/viewBoardlist',
                method: 'POST'
            }).then(async (res) => {
                this.totalCourse = res.data;
            })
        },
        viewUser() { //전체 유저 데이터 요청
            axios({
                url: '/admin/viewUserlist',
                method: 'POST'
            }).then(async (res) => {
                this.userData = res.data;
            })
        }
    }
}
</script>

<style scoped>
.admin_h2 {
    margin: 5% auto 0 auto;
    text-align: center;
}

.admin {
    max-width: 80%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 1% auto 0 auto;
}

.reportCourse {
    width: 40%;
    height: 35vh;
    line-height: normal;
    border-radius: 10px;
    box-shadow: 0 0 5px #ccc;
    margin: 2% 1%;
}

.reportCourse p,
.reportCourse h5 {
    margin: 0;
}

.reportCourse_titles {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2% 2%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.reportCourse_titles_number {
    color: #388265;
    font-weight: bold;
    margin-left: -15%;
    margin-right: 5%;
}

.reportCourse_titles_link {
    font-size: large;
    text-decoration: none;
    padding: 2% 6%;
}

.reportCourse_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1% 2%;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.reportCourse_info p:nth-child(2) {
    margin-left: -42%;
}

.reportCourse_contents {}

.reportCourse_content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2% 2%;
}

.reportCourse_content_num {
    font-size: small;
    width: 12%;
    overflow: hidden;
}

.reportCourse_content_title {
    width: 20%;
    padding-right: 40%;
    overflow: hidden;
}

.reportCourse_content_writer {
    width: 30%;
    overflow: hidden;
    font-size: small;
}


/* 신고 댓글 */
.reportComment_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1% 2%;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.reportComment_info p:nth-child(2) {
    margin-left: -35%;
}

.reportComment_content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2% 2%;
}

.reportComment_content_num {
    font-size: small;
    width: 12%;
    overflow: hidden;
}

.reportComment_content_title {
    width: 40%;
    padding-right: 20%;
    overflow: hidden;
}

.reportComment_content_writer {
    width: 30%;
    overflow: hidden;
    font-size: small;
}


/* 유저목록 */
.user_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1% 2%;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.user_info p:nth-child(2) {
    margin-left: -15%;
}

.user_content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2% 2%;
}

.user_content_num {
    font-size: small;
    width: 30%;
    height: 22px;
    overflow: hidden;
}

.user_content_title {
    width: 45%;
    height: 22px;
    padding-right: 5%;
    overflow: hidden;
}

.user_content_writer {
    width: 10%;
    height: 22px;
    overflow: hidden;
    font-size: small;
}
</style>