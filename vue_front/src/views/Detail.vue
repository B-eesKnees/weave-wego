<script setup>
import { ref } from "vue";
import Comment from "@/components/Comment.vue";
import Location from "@/components/Location.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import KakaoMap from "@/components/KakaoMap.vue";
import gnbBar from "@/components/gnbBar.vue";

const images = ref([
  "https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg",
]);

const comment = ref([
  // 댓글 더미데이터
  { id: 0, nickname: "짱구", content: "바보바보", date: "2022-12-14" },
  { id: 1, nickname: "맹구", content: "바보", date: "2022-12-15" },
  { id: 2, nickname: "바보", content: "짱구바보", date: "2022-12-16" },
]);

const location = ref([
  // 장소 더미데이터
  {
    id: 0,
    name: "국립미술박물관",
    location: "서울 그 어딘가 어쩌고저쩌고",
    number: 1,
    comment: "여기 너무 좋아요",
    Lat: 37.577607,
    Lng: 126.976894,
  },
  {
    id: 1,
    name: "경복궁",
    location: "서울 그 어딘가 어쩌고저쩌고",
    number: 2,
    comment: "여기 너무 좋아요",
    Lat: 37.578621,
    Lng: 126.980098,
  },
  {
    id: 2,
    name: "이젠아카데미",
    location: "서울 그 어딘가 어쩌고저쩌고",
    number: 3,
    comment: "여기 너무 좋아요",
    Lat: 37.569882,
    Lng: 126.986035,
  },
  {
    id: 3,
    name: "서울특별시청",
    location: "서울 그 어딘가 어쩌고저쩌고",
    number: 3,
    comment: "여기 너무 좋아요",
    Lat: 37.566815,
    Lng: 126.978658,
  },
]);
</script>

<template>
  <div class="gnb"><gnb-bar></gnb-bar></div>
  <div class="detail">
    <div class="hashtag">#종로 #식사 #카페 #전시</div>
    <div class="title">
      <div>서울에서 우리의 전통 문화를 체험해보세요</div>
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
    <!-- 본문 구역 -->
    <div class="content-main">
      <div class="map-wrapper">
        <div class="map">
          <kakao-map :locations="location" />
        </div>
      </div>
      <!-- 장소 컴포넌트 -->
      <location v-for="item in location" :location="item" :key="item.id">
      </location>
      <!-- 이미지 슬라이드 -->
      <div class="imageslider">
        <carousel :items-to-show="1" :wrapAround="true">
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
      <div>본문 본문 본문</div>
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
  padding: 0.75rem 0 1rem 0;
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
.comment-write {
  display: flex;
  padding: 1rem 1rem;
}

.comment-write > div:first-of-type {
  text-align: center;
  padding-right: 1rem;
}

.map {
  width: 70%;
  height: 400px;
  border: 1px solid black;
  margin-bottom: 10rem;
}
.map-wrapper {
  display: flex;
  justify-content: center;
}
.carousel,
.carousel_item {
  width: 500px;
  height: 350px;
}
.imageslider {
  display: flex;
  justify-content: center;
}
</style>
