<script setup>
const props = defineProps({
  location: Object,
  number: Number,
  rev: String,
});
</script>

<template>
  <div class="location">
    <!-- Location -->
    <div class="location-left">
      <div>{{ number }}</div>
      <div class="location-info">
        <div>
          <a data-bs-toggle="offcanvas" :href="`#${location.LOC_NAME}`">{{
            location.LOC_NAME
          }}</a>
        </div>
        <div class="location-location">
          {{ location.location }}
        </div>
      </div>
    </div>
    <div class="location-comment">
      {{ rev }}
    </div>
    <!-- Off canvas -->
    <div
      :id="location.LOC_NAME"
      class="offcanvas offcanvas-end canvas"
      tabindex="-1"
    >
      <div class="offcanvas-body canvas-body">
        <!-- 오프캔버스 내부 내용-->
        <div class="test">
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg"
            />
          </div>
          <div>
            <div>
              <img
                src="https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg"
              />
            </div>
            <div>
              <img
                src="https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg"
              />
            </div>
          </div>
        </div>
        <div class="canvas-name">
          {{ location.name }}
        </div>
        <div class="canvas-location">
          {{ location.location }}
        </div>
        <div class="canvas-detail">
          <div>연락처 : 02) 123 - 1234</div>
          <div>홈페이지 : https://www.ezen.co.kr</div>
          <div>영업시간 :</div>
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
  display: flex;
  margin-right: 3rem;

  height: 4rem;
  border-bottom: 1px solid black;
  justify-content: space-between;
  width: 17rem;
}

.location-left > :first-of-type {
  display: flex;
  font-size: 1.8rem;
  padding-left: 0.25rem;
  align-items: flex-end;
}
.location-info {
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
  margin-bottom: 0.35rem;
  text-align: end;
  margin-right: 0.25rem;
}
.location-location {
  text-align: flex-end;
  margin-right: 0.25rem;
  font-size: 0.9rem;
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
