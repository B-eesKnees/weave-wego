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
  <div>
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
          <div v-if="!hideBrdOpen" class="brd_open">
            {{ boardList.BRD_OPEN }}
          </div>
        </div>
        <!-- <div class="mypage_img"
        :style="">
          <img
            :src="`http://localhost:3000/downloadCourse/${boardList.BRD_ID}/${boardList.IMG_PATH}`"
            alt=""
          />
        </div> -->
        <div
          class="mypage_img"
          :style="`background-image: url(http://localhost:3000/downloadCourse/${boardList.BRD_ID}/${boardList.IMG_PATH})`"
        ></div>
      </div>
    </a>
  </div>
</template>
