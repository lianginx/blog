<script lang="ts" setup>
import { MoonIcon, SunIcon } from '@lucide/vue'

const { isDark } = useData()

function toggle() {
  isDark.value = !isDark.value
}
</script>

<template>
  <button
    class="theme-toggle floating-button fixed flex justify-center items-center cursor-pointer right-8 bottom-8 size-10 rd-lg transition-colors duration-200 active:scale-96 will-change-transform"
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
    @click="toggle"
  >
    <MoonIcon class="moon text-[--vp-c-text-3]" :size="18" />
    <SunIcon class="sun text-[--vp-c-text-3]" :size="18" />
  </button>
</template>

<style>
.theme-toggle .sun {
  display: none;
}

.dark .theme-toggle .sun {
  display: block;
}

.dark .theme-toggle .moon {
  display: none;
}
</style>
