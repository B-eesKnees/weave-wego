<script>
export default {
  props: {
    boardList: Object,
    hideBrdOpen: Boolean,
    editMode: Boolean,
  },
  data() {
    return {
      // checkbox의 value와 같은 값 있으면 체크 된 상태로 시작
      isChecked: false
    };
  },
  methods: {
    sendSelectedItems() {
      console.log(this.isChecked);
      if (this.isChecked) {
        // 체크하면 부모한테 addlist로 this.boardList.BRD_ID 전달 this.isChecked = true
        this.$emit('addlist', this.boardList.BRD_ID);
      } else {
        // 체크해제하면 부모한테 removelist로 this.boardList.BRD_ID 전달 this.isChecked = false
        this.$emit('removelist', this.boardList.BRD_ID);
      }
    },
  }
};
</script>

<template>
  <div>
    <a href="/detail">
      <input
        class="mycourse_checkbox"
        type="checkbox"
        v-if="editMode"
        :value="boardList.BRD_ID"
        v-model="isChecked"
        @change="sendSelectedItems"
      /> <!-- @change="sendSelectedItems" 이벤트 추가 -->

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
            {{ boardList.BRD_OPEN === 1 ? "공개" : "비공개" }}
          </div>
          
        </div>
        <div
          class="mypage_img"
          :style="`background-image: url(http://localhost:3000/downloadCourse/${boardList.BRD_ID}/${boardList.IMG_PATH})`"
        ></div>
      </div>
    </a>
  </div>
</template>
