<script setup lang="ts">
import { onMounted, ref } from 'vue';
const isbn = ref('')
const inputRef = ref()
// const result = ref('content')
onMounted(() => {
  inputRef.value.focus()
})
</script>

<template>
  <div class="flex flex-col items-center mt-[6%]">
    <div class="mb-3 text-lg font-bold">Hello Douban Book</div>
    <div class="w-72">
      <a-input v-model="isbn" size="large" :ref="inputRef"></a-input>
    </div>
    <div class="mt-5">{{ isbn }}</div>
  </div>
</template>
