<template>
    <div>
      <!-- 버튼 -->
      <button @click="scrollToTop" v-if="showButton" class="scroll-to-top" :class="{ 'show': showButton }"><img src="../assets/img/toup.png" class="uparrow" alt="위로가기" height ="40" width="40"></button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showButton: false
      };
    },
    mounted() {
      // 스크롤 이벤트 리스너 추가
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      // 컴포넌트가 소멸되기 전에 이벤트 리스너 제거
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        // 페이지 상단에서 500px 아래로 스크롤되면 버튼 표시
        this.showButton = window.pageYOffset > 500;
      },
      scrollToTop() {
        // 페이지 맨 위로 스크롤
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // 스크롤 애니메이션 적용
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .scroll-to-top {
    position: fixed;
    right: 20px;
    bottom: 40px;
    z-index: 9999;
    background-color: #429775;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    width: 48px;
    height: 46px;
    background-position: 0 -324px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 3px 1px rgb(209, 209, 209);
    animation: fadein 0.7s;
    -webkit-animation: fadein 0.7s;
  }
  .uparrow {
    vertical-align: middle
  }
  @keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }
  </style>