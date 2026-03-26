<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isShow = ref(false)

let ticking = false
function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      isShow.value = window.scrollY > 100
      ticking = false
    })
    ticking = true
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0 })
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    v-show="isShow"
    class="fixed flex justify-center items-center cursor-pointer right-8 bottom-8 size-10 rd-lg transition-background-color-200 hover:bg-[--vp-c-default-soft]"
    role="button"
    aria-label="返回顶部"
    tabindex="0"
    @click="scrollToTop"
  >
    <IconTop :size="18" />
  </div>
</template>
