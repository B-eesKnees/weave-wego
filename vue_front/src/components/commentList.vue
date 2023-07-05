<template>
  <div class="comment-list">
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
  </div>
</template>

<script>
export default {
  props: {
    commentList: Object,
  },
};
</script>
