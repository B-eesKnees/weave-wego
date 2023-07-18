<template>
  <gnbBar />
  <SideBar />
  <div class="admin_boardlist">
    <h2>신고 게시글</h2>
    <div class="admin_boardlist_top">
      <h5>
        전체 <span>{{ totalCourse.length }}</span
        >개
      </h5>
      <button @click="sendSelectedItems">삭제</button>
    </div>
    <div class="admin_boards">
      <div class="admin_boards_info">
        <p>제목</p>
        <p>글쓴이</p>
        <p>날짜</p>
        <p>신고여부</p>
        <p>조회수</p>
        <p>좋아요</p>
        <p>상태</p>
        <input @change="checkedAllItems" type="checkbox" v-model="checkedAll" />
      </div>
      <div v-for="(item, i) in showBoard" :key="i" class="admin_board">
        <p>{{ item.BRD_TITLE }}</p>
        <p>{{ item.BRD_NICK }}<br />({{ item.BRD_WRITER }})</p>
        <p>{{ item.BRD_CREATED }}</p>
        <p v-if="item.BRD_REPORT == '1'">신고</p>
        <p v-else>미신고</p>
        <p>{{ item.BRD_VIEWCOUNT }}</p>
        <p>{{ item.likecount }}</p>
        <p class="report_brd_open" v-if="item.BRD_OPEN == '1'">공개</p>
        <p v-else>비공개</p>
        <input
          ref="selectedref"
          type="checkbox"
          v-model="selected"
          :value="`${item.BRD_ID}`"
        />
      </div>
    </div>
    <div class="admin_boardlist_page">
      <button class="prevBtn" @click="pagingDown">이전</button>
      <div v-for="(page, i) in result" :key="i" class="paging">
        <button ref="currentpages" @click="paging($event)">{{ i + 1 }}</button>
      </div>
      <button class="nextBtn" @click="pagingUp">다음</button>
    </div>
  </div>
</template>

<script>
import gnbBar from "../components/gnbBar.vue";
import SideBar from "../components/adminSidebar.vue";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  name: "",
  components: {
    gnbBar,
    SideBar,
  },
  data() {
    return {
      isChecked: false,
      checkedAll: false,
      selected: [],

      totalCourse: [],

      result: [],
      showBoard: [],
      pageCount: 0,
      currentPage: 1,
    };
  },

  setup() {},
  created() {},
  mounted() {
    this.viewCourse();
  },
  unmounted() {},
  watch: {},
  methods: {
    viewCourse() {
      //전체 게시글 요청
      axios({
        url: "/admin/reportCourse",
        method: "POST",
      }).then(async (res) => {
        this.totalCourse = res.data;

        for (var i = 0; i < this.totalCourse.length; i += 10) {
          //게시글 총 갯수를 10개씩 나눠서 묶음
          this.result.push(this.totalCourse.slice(i, i + 10));
        }
        for (i in this.result[0]) {
          this.showBoard.push(this.result[0][i]);
        }
        this.pageCount++;
      });
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

      var page = event.target.innerText;

      for (var j = 1; j <= this.result.length; j++) {
        //게시글묶음(데이터를10개씩 묶은 수)만큼 반복
        if (page == j) {
          // 클릭한 버튼의 숫자와 j가 같으면
          for (var i in this.result[j - 1]) {
            // j-1만큼 반복
            this.showBoard.push(this.result[j - 1][i]);
          }
          this.currentPage = j; // 현재페이지
          this.pageCount = j; // 다음,이전버튼과 연동을 위한 페이지 카운트
        }
      }
      //스타일(배경색) 초기화
      for (i in this.$refs.currentpages) {
        this.$refs.currentpages[i].classList.remove("currentPage");
      }
      //클릭한 버튼이 현재페이지와 같으면 스타일(배경색) 추가
      for (i in this.$refs.currentpages) {
        if (
          this.currentPage == page &&
          !this.$refs.currentpages[i].classList.contains("currentPage")
        ) {
          event.target.classList.add("currentPage");
        }
      }
    },
    checkedAllItems() {
      if (this.checkedAll) {
        for (var i in this.$refs.selectedref) {
          this.$refs.selectedref[i].checked = true;
          console.log(this.$refs.selectedref[i].value);
          console.log(this.$refs.selectedref[i].checked);
          this.selected.push(this.$refs.selectedref[i].value);
        }
      } else {
        this.selected = [];
      }
    },
    async sendSelectedItems() {
      var CourseID = this.selected;
      console.log(CourseID);

      if (confirm("신고 게시글을 정말 삭제하시겠습니까?")) {
        //삭제 요청
        await axios({
          url: "http://localhost:3000/admin/deleteCourse",
          method: "POST",
          data: {
            CourseID: CourseID,
          },
        }).then(async (res) => {
          alert(res.data.message);
          window.location.href = "/admin/reportboard";
        });
      }
    },
  },
};
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

.admin_boardlist > h2 {
  margin-top: 5%;
  margin-bottom: 5%;
  text-align: center;
}

.admin_boardlist span {
  font-weight: bold;
}

.admin_boardlist_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.admin_boardlist_top span {
  color: #388265;
  font-size: x-large;
}

.admin_boardlist_top button {
  background-color: #388265;
  color: whitesmoke;
  padding: 1%;
  margin-bottom: 1%;
  font-size: small;
  font-weight: bold;
  border-radius: 10%;
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

.admin_boards_info p:nth-child(1),
.admin_board p:nth-child(1) {
  width: 30%;
}

.admin_boards_info p:nth-child(2),
.admin_board p:nth-child(2) {
  width: 15%;
}

.admin_boards_info p:nth-child(3),
.admin_board p:nth-child(3) {
  width: 20%;
}

.admin_boards_info p:nth-child(4),
.admin_board p:nth-child(4) {
  width: 7%;
}

.admin_boards_info p:nth-child(5),
.admin_board p:nth-child(5) {
  width: 7%;
}

.admin_boards_info p:nth-child(6),
.admin_board p:nth-child(6) {
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
  background-color: #d7e6e0;
}

.admin_boardlist_page {
  text-align: center;
  margin-top: 2%;
  margin-bottom: 10%;
  max-width: 100%;
  display: flex;
  justify-content: center;
}

.admin_boardlist_page button {
  border: 1px solid #ccc;
  padding: 0 1%;
}

.prevBtn {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.nextBtn {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.paging {
  display: flex;
}

.paging button {
  width: 100%;
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
}

.currentPage {
  background-color: #d7e6e0;
  color: whitesmoke;
}
</style>
