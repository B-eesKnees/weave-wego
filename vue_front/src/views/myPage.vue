<style src="../assets/css/mypage.css"></style>
<style src="../assets/css/reset.css"></style>
<template>
  <gnbBar />

  <section class="mypage_profile_set">
    <!-- ----------------------------------------------------------------------------------------------------------------------------------- -->
    <h1 class="mypage_title">마이페이지</h1>
    <div class="myprofile">
      <div class="profileimg">
        <div v-if="provider === 'local' && image !== 'default'">
          <img
            class="kakao_profile_img"
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
        <div v-else-if="image === 'default'">
          <img
            class="kakao_profile_img"
            src="../assets/img/profileExample.png"
            alt="profileExample"
          />
        </div>
        <a href="/checkpw"
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
      <TabItem title="내코스">
        <!-- 내코스--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
        <h2 id="nodata" v-if="nodata">데이터가 없습니다.</h2>
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
        <!-- 최근에 본 코스--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
        <div class="course">
          <recentBoardList
            v-for="item in recentBoardList"
            :recentBoardList="item"
            :key="item.BRD_ID"
          /></div
      ></TabItem>
      <TabItem title="좋아요 리스트">
        <!-- 좋아요리스트--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
        <div class="course">
          <likeBoardList
            v-for="item in likeBoardList"
            :likeBoardList="item"
            :key="item.id"
            :hideBrdOpen="true"
          /></div
      ></TabItem>
      <TabItem title="내가 쓴 댓글">
        <!-- 내가 쓴 댓글--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
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
import likeBoardList from "../components/likeBoardList.vue";
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
    likeBoardList,
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
      likeBoardList: [],
      commentList: [],
      nodata: false,
    };
  },
  created() {
    this.email = localStorage.getItem("userID");
    this.nick = localStorage.getItem("userNick");
    this.image = localStorage.getItem("userImage");
    this.provider = localStorage.getItem("userProvider");
    this.boardListData();
    this.recentBoardListData();
    this.likeBoardListData();
    this.commentListData();
  },
  methods: {
    // 보드리스트 불러오기-------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------
    async boardListData() {
      try {
        this.nodata = false;
        const response = await axios.post("/mypage/myCourse", {
          userEmail: this.email,
        });
        console.log(this.boardListData);
        console.log(this.nodata);

        this.boardList = response.data;
      } catch (error) {
        console.error(error);
        this.nodata = true;
        console.log(this.nodata);
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
    // 좋아요 리스트 불러오기-------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------
    async likeBoardListData() {
      try {
        const response = await axios.post("/mypage/likeList", {
          userEmail: this.email,
        });
        this.likeBoardList = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    // 댓글 불러오기-------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------
    async commentListData() {
      try {
        const response = await axios.post("/mypage/myComment", {
          userEmail: this.email,
        });
        this.commentList = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    // 내글 편집 삭제 수정 버튼-------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------
    toggleEditMode() {
      this.editMode = true;
    },
    deleteContent() {
      // // 선택된 항목들을 삭제하는 로직을 구현합니다.
      // if (!this.selectedItems) {
      //   return; // 선택된 항목이 없으면 종료합니다.
      // }

      // // 선택된 항목을 서버에 삭제 요청합니다.
      // axios
      //   .post("/mypage/delMyCourse", { selectedItems })
      //   .then((response) => {
      //     // 서버로부터 응답을 받으면 클라이언트에서도 해당 항목을 삭제합니다.
      //     if (response.data.success) {
      //       // 삭제 요청이 성공한 경우
      //       this.selectedItems.forEach((item) => {
      //         const index = this.boardList.findIndex(
      //           (board) => board.BRD_ID === item
      //         );
      //         if (index !== -1) {
      //           this.boardList.splice(index, 1); // 선택된 항목을 배열에서 제거합니다.
      //         }
      //       });
      //       this.selectedItems = []; // 선택된 항목 배열을 초기화합니다.
      //     } else {
      //       console.error(response.data.error);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      function deleteUsers() {
        const values = selectedUsers.value.map((user) => user.member_id); // 선택된 유저의 member_id를 가져옵니다

        location.reload();
        if (values.length === 0) {
          console.log("삭제할 컨텐츠가 없습니다");
          return;
        }

        if (window.confirm("정말로 선택된 회원을 삭제하시겠습니까?")) {
          axios
            .post("http://localhost:9212/api/manager_user", { values })
            .then((res) => {
              if (res.data.code === 200) {
                console.log("삭제 성공");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("삭제 취소");
        }
      }
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
  },
};
</script>
