<script setup>
import { ref } from "vue";
const props = defineProps({
  comment: Object,
  comment_editMode: Boolean,
});
const emit = defineEmits(["delete", "edit", "report"]);

const userCheck = ref(false);
const imageCheck = ref(true);
const updateButton = ref(false);
const reportCheck = ref(false);
if (props.comment.COM_WRITER != localStorage.getItem("userID")) {
  reportCheck.value = true;
}

const setUpdate = () => {
  updateButton.value = true;
};

if (props.comment.COM_WRITER === localStorage.getItem("userID")) {
  userCheck.value = true;
}
if (props.comment.USER_IMAGE === "default" || !props.comment.USER_IMAGE) {
  imageCheck.value = false;
}
console.log(imageCheck.value);
</script>

<template>
  <div>
    <div class="comment">
      <div class="profile" v-if="imageCheck">
        <img
          class="profile_icon"
          :src="
            comment.USER_IMAGE.startsWith('http')
              ? comment.USER_IMAGE
              : `http://localhost:3000/downloadProfile/${comment.COM_WRITER}/${comment.USER_IMAGE}`
          "
        />
      </div>
      <div class="profile" v-else>
        <img class="profile_icon" src="../assets/img/profileExample.png" />
      </div>
      <div class="comment-body">
        <div class="comment-nickname">
          <div>{{ comment.USER_NICKNAME }}</div>
          <div class="comment-date">
            <div>
              {{
                comment.COM_UPDATED_AT
                  ? comment.COM_UPDATED_AT.slice(0, 10).replace("T", " ")
                  : comment.COM_CREATED_AT.slice(0, 10).replace("T", " ")
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
                  <button
                    v-if="userCheck"
                    class="dropdown-item"
                    type="button"
                    @click="setUpdate()"
                  >
                    수정
                  </button>
                </li>
                <li>
                  <a
                    v-if="userCheck"
                    class="dropdown-item"
                    type="button"
                    @click="() => emit('delete', comment.COM_ID)"
                    >삭제</a
                  >
                </li>
                <li>
                  <button
                    v-if="reportCheck"
                    class="dropdown-item"
                    type="button"
                    @click="() => emit('report', comment.COM_ID)"
                  >
                    신고
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>{{ comment.COM_COMMENT }}</div>
      </div>
    </div>
    <div v-if="updateButton" class="comment_update">
      ㄴ
      <input
        v-model="updatedComment"
        type="text"
        placeholder="좋은 댓글을 씁시다"
        font-size="2rem"
        style="flex-grow: 1; height: 5rem"
      />

      <div>
        <button
          id="comment-submit"
          class="comment-submit"
          type="submit"
          width="100px"
          @click="() => emit('edit', comment.COM_ID, updatedComment)"
        >
          댓글 수정
        </button>
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
.comment_update {
  display: flex;
  padding: 0rem 0rem 1.5rem 1rem;
}

.comment_update > div:first-of-type {
  text-align: center;
  padding-right: 1rem;
}
.comment-submit {
  width: 70px;
  height: 30px;
  margin-top: 1.5rem;
  margin-left: 1rem;
}
</style>
