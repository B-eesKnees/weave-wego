<template>
    <gnbBar />
    <SideBar />
    <div class="admin_boardlist">
        <h2>전체 게시글</h2>
        <h5>전체 <span>{{ totalCourse.length }}</span>개</h5>
        <div class="admin_boards">
            <div class="admin_boards_info">
                <p>제목</p>
                <p>글쓴이</p>
                <p>날짜</p>
                <p>조회수</p>
                <p>좋아요</p>
                <p>상태</p>
                <input type="checkbox">
            </div>
            <div v-for="(item, i) in showBoard" :key="i" class="admin_board">
                <p>{{ item.BRD_TITLE }}</p>
                <p>{{ item.BRD_NICK }}<br />({{ item.BRD_WRITER }})</p>
                <p>{{ item.BRD_CREATED_AT }}</p>
                <p>{{ item.BRD_VIEWCOUNT }}</p>
                <p>좋아요데이터 없음</p>
                <p v-if="item.BRD_OPEN == 'Y'">공개</p>
                <p v-else>비공개</p>
                <input type="checkbox">
            </div>
        </div>
        <div class="admin_boardlist_page">
            <button @click="pagingDown">이전</button>
            <div v-for="(page,i) in result" :key="i" class="paging">
                <button @click="paging($event)">{{ i+1 }}</button>

            </div>
            <!-- <span>현재페이지 : {{ pageCount }}</span> -->
            <button @click="pagingUp">다음</button>
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
    name: '',
    components: {
        gnbBar,
        SideBar,
    },
    data() {
        return {
            totalCourse: [],

            result: [],
            showBoard: [],
            pageCount: 0,
            currentPage: 1,
        };
    },

    setup() { },
    created() {
        this.viewCourse()
    },
    mounted() { },
    unmounted() { },
    methods: {
        viewCourse() { //전체 게시글 요청
            axios({
                url: '/admin/viewBoardlist',
                method: 'POST'
            }).then(async (res) => {
                this.totalCourse = res.data;

                for (var i = 0; i < this.totalCourse.length; i += 10) { //게시글 총 갯수를 10개씩 나눠서 묶음
                    this.result.push(this.totalCourse.slice(i, i + 10));
                }
                for (i in this.result[0]) {
                    this.showBoard.push(this.result[0][i]);
                }
                this.pageCount++;
            })
        },
        pagingUp() {
            this.showBoard = [];
            for (var i in this.result[this.pageCount]) {
                this.showBoard.push(this.result[this.pageCount][i]);
            }
            this.pageCount++;
        },
        pagingDown() {
            this.showBoard = [];
            this.pageCount--;
            for (var i in this.result[this.pageCount - 1]) {
                this.showBoard.push(this.result[this.pageCount - 1][i]);
            }
        },
        paging(event) {
            this.showBoard = [];
            console.log(event.target.innerText);
            var page = event.target.innerText;

            for (var j = 1; j <= this.result.length; j++) {
                if (page == j) {
                    console.log(j);
                    for (var i in this.result[j - 1]) {
                        this.showBoard.push(this.result[j - 1][i]);
                    }
                    this.currentPage = j;
                    this.pageCount = j;
                }
            }



        }
    }
}
</script>

<style scoped>
input {
    width: 20px;
    height: 20px;
}

.admin_boardlist {
    width: 80%;
    margin: 5% auto 5% auto;
}

.admin_boardlist>h2 {
    margin-top: 5%;
    margin-bottom: 5%;
    text-align: center;
}

.admin_boardlist span {
    font-weight: bold;
}

.admin_boards {
    box-shadow: 0 0 5px #ccc;
    border-radius: 4px;
}

.admin_boards_info {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1% 1% 0 1%;
    font-weight: bold;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.admin_boards_info p:nth-child(1) {
    width: 30%;
}

.admin_boards_info p:nth-child(2) {
    width: 15%;
}

.admin_boards_info p:nth-child(3) {
    width: 20%;
}

.admin_boards_info p:nth-child(4) {
    width: 7%;
}

.admin_boards_info p:nth-child(5) {
    width: 7%;
}

.admin_boards_info p:nth-child(6) {
    width: 7%;
}

.admin_board {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1%;
}

.admin_board:nth-child(2n-1) {
    background-color: #f2f0f9;
}

.admin_board p:nth-child(1) {
    width: 30%;
}

.admin_board p:nth-child(2) {
    width: 15%;
}

.admin_board p:nth-child(3) {
    width: 20%;
}

.admin_board p:nth-child(4) {
    width: 7%;
}

.admin_board p:nth-child(5) {
    width: 7%;
}

.admin_board p:nth-child(6) {
    width: 7%;
}


.admin_boardlist_page {
    text-align: center;
    margin-top: 2%;
    margin-bottom: 10%;
    width: 100%;
    
}

.admin_boardlist_page button {
    padding: 0 1%;
}

.paging {
    display: inline-block;
}
.paging button {
    width: 200%;
    background-color: antiquewhite;
}
</style>