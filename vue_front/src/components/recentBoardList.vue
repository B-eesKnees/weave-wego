<script>
export default {
  props: {
    recentBoardList: Object,
    openBoardDetail: Function, // 추가: openBoardDetail 함수를 props로 받아옴
  },
  computed: {
    truncatedContents() {
      const maxChars = 30;
      if (this.recentBoardList.BRD_TITLE.length > maxChars) {
        return this.recentBoardList.BRD_TITLE.substring(0, maxChars) + "...";
      } else {
        return this.recentBoardList.BRD_TITLE;
      }
    },
  },
  methods: {
    handleOpenBoardDetailAndRefresh() {
      // openBoardDetail 함수 호출하여 기존 탭 새로고침하기 (props로 전달된 함수)
      if (this.openBoardDetail) {
        this.openBoardDetail(this.recentBoardList.BRD_ID);
      }
    },
    processHashtags(hashtags) {
      const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      const leftReplaceData = hashtags.replace(reg, " ");
      const leftReplaceData2 = leftReplaceData.split(" ");
      const hashtagsWithoutEmpty = leftReplaceData2.filter((tag) => tag !== "");
      return hashtagsWithoutEmpty;
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
          <div class="hashtag">
            {{
              processHashtags(recentBoardList.BRD_HASHTAG)
                .map((tag) => `#${tag}`)
                .join(" ")
            }}
          </div>
          <div class="brd_created_at">{{ recentBoardList.BRD_CREATED_AT }}</div>
          <div class="brd_title">{{ truncatedContents }}</div>
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
