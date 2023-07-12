<script>
import axios from "axios";
export default {
  props: {
    commentList: Object,
    comment_editMode: Boolean,
  },
  data() {
    return {
      comIsChecked: false,
    };
  },
  methods: {
    sendSelectedComItems() {
      if (this.comIsChecked) {
        this.$emit("addcomlist", this.commentList.BRD_ID);
      } else {
        this.$emit("removecomlist", this.commentList.BRD_ID);
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
    :value="commentList.BRD_ID"
    v-model="comIsChecked"
    @change="sendSelectedComItems"
  />

  <div class="comment-list">
    <a :href="`/detail/${commentList.BRD_ID}`" target="_blank">
      <div class="comment_content">
        <div class="com_brd_title">{{ commentList.BRD_TITLE }}</div>
        <div class="com_created_at">{{ commentList.COM_CREATED_AT }}</div>
        <img
          class="com_list_icon"
          src="../assets/img/commentList.png"
          alt="commentList"
        />
        <div class="com_comment">{{ commentList.COM_COMMENT }}</div>
      </div>
    </a>
  </div>
</template>
