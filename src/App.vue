<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { ResponseBookInfo, getBookInfo } from './utils/bookQuery'
// input modal of appCode
const APP_CODE_KEY = 'appCode'
const visible = ref(false)
const getAppCode = () => {
  return localStorage.getItem(APP_CODE_KEY) ?? undefined
}
const appCode = ref<string>()
appCode.value = getAppCode()
if (!appCode.value) {
  visible.value = true
}
// handle appCode when appCode value change
watch(() => appCode.value, (value) => {
  value ? setAppCode(value) : removeAppCode()
})
// handle input of appCode
const handleBeforeOk = (done: ((closed: boolean) => void)) => {
  done(!!getAppCode())
}
const handleBeforeCancel = () => {
  return !!getAppCode()
}
// appCode methods
const setAppCode = (appCode: string) => {
  localStorage.setItem(APP_CODE_KEY, appCode)
}
const removeAppCode = () => {
  localStorage.removeItem(APP_CODE_KEY)
}
// ---query book---
const isbn = ref('')
const inputRef = ref()
const result = ref<ResponseBookInfo>()
// listener
const handleKeydown = async (e: KeyboardEvent) => {
  if (e.code === 'Enter') {
    // clear input content
    result.value = await getBookInfo(isbn.value, appCode.value)
    // clear content of input
    isbn.value = '';
    console.log(result.value);
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
  <a-modal v-model:visible="visible" title="Enter AppCode" :on-before-ok="handleBeforeOk"
    :on-before-cancel="handleBeforeCancel" :mask-closable="false" :closable="false" :esc-to-close="false">
    <a-input v-model="appCode">
      <template #prepend>appCode:</template>
    </a-input>
  </a-modal>
</template>
