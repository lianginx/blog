<script setup lang="ts">
import type { ThemeConfig } from '#types'

const { theme } = useData<ThemeConfig>()

const applyUrl = `https://github.com/lianginx/blog/issues/new?template=申请友链模板.md`
</script>

<template>
  <div>
    <div class="grid cols-1 sm:cols-2 gap-y-6 sm:gap-x-3">
      <a
        v-for="friend in theme.friends?.items" :key="friend.link"
        class="flex space-x-3 hover:decoration-none"
        :href="friend.link"
        target="_blank"
      >
        <div class="size-16 rounded-full overflow-hidden">
          <img v-if="friend.avatar" class="size-full object-cover" :src="friend.avatar" alt="avatar">
          <div v-else class="flex items-center size-full text-xl justify-center bg-[--vp-c-default-soft]">
            {{ friend.name.charAt(0) }}
          </div>
        </div>
        <div class="flex-1">
          <div class="line-clamp-1">{{ friend.name }}</div>
          <div class="line-clamp-2 text-xs text-[--vp-c-text-2] mt-1">
            {{ friend.desc ?? friend.link }}
          </div>
        </div>
      </a>
    </div>
    <br>
    <div>
      <a :href="applyUrl" target="_blank">申请友链</a>
    </div>
  </div>
</template>

<style scoped></style>
