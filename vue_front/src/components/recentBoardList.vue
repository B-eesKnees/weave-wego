<script>
export default {
  props: {
    recentBoardList: Object,
    openBoardDetail: Function, // 추가: openBoardDetail 함수를 props로 받아옴
  },
  methods: {
    handleOpenBoardDetailAndRefresh(event) {
      // event.preventDefault(); // 기존 <a> 태그의 링크 동작을 막음

      // 링크 동작 수행 (새 창 열림)
      // window.open(event.target.href, "_blank");

      // 기존 창 새로고침
      window.location.reload();
    },
  },
};
</script>

<template>
  <div>
    <a
      @click="handleOpenBoardDetailAndRefresh"
      :href="`/detail/${recentBoardList.BRD_ID}`"
      target="_blank"
    >
      <div class="board-list">
        <div class="board_content">
          <div class="hashtag">{{ recentBoardList.BRD_HASHTAG }}</div>
          <div class="brd_created_at">{{ recentBoardList.BRD_CREATED_AT }}</div>
          <div class="brd_title">{{ recentBoardList.BRD_TITLE }}</div>
          <div class="viewer">
            <img src="../assets/img/view.png" alt="view" />
            {{ recentBoardList.BRD_VIEWCOUNT }}
          </div>
          <div class="like">
            <img src="../assets/img/like_on.png" alt="like" />
            {{ recentBoardList.likecount }}
          </div>
        </div>
        <div
          class="mypage_img"
          :style="`background-image: url(http://localhost:3000/downloadCourse/${recentBoardList.BRD_ID}/${recentBoardList.IMG_PATH})`"
        ></div>
      </div>
    </a>
  </div>
</template>
