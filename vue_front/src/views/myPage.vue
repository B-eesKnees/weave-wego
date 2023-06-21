<style src="../assets/css/mypage.css"></style>
<style src="../assets/css/reset.css"></style>
<template>
  <gnbBarLogin />

  <section class="mypage_profile_set">
    <h1 class="mypage_title">마이페이지</h1>
    <div class="myprofile">
      <div class="profileimg">
        <img
          class="profile"
          src="../assets/img/profileExample.png"
          alt="profileExample"
        />
        <a href="/updateprofile"
          ><img
            class="setting_icon"
            src="../assets/img/setting_btn.png"
            alt="setting_btn"
        /></a>
      </div>
      <div class="nickname_email">
        <div class="nickname">맹구좋아</div>
        <div class="email">maengoo9@gmail.com</div>
      </div>
    </div>
  </section>
  <section>
    <TabsWrapper>
      <TabItem title="내코스"> </TabItem>
      <TabItem title="최근에 본 코스"
        >Content from Tab 2 Lorem ipsum dolor sit amet.</TabItem
      >
      <TabItem title="좋아요 리스트"
        >Content from Tab 3 Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Voluptates, ipsa.</TabItem
      >
      <TabItem title="내가 쓴 댓글"
        >Content from Tab 4 Lorem ipsum dolor sit amet.</TabItem
      >
    </TabsWrapper>
  </section>
</template>

<script>
import gnbBarLogin from "../components/gnbBarLogin.vue";
import TabsWrapper from "../components/TabsWrapper.vue";
import TabItem from "../components/TabItem.vue";

export default {
  components: {
    gnbBarLogin,
    TabsWrapper,
    TabItem,
  },
};
</script>

<!-- <style>
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
