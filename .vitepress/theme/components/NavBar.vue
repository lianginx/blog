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
  <div class="lg:absolute lg:-ml-36 b-b b-b-solid b-b-[--vp-c-divider] lg:b-none pb-6 mb-6 lg:pb-0 lg:mb-6 grid gap-3">
    <div>
      <a class="font-bold" :href="withBase('/')">
        {{ site.title }}
      </a>
    </div>
    <span v-for="item in theme.nav?.items" :key="item.link">
      <a
        class="text-[--vp-c-text-2]"
        :class="{ '!text-[--vp-c-text-1] font-500': isActive(item) }"
        :href="withBase(item.link)"
      >
        {{ item.title }}
      </a>
    </span>
    <div key="social" class="flex items-center h-6 gap-3">
      <a
        :href="withBase('/rss.xml')"
        target="_blank"
        aria-label="RSS 订阅"
      >
        <RssIcon class="text-[--vp-c-text-3] hover:text-[--vp-c-text-1]" :size="18" :stroke-width="3" />
      </a>
      <a
        v-if="theme.nav?.github"
        :href="theme.nav.github" target="_blank"
        aria-label="GitHub"
      >
        <SIcon
          class="text-[--vp-c-text-3] hover:text-[--vp-c-text-1] w-17px h-17px"
          :icon="siGithub"
        />
      </a>
      <a
        v-if="theme.nav?.mastodon"
        :href="theme.nav.mastodon" target="_blank"
        aria-label="Mastodon"
      >
        <SIcon
          class="text-[--vp-c-text-3] hover:text-[--vp-c-text-1] w-17px h-17px"
          :icon="siMastodon"
        />
      </a>
      <a
        v-if="theme.nav?.x"
        :href="theme.nav.x" target="_blank"
        aria-label="X"
      >
        <SIcon
          class="text-[--vp-c-text-3] hover:text-[--vp-c-text-1] w-16px h-15px"
          :icon="siX"
        />
      </a>
    </div>
  </div>
</template>
