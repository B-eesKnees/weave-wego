<script setup>
const props = defineProps({
  location: Object,
  number: Number,
  rev: String,
  poptime: Object,
});
</script>

<template>
  <div class="location">
    <!-- Location -->
    <div class="location-left">
      <div>{{ number }}</div>
      <div class="location-info">
        <div>
          <a
            data-bs-toggle="offcanvas"
            :href="`#${location.LOC_NAME.replaceAll(' ', '')}`"
            >{{ location.LOC_NAME }}</a
          >
        </div>
        <div class="location-location">
          {{ location.LOC_ADD }}
        </div>
      </div>
    </div>
    <div class="location-comment">
      {{ rev }}
    </div>
    <!-- Off canvas -->
    <div
      :id="location.LOC_NAME.replaceAll(' ', '')"
      class="offcanvas offcanvas-end canvas"
      tabindex="-1"
    >
      <div class="offcanvas-body canvas-body">
        <!-- 오프캔버스 내부 내용-->
        <div class="test">
          <div>
            <img src="../assets/img/deli1.jpeg" />
          </div>
          <div>
            <div>
              <img src="../assets/img/deli2.jpeg" />
            </div>
            <div>
              <img src="../assets/img/deli3.jpeg" />
            </div>
          </div>
        </div>
        <div class="canvas-name">
          {{ location.LOC_NAME }}
        </div>
        <div class="canvas-location">
          {{ location.LOC_ADD }}
        </div>
        <div class="canvas-detail">
          <div>연락처 : 02) 123 - 1234</div>
          <div>홈페이지 : https://www.ezen.co.kr</div>
          <div>영업시간 : {{ poptime.LOC_POP_TIME }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.location {
  display: flex;
  margin-bottom: 4rem;
}
.location-left {
  width: 17rem;
  height: fit-content;
  margin-right: 3rem;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
}

.location-left > :first-of-type {
  display: flex;
  font-size: 1.8rem;
  padding-left: 0.25rem;
  align-items: flex-end;
}
.location-info {
  max-width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.location-info a {
  color: black;
  text-decoration: none;
}
.location-info :first-of-type :hover {
  color: green;
}
.location-info > div:first-of-type {
  font-size: 1.5rem;
  text-align: right;
  word-break: keep-all;
}
.location-location {
  font-size: 0.9rem;
  text-align: right;
  word-break: keep-all;
}
.location-comment {
  width: 800px;
}

.test {
  width: 100%;
  height: 24rem;
  display: flex;
  margin-bottom: 3rem;
}

.test > div:first-of-type {
  width: 66%;
  height: 100%;
}

.test > div:last-of-type {
  width: 34%;
  height: 100%;
}

.test > div > div {
  width: 100%;
  height: 50%;
}

.test img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.canvas {
  z-index: 10000 !important;
  width: 36rem !important;
}
.canvas-body {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-top: 0 !important;
  margin-top: -3rem !important;
}
.canvas-name {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  margin-left: 2.5rem;
}
.canvas-location {
  margin-left: 2.5rem;
  margin-right: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid black;
}
.canvas-detail {
  font-size: 1.5rem;
  font-weight: 400;
  margin-left: 2.5rem;
}

.canvas-detail > div {
  margin-top: 3rem;
}
</style>
