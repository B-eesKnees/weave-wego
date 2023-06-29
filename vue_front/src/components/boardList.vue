<script>
export default {
  props: {
    boardList: Object,
    hideBrdOpen: Boolean,
    editMode: Boolean, // editMode 프롭 추가
  },
};
</script>

<template>
  <a href="/detail">
    <input class="mycourse_checkbox" type="checkbox" v-if="editMode" />
    <div class="board-list">
      <div class="board_content">
        <div class="hashtag">{{ boardList.BRD_HASHTAG }}</div>
        <div class="brd_created_at">{{ boardList.BRD_CREATED_AT }}</div>
        <div class="brd_title">{{ boardList.BRD_TITLE }}</div>
        <div class="viewer">
          <img src="../assets/img/view.png" alt="view" />
          {{ boardList.BRD_VIEWCOUNT }}
        </div>
        <div class="like">
          <img src="../assets/img/like_on.png" alt="like" />
          {{ boardList.likecount }}
        </div>
        <div v-if="!hideBrdOpen" class="brd_open">{{ boardList.BRD_OPEN }}</div>
      </div>
      <div class="mypage_img">
        <!-- <img
          v-if="i == 0"
          :src="`http://localhost:3000/downloadCourse/${item.BRD_ID}/${item.IMG_PATH}`"
          alt=""
        /> -->
      </div>
    </div>
  </a>
</template>
