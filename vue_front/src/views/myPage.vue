<style src="../assets/css/mypage.css"></style>
<style src="../assets/css/reset.css"></style>
<template>
  <gnbBar />

  <section class="mypage_profile_set">
    <!-- ----------------------------------------------------------------------------------------------------------------------------------- -->
    <h1 class="mypage_title">마이페이지</h1>
    <div class="myprofile">
      <div class="profileimg">
        <div v-if="provider === 'local'">
          <img
            class="profile"
            :src="`http://localhost:3000/downloadProfile/${email}/${image}`"
            alt="profileExample"
          />
        </div>
        <div v-else-if="provider === 'kakao'">
          <div
            class="kakao_profile_img"
            :style="{ 'background-image': 'url(' + image + ')' }"
          ></div>
        </div>
        <div v-else-if="provider === 'naver'">
          <div
            class="naver_profile_img"
            :style="{ 'background-image': 'url(' + image + ')' }"
          ></div>
        </div>
        <a href="/updateprofile"
          ><img
            class="setting_icon"
            src="../assets/img/setting_btn.png"
            alt="setting_btn"
        /></a>
      </div>
      <div class="nickname_email">
        <div class="nickname">{{ nick }}</div>
        <div class="email">{{ email }}</div>
      </div>
    </div>
  </section>
  <section>
    <TabsWrapper>
      <TabItem title="내코스" @click="">
        <div>
          <button v-if="!editMode" class="edit" @click="toggleEditMode">
            &nbsp;&nbsp;편집&nbsp;&nbsp;
          </button>
          <button v-if="editMode" class="delete" @click="deleteContent">
            &nbsp;&nbsp;삭제&nbsp;&nbsp;
          </button>
          <button v-if="editMode" class="cancel" @click="cancelEdit">
            &nbsp;&nbsp;취소&nbsp;&nbsp;
          </button>
        </div>
        <!-- 내코스--------------------------------------------------------------------------------------------------------------------------------------
        --------------------------------------------------------------------------------------------------------------------------------------
        -------------------------------------------------------------------------------------------------------------------------------------
        --------------------------------------------------------------------------------------------------------------------------------------
        -------------------------------------------------------------------------------------------------------------------------------------- -->
        <div class="course">
          <boardList
            v-for="item in boardList"
            :boardList="item"
            :key="item.BRD_ID"
            :editMode="editMode"
          ></boardList>
        </div>
      </TabItem>
      <TabItem title="최근에 본 코스">
        <div class="course">
          <recentBoardList
            v-for="item in recentBoardList"
            :recentBoardList="item"
            :key="item.id"
          /></div
      ></TabItem>
      <TabItem title="좋아요 리스트">
        <div class="course">
          <boardList
            v-for="item in boardList"
            :boardList="item"
            :key="item.id"
            :hideBrdOpen="true"
          /></div
      ></TabItem>
      <TabItem title="내가 쓴 댓글">
        <div>
          <button
            v-if="!comment_editMode"
            class="edit"
            @click="toggleCommentEditMode"
          >
            &nbsp;&nbsp;편집&nbsp;&nbsp;
          </button>
          <button v-if="comment_editMode" class="delete" @click="deleteComment">
            &nbsp;&nbsp;삭제&nbsp;&nbsp;
          </button>
          <button
            v-if="comment_editMode"
            class="cancel"
            @click="cancelCommentEdit"
          >
            &nbsp;&nbsp;취소&nbsp;&nbsp;
          </button>
        </div>
        <button class="comment_edit">&nbsp;&nbsp;편집&nbsp;&nbsp;</button>

        <div class="commentlist">
          <commentList
            v-for="item in commentList"
            :commentList="item"
            :key="item.COM_ID"
            :comment_editMode="comment_editMode"
          />
        </div>
      </TabItem>
    </TabsWrapper>
  </section>
</template>

<script>
import { ref } from "vue";
import gnbBar from "../components/gnbBar.vue";
import TabsWrapper from "../components/TabsWrapper.vue";
import TabItem from "../components/TabItem.vue";
import boardList from "../components/boardList.vue";
import commentList from "../components/commentList.vue";
import recentBoardList from "../components/recentBoardList.vue";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  components: {
    gnbBar,
    TabsWrapper,
    TabItem,
    boardList,
    recentBoardList,
    commentList,
  },
  data() {
    return {
      email: "",
      nick: "",
      image: "",
      provider: "",
      editMode: false,
      comment_editMode: false,
      boardList: [],
      recentBoardList: [],
    };
  },
  created() {
    this.email = localStorage.getItem("userID");
    this.nick = localStorage.getItem("userNick");
    this.image = localStorage.getItem("userImage");
    this.provider = localStorage.getItem("userProvider");
    this.boardListData();
    this.recentBoardListData();
  },
  methods: {
    // 내글 편집 삭제 수정 버튼-------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------
    toggleEditMode() {
      this.editMode = true;
    },
    deleteContent() {
      const values = [25,26]; // 삭제할 컨텐츠의 배열 값
      if (values.length === 0) {
        console.log("삭제할 컨텐츠가 없습니다");
        return; // 빈 배열이면 종료
      }
      axios({
        url: "/mypage/delMyCourse",
        method: "POST",
        data: {
          values
        }
      }).then((res)=>{
        if(res.data.code == 200) {
          console.log('성공');
        }
      }).catch((err)=>{
        if(err) {
          console.log(err);
        }
      })
    },
    cancelEdit() {
      this.editMode = false;
    },

    // 코멘트 글 편집 삭제 수정 버튼-------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------
    toggleCommentEditMode() {
      console.log("toggleCommentEditMode 호출됨");
      this.comment_editMode = true;
    },
    deleteComment() {
      // 코멘트 삭제 로직
    },
    cancelCommentEdit() {
      console.log("cancelCommentEdit 호출됨");
      this.comment_editMode = false;
    },
    // 보드리스트 불러오기-------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------
    async boardListData() {
      try {
        console.log("boardListData 메서드 호출됨"); // 로그 추가
        const response = await axios.post("/mypage/myCourse", {
          userEmail: this.email,
        });
        console.log("서버 응답 데이터:", response.data); // 로그 추가
        this.boardList = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    // 최근에 본 게시글 리스트 불러오기-------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------
    async recentBoardListData() {
      try {
        const response = await axios.post("/mypage/recentCourse", {
          userEmail: this.email,
        });
        this.recentBoardList = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  setup() {
    const commentListData = ref([
      {
        COM_ID: 0,
        COM_NUM: 0,
        COM_TITLE: "댓글이 포함된 본문의 제목",
        COM_CREATED_AT: "2023-06-26",
        COM_COMMENT: "댓글내용댓글내용댓글애용",
      },
      {
        COM_ID: 1,
        COM_NUM: 1,
        COM_TITLE: "댓글이 포함된 본문의 제목1",
        COM_CREATED_AT: "2023-06-26",
        COM_COMMENT: "댓글내용댓글내용댓글애용1",
      },
      {
        COM_ID: 2,
        COM_NUM: 2,
        COM_TITLE: "댓글이 포함된 본문의 제목2",
        COM_CREATED_AT: "2023-06-26",
        COM_COMMENT: "댓글내용댓글내용댓글애용2",
      },
    ]);

    return {
      commentList: commentListData,
    };
  },
};
</script>
