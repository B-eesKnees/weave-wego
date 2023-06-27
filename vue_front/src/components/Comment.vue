<script setup>
const props = defineProps({
  comment: Object,
});
</script>

<template>
  <div class="comment">
    <div class="profile">
      <img class="profile_icon" src="../assets/img/test.png" />
    </div>
    <div class="comment-body">
      <div class="comment-nickname">
        <div>{{ comment.nickname }}</div>
        <div class="comment-date">
          <div>{{ comment.date }}</div>
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
              <li><button class="dropdown-item" type="button">수정</button></li>
              <li>
                <button class="dropdown-item" type="button">삭제</button>
              </li>
              <li>
                <button class="dropdown-item" type="button">신고</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>{{ comment.content }}</div>
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
