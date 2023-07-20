<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router"; // 라우터 1번 일단 임포트
import Comment from "@/components/Comment.vue";
import Location from "@/components/Location.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import KakaoMap from "@/components/KakaoMap.vue";
import gnbBar from "@/components/gnbBar.vue";
import ToUp from "@/components/ToUp.vue";

const newComment = ref("");

const boardData = ref({
  BRD_CREATED_AT: "",
  BRD_HASHTAG: [],
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

const commentData = ref([]);

const updatedComment = ref("");

const likeData = ref([]);

const locationData = ref([]);

const locationRevData = ref([""]);

let userEmail = ref("");
const popTimeData = ref();

const images = ref([]);

const route = useRoute(); // 라우터 2번 route 변수 만들어주기
const router = useRouter();

const getUserEmail = () => {
  userEmail.value = localStorage.getItem("userID");
};

const getBoard = () => {
  let recentView = "noWatch";

  if (sessionStorage.getItem("recentViewPost")) {
    recentView = "watched";
  }
  axios
    .get("http://127.0.0.1:3000/postdata/board", {
      params: {
        boardId: route.params.boardId, // router -> :boardId
        email: userEmail.value,
        recentview: recentView,
      },
    })
    .then((result) => {
      boardData.value = result.data.board;
      sessionStorage.setItem("recentViewPost", route.params.boardId);
      try {
        boardData.value.BRD_HASHTAG = JSON.parse(boardData.value.BRD_HASHTAG);
      } catch {
        boardData.value.BRD_HASHTAG = [];
      }
      locationRevData.value = [
        boardData.value.BRD_LOC_REV1,
        boardData.value.BRD_LOC_REV2,
        boardData.value.BRD_LOC_REV3,
        boardData.value.BRD_LOC_REV4,
        boardData.value.BRD_LOC_REV5,
      ];
    })
    .catch((error) => {
      console.log("board_error", error);
      alert("글이 없어용");
      router.push({
        path: `/`,
      });
    });
};

const getLikes = () => {
  axios
    .get("http://127.0.0.1:3000/postdata/likes", {
      params: {
        boardId: route.params.boardId, // router -> :boardId
      },
    })
    .then((result) => {
      likeData.value = result.data.likes;
    })
    .catch((error) => {
      console.log("like_error", error);
    });
};

const getComments = () => {
  axios
    .get("http://127.0.0.1:3000/postdata/comments", {
      params: {
        boardId: route.params.boardId, // router -> :boardId
      },
    })
    .then((result) => {
      commentData.value = result.data.comments;
      console.log(commentData.value);
    })
    .catch((error) => {
      console.log("comments_error", error);
    });
};

const reportPost = () => {
  axios
    .put(
      `http://127.0.0.1:3000/postdata/updateReport/board/${route.params.boardId}`
    )
    .then((result) => {
      boardData.value.BRD_REPORT = 1;
      alert("게시글이 신고되었습니다.");
    })
    .catch((error) => {
      alert("이미 신고된 게시글입니다.");
      console.log(error);
    });
};

const reportComment = (commentId) => {
  axios
    .put(`http://127.0.0.1:3000/postdata/updateReport/comment/${commentId}`)
    .then((result) => {
      commentData.value.COM_RREPORT = 1;
      alert("댓글이 신고되었습니다.");
    })
    .catch((error) => {
      alert("이미 신고된 댓글입니다.");
      console.log(error);
    });
};

const getLocations = () => {
  axios
    .get("http://127.0.0.1:3000/postdata/locations", {
      params: {
        boardId: route.params.boardId, // router -> :boardId
      },
    })
    .then((result) => {
      const temp = result.data.locations;
      for (let i = 0; i < JSON.parse(temp.LOC_ADD).length; i++) {
        locationData.value.push({
          LOC_ID: i,
          LOC_NAME: JSON.parse(temp.LOC_NAME)[i].name,
          LOC_ADD: JSON.parse(temp.LOC_ADD)[i].add,
          LOC_LAT: JSON.parse(temp.LOC_LAT)[i].lat,
          LOC_LNG: JSON.parse(temp.LOC_LNG)[i].lng,
        });
      }
    })
    .catch((error) => {
      console.log("locations_error", error);
    });
};

const getImages = () => {
  axios
    .get("http://127.0.0.1:3000/postdata/images", {
      params: {
        boardId: route.params.boardId, // router -> :boardId
      },
    })
    .then((result) => {
      images.value = result.data.images.map(
        (i) => `http://127.0.0.1:3000/postdata/image/${i.IMG_PATH}`
      );
    })
    .catch((error) => {
      console.log("images_error", error);
    });
};

const getPopTimes = () => {
  axios
    .get("http://127.0.0.1:3000/postdata/locationpoptime", {
      params: {
        boardId: route.params.boardId, // router -> :boardId
      },
    })
    .then((result) => {
      popTimeData.value = result.data.locationpoptime[0];
    })
    .catch((error) => {
      console.log("locationpoptimeerror", error);
    });
};
const updateLike = () => {
  axios
    .post(`http://127.0.0.1:3000/updatelike/like/${route.params.boardId}`, {
      email: localStorage.getItem("userID"),
    })
    .then(() => {
      getLikes();
    })
    .catch((error) => {
      console.log("좋아요 에러", error);
      alert("로그인 해주세요.");
      router.push("/login");
    });
};

const createComment = () => {
  if (!newComment.value) {
    alert("댓글 내용을 작성해주세요.");
    return;
  }
  axios
    .post("http://127.0.0.1:3000/boardCreate/comment", {
      boardId: route.params.boardId,
      writer: localStorage.getItem("userID"),
      nick: localStorage.getItem("userNick"),
      image: localStorage.getItem("userImage"),
      comment: newComment.value,
    })
    .then(() => {
      newComment.value = "";
      getComments();
    })
    .catch((error) => {
      alert("로그인 해 주세요.", error);
    });
};

const updateComment = (commentId, updateComment) => {
  axios
    .put(`http://127.0.0.1:3000/postdata/updatecomment/${commentId}`, {
      comment: updateComment,
    })
    .then((r) => {
      alert("댓글이 수정되었습니다.");
      getComments();
    })
    .catch((e) => {
      console.log(e);
    });
};
const deleteComment = (commentId) => {
  axios
    .get("http://127.0.0.1:3000/postdata/deletecomments", {
      params: {
        boardId: route.params.boardId,
        commentId,
      },
    })
    .then(() => {
      console.log("y");
      getComments();
    })
    .catch(() => {
      console.log("n");
    });
};

const deletePost = () => {
  axios
    .get("http://127.0.0.1:3000/postdata/deleteboard/", {
      params: {
        boardId: route.params.boardId, // router -> :boardId
      },
    })
    .then((result) => {
      router.push({
        path: "/",
      });
    })
    .catch((error) => {
      console.log("삭제 에러", error);
    });
};

const setRecentView = () => {
  axios
    .post("http://127.0.0.1:3000/recentView", {
      brdID: route.params.boardId,
      email: userEmail.value,
    })
    .then(() => {
      console.log("최근 본 게시글 성공");
    })
    .catch((err) => {
      alert(err);
    });
};

const isLiked = () =>
  likeData.value.some((l) => l.LL_ID === localStorage.getItem("userID"));

getUserEmail();
getBoard();
getLikes();
getLocations();
getComments();
getImages();
getPopTimes();
setRecentView();
</script>

<template>
  <div class="wrapper">
    <div class="gnb">
      <gnb-bar />
    </div>
    <div class="detail">
      <div class="hashtag">
        {{ `${boardData.BRD_HASHTAG.map((h) => `#${h}`).join(" ")}` }}
      </div>
      <div class="title">
        <div>{{ boardData.BRD_TITLE }}</div>
        <div class="time">
          {{ boardData.BRD_CREATED_AT.slice(0, 10) }}
        </div>
      </div>
      <div class="name-info">
        <div>{{ boardData.USER_NICKNAME }}</div>
        <div class="name-info-right">
          <div>
            <input
              id="checkbox"
              :checked="isLiked()"
              type="checkbox"
              class="checkbox"
              @click="updateLike"
            />
            <label for="checkbox">
              <svg
                id="heart-svg"
                viewBox="467 392 58 57"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="Group"
                  fill="none"
                  fill-rule="evenodd"
                  transform="translate(467 392)"
                >
                  <path
                    id="heart"
                    d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                    fill="#AAB8C2"
                  />
                  <circle
                    id="main-circ"
                    fill="#E2264D"
                    opacity="0"
                    cx="29.5"
                    cy="29.5"
                    r="1.5"
                  />

                  <g id="grp7" opacity="0" transform="translate(7 6)">
                    <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                    <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                  </g>

                  <g id="grp6" opacity="0" transform="translate(0 28)">
                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                    <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                  </g>

                  <g id="grp3" opacity="0" transform="translate(52 28)">
                    <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                    <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                  </g>

                  <g id="grp2" opacity="0" transform="translate(44 6)">
                    <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                  </g>

                  <g id="grp5" opacity="0" transform="translate(14 50)">
                    <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                    <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                  </g>

                  <g id="grp4" opacity="0" transform="translate(35 50)">
                    <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                    <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                  </g>

                  <g id="grp1" opacity="0" transform="translate(24)">
                    <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                    <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                  </g>
                </g>
              </svg>
            </label>
            {{ likeData.length }}
          </div>
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
                <a
                  v-if="boardData.BRD_WRITER == userEmail"
                  class="dropdown-item"
                  type="button"
                  :href="`/detail/edit/${route.params.boardId}`"
                >
                  수정
                </a>
              </li>
              <li>
                <button
                  v-if="boardData.BRD_WRITER == userEmail"
                  class="dropdown-item"
                  type="button"
                  @click="deletePost"
                >
                  삭제
                </button>
              </li>
              <li>
                <button
                  v-if="boardData.BRD_WRITER != userEmail"
                  class="dropdown-item"
                  type="button"
                  @click="reportPost"
                >
                  신고
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 본문 구역 -->
      <div class="content-main">
        <div class="map-wrapper">
          <div class="map">
            <kakao-map v-if="locationData.length" :locations="locationData" />
          </div>
        </div>
        <!-- 장소 컴포넌트 -->
        <location
          v-for="(item, index) in locationData"
          v-if="locationData.length && popTimeData && locationRevData.length"
          :key="index"
          :location="item"
          :number="index + 1"
          :rev="locationRevData[index]"
          :poptime="popTimeData"
        />
        <!-- 이미지 슬라이드 -->
        <div v-if="images.length" class="imageslider">
          <carousel :items-to-show="1" :wrap-around="false">
            <slide v-for="image in images" :key="image">
              <div class="carousel__item">
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
              <textarea
                v-model="newComment"
                placeholder="좋은 댓글을 씁시다"
                font-size="2rem"
                style="flex-grow: 1; height: 5rem; padding: 0.5rem"
                maxlength="200"
              />

              <button
                id="comment-submit"
                class="comment-submit"
                type="submit"
                width="100px"
                @click="createComment"
              >
                댓글 달기
              </button>
            </div>
            <!--댓글 컴포넌트 -->
            <comment
              v-for="comment in commentData"
              :key="comment.COM_ID"
              :comment="comment"
              @delete="deleteComment"
              @edit="updateComment"
              @report="reportComment"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <to-up />
</template>

<style>
.carousel {
  width: 60%;
}

.carousel__item,
.carousel__item > img {
  width: 92%;

  height: 500px;
  object-fit: cover;
}
.imageslider {
  display: flex;
  justify-content: center;
}
.carousel__track {
  margin-bottom: 0;
}
</style>

<style scoped>
body {
  background-color: rgba(250, 250, 250, 1);
  font-family: "Noto Sans KR", sans-serif;
}
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
.name-info > div {
  display: flex;
  align-items: center;
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
  margin-left: 1rem;
  border: none;
  background-color: transparent;
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

.dropdown {
  border: 0;
  background-color: transparent;
}

#heart-svg {
  cursor: pointer;
  overflow: visible;
  width: 2.5rem;
}

svg #heart {
  transform-origin: center;
  animation: animateHeartOut 0.3s linear forwards;
}

svg #main-circ {
  transform-origin: 29.5px 29.5px;
}

.checkbox {
  display: none;
}

.checkbox:checked + label svg #heart {
  transform: scale(0.2);
  fill: #e2264d;
  animation: animateHeart 0.3s linear forwards 0.25s;
}

.checkbox:checked + label svg #main-circ {
  transition: all 2s;
  animation: animateCircle 0.3s linear forwards;
  opacity: 1;
}

