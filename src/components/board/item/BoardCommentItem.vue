<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { deleteComment, updateComment, getComments } from '@/api/board.js'
import { onMounted } from 'vue'
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
const temp = ref('')
const copyCommnet = () => {
  comment.value = JSON.parse(JSON.stringify(props.comment))
}

function deactiveModfiy() {
  isUpdate.value = false
  comment.value.content = temp.value
}

function activeModfiy() {
  isUpdate.value = true
  temp.value = comment.value.content
}

function modifyComment() {
  console.log('댓글 수정하러 가자~ 댓글:', comment.value)
  updateComment(
    comment.value,
    ({ data }) => {
      alert('댓글 수정이 완료되었습니다.')
      ;(isUpdate.value = false),
        emit('modifyComment', {
          commentId: comment.value.commentId,
          content: comment.value.content
        })
    },
    (error) => {
      console.log('댓글 수정 실패', error)
    }
  )
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  return `${year}-${month}-${day}`
}
</script>

<template>
  <div id="comment">
    <div v-if="!isUpdate" class="my-[4px] rounded">
      <div class="flex justify-between items-center">
        <p class="mb-1 h5">
          {{ comment.memberName }} <span class="ml-3">{{ formatDate(comment.registerTime) }}</span>
        </p>
        <div>
          <button class="small text-primary" @click="activeModfiy">수정</button>
          <button class="small text-danger" @click="removeComment">삭제</button>
        </div>
      </div>
      <p class="text-body mb-1">{{ comment.content }}</p>
      <button class="small text-primary mt-1">답글</button>
      <!-- 답글 기능 -->
    </div>
    <div v-else>
      <div class="flex justify-between items-center">
        <p class="mb-1 h5">
          {{ comment.memberName }} <span class="small">{{ formatDate(comment.registerTime) }}</span>
        </p>
        <div>
          <button class="small text-primary" @click="modifyComment">수정</button>
          <button class="small text-danger" @click="deactiveModfiy">취소</button>
        </div>
      </div>
      <textarea class="form-control" rows="3" v-model.lazy="comment.content"></textarea>
    </div>
    <hr class="mb-[10px]" />
  </div>
</template>

<style scoped>
button {
  border: 0;
  background-color: transparent;
}
</style>
