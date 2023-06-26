<style src="../assets/css/mypage.css"></style>
<style src="../assets/css/reset.css"></style>
<template>
  <gnbBarLogin />

  <section class="mypage_profile_set">
    <h1 class="mypage_title">마이페이지</h1>
    <div class="myprofile">
      <div class="profileimg">
        <img
          class="profile"
          src="../assets/img/profileExample.png"
          alt="profileExample"
        />
        <a href="/updateprofile"
          ><img
            class="setting_icon"
            src="../assets/img/setting_btn.png"
            alt="setting_btn"
        /></a>
      </div>
      <div class="nickname_email">
        <div class="nickname">맹구좋아</div>
        <div class="email">maengoo9@gmail.com</div>
      </div>
    </div>
  </section>
  <section>
    <TabsWrapper>
      <TabItem title="내코스">
        <div>
          <button v-if="!editMode" class="edit" @click="toggleEditMode">
            &nbsp;&nbsp;편집&nbsp;&nbsp;
          </button>
          <button v-if="editMode" class="delete" @click="deleteComment">
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
          >
          </boardList>
        </div>
      </TabItem>
      <TabItem title="최근에 본 코스">
        <div class="course">
          <boardList
            v-for="item in boardList"
            :boardList="item"
            :key="item.id"
            :hideBrdOpen="true"
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
      <TabItem title="내가 쓴 댓글"
        ><button class="comment_edit">&nbsp;&nbsp;편집&nbsp;&nbsp;</button>

        <div class="commentlist">
          <commentList
            v-for="item in commentList"
            :commentList="item"
            :key="item.id"
          />
        </div>
      </TabItem>
    </TabsWrapper>
  </section>
</template>

<script>
import { ref } from "vue";
import gnbBarLogin from "../components/gnbBarLogin.vue";
import TabsWrapper from "../components/TabsWrapper.vue";
import TabItem from "../components/TabItem.vue";
import boardList from "../components/boardList.vue";
import commentList from "../components/commentList.vue";

export default {
  components: {
    gnbBarLogin,
    TabsWrapper,
    TabItem,
    boardList,
    commentList,
  },
  data() {
    return {
      editMode: false,
    };
  },
  methods: {
    toggleEditMode() {
      this.editMode = true;
      boardList.editMode = true;
    },
    deleteComment() {
      // 삭제 로직을 구현하세요
    },
    cancelEdit() {
      this.editMode = false;
    },
  },
  setup() {
    const boardListData = ref([
      {
        BRD_ID: 0,
        BRD_HASHTAG: "#종로구 #중구 #식사 #전시",
        BRD_TITLE: "서울 실내 데이트 코스 추천!",
        BRD_CREATED_AT: "2023-06-22",
        likecount: 10,
        BRD_VIEWCOUNT: 100,
        BRD_OPEN: "공개",
        checked: false,
      },
      {
        BRD_ID: 1,
        BRD_HASHTAG: "#서초구 #강남구 #카페 #쇼룸,편집샵",
        BRD_TITLE: "테스트 제목2",
        BRD_CREATED_AT: "2023-06-22",
        likecount: 20,
        BRD_VIEWCOUNT: 200,
        BRD_OPEN: "비공개",
        checked: false,
      },
      {
        BRD_ID: 2,
        BRD_HASHTAG: "#마포구 #식사 #전시",
        BRD_TITLE: "테스트 제목3",
        BRD_CREATED_AT: "2023-06-22",
        likecount: 30,
        BRD_VIEWCOUNT: 300,
        BRD_OPEN: "공개",
        checked: false,
      },
    ]);
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
      boardList: boardListData,
      commentList: commentListData,
    };
  },
};
</script>
