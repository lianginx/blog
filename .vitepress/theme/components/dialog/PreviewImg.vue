<script lang="ts" setup>
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
      <div class="flex justify-center items-center px-15" @click.self="close">
        <div
          class="absolute left-0 text-6xl cursor-pointer"
          :class="{ 'text-[--vp-c-text-3] cursor-default': isFirst }"
          :disabled="isFirst"
          @click="prev"
        >
          &lsaquo;
        </div>
        <div class="h-90svh w-70svw flex items-center justify-center" @click.self="close">
          <img class="h-full max-h-fit object-contain" :src="withBase(currentImg)">
        </div>
        <div
          class="absolute right-0 text-6xl cursor-pointer"
          :class="{ 'text-[--vp-c-text-3] cursor-auto': isLast }"
          :disabled="isLast"
          @click="next"
        >
          &rsaquo;
        </div>
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