.checkbox:checked + label svg #grp1 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp1 #oval1 {
  transform: scale(0) translate(0, -30px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp1 #oval2 {
  transform: scale(0) translate(10px, -50px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp2 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp2 #oval1 {
  transform: scale(0) translate(30px, -15px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp2 #oval2 {
  transform: scale(0) translate(60px, -15px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp3 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp3 #oval1 {
  transform: scale(0) translate(30px, 0px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp3 #oval2 {
  transform: scale(0) translate(60px, 10px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp4 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp4 #oval1 {
  transform: scale(0) translate(30px, 15px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp4 #oval2 {
  transform: scale(0) translate(40px, 50px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp5 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp5 #oval1 {
  transform: scale(0) translate(-10px, 20px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp5 #oval2 {
  transform: scale(0) translate(-60px, 30px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp6 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp6 #oval1 {
  transform: scale(0) translate(-30px, 0px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp6 #oval2 {
  transform: scale(0) translate(-60px, -5px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp7 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp7 #oval1 {
  transform: scale(0) translate(-30px, -15px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp7 #oval2 {
  transform: scale(0) translate(-55px, -30px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp2 {
  opacity: 1;
  transition: 0.1s opacity 0.3s;
}

.checkbox:checked + label svg #grp3 {
  opacity: 1;
  transition: 0.1s opacity 0.3s;
}

.checkbox:checked + label svg #grp4 {
  opacity: 1;
  transition: 0.1s opacity 0.3s;
}

.checkbox:checked + label svg #grp5 {
  opacity: 1;
  transition: 0.1s opacity 0.3s;
}

.checkbox:checked + label svg #grp6 {
  opacity: 1;
  transition: 0.1s opacity 0.3s;
}

.checkbox:checked + label svg #grp7 {
  opacity: 1;
  transition: 0.1s opacity 0.3s;
}

@keyframes animateCircle {
  40% {
    transform: scale(10);
    opacity: 1;
    fill: #dd4688;
  }
  55% {
    transform: scale(11);
    opacity: 1;
    fill: #d46abf;
  }
  65% {
    transform: scale(12);
    opacity: 1;
    fill: #cc8ef5;
  }
  75% {
    transform: scale(13);
    opacity: 1;
    fill: transparent;
    stroke: #cc8ef5;
    stroke-width: 0.5;
  }
  85% {
    transform: scale(17);
    opacity: 1;
    fill: transparent;
    stroke: #cc8ef5;
    stroke-width: 0.2;
  }
  95% {
    transform: scale(18);
    opacity: 1;
    fill: transparent;
    stroke: #cc8ef5;
    stroke-width: 0.1;
  }
  100% {
    transform: scale(19);
    opacity: 1;
    fill: transparent;
    stroke: #cc8ef5;
    stroke-width: 0;
  }
}

@keyframes animateHeart {
  0% {
    transform: scale(0.2);
  }
  40% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes animateHeartOut {
  0% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
