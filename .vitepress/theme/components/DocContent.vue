<script lang="ts" setup>
import type { ThemeConfig } from '#types/theme'
import { useData } from 'vitepress'

const { frontmatter } = useData<ThemeConfig>()
</script>

<template>
  <div class="vp-doc">
    <div class="grid gap-4 mb-10">
      <h1>{{ frontmatter.title }}</h1>
      <div class="flex flex-wrap space-x-2 text-xs">
        <div
          v-for="tag in frontmatter.tags" :key="tag"
          class="bg-[--vp-c-default-soft] hover:bg-[--vp-c-default-3] rd-full px-3 py-1 cursor-default"
        >
          {{ tag }}
        </div>
      </div>
    </div>
    <Content />
    <div v-if="frontmatter.date" class="mt-8 text-[--vp-c-text-3] text-sm">
      —— 发布于 {{ frontmatter.date }}
    </div>
  </div>
</template>
