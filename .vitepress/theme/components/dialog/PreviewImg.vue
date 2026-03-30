<script lang="ts" setup>
import { usePreviewImg } from '#components/dialog/usePreviewImg'
import { ChevronLeftIcon, ChevronRightIcon } from '@lucide/vue'
import { withBase } from 'vitepress'

const { currentImg, isFirst, isLast, prev, next, close } = usePreviewImg()
</script>

<template>
  <Teleport to="body">
    <dialog
      id="preview-img"
      @click.self="close"
      @keydown.left.stop="prev"
      @keydown.right.stop="next"
      @keydown.escape="close"
    >
      <div tabindex="0" />
      <div
        class="flex justify-center items-center md:px-20"
        @click.self="close"
      >
        <ChevronLeftIcon
          class="absolute left-0 cursor-pointer text-[--vp-c-text-1] invisible md:visible"
          :class="{ 'text-[--vp-c-text-3]': isFirst }"
          :size="50"
          @click="prev"
        />
        <img
          class="h-90svh w-90svw md:w-70svw object-contain"
          :src="withBase(currentImg)"
          @click="close"
        >
        <ChevronRightIcon
          class="absolute right-0 cursor-pointer text-[--vp-c-text-1] invisible md:visible"
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
