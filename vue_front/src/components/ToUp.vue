<template>
    <div>
      <!-- 버튼 -->
      <button @click="scrollToTop" v-if="showButton" class="scroll-to-top">위로</button>
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
          behavior: 'instant' // 스크롤 애니메이션 적용
        });
      }
    }
  };
  </script>
  
  <style>
  .scroll-to-top {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 9999;
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>