<template>
  <div class="gnb">
    <div class="gnb_bar">
      <div class="gnb_bar_logo">
        <h2>
          <a href="/"><img src="../assets/img/logo.png" alt="logo" /></a>
        </h2>
      </div>
      <div class="gnb_bar_user">
        <p>
          <a href="/mypage"
            ><img src="../assets/img/profileExample.png" alt="profileExample"
          /></a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.gnb_bar {
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 3vh;
  padding-bottom: 3vh;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  position: fixed;
  top: 0;
  background-color: white;
}
.gnb_bar_logo {
  position: absolute;
  left: 40vw;
}
.gnb_bar_logo a {
  padding: 3vh;
}

.gnb_bar_logo > h2 > a > img {
  width: 20vh;
}
.gnb_bar_user {
  display: flex;
  margin-right: 10%;
}
.gnb_bar_user a {
  position: relative;
}
.gnb_bar_user a > img {
  width: 40px;
  position: relative;
}
</style>
