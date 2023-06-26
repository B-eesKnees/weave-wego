<template>
    <gnbBar />
    <div class="mainpage">
      <div class="mainpage_first">
        <div class="mainpage_first_left">
          <img src="../assets/img/logo.png" alt="">
          <a href=""><button>코스 보러가기</button></a>
          <a href=""><button>작성하기</button></a>
        </div>
        <div class="mainpage_first_right">
          <div class="image-slide">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=871&q=80"
              alt="image-1" /><img
              src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
              alt="img-2" /><img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=974&q=80"
              alt="img-3" /><img
              src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=415&q=80"
              alt="img-4" /><img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
              alt="img-6" /><img
              src="https://images.unsplash.com/photo-1499748926165-1085fc69e9fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
              alt="img-7" /><img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=873&q=80"
              alt="img-8" /><img
              src="https://images.unsplash.com/photo-1475776408506-9a5371e7a068?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=758&q=80"
              alt="img-9" /><img
              src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
              alt="img-10" />
            <img
              src="https://images.unsplash.com/photo-1500534623283-312aade485b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
              alt="img-11">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import gnbBar from '../components/gnbBar.vue'
  export default {
    components: { gnbBar }
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
    z-index: -1;
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
    animation: slide 40s infinite alternate 1s ;
  }
  
  @keyframes slide {
    0% {
      right: 0%;
    }
    10% {
      right: 100%;
    }
    20% {
      right: 200%;
    }
    30% {
      right: 300%;
    }
    40% {
      right: 400%;
    }
    50% {
      right: 500%;
    }
    60% {
      right: 600%;
    }
    70% {
      right: 700%;
    }
    80% {
      right: 800%;
    }
    90% {
      right: 900%;
    }
    100% {
      right: 1000%;
    }
  }
  </style>
  