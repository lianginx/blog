<script lang="ts" setup>
import type { NavItem, ThemeConfig } from '../types/theme'
import { useData, useRoute } from 'vitepress'

const route = useRoute()
const { site, theme } = useData<ThemeConfig>()

function isActive(item: NavItem) {
  const html = `${item.link}.html` === route.path
  const path = item.activeMatch ? route.path.startsWith(item.activeMatch) : false
  return html || path
}
</script>

<template>
  <div class="md:absolute md:-ml-36 b-b b-b-solid b-b-[--vp-c-divider] md:b-none pb-6 mb-6 grid gap-2">
    <a class="font-bold" href="/">{{ site.title }}</a>
    <a
      v-for="item in theme.nav" :key="item.link"
      class="text-[--vp-c-text-2]"
      :class="{ '!text-[--vp-c-text-1] font-500': isActive(item) }"
      :href="item.link"
    >
      {{ item.title }}
    </a>
  </div>
</template>
