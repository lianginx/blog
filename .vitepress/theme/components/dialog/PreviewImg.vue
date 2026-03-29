<script lang="ts" setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@lucide/vue'
import { withBase } from 'vitepress'
import { usePreviewImg } from './usePreviewImg'

const { currentImg, isFirst, isLast, prev, next, close } = usePreviewImg()
</script>

<template>
  <Teleport to="body">
    <dialog
      id="preview-img"
      @click.self="close"
      @keydown.left.stop="prev" @keydown.right.stop="next" @keydown.escape="close"
    >
      <div tabindex="0" />
      <div class="flex justify-center items-center px-20" @click.self="close">
        <ChevronLeftIcon
          class="absolute left-0 cursor-pointer text-[--vp-c-text-1]"
          :class="{ 'text-[--vp-c-text-3]': isFirst }"
          :size="50"
          @click="prev"
        />
        <div class="h-90svh w-70svw flex items-center justify-center" @click.self="close">
          <img class="h-full max-h-fit object-contain" :src="withBase(currentImg)">
        </div>
        <ChevronRightIcon
          class="absolute right-0 cursor-pointer text-[--vp-c-text-1]"
          :class="{ 'text-[--vp-c-text-3]': isLast }"
          :size="50"
          @click="next"
        />
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
#preview-img:modal {
  background-color: transparent;
  border: 0;
  padding: 0;
}

#preview-img::backdrop {
  backdrop-filter: blur(10px);
}
</style>
