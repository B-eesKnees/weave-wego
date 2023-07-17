<script>
export default {
  props: {
    likeBoardList: Object,
  },
  methods: {
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
    <a :href="`/detail/${likeBoardList.BRD_ID}`" target="_blank">
      <div class="board-list">
        <div class="board_content">
          <div class="hashtag">
            {{
              processHashtags(likeBoardList.BRD_HASHTAG)
                .map((tag) => `#${tag}`)
                .join(" ")
            }}
          </div>
          <div class="brd_created_at">{{ likeBoardList.BRD_CREATED_AT }}</div>
          <div class="brd_title">{{ likeBoardList.BRD_TITLE }}</div>
          <div class="viewer">
            <img src="../assets/img/view.png" alt="view" />
            {{ likeBoardList.BRD_VIEWCOUNT }}
          </div>
          <div class="like">
            <img src="../assets/img/like_on.png" alt="like" />
            {{ likeBoardList.likecount }}
          </div>
        </div>
        <div
          class="mypage_img"
          :style="`background-image: url(http://localhost:3000/downloadCourse/${likeBoardList.BRD_ID}/${likeBoardList.IMG_PATH})`"
        ></div>
      </div>
    </a>
  </div>
</template>
