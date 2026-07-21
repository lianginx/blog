<script setup lang="ts">
import type { FriendAvatar, ThemeConfig } from '#types'

const { theme, isDark } = useData<ThemeConfig>()

const applyUrl = `https://github.com/lianginx/blog/issues/new?template=申请友链模板.md`

function getAvatarUrl(avatar?: string | FriendAvatar) {
  if (!avatar)
    return undefined
  if (typeof avatar === 'string')
    return avatar
  return isDark.value ? avatar.dark : avatar.light
}
</script>

<template>
  <div>
    <div class="grid cols-1 sm:cols-2 gap-y-6 sm:gap-x-3">
      <a
        v-for="friend in theme.friends?.items" :key="friend.link"
        class="group flex items-center space-x-3 hover:decoration-none transition-shadow duration-200"
        :href="friend.link"
        target="_blank"
      >
        <div class="size-16 rounded-full overflow-hidden">
          <img v-if="friend.avatar" class="size-full object-cover" :src="getAvatarUrl(friend.avatar)" alt="avatar">
          <div v-else class="flex items-center size-full text-xl justify-center bg-[--vp-c-default-soft]">
            {{ friend.name.charAt(0) }}
          </div>
        </div>
        <div class="flex-1">
          <div class="group-hover:underline line-clamp-1">{{ friend.name }}</div>
          <div class="line-clamp-2 text-xs text-[--vp-c-text-2] mt-1">
            {{ friend.desc ?? friend.link }}
          </div>
        </div>
      </a>
    </div>
    <div class="mt-8">
      <a :href="applyUrl" target="_blank">申请友链</a>
    </div>
  </div>
</template>

<style scoped></style>
