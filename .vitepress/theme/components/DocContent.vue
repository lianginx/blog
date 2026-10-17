<script lang="ts" setup>
import type { ThemeConfig } from '#types'
import CopyPage from '#components/CopyPage.vue'

const { frontmatter } = useData<ThemeConfig>()
</script>

<template>
  <div class="vp-doc">
    <div class="grid gap-4 mb-8">
      <h1 class="text-balance tracking-tight">
        {{ frontmatter.title }}
      </h1>
      <div class="flex items-center flex-wrap gap-3">
        <div
          v-if="frontmatter.tags"
          class="flex flex-wrap gap-2 text-xs flex-auto"
        >
          <div
            v-for="tag in frontmatter.tags" :key="tag"
            class="bg-[--vp-c-default-soft] hover:bg-[--vp-c-default-3] rd-full px-3 py-1 cursor-default"
          >
            {{ tag }}
          </div>
        </div>
        <div>
          <CopyPage />
        </div>
      </div>
    </div>
    <Content />
    <div v-if="frontmatter.date" class="mt-8 text-[--vp-c-text-3] text-sm">
      —— 发布于 {{ frontmatter.date }}
    </div>
    <GiscusComment class="mt-10" />
  </div>
</template>
