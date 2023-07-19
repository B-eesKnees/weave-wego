<script>
import axios from "axios";
export default {
  props: {
    boardList: { type: Object, required: true },
    hideBrdOpen: Boolean,
    editMode: Boolean,
    email: String, // email prop 추가
  },
  computed: {
    truncatedContents() {
      const maxChars = 30;
      if (this.boardList.BRD_TITLE.length > maxChars) {
        return this.boardList.BRD_TITLE.substring(0, maxChars) + "...";
      } else {
        return this.boardList.BRD_TITLE;
      }
    },
  },
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    sendSelectedItems() {
      if (this.isChecked) {
        this.$emit("addlist", this.boardList.BRD_ID);
      } else {
        this.$emit("removelist", this.boardList.BRD_ID);
      }
    },
    moveToDetail(brdid) {
      //클릭시 최근본 게시글 테이블에 저장
      axios({
        url: "http://localhost:3000/recentview",
        method: "POST",
        data: {
          brdID: brdid,
          email: this.email,
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          alert(error);
        });
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
    <input
      class="mycourse_checkbox"
      type="checkbox"
      v-if="editMode"
      :value="boardList.BRD_ID"
      v-model="isChecked"
      @change="sendSelectedItems"
      @click="moveToDetail(boardList.BRD_ID)"
    />
    <a :href="`/detail/${boardList.BRD_ID}`" target="_blank">
      <div class="board-list">
        <div class="board_content">
          <div class="hashtag">
            {{
              processHashtags(boardList.BRD_HASHTAG)
                .map((tag) => `#${tag}`)
                .join(" ")
            }}
          </div>
          <div class="brd_created_at">{{ boardList.BRD_CREATED_AT }}</div>
          <div class="brd_title">{{ truncatedContents }}</div>
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
