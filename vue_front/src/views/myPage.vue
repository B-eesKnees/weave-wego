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
        <button class="edit">&nbsp;&nbsp;편집&nbsp;&nbsp;</button>
        <a href="/detail">
          <div class="course">
            <boardList
              v-for="item in boardList"
              :boardList="item"
              :key="item.id"
            />
          </div>
        </a>
      </TabItem>
      <TabItem title="최근에 본 코스">
        <a href="/detail">
          <div class="course">
            <boardList
              v-for="item in boardList"
              :boardList="item"
              :key="item.id"
              :hideBrdOpen="true"
            /></div></a
      ></TabItem>
      <TabItem title="좋아요 리스트"
        ><a href="/detail">
          <div class="course">
            <boardList
              v-for="item in boardList"
              :boardList="item"
              :key="item.id"
              :hideBrdOpen="true"
            /></div></a
      ></TabItem>
      <TabItem title="내가 쓴 댓글"
        ><button class="edit">&nbsp;&nbsp;편집&nbsp;&nbsp;</button>
        <a href="/detail">
          <div class="course">
            <commentList
              v-for="item in commentList"
              :commentList="item"
              :key="item.id"
            />
          </div> </a
      ></TabItem>
    </TabsWrapper>
  </section>
</template>

<script>
import { ref } from "vue";
import gnbBarLogin from "../components/gnbBarLogin.vue";
import TabsWrapper from "../components/TabsWrapper.vue";
import TabItem from "../components/TabItem.vue";
import boardList from "../components/boardList.vue";
import commentList from "@/components/commentList.vue";

export default {
  components: {
    gnbBarLogin,
    TabsWrapper,
    TabItem,
    boardList,
    commentList,
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
      },
      {
        BRD_ID: 1,
        BRD_HASHTAG: "#서초구 #강남구 #카페 #쇼룸,편집샵",
        BRD_TITLE: "테스트 제목2",
        BRD_CREATED_AT: "2023-06-22",
        likecount: 20,
        BRD_VIEWCOUNT: 200,
        BRD_OPEN: "비공개",
      },
      {
        BRD_ID: 2,
        BRD_HASHTAG: "#마포구 #식사 #전시",
        BRD_TITLE: "테스트 제목3",
        BRD_CREATED_AT: "2023-06-22",
        likecount: 30,
        BRD_VIEWCOUNT: 300,
        BRD_OPEN: "공개",
      },
    ]);

    return { boardList: boardListData };
  },
};
</script>
