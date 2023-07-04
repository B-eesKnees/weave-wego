<script setup>
import axios from "axios";
import { useRoute } from "vue-router"; // 라우터 1번 일단 임포트
//
import { ref } from "vue";
import Comment from "@/components/Comment.vue";
import Location from "@/components/Location.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import KakaoMap from "@/components/KakaoMap.vue";
import gnbBar from "@/components/gnbBar.vue";

const newComment = ref("");

const boardData = ref({
  BRD_CREATED_AT: "",
  BRD_HASHTAG: "",
  BRD_ID: 0,
  BRD_LOC_REV1: "",
  BRD_LOC_REV2: "",
  BRD_LOC_REV3: "",
  BRD_LOC_REV4: "",
  BRD_LOC_REV5: "",
  BRD_NICK: "",
  BRD_OPEN: "",
  BRD_REPORT: "",
  BRD_REV: "",
  BRD_TITLE: "",
  BRD_UPDATED_AT: "",
  BRD_VIEWCOUNT: 0,
  BRD_WRITER: "",
});

const commentData = ref([
  // 댓글 더미데이터
  {
    COM_COMMENT: "",
    COM_CREATED_AT: "",
    COM_ID: 0,
    COM_IMAGE: "",
    COM_NICK: "",
    COM_NUM: 0,
    COM_REPORT: "",
    COM_UPDATED_AT: "",
    COM_WRITER: "",
  },
]);

const locationData = ref([
  // 댓글 더미데이터
  {
    LOC_ID: 0,
    LOC_NAME: "",
    LOC_LAT: 0,
    LOC_LNG: 0,
  },
]);

const locationRevData = ref([""]);

const images = ref([
  "https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg",
]);

const route = useRoute(); // 라우터 2번 route 변수 만들어주기

axios
  .get("http://127.0.0.1:3000/postdata/board", {
    params: {
      boardId: route.params.boardId, // router -> :boardId
    },
  })
  .then((result) => {
    boardData.value = result.data.board;
    locationRevData.value = [
      boardData.value.BRD_LOC_REV1,
      boardData.value.BRD_LOC_REV2,
      boardData.value.BRD_LOC_REV3,
      boardData.value.BRD_LOC_REV4,
      boardData.value.BRD_LOC_REV5,
    ];
    console.log(result.data.board);
  })
  .catch((error) => {
    console.log("board_error", error);
  });

axios
  .get("http://127.0.0.1:3000/postdata/comments", {
    params: {
      boardId: route.params.boardId, // router -> :boardId
    },
  })
  .then((result) => {
    commentData.value = result.data.comments;
  })
  .catch((error) => {
    console.log("comments_error", error);
  });

axios
  .get("http://127.0.0.1:3000/postdata/locations", {
    params: {
      boardId: route.params.boardId, // router -> :boardId
    },
  })
  .then((result) => {
    const temp = result.data.locations;

    locationData.value = temp.map((t) => ({
      LOC_ID: t.LOC_ID,
      LOC_NAME: JSON.parse(t.LOC_NAME).name,
      LOC_LAT: JSON.parse(t.LOC_LAT).lat,
      LOC_LNG: JSON.parse(t.LOC_LNG).lng,
    }));
  })
  .catch((error) => {
    console.log("locations_error", error);
  });

const createComment = () => {};
</script>

<template>
  <div>
    <div class="gnb">
      <gnb-bar />
    </div>
    <div class="detail">
      <div class="hashtag">
        {{ boardData.BRD_HASHTAG }}
      </div>
      <div class="title">
        <div>{{ boardData.BRD_TITLE }}</div>
        <div class="time">
          {{ boardData.BRD_CREATED_AT }}
        </div>
      </div>
      <div class="name-info">
        <div>{{ boardData.BRD_WRITER }}</div>
        <div class="name-info-right">
          <div>좋아요</div>
          <div>조회수 {{ boardData.BRD_VIEWCOUNT }}</div>
          <div>
            <button
              type="button"
              class="dropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
            </button>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" type="button">수정</button>
              </li>
              <li>
                <button class="dropdown-item" type="button">삭제</button>
              </li>
              <li>
                <button class="dropdown-item" type="button">신고</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 본문 구역 -->
      <div class="content-main">
        <div class="map-wrapper">
          <div class="map">
            <kakao-map :locations="locationData" />
          </div>
        </div>
        <!-- 장소 컴포넌트 -->
        <location
          v-for="(item, index) in locationData"
          :key="index"
          :location="item"
          :number="index + 1"
          :rev="locationRevData[index]"
        />
        <!-- 이미지 슬라이드 -->
        <div class="imageslider">
          <carousel :items-to-show="1" :wrap-around="true">
            <slide v-for="image in images" :key="image">
              <div class="carousel_item">
                <img :src="image" />
              </div>
            </slide>

            <template #addons>
              <navigation />
            </template>
          </carousel>
        </div>
        <!-- 본문 본문 본문 -->
        <div class="main">
          {{ boardData.BRD_REV }}
        </div>
        <div>
          <!-- 댓글 구역 시작 -->
          <div>
            <div>댓글</div>
            <div class="comment-write">
              <input
                v-model="newComment"
                type="text"
                placeholder="좋은 댓글을 씁시다"
                font-size="2rem"
                style="flex-grow: 1; height: 5rem"
              />

              <div>
                <button
                  id="comment-submit"
                  class="comment-submit"
                  type="submit"
                  width="100px"
                >
                  댓글 달기
                </button>
              </div>
            </div>
            <!--댓글 컴포넌트 -->
            <comment
              v-for="comment in commentData"
              :key="comment.COM_ID"
              :comment="comment"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gnb {
  margin-bottom: 8rem;
}
.detail {
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.hashtag {
  font-size: 1.5rem;
  color: rgb(201, 201, 201);
}
.title {
  display: flex;
  align-items: baseline;
  padding: 0.2rem 0 1rem 0;
  margin: 0.5rem 0;
}
.title > div:first-of-type {
  padding-right: 1.5rem;
  font-size: 2rem;
}
.time {
  font-size: 0.75rem;
  color: grey;
}
.name-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6rem;
}
.name-info-right {
  display: flex;
}
.name-info-right > div {
  padding-left: 1rem;
}
.content-main {
  min-height: 400px;
  border-bottom: 1px solid black;
  margin-bottom: 2rem;
}
.main {
  text-align: center;
  margin-top: 3.5rem;
  margin-bottom: 4rem;
  padding: 0 10%;
}
.comment-write {
  display: flex;
  padding: 1rem 1rem;
}

.comment-write > div:first-of-type {
  text-align: center;
  padding-right: 1rem;
}
.comment-submit {
  width: 70px;
  height: 30px;
  margin-top: 1.5rem;
  margin-left: 1rem;
}

.map {
  width: 70%;
  height: 450px;
  border: 1px solid black;
  margin-bottom: 8rem;
}
.map-wrapper {
  display: flex;
  justify-content: center;
}
.carousel {
  width: 70%;
}
.carousel_item {
  width: 100%;
  height: 450px;
}
.imageslider {
  display: flex;
  justify-content: center;
}
.dropdown {
  border: 0;
  background-color: transparent;
}
.dropdown-item {
}
</style>
