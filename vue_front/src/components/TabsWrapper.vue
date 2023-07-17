<script setup>
import { useSlots, ref, provide, onMounted, watch } from "vue";

const slots = useSlots();
const tabTitles = ref(slots.default().map((tab) => tab.props.title));
const selectedTitle = ref();

// 페이지가 로드되면서 sessionStorage에서 선택한 탭을 불러옴
onMounted(() => {
  // const selectedTab = sessionStorage.getItem("selectedTab");
  // if (selectedTab && tabTitles.value.includes(selectedTab)) {
  //   selectedTitle.value = selectedTab;
  // } else {
  // sessionStorage에 저장된 값이 없을 경우, 이전과 동일하게 처리
  const selectGnb = sessionStorage.getItem("selectGnb");
  if (selectGnb === "myComment") {
    selectedTitle.value = tabTitles.value[3];
  } else if (selectGnb === "likeList") {
    selectedTitle.value = tabTitles.value[2];
  } else if (selectGnb === "recentCourse") {
    selectedTitle.value = tabTitles.value[1];
  } else {
    selectedTitle.value = tabTitles.value[0];
  }
  // }
});

// watch를 사용하여 selectGnb 값이 변경될 때 selectedTitle 값도 변경
watch(
  () => sessionStorage.getItem("selectGnb"),
  (newValue) => {
    if (newValue === "myComment") {
      selectedTitle.value = tabTitles.value[3];
    } else if (newValue === "likeList") {
      selectedTitle.value = tabTitles.value[2];
    } else if (newValue === "recentCourse") {
      selectedTitle.value = tabTitles.value[1];
    } else {
      selectedTitle.value = tabTitles.value[0];
    }
  }
);

// 탭 선택 시 호출되는 함수
const handleTabClick = (title) => {
  selectedTitle.value = title;
  // 선택한 탭을 sessionStorage에 저장
  sessionStorage.setItem("selectedTab", title);
  // 선택한 탭에 해당하는 selectGnb 값을 sessionStorage에 저장
  if (title === tabTitles.value[3]) {
    sessionStorage.setItem("selectGnb", "myComment");
  } else if (title === tabTitles.value[2]) {
    sessionStorage.setItem("selectGnb", "likeList");
  } else if (title === tabTitles.value[1]) {
    sessionStorage.setItem("selectGnb", "recentCourse");
  } else {
    sessionStorage.setItem("selectGnb", "");
  }
};

provide("selectedTitle", selectedTitle);
</script>

<template>
  <div class="tabs">
    <ul class="tabs__header">
      <li
        v-for="title in tabTitles"
        :key="title"
        class="tabs__item"
        :class="{ selected: selectedTitle === title }"
        @click="handleTabClick(title)"
      >
        {{ title }}
      </li>
    </ul>

    <slot />
  </div>
</template>
