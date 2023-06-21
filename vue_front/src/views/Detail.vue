<script setup>
import { ref } from "vue";
import Comment from "../components/Comment.vue";
import Location from "../components/Location.vue";

const comment = ref([
  { id: 0, nickname: "짱구", content: "바보바보", date: "2022-12-14" },
  { id: 1, nickname: "맹구", content: "바보", date: "2022-12-15" },
  { id: 2, nickname: "바보", content: "짱구바보", date: "2022-12-16" },
]);

const location = ref([
  {
    id: 0,
    name: "국립미술박물관",
    location: "서울 그 어딘가 어쩌고저쩌고",
    number: 1,
    comment: "여기 너무 좋아요",
  },
  {
    id: 1,
    name: "경복궁",
    location: "서울 그 어딘가 어쩌고저쩌고",
    number: 2,
    comment: "여기 너무 좋아요",
  },
  {
    id: 2,
    name: "이젠아카데미",
    location: "서울 그 어딘가 어쩌고저쩌고",
    number: 3,
    comment: "여기 너무 좋아요",
  },
]);
</script>

<template>
  <div class="detail">
    <div class="hashtag">#태그 #태그 #태그 #태그</div>
    <div class="title">
      <div>제목제목제목제목제목제목제목제목</div>
      <div class="time">2023.06.20</div>
    </div>
    <div class="name-info">
      <div>작성자</div>
      <div class="name-info-right">
        <div>좋아요</div>
        <div>조회수</div>
        <div>더보기</div>
      </div>
    </div>
    <div class="content-main">
      <div class="map-wrapper">
        <div class="map">지도 구역</div>
      </div>
      <!-- 장소 컴포넌트 -->
      <location v-for="item in location" :location="item" :key="item.id">
      </location>

      <div>
        <!-- 댓글 구역 시작 -->
        <div>
          <div>댓글</div>
          <div class="comment-write">
            <div>
              <input
                type="text"
                placeholder="좋은 댓글을 씁시다"
                style="width: 800px; height: 70px"
              />
            </div>
            <div>
              <button type="submit" id="comment-submit">댓글 달기</button>
            </div>
          </div>
          <!--댓글 컴포넌트 -->
          <comment v-for="item in comment" :comment="item" :key="item.id">
          </comment>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail {
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0 15rem;
}

.hashtag {
  color: grey;
}
.title {
  display: flex;
  align-items: baseline;
  padding: 0.75rem 0 1rem 0;
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
  border-bottom: 1px solid black;
  margin-bottom: 2rem;
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
.comment-write {
  display: flex;
  padding: 1rem 1rem;
}

.comment-write > div:first-of-type {
  text-align: center;
  padding-right: 1rem;
}

.map {
  width: 300px;
  height: 300px;
  border: 1px solid black;
  background-color: bisque;
  margin-bottom: 10rem;
}
.map-wrapper {
  display: flex;
  justify-content: center;
  background-color: aqua;
}
</style>
