<script setup>
const props = defineProps({
  location: Object,
});
</script>

<template>
  <div class="location">
    <!-- 장소 구역 -->
    <div class="location-left">
      <div>{{ location.number }}</div>
      <div class="location-info">
        <div>{{ location.name }}</div>
        <div class="location-location">{{ location.location }}</div>
      </div>
    </div>
    <div>{{ location.comment }}</div>
  </div>
</template>

<style>
.location {
  display: flex;
  margin-bottom: 3rem;
}
.location-left {
  display: flex;
  margin-right: 3rem;
  height: 4rem;
  border-bottom: 1px solid black;
  justify-content: space-between;
  width: 20rem;
}

.location-left > :first-of-type {
  display: flex;
  font-size: 1.5rem;
  padding-left: 0.25rem;
  align-items: end;
}
.location-info {
  display: flex;
  flex-direction: column;
}
.location-info > div:first-of-type {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: end;
  margin-right: 0.25rem;
}
.location-location {
  text-align: end;
  margin-right: 0.25rem;
}
</style>
