<template>
  <gnbBar />
  <div class="mainpage">
    <div class="mainpage_first">
      <div class="mainpage_first_left">
        <img src="../assets/img/logo.png" alt="">
        <a href="#main3"><button>코스 보러가기</button></a>
        <a href="/newpost"><button>작성하기</button></a>
      </div>
      <div class="mainpage_first_right">
        <div class="image-slide">
            <img @click="link1" src="../assets/img/gwangjang.jpg" alt="image-1" />
            <img @click="link2" src="../assets/img/eljiro.jpg" alt="image-2" />
            <img @click="link3" src="../assets/img/gyeongbokgung.jpg" alt="image-3" />
            <img @click="link4" src="../assets/img/eljiro.jpg" alt="image-4" />
            <img @click="link5" src="../assets/img/gyeongbokgung.jpg" alt="image-5" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import gnbBar from '../components/gnbBar.vue'

export default {
  components: { gnbBar },
  methods: {
    link1() {
      window.location.href = "/detail/";
    },
    link2() {
      window.location.href = "/detail/";
    },
    link3() {
      window.location.href = "/detail/";
    },
    link4() {
      window.location.href = "/detail/";
    },
    link5() {
      window.location.href = "/detail/";
    }
  }
}
</script>
  
<style scoped>
.mainpage {}

.mainpage_first {
  width: 100%;
  height: 100vh;
}

.mainpage_first_left {
  width: 35%;
  height: 100vh;
  float: left;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.mainpage_first_left img {
  margin: 40% auto;
  margin-top: -40%;
  width: 50%;
  height: 5%;
}

.mainpage_first_left a,
.mainpage_first_left button {
  width: 30vh;
  height: 6vh;
  margin: 2% auto;
  border: none;
  border-radius: 6px;
  background-color: #388265;
  color: white;
  font-weight: bold;
  line-height: 0px;
}

.mainpage_first_left a:last-child {
  margin-bottom: -50%;
}

.mainpage_first_right {
  width: 65%;
  height: 100%;
  float: right;
  box-sizing: border-box;
}


/* 이미지 슬라이드 css코드 */
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}


.image-slide {
  position: absolute;
  width: 65%;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 3.3%;
  display: flex;
}

.image-slide img {

  width: 100%;
  flex-shrink: 0;
  height: 93vh;
  overflow: hidden;
  position: relative;
  animation: slide 20s infinite 1.5s;
}

@keyframes slide {
  0% {
    right: 0%;
  }
  20% {
    right: 100%;
  }
  40% {
    right: 200%;
  }
  60% {
    right: 300%;
  }
  80% {
    right: 400%;
  }
  100% {
    right: 400%;
  }
}
</style>