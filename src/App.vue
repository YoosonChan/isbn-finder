<script setup lang="ts">
import { onMounted, onUnmounted, ref, unref } from 'vue';
import { getBookInfo } from './utils/douban'
const isbn = ref('')
const inputRef = ref()
const result = ref('')
// listener
const handleKeydown = (e: KeyboardEvent) => {
  if (e.code === 'Enter') {
    result.value = unref(isbn)
    // clear input content
    isbn.value = ''
    getBookInfo(result.value)
  }
}
const addListener = () => {
  document.addEventListener('keydown', handleKeydown, false)
}
const removeListener = () => {
  document.removeEventListener('keydown', handleKeydown)
}
// lifecycle
onMounted(() => {
  inputRef.value.focus()
  addListener()
})
onUnmounted(() => {
  removeListener()
})
</script>

<template>
  <div class="flex flex-col items-center mt-[6%]">
    <div class="mb-3 text-lg font-bold">Book</div>
    <div class="w-72">
      <a-input v-model="isbn" ref="inputRef" size="large">
        <template #prefix>ISBN:</template>
      </a-input>
    </div>
    <div class="mt-5">{{ result }}</div>
  </div>
</template>
