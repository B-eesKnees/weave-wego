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
        <div v-if="!nodata">
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
          <div id="nodata" class="nodata">작성한 게시글이 없습니다</div>
          <boardList
            v-if="!nodata"
            v-for="item in boardList"
            :boardList="item"
            :key="item.BRD_ID"
            :editMode="editMode"
            @addlist="(id) => addToselectedItems(id)"
            @removelist="(id) => deleteToselectedItems(id)"
          ></boardList>
        </div>
        <!-- 자식 컴포넌트에서 넘어온 것들 받기 / 받아온 값들(id) 두 함수에 전달 -->
      </TabItem>

      <TabItem title="최근에 본 코스">
        <!-- 최근에 본 코스--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
        <div class="course">
          <div id="norecentData" class="nodata">최근에 본 코스가 없습니다</div>
          <recentBoardList
            v-if="!norecentData"
            v-for="item in recentBoardList"
            :recentBoardList="item"
            :key="item.BRD_ID"
          /></div
      ></TabItem>
      <TabItem title="좋아요 리스트">
        <!-- 좋아요리스트--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
        <div class="course">
          <div id="noLikeData" class="nodata">좋아요 한 코스가 없습니다</div>
          <likeBoardList
            v-if="!noLikeData"
            v-for="item in likeBoardList"
            :likeBoardList="item"
            :key="item.id"
            :hideBrdOpen="true"
          /></div
      ></TabItem>
      <TabItem title="내가 쓴 댓글">
        <!-- 내가 쓴 댓글--------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------ -->
        <div v-if="!noCommentData">
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
        <!-- <button class="comment_edit">&nbsp;&nbsp;편집&nbsp;&nbsp;</button> -->

        <div class="commentlist">
          <div id="noCommentData" class="nodata">작성한 댓글이 없습니다</div>
          <commentList
            v-if="!noCommentData"
            v-for="item in commentList"
            :commentList="item"
            :key="item.COM_ID"
            :comment_editMode="comment_editMode"
          />
        </div>
      </TabItem>
    </TabsWrapper>
  </section>
  <footerContent />
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
import footerContent from "@/components/footer.vue";
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";
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
    footerContent,
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
      norecentData: false,
      noLikeData: false,
      noCommentData: false,
      selectedItems: [],
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
      this.nodata = false;
      try {
        const response = await axios.post("/mypage/myCourse", {
          userEmail: this.email,
        });

        // console.log(this.nodata);

        this.boardList = response.data;
        console.log(response.data);
        if (this.boardList.length != 0) {
          this.nodata = false;
        } else {
          this.nodata = true;
        }
      } catch {
        this.nodata = true;
        console.log(this.nodata);
      }
    },
    // 최근에 본 게시글 리스트 불러오기-------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------
    async recentBoardListData() {
      this.norecentData = false;
      try {
        const response = await axios.post("/mypage/recentCourse", {
          userEmail: this.email,
        });
        this.recentBoardList = response.data;
        if (this.norecentData.length != 0) {
          this.norecentData = false;
        } else {
          this.norecentData = true;
        }
      } catch {
        this.norecentData = true;
      }
    },
    // 좋아요 리스트 불러오기-------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------
    async likeBoardListData() {
      this.noLikeData = false;
      try {
        const response = await axios.post("/mypage/likeList", {
          userEmail: this.email,
        });
        this.likeBoardList = response.data;
        if (this.noLikeData.length != 0) {
          this.noLikeData = false;
        } else {
          this.noLikeData = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    // 댓글 불러오기-------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------
    async commentListData() {
      this.noCommentData = false;
      try {
        const response = await axios.post("/mypage/myComment", {
          userEmail: this.email,
        });
        this.commentList = response.data;
        if (this.noCommentData.length != 0) {
          this.noCommentData = false;
        } else {
          this.noCommentData = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    // 내글 편집 삭제 수정 버튼-------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------
    toggleEditMode() {
      this.editMode = true;
    },
    addToselectedItems(id) {
      //selectedItems 배열에 받아온 BRD_ID push
      this.selectedItems.push(id);
      console.log(this.selectedItems);
    },
    deleteToselectedItems(id) {
      //selectedItems 배열에서 받아온 BRD_ID 필터로 제거 아마? 삭제되긴함
      this.selectedItems = this.selectedItems.filter((item) => item !== id);
      console.log(this.selectedItems);
    },
    async deleteContent() {
      //테스트하느라 콘솔이 많습니다..
      // 삭제 버튼을 누른다면
      if (this.selectedItems.length === 0) {
        //배열길이가 0이면 !this.selectedItems는 왜인지 작동이 안됌
        console.log(this.selectedItems);
        alert("삭제 할 게시글 없음");
        return; // 선택된 항목이 없으면 종료합니다.
      } else {
        // 선택된 항목을 서버에 삭제 요청합니다.
        console.log(this.selectedItems);
        axios({
          url: "/mypage/delMyCourse",
          method: "POST",
          data: this.selectedItems,
        })
          .then(async (res) => {
            alert(res.data.message);
            this.selectedItems = []; //삭제후 배열 비우기 안비우면 계속 남아있음
            console.log(this.selectedItems);
            await this.boardListData(); //삭제후 새롭게 게시글 받아오기
          })
          .catch((error) => {
            alert(error);
          });
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
