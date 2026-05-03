<script lang="ts" setup>
import { ArrowUpFromLineIcon } from '@lucide/vue'

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
  <Transition name="back-top">
    <div
      v-show="isShow"
      class="fixed flex justify-center items-center cursor-pointer right-8 bottom-8 size-10 rd-lg transition-colors duration-200 hover:bg-[--vp-c-default-soft] active:scale-96 will-change-transform"
      role="button"
      aria-label="返回顶部"
      tabindex="0"
      @click="scrollToTop"
    >
      <ArrowUpFromLineIcon class="text-[--vp-c-text-3]" :size="18" />
    </div>
  </Transition>
</template>

<style scoped>
.back-top-enter-active,
.back-top-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.back-top-enter-from,
.back-top-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
