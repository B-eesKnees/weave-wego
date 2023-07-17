<script setup>
import { useSlots, ref, provide } from "vue";

const slots = useSlots();
const tabTitles = ref(slots.default().map((tab) => tab.props.title));
const selectedTitle = ref();

if (sessionStorage.getItem("selectGnb") === "myComment") {
  selectedTitle.value = tabTitles.value[3];
} else if (sessionStorage.getItem("selectGnb") === "likeList") {
  selectedTitle.value = tabTitles.value[2];
} else if (sessionStorage.getItem("selectGnb") === "recentCourse") {
  selectedTitle.value = tabTitles.value[1];
} else {
  selectedTitle.value = tabTitles.value[0];
}

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
        @click="selectedTitle = title"
      >
        {{ title }}
      </li>
    </ul>

    <slot />
  </div>
</template>
