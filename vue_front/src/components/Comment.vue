<script setup>
const props = defineProps({
  comment: Object,
  comment_editMode: Boolean,
});
const emit = defineEmits(["delete"]);
</script>

<template>
  <div>
    <div class="comment">
      <div class="profile">
        <img
          class="profile_icon"
          :src="
            comment.COM_IMAGE.startsWith('http')
              ? comment.COM_IMAGE
              : `http://localhost:3000/downloadProfile/${comment.COM_WRITER}/${comment.COM_IMAGE}`
          "
        />
      </div>
      <div class="comment-body">
        <div class="comment-nickname">
          <div>{{ comment.COM_NICK }}</div>
          <div class="comment-date">
            <div>
              {{
                comment.COM_UPDATED_AT
                  ? comment.COM_UPDATED_AT.slice(0, 16).replace("T", " ")
                  : comment.COM_CREATED_AT.slice(0, 16).replace("T", " ")
              }}
            </div>
            <div>
              <button
                type="button"
                class="dropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button class="dropdown-item" type="button">수정</button>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    type="button"
                    @click="() => emit('delete', comment.COM_ID)"
                    >삭제</a
                  >
                </li>
                <li>
                  <button class="dropdown-item" type="button">신고</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>{{ comment.COM_COMMENT }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment {
  display: flex;
  min-height: 100px;
  width: 90%;
}
.profile_icon {
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  margin-right: 1rem;
  border: 1px solid black;
  border-radius: 50%;
}

.comment-body {
  flex-grow: 1;
}

.comment-nickname {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.75rem;
}

.comment-nickname > div:first-of-type {
  font-weight: 600;
}

.comment-date {
  display: flex;
}
.comment-date > div:first-of-type {
  padding-right: 0.5rem;
}
.dropdown {
  border: 0;
  background-color: transparent;
}
</style>
