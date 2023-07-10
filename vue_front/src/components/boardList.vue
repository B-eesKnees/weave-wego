<script>
export default {
  props: {
    boardList: { type: Object, required: true },
    hideBrdOpen: Boolean,
    editMode: Boolean,
    email: String, // email prop 추가
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
    moveToDetail(brdId) {
      console.log(brdId);
      axios({
        url: "/increase",
        method: "POST",
        data: {
          brd_id: brdId,
        },
      })
        .then(async (res) => {
          if (res.data.code == 200) {
            console.log("조회수 증가");
          }
          console.log(this.email);
          axios({
            url: "/recentView",
            method: "POST",
            data: {
              brdID: brdId,
              email: this.email,
            },
          })
            .then((res) => {
              if (res.status == 200) {
                console.log("최근본 게시글");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
      // 페이지 이동 처리 (라우터를 사용하는 경우에 맞게 수정해야 함)
      // window.location.href = `/detail/${brdId}`;
    },
  },
};
</script>

<template>
  <div>
    <a
      :href="`/detail/${boardList.BRD_ID}`"
      @click="moveToDetail(boardList.BRD_ID)"
    >
      <input
        class="mycourse_checkbox"
        type="checkbox"
        v-if="editMode"
        :value="boardList.BRD_ID"
        v-model="isChecked"
        @change="sendSelectedItems"
      />
      <!-- @change="sendSelectedItems" 이벤트 추가 -->

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
