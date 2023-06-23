<template>
  <div class="comment-list">
    <div
      class="comment_content"
      v-for="commentItem in commentList"
      :key="commentItem.COM_ID"
    >
      <div class="com_brd_title">{{ getBoardTitle(commentItem.BRD_ID) }}</div>
      <div class="com_comment">{{ commentItem.COM_COMMENT }}</div>
      <div class="brd_created_at">{{ commentItem.COM_CREATED_AT }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boardList: Object,
    hideBrdOpen: Boolean,
  },
};
</script>
