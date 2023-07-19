<script>
import axios from "axios";
export default {
  props: {
    commentList: Object,
    comment_editMode: Boolean,
  },
  computed: {
    truncatedComment() {
      const maxChars = 40;
      if (this.commentList.COM_COMMENT.length > maxChars) {
        return this.commentList.COM_COMMENT.substring(0, maxChars) + "...";
      } else {
        return this.commentList.COM_COMMENT;
      }
    },
  },
  data() {
    return {
      comIsChecked: false,
    };
  },
  methods: {
    sendSelectedComItems() {
      if (this.comIsChecked) {
        this.$emit("addcomlist", this.commentList.COM_ID);
      } else {
        this.$emit("removecomlist", this.commentList.COM_ID);
      }
    },
  },
};
</script>

<template>
  <input
    class="comment_checkbox"
    type="checkbox"
    v-if="comment_editMode"
    :value="commentList.COM_ID"
    v-model="comIsChecked"
    @change="sendSelectedComItems"
  />

  <div class="comment-list">
    <a :href="`/detail/${commentList.BRD_ID}`" target="_blank">
      <div class="comment_content">
        <div class="com_brd_title">{{ commentList.BRD_TITLE }}</div>
        <div class="com_created_at">{{ commentList.COM_CREATED_AT }}</div>
        <p>{{ commentList.COM_ID }}</p>
        <img
          class="com_list_icon"
          src="../assets/img/commentList.png"
          alt="commentList"
        />
        <div class="com_comment">{{ truncatedComment }}</div>
      </div>
    </a>
  </div>
</template>
