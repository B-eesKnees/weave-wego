<template>
  <gnbBar />
  <MainPage1 />
  <MainPage2 />
  <MainPage3 />
</template>

<script>
import gnbBar from "../components/gnbBar.vue";
import MainPage1 from "../components/MainPage1.vue";
import MainPage2 from "../components/MainPage2.vue";
import MainPage3 from "../components/MainPage3.vue";
export default {
  components: { gnbBar, MainPage1, MainPage2, MainPage3 },
};
</script>
