<template>
  <gnbBar />
  <MainPage1 />
  <MainPage2 />
  <MainPage3 />
  <Footer />
  <Toup />
</template>

<script>
import gnbBar from "../components/gnbBar.vue";
import MainPage1 from "../components/MainPage1.vue";
import MainPage2 from "../components/MainPage2.vue";
import MainPage3 from "../components/MainPage3.vue";
import Footer from "../components/footer.vue";
import Toup from "../components/ToUp.vue";

export default {
  components: { gnbBar, MainPage1, MainPage2, MainPage3, Footer, Toup },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");

@media screen and (max-width: 1920px) {
  body {
    background-color: rgba(250, 250, 250, 1);
    font-family: "Noto Sans KR", sans-serif;
    /* line-height: 1.7; */
  }
}
</style>
