<script lang="ts" setup>
import type { NavItem, ThemeConfig } from '#types/theme'
import { RssIcon } from '@lucide/vue'
import { useData, useRoute, withBase } from 'vitepress'

const route = useRoute()
const { site, theme } = useData<ThemeConfig>()

function isActive(item: NavItem) {
  const html = `${item.link}.html` === route.path
  const path = item.activeMatch ? route.path.startsWith(item.activeMatch) : false
  return html || path
}
</script>

<template>
  <div class="md:absolute md:-ml-36 b-b b-b-solid b-b-[--vp-c-divider] md:b-none pb-6 mb-6 md:pb-0 md:mb-6 grid gap-2">
    <div>
      <a class="font-bold !inline" :href="withBase('/')">
        {{ site.title }}
      </a>
    </div>
    <div v-for="item in theme.nav" :key="item.link">
      <a
        class="text-[--vp-c-text-2]"
        :class="{ '!text-[--vp-c-text-1] font-500': isActive(item) }"
        :href="withBase(item.link)"
      >
        {{ item.title }}
      </a>
    </div>
    <div class="mt-0.5">
      <a :href="withBase('/rss.xml')" alt="RSS 订阅" target="_blank">
        <RssIcon class="text-[--vp-c-text-3] hover:text-[--vp-c-text-1]" :size="16" :stroke-width="3" />
      </a>
    </div>
  </div>
</template>
