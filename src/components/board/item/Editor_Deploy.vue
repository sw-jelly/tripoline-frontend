<template>
  <div ref="editor" />
</template>

<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { boardImage } from '@/api/board'
const props = defineProps({
  data: {
    type: String,
    default: ''
  }
})

watch(
  () => props.data,
  (newValue) => {
    console.log('value is', newValue)
    if (editor.value) {
      editor.value = newValue
    }
  }
)

const onUploadImage = async (blob, callback) => {
  await boardImage(
    blob,
    (response) => {
      callback(response.data.data.url, 'alt text')
    },
    (err) => {
      console.log(err)
      return false
    }
  )
}

const emit = defineEmits(['setContent'])
const editor = ref()
const editorHolder = ref()

//마운트될때 Editor 생성
onMounted(() => {
  editorHolder.value = new Editor({
    el: editor.value,
    height: '500px',
    initialEditType: 'wysiwyg',
    initialValue: props.data,
    hooks: {
      addImageBlobHook: onUploadImage
    },
    events: {
      change: () => emit('setContent', editorHolder.value.getMarkdown())
      // .getHTML()
    }
  })
})

//작성한 내용 불러와서 html 적용
</script>
