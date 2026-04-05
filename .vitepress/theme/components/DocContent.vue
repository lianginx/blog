<script lang="ts" setup>
import type { ThemeConfig } from '#types/theme'
import { useData } from 'vitepress'

const { frontmatter } = useData<ThemeConfig>()
</script>

<template>
  <div class="vp-doc">
    <h1 class="mb-8">
      {{ frontmatter.title }}
    </h1>
    <Content />
    <div v-if="frontmatter.date" class="mt-8 text-[--vp-c-text-3] text-sm">
      —— 发布于 {{ frontmatter.date }}
    </div>
  </div>
</template>
