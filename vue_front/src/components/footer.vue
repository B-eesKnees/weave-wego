<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer_1">
        <a href="/"
          ><img src="../assets/img/logo.png" alt="logo" class="footer_img"
        /></a>
      </div>
      <p class="footer_text">
        서울특별시 서초구 서초대로77길 54 (서초더블유타워 13,14층) | E-MAIL
        <br />
        COPYRIGHT@2023 Bee’s Knees ALL RIGHT RESERVED.
      </p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #d9d9d9;
  padding: 4% 0;
  position: static;
  bottom: 0;
  width: 100%;
  height: 20vh;
  margin-top: auto;
}

.footer_1 {
  float: left;
}

.footer_img {
  vertical-align: middle;
  width: 20vh;
}

.footer_text {
  text-align: right;
  white-space: pre-wrap;
  margin: 0;
  line-height: 1.5;
  font-size: small;
}

.wrap {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
