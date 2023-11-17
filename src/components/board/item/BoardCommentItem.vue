<script setup>
import { ref } from 'vue'
import { deleteComment, updateComment, getComments } from '@/api/board.js'
const props = defineProps({ comment: Object })

const isUpdate = ref(false)

/**
 * 댓글 변동시 최신화를 위한 emit 정의
 */
const emit = defineEmits(['modifyComment', 'removeComment'])

const comment = ref({
  commentId: props.comment.commentId,
  articleId: props.comment.articleId,
  memberId: props.comment.memberId,
  memberName: props.comment.memberName,
  content: props.comment.content,
  registerTime: props.comment.registerTime
})

function removeComment() {
  const commentId = comment.value.commentId
  console.log('댓글 삭제하러 가자~ 댓글 이름 :', commentId)

  if (!confirm('정말 삭제하시겠습니까?')) return
  deleteComment(
    commentId,
    () => {
      alert('댓글 삭제가 완료되었습니다.')
      emit('removeComment')
    },
    (error) => {
      console.log('댓글 삭제 실패', error)
    }
  )
}

function update() {
  isUpdate.value = !isUpdate.value
}

function modifyComment() {
  console.log('댓글 수정하러 가자~ 댓글:', comment.value)
  updateComment(
    comment.value,
    ({ data }) => {
      alert('댓글 수정이 완료되었습니다.')
      update()
      emit('modifyComment')
    },
    (error) => {
      console.log('댓글 수정 실패', error)
    }
  )
}
</script>

<template>
  <div id="comment">
    <div v-if="!isUpdate" class="border-2 border-solid boder-black my-[4px] rounded">
      <div class="flex justify-between items-center">
        <p class="mb-1 h5">
          {{ comment.memberName }} <span class="ml-3">{{ comment.registerTime }}</span>
        </p>
        <div>
          <button class="small text-primary" @click="update">수정</button>
          <button class="small text-danger" @click="removeComment">삭제</button>
        </div>
      </div>
      <p class="text-body mb-1">{{ comment.content }}</p>
      <button class="small text-primary mt-1">답글</button>
    </div>
    <div v-else>
      <div class="flex justify-between items-center">
        <p class="mb-1 h5">
          {{ comment.memberName }} <span class="small">{{ comment.registerTime }}</span>
        </p>
        <div>
          <button class="small text-primary" @click="modifyComment">수정</button>
          <button class="small text-danger" @click="update">취소</button>
        </div>
      </div>
      <textarea class="form-control" rows="3" v-model.lazy="comment.content"></textarea>
    </div>
    <hr />
  </div>
</template>

<style scoped>
button {
  border: 0;
  background-color: transparent;
}
</style>
