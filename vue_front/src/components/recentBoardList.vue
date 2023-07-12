<script>
export default {
  props: {
    recentBoardList: Object,
  },
};
</script>

<template>
  <div>
    <a :href="`/detail/${recentBoardList.BRD_ID}`" target="_blank">
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
