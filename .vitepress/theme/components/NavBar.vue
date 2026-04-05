<script lang="ts" setup>
import type { NavItem, ThemeConfig } from '#types/theme'
import SIcon from '#components/SIcon.vue'
import { RssIcon } from '@lucide/vue'
import { siGithub, siMastodon, siX } from 'simple-icons'
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
  <div class="lg:absolute lg:-ml-36 b-b b-b-solid b-b-[--vp-c-divider] lg:b-none pb-6 mb-6 lg:pb-0 lg:mb-6 grid gap-2">
    <div>
      <a class="font-bold" :href="withBase('/')">
        {{ site.title }}
      </a>
    </div>
    <div v-for="item in theme.nav?.items" :key="item.link">
      <a
        class="text-[--vp-c-text-2]"
        :class="{ '!text-[--vp-c-text-1] font-500': isActive(item) }"
        :href="withBase(item.link)"
      >
        {{ item.title }}
      </a>
    </div>
    <div key="social" class="flex mt-2 gap-3">
      <a :href="withBase('/rss.xml')" alt="RSS 订阅" target="_blank">
        <RssIcon class="text-[--vp-c-text-3] hover:text-[--vp-c-text-1]" :size="18" :stroke-width="3" />
      </a>
      <a :href="theme.nav?.github" alt="GitHub" target="_blank">
        <SIcon
          class="text-[--vp-c-text-3] hover:text-[--vp-c-text-1] w-17px h-17px"
          :icon="siGithub"
        />
      </a>
      <a :href="theme.nav?.mastodon" alt="Mastodon" target="_blank">
        <SIcon
          class="text-[--vp-c-text-3] hover:text-[--vp-c-text-1] w-17px h-17px"
          :icon="siMastodon"
        />
      </a>
      <a :href="theme.nav?.x" alt="X/Twitter" target="_blank">
        <SIcon
          class="text-[--vp-c-text-3] hover:text-[--vp-c-text-1] w-16px h-16px"
          :icon="siX"
        />
      </a>
    </div>
  </div>
</template>
