<script setup>
const props = defineProps({
  comment: Object,
  comment_editMode: Boolean,
});
</script>

<template>
  <a href="/detail">
    <input class="mycourse_checkbox" type="checkbox" v-if="comment_editMode" />
    <div class="comment">
      <div class="profile">
        <img class="profile_icon" src="../assets/img/test.png" />
      </div>
      <div class="comment-body">
        <div class="comment-nickname">
          <div>{{ comment.nickname }}</div>
          <div class="comment-date">
            <div>{{ comment.date }}</div>
            <div>더보기</div>
          </div>
        </div>
        <div>{{ comment.content }}</div>
      </div>
    </div>
  </a>
</template>

<style>
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
</style>
