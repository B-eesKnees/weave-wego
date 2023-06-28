<template>
  <div>글 작성하기</div>
  <div class="page">
    <div class="filter">필터 구역</div>
    <!-- 필터 들어갈 곳 -->
    <div class="select">
      <input type="radio" id="public" value="Public" v-model="picked" />
      <label for="public" style="margin-right: 1rem">공개</label>
      <input type="radio" id="private" value="Private" v-model="picked" />
      <label for="private">비공개</label>
    </div>
    <div>제목 <input type="text" id="title" value="Title" /></div>
    <div>지도에서 선택하기</div>
    <div class="maparea">지도 구역</div>
    <div>장소와 코멘트</div>
    <!-- 장소와 코멘트 들어갈 곳 -->
    <div>총 평</div>
    <div>총평 텍스트박스</div>
    <div>사진첨부</div>
    <div>사진첨부 버튼</div>
    <!-- 사진 첨부하는 버튼 들어갈 곳-->
    <div>작성완료와 취소</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const picked = ref("Public");
</script>

<style scoped>
.page {
  padding: 0 15%;
}

.page > div {
  margin-top: 3rem;
}
input[type="radio"] {
  margin: 0.3rem;
}
.select {
  display: flex;
  align-items: center;
}
</style>
