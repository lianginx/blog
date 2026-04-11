<script lang="ts" setup>
import type { ThemeConfig } from '#types'

const { theme } = useData<ThemeConfig>()
</script>

<template>
  <div class="text-[--vp-c-text-2] flex flex-wrap gap-2 b-t-1 b-t-solid b-t-[--vp-c-divider] pt-4 mt-10">
    <SquareTag v-if="theme.footbar?.showVitePress">
      Powered by <a href="https://vitepress.dev" target="_blank">VitePress</a>
    </SquareTag>
    <SquareTag v-for="item, i in theme.footbar?.items" :key="i">
      <a v-if="item.link" :href="item.link" target="_blank">{{ item.title }}</a>
      <template v-else>
        {{ item.title }}
      </template>
    </SquareTag>
  </div>
</template>
