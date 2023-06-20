<style src="../assets/css/mypage.css"></style>
<template>
  <gnbBarLogin />

  <section class="mypage_profile_set">
    <h1 class="mypage_title">마이페이지</h1>
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
      <div class="nickname">맹구</div>
      <div class="email">maengoo9@gmail.com</div>
    </div>
  </section>
  <section>
    <tabMenu />
  </section>
</template>

<script>
import gnbBarLogin from "../components/gnbBarLogin.vue";
import tabMenu from "../components/TabMenu.vue";

export default {
  components: {
    gnbBarLogin,
    tabMenu,
  },
};
</script>
